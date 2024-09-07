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
        duration: '30 minutes',
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
        duration: '15 minutes',
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
        duration: '60 minutes',
      },
      {
        id: 4,
        title: 'Rapid Computer Vision Challenge',
        difficulty: 'Medium',
        participants: 120,
        description: 'Develop an AI-powered image recognition system in just 45 minutes.',
        icon: '👁️',
        reward: '$8,000',
        sponsor: 'NVIDIA',
        duration: '45 minutes',
      },
      {
        id: 5,
        title: 'AI Ethics Speedrun',
        difficulty: 'Easy',
        participants: 180,
        description: 'Implement ethical AI principles in a working application within 20 minutes.',
        icon: '⚖️',
        reward: '$3,000',
        sponsor: 'IEEE',
        duration: '20 minutes',
      },
      {
        id: 6,
        title: 'Quantum AI Algorithm Sprint',
        difficulty: 'Expert',
        participants: 50,
        description: 'Design and implement a quantum-inspired AI algorithm in 40 minutes.',
        icon: '🔬',
        reward: '$15,000',
        sponsor: 'IBM Quantum',
        duration: '40 minutes',
      },
      {
        id: 7,
        title: 'AI-Powered Game Bot Challenge',
        difficulty: 'Medium',
        participants: 140,
        description: 'Create an AI bot that can play a simple game in just 25 minutes.',
        icon: '🎮',
        reward: '$6,000',
        sponsor: 'Unity Technologies',
        duration: '25 minutes',
      },
      {
        id: 8,
        title: 'Rapid NLP Text Summarizer',
        difficulty: 'Easy',
        participants: 220,
        description: 'Build an AI-powered text summarization tool in 30 minutes.',
        icon: '📝',
        reward: '$4,000',
        sponsor: 'Hugging Face',
        duration: '30 minutes',
      },
      {
        id: 9,
        title: 'AI for Good Hackathon',
        difficulty: 'Medium',
        participants: 250,
        description: 'Develop an AI solution for a social good problem in 50 minutes.',
        icon: '🌍',
        reward: '$5,000 + $5,000 donation',
        sponsor: 'United Nations AI for Good',
        duration: '50 minutes',
      },
      {
        id: 10,
        title: 'Beginner\'s AI Challenge',
        difficulty: 'Beginner',
        participants: 300,
        description: 'Create your first AI model in just 10 minutes! Great for newcomers.',
        icon: '🌱',
        reward: '$1,000 + Mentorship',
        sponsor: 'AI Education Foundation',
        duration: '10 minutes',
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