import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useAIGeneratedChallenges, useAddAIGeneratedChallenge, useLatestAIGeneratedChallenge } from '@/integrations/supabase/hooks/ai_generated_challenges';
import { useReplays, useAddReplay, useLatestReplay, useGenerateReplayVisualization } from '@/integrations/supabase/hooks/replays';
import { useStartChallenge, useEndChallenge, useUpdateScore } from '@/integrations/supabase/hooks/challenge_management';
import { useEvaluateSubmission } from '@/integrations/supabase/hooks/ai_judging';
import { useAddChatMessage, useLatestChatMessages } from '@/integrations/supabase/hooks/chat_messages';
import { useUpdateSkillProfile } from '@/integrations/supabase/hooks/skill_profiles';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/supabase';
import { Clock, GitBranch, GitCommit, GitPullRequest, Play, Pause, RotateCcw, Trophy, Target, Zap, Cpu, Users, MessageSquare, Video, Settings, Gavel } from 'lucide-react';

const AdminDashboard = () => {
  const [challengePrompt, setChallengePrompt] = useState('');
  const [replayData, setReplayData] = useState('');
  const [challengeId, setChallengeId] = useState('');
  const [userId, setUserId] = useState('');
  const [code, setCode] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [realTimeMessages, setRealTimeMessages] = useState([]);
  const [logs, setLogs] = useState([]);
  const [configSettings, setConfigSettings] = useState({
    aiJudgingEnabled: true,
    maxParticipants: 100,
    challengeDuration: 30,
    difficultyLevel: 'medium',
    judgeModel: 'gpt-4',
    judgingCriteria: {
      functionality: 0.4,
      codeQuality: 0.3,
      efficiency: 0.2,
      creativity: 0.1,
    },
    autoGrading: true,
    humanReviewThreshold: 0.8,
  });

  const { data: aiChallenges } = useAIGeneratedChallenges();
  const { data: latestChallenge } = useLatestAIGeneratedChallenge();
  const addAIChallenge = useAddAIGeneratedChallenge();
  
  const { data: replays } = useReplays(challengeId);
  const { data: latestReplay } = useLatestReplay(challengeId);
  const addReplay = useAddReplay();
  const generateVisualization = useGenerateReplayVisualization();

  const startChallenge = useStartChallenge();
  const endChallenge = useEndChallenge();
  const updateScore = useUpdateScore();
  const evaluateSubmission = useEvaluateSubmission();
  const addChatMessage = useAddChatMessage();
  const { data: latestChatMessages } = useLatestChatMessages(challengeId);
  const updateSkillProfile = useUpdateSkillProfile();

  useEffect(() => {
    const channel = supabase.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_messages' },
        (payload) => {
          setRealTimeMessages(current => [...current, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleGenerateChallenge = async () => {
    try {
      await addAIChallenge.mutateAsync(challengePrompt);
      toast.success('AI Challenge generated successfully');
      setChallengePrompt('');
      addLog('AI Challenge generated successfully');
    } catch (error) {
      toast.error('Failed to generate AI Challenge');
      addLog(`Error generating AI Challenge: ${error.message}`);
    }
  };

  const handleAddReplay = async () => {
    try {
      const replayObject = JSON.parse(replayData);
      await addReplay.mutateAsync(replayObject);
      toast.success('Replay added successfully');
      setReplayData('');
      addLog('Replay added successfully');
    } catch (error) {
      toast.error('Failed to add replay');
      addLog(`Error adding replay: ${error.message}`);
    }
  };

  const handleGenerateVisualization = async () => {
    try {
      const result = await generateVisualization.mutateAsync(challengeId);
      toast.success('Visualization generated successfully');
      console.log('Visualization result:', result);
      addLog('Visualization generated successfully');
    } catch (error) {
      toast.error('Failed to generate visualization');
      addLog(`Error generating visualization: ${error.message}`);
    }
  };

  const handleStartChallenge = async () => {
    try {
      await startChallenge.mutateAsync(challengeId);
      toast.success('Challenge started successfully');
      addLog(`Challenge ${challengeId} started successfully`);
    } catch (error) {
      toast.error('Failed to start challenge');
      addLog(`Error starting challenge: ${error.message}`);
    }
  };

  const handleEndChallenge = async () => {
    try {
      await endChallenge.mutateAsync(challengeId);
      toast.success('Challenge ended successfully');
      addLog(`Challenge ${challengeId} ended successfully`);
    } catch (error) {
      toast.error('Failed to end challenge');
      addLog(`Error ending challenge: ${error.message}`);
    }
  };

  const handleUpdateScore = async () => {
    try {
      await updateScore.mutateAsync({ challengeId, userId, score: 100 });
      toast.success('Score updated successfully');
      addLog(`Score updated for user ${userId} in challenge ${challengeId}`);
    } catch (error) {
      toast.error('Failed to update score');
      addLog(`Error updating score: ${error.message}`);
    }
  };

  const handleEvaluateSubmission = async () => {
    try {
      const result = await evaluateSubmission.mutateAsync({ challengeId, userId, code });
      toast.success('Submission evaluated successfully');
      console.log('Evaluation result:', result);
      addLog(`Submission evaluated for user ${userId} in challenge ${challengeId}`);
    } catch (error) {
      toast.error('Failed to evaluate submission');
      addLog(`Error evaluating submission: ${error.message}`);
    }
  };

  const handleAddChatMessage = async () => {
    try {
      await addChatMessage.mutateAsync({ challengeId, userId, message: chatMessage });
      toast.success('Chat message added successfully');
      setChatMessage('');
      addLog(`Chat message added to challenge ${challengeId}`);
    } catch (error) {
      toast.error('Failed to add chat message');
      addLog(`Error adding chat message: ${error.message}`);
    }
  };

  const handleUpdateSkillProfile = async () => {
    try {
      await updateSkillProfile.mutateAsync({ userId, skillName: 'AI Development', skillLevel: 'Advanced' });
      toast.success('Skill profile updated successfully');
      addLog(`Skill profile updated for user ${userId}`);
    } catch (error) {
      toast.error('Failed to update skill profile');
      addLog(`Error updating skill profile: ${error.message}`);
    }
  };

  const handleConfigChange = (key, value) => {
    setConfigSettings(prev => ({ ...prev, [key]: value }));
    addLog(`Configuration updated: ${key} set to ${value}`);
  };

  const handleJudgingCriteriaChange = (criterion, value) => {
    setConfigSettings(prev => ({
      ...prev,
      judgingCriteria: {
        ...prev.judgingCriteria,
        [criterion]: value,
      },
    }));
    addLog(`Judging criteria updated: ${criterion} set to ${value}`);
  };

  const addLog = (message) => {
    setLogs(prev => [...prev, { timestamp: new Date().toISOString(), message }]);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs defaultValue="challenges">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="ai-judiciary">AI Judiciary</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="challenges">
          <Card>
            <CardHeader>
              <CardTitle>Generate AI Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={challengePrompt}
                onChange={(e) => setChallengePrompt(e.target.value)}
                placeholder="Enter challenge prompt..."
                className="mb-4"
              />
              <Button onClick={handleGenerateChallenge}>Generate Challenge</Button>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Challenge Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={challengeId}
                onChange={(e) => setChallengeId(e.target.value)}
                placeholder="Enter challenge ID"
                className="mb-4"
              />
              <div className="flex space-x-2">
                <Button onClick={handleStartChallenge}>Start Challenge</Button>
                <Button onClick={handleEndChallenge}>End Challenge</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Latest AI Generated Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              {latestChallenge ? (
                <pre>{JSON.stringify(latestChallenge, null, 2)}</pre>
              ) : (
                <p>No challenges generated yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter user ID"
                className="mb-4"
              />
              <Button onClick={handleUpdateSkillProfile}>Update AI Development Skill</Button>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Evaluate Submission</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code submission..."
                className="mb-4"
              />
              <Button onClick={handleEvaluateSubmission}>Evaluate Submission</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>AI Judging Enabled</span>
                  <Switch
                    checked={configSettings.aiJudgingEnabled}
                    onCheckedChange={(checked) => handleConfigChange('aiJudgingEnabled', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Max Participants</span>
                  <Input
                    type="number"
                    value={configSettings.maxParticipants}
                    onChange={(e) => handleConfigChange('maxParticipants', parseInt(e.target.value))}
                    className="w-24"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Challenge Duration (minutes)</span>
                  <Input
                    type="number"
                    value={configSettings.challengeDuration}
                    onChange={(e) => handleConfigChange('challengeDuration', parseInt(e.target.value))}
                    className="w-24"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Default Difficulty</span>
                  <Select
                    value={configSettings.difficultyLevel}
                    onValueChange={(value) => handleConfigChange('difficultyLevel', value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-judiciary">
          <Card>
            <CardHeader>
              <CardTitle>AI Judiciary Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Judge Model</span>
                  <Select
                    value={configSettings.judgeModel}
                    onValueChange={(value) => handleConfigChange('judgeModel', value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="custom-judge">Custom Judge</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Judging Criteria Weights</h3>
                  {Object.entries(configSettings.judgingCriteria).map(([criterion, weight]) => (
                    <div key={criterion} className="mb-2">
                      <label className="block text-sm font-medium text-gray-700">{criterion}</label>
                      <Slider
                        value={[weight * 100]}
                        onValueChange={(value) => handleJudgingCriteriaChange(criterion, value[0] / 100)}
                        max={100}
                        step={1}
                      />
                      <span className="text-sm text-gray-500">{(weight * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span>Auto-grading Enabled</span>
                  <Switch
                    checked={configSettings.autoGrading}
                    onCheckedChange={(checked) => handleConfigChange('autoGrading', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Human Review Threshold</span>
                  <Input
                    type="number"
                    value={configSettings.humanReviewThreshold}
                    onChange={(e) => handleConfigChange('humanReviewThreshold', parseFloat(e.target.value))}
                    className="w-24"
                    min="0"
                    max="1"
                    step="0.01"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="mb-2">
                    <span className="font-mono text-sm text-gray-500">{log.timestamp}</span>
                    <span className="ml-2">{log.message}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;