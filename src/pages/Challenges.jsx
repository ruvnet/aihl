import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import ChallengeCard from '../components/ChallengeCard';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulating API fetch with sample data
    setChallenges([
      {
        id: 1,
        title: 'AI Image Recognition',
        difficulty: 'Medium',
        participants: 120,
        description: 'Develop an AI model to accurately recognize and classify images across various categories.',
        icon: '🖼️',
        reward: '$5,000',
        sponsor: 'Google',
      },
      {
        id: 2,
        title: 'Natural Language Processing',
        difficulty: 'Hard',
        participants: 85,
        description: 'Create an advanced NLP system capable of understanding and generating human-like text.',
        icon: '📝',
        reward: '$10,000',
        sponsor: 'Microsoft',
      },
      {
        id: 3,
        title: 'Reinforcement Learning',
        difficulty: 'Easy',
        participants: 200,
        description: 'Implement a reinforcement learning algorithm to train an AI agent to play a simple game.',
        icon: '🎮',
        reward: '$3,000',
        sponsor: 'OpenAI',
      },
    ]);
  }, []);

  const filteredChallenges = challenges.filter(challenge =>
    challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">AI Challenges</h1>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search challenges"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredChallenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <p className="text-center text-gray-500">No challenges found. Try a different search term.</p>
      )}
    </div>
  );
};

export default Challenges;