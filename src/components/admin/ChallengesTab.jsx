import React, { useState } from 'react';
import { toast } from 'sonner';
import ChallengeForm from './ChallengeForm';
import ChallengeList from './ChallengeList';

const ChallengesTab = () => {
  const [challenges, setChallenges] = useState([
    {
      id: '1',
      title: 'AI Image Generation Challenge',
      description: 'Create an AI model to generate realistic images from text descriptions.',
      difficulty: 'Hard',
      startTime: '2024-04-01T10:00:00Z',
      endTime: '2024-04-01T14:00:00Z',
      maxParticipants: 100,
      buyIn: 50,
      prizePool: 5000,
      githubRepoUrl: 'https://github.com/example/ai-image-challenge'
    },
    {
      id: '2',
      title: 'Natural Language Processing Hackathon',
      description: 'Develop an NLP model for sentiment analysis on social media data.',
      difficulty: 'Medium',
      startTime: '2024-05-15T09:00:00Z',
      endTime: '2024-05-15T17:00:00Z',
      maxParticipants: 150,
      buyIn: 25,
      prizePool: 3000,
      githubRepoUrl: 'https://github.com/example/nlp-hackathon'
    }
  ]);
  const [editingChallenge, setEditingChallenge] = useState(null);

  const handleAddChallenge = (newChallenge) => {
    setChallenges([...challenges, { ...newChallenge, id: Date.now().toString() }]);
    toast.success('Challenge added successfully');
  };

  const handleUpdateChallenge = (updatedChallenge) => {
    setChallenges(challenges.map(c => c.id === updatedChallenge.id ? updatedChallenge : c));
    setEditingChallenge(null);
    toast.success('Challenge updated successfully');
  };

  const handleDeleteChallenge = (id) => {
    setChallenges(challenges.filter(c => c.id !== id));
    toast.success('Challenge deleted successfully');
  };

  return (
    <div className="space-y-6">
      <ChallengeForm
        challenge={editingChallenge}
        onSubmit={editingChallenge ? handleUpdateChallenge : handleAddChallenge}
        onCancel={() => setEditingChallenge(null)}
      />
      <ChallengeList
        challenges={challenges}
        onEdit={setEditingChallenge}
        onDelete={handleDeleteChallenge}
      />
    </div>
  );
};

export default ChallengesTab;
