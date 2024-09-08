import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAIGeneratedChallenges, useAddAIGeneratedChallenge, useLatestAIGeneratedChallenge } from '@/integrations/supabase/hooks/ai_generated_challenges';
import { useReplays, useAddReplay, useLatestReplay, useGenerateReplayVisualization } from '@/integrations/supabase/hooks/replays';
import { useStartChallenge, useEndChallenge, useUpdateScore } from '@/integrations/supabase/hooks/challenge_management';
import { useEvaluateSubmission } from '@/integrations/supabase/hooks/ai_judging';
import { useAddChatMessage, useLatestChatMessages } from '@/integrations/supabase/hooks/chat_messages';
import { useUpdateSkillProfile } from '@/integrations/supabase/hooks/skill_profiles';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/supabase';

const AdminDashboard = () => {
  const [challengePrompt, setChallengePrompt] = useState('');
  const [replayData, setReplayData] = useState('');
  const [challengeId, setChallengeId] = useState('');
  const [userId, setUserId] = useState('');
  const [code, setCode] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [realTimeMessages, setRealTimeMessages] = useState([]);

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
    } catch (error) {
      toast.error('Failed to generate AI Challenge');
    }
  };

  const handleAddReplay = async () => {
    try {
      const replayObject = JSON.parse(replayData);
      await addReplay.mutateAsync(replayObject);
      toast.success('Replay added successfully');
      setReplayData('');
    } catch (error) {
      toast.error('Failed to add replay');
    }
  };

  const handleGenerateVisualization = async () => {
    try {
      const result = await generateVisualization.mutateAsync(challengeId);
      toast.success('Visualization generated successfully');
      console.log('Visualization result:', result);
    } catch (error) {
      toast.error('Failed to generate visualization');
    }
  };

  const handleStartChallenge = async () => {
    try {
      await startChallenge.mutateAsync(challengeId);
      toast.success('Challenge started successfully');
    } catch (error) {
      toast.error('Failed to start challenge');
    }
  };

  const handleEndChallenge = async () => {
    try {
      await endChallenge.mutateAsync(challengeId);
      toast.success('Challenge ended successfully');
    } catch (error) {
      toast.error('Failed to end challenge');
    }
  };

  const handleUpdateScore = async () => {
    try {
      await updateScore.mutateAsync({ challengeId, userId, score: 100 });
      toast.success('Score updated successfully');
    } catch (error) {
      toast.error('Failed to update score');
    }
  };

  const handleEvaluateSubmission = async () => {
    try {
      const result = await evaluateSubmission.mutateAsync({ challengeId, userId, code });
      toast.success('Submission evaluated successfully');
      console.log('Evaluation result:', result);
    } catch (error) {
      toast.error('Failed to evaluate submission');
    }
  };

  const handleAddChatMessage = async () => {
    try {
      await addChatMessage.mutateAsync({ challengeId, userId, message: chatMessage });
      toast.success('Chat message added successfully');
      setChatMessage('');
    } catch (error) {
      toast.error('Failed to add chat message');
    }
  };

  const handleUpdateSkillProfile = async () => {
    try {
      await updateSkillProfile.mutateAsync({ userId, skillName: 'AI Development', skillLevel: 'Advanced' });
      toast.success('Skill profile updated successfully');
    } catch (error) {
      toast.error('Failed to update skill profile');
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

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

      <Card>
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

      <Card>
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

      <Card>
        <CardHeader>
          <CardTitle>Update Score</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            className="mb-4"
          />
          <Button onClick={handleUpdateScore}>Update Score</Button>
        </CardContent>
      </Card>

      <Card>
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

      <Card>
        <CardHeader>
          <CardTitle>Chat System</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Enter chat message"
            className="mb-4"
          />
          <Button onClick={handleAddChatMessage}>Send Message</Button>
          <div className="mt-4">
            <h3 className="font-bold mb-2">Latest Messages:</h3>
            {latestChatMessages && latestChatMessages.map((msg, index) => (
              <p key={index}>{msg.userId}: {msg.message}</p>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="font-bold mb-2">Real-time Messages:</h3>
            {realTimeMessages.map((msg, index) => (
              <p key={index}>{msg.user_id}: {msg.message}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update Skill Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleUpdateSkillProfile}>Update AI Development Skill</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Replay</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={replayData}
            onChange={(e) => setReplayData(e.target.value)}
            placeholder="Enter replay data (JSON format)..."
            className="mb-4"
          />
          <Button onClick={handleAddReplay}>Add Replay</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Latest Replay</CardTitle>
        </CardHeader>
        <CardContent>
          {latestReplay ? (
            <pre>{JSON.stringify(latestReplay, null, 2)}</pre>
          ) : (
            <p>No replays available for this challenge.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generate Replay Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGenerateVisualization}>Generate Visualization</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;