import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import ChallengeCard from '../components/ChallengeCard';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulating API fetch with updated sample data
    setChallenges([
      {
        id: 1,
        title: 'Rapid AI Chatbot Development',
        difficulty: 'Medium',
        participants: 150,
        description: 'Build a functional AI chatbot in just 30 minutes using cutting-edge NLP models.',
        icon: '🤖',
        reward: '$7,500',
        sponsor: 'OpenAI',
      },
      {
        id: 2,
        title: '15-Minute ML Model Deployment',
        difficulty: 'Hard',
        participants: 100,
        description: 'Train and deploy a machine learning model for real-time predictions in just 15 minutes.',
        icon: '🚀',
        reward: '$10,000',
        sponsor: 'Google Cloud',
      },
      {
        id: 3,
        title: 'AI-Powered App Prototype',
        difficulty: 'Easy',
        participants: 200,
        description: 'Create a working prototype of an AI-powered mobile app in 60 minutes.',
        icon: '📱',
        reward: '$5,000',
        sponsor: 'Apple',
      },
    ]);
  }, []);

  const filteredChallenges = challenges.filter(challenge =>
    challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">AI Speed Development Challenges</h1>
      
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