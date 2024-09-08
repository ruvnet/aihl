import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';

const ChallengesTab = () => {
  const [challengePrompt, setChallengePrompt] = useState('');
  const [challengeId, setChallengeId] = useState('');

  const handleGenerateChallenge = async () => {
    // TODO: Implement challenge generation logic
    toast.success('AI Challenge generated successfully');
  };

  const handleStartChallenge = async () => {
    // TODO: Implement challenge start logic
    toast.success('Challenge started successfully');
  };

  const handleEndChallenge = async () => {
    // TODO: Implement challenge end logic
    toast.success('Challenge ended successfully');
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default ChallengesTab;