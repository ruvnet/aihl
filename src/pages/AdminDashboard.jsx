import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Trophy, Users, Settings, Gavel, FileText, BarChart2, Home, DollarSign, Activity, Brain } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

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

  // Placeholder data for analytics
  const userGrowthData = [
    { month: 'Jan', users: 1000 },
    { month: 'Feb', users: 1500 },
    { month: 'Mar', users: 2000 },
    { month: 'Apr', users: 2500 },
    { month: 'May', users: 3000 },
  ];

  const challengeCompletionData = [
    { difficulty: 'Easy', completed: 500 },
    { difficulty: 'Medium', completed: 300 },
    { difficulty: 'Hard', completed: 150 },
    { difficulty: 'Expert', completed: 50 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 10000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 20000 },
    { month: 'Apr', revenue: 25000 },
    { month: 'May', revenue: 30000 },
  ];

  const userActivityData = [
    { day: 'Mon', active: 2000 },
    { day: 'Tue', active: 2200 },
    { day: 'Wed', active: 2100 },
    { day: 'Thu', active: 2300 },
    { day: 'Fri', active: 2400 },
    { day: 'Sat', active: 2000 },
    { day: 'Sun', active: 1800 },
  ];

  const skillDistributionData = [
    { name: 'AI', value: 400 },
    { name: 'ML', value: 300 },
    { name: 'Data Science', value: 200 },
    { name: 'NLP', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

      <Tabs defaultValue="home">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="home"><Home className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="challenges"><Trophy className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="users"><Users className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="config"><Settings className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="ai-judiciary"><Gavel className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="logs"><FileText className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="analytics"><BarChart2 className="h-5 w-5" /></TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Admin Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Select a tab to manage different aspects of the AI Hacking League.</p>
            </CardContent>
          </Card>
        </TabsContent>

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

        <TabsContent value="analytics">
          <Tabs defaultValue="user-growth">
            <TabsList>
              <TabsTrigger value="user-growth">User Growth</TabsTrigger>
              <TabsTrigger value="challenge-completion">Challenge Completion</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="user-activity">User Activity</TabsTrigger>
              <TabsTrigger value="skill-distribution">Skill Distribution</TabsTrigger>
            </TabsList>
            <TabsContent value="user-growth">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart width={600} height={300} data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" />
                  </LineChart>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="challenge-completion">
              <Card>
                <CardHeader>
                  <CardTitle>Challenge Completion by Difficulty</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart width={600} height={300} data={challengeCompletionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="difficulty" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#82ca9d" />
                  </BarChart>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="revenue">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart width={600} height={300} data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  </LineChart>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="user-activity">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart width={600} height={300} data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="active" fill="#8884d8" />
                  </BarChart>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="skill-distribution">
              <Card>
                <CardHeader>
                  <CardTitle>User Skill Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={skillDistributionData}
                      cx={200}
                      cy={200}
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {skillDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;