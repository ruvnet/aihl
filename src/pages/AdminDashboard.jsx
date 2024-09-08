import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAIGeneratedChallenges, useAddAIGeneratedChallenge, useLatestAIGeneratedChallenge } from '@/integrations/supabase/hooks/ai_generated_challenges';
import { useReplays, useAddReplay, useLatestReplay, useGenerateReplayVisualization } from '@/integrations/supabase/hooks/replays';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [challengePrompt, setChallengePrompt] = useState('');
  const [replayData, setReplayData] = useState('');
  const [challengeId, setChallengeId] = useState('');

  const { data: aiChallenges } = useAIGeneratedChallenges();
  const { data: latestChallenge } = useLatestAIGeneratedChallenge();
  const addAIChallenge = useAddAIGeneratedChallenge();
  
  const { data: replays } = useReplays(challengeId);
  const { data: latestReplay } = useLatestReplay(challengeId);
  const addReplay = useAddReplay();
  const generateVisualization = useGenerateReplayVisualization();

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
          <CardTitle>Add Replay</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={challengeId}
            onChange={(e) => setChallengeId(e.target.value)}
            placeholder="Enter challenge ID"
            className="mb-4"
          />
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
          <Input
            value={challengeId}
            onChange={(e) => setChallengeId(e.target.value)}
            placeholder="Enter challenge ID"
            className="mb-4"
          />
          <Button onClick={handleGenerateVisualization}>Generate Visualization</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;