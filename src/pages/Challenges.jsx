import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Zap, Trophy, Clock, Users, Heart, Star, Brain } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('solo');

  useEffect(() => {
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
        type: 'solo',
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
        type: 'solo',
      },
      {
        id: 3,
        title: 'AI for Good: Climate Change Prediction',
        difficulty: 'Medium',
        participants: 200,
        description: 'Develop an AI model to predict climate change impacts using provided datasets.',
        icon: '🌍',
        reward: '$5,000 + $10,000 to charity',
        sponsor: 'GreenTech Foundation',
        duration: '45 minutes',
        type: 'team',
      },
      {
        id: 4,
        title: 'Beginner\'s AI Image Classification',
        difficulty: 'Easy',
        participants: 300,
        description: 'Create a simple image classification model using pre-trained networks.',
        icon: '🖼️',
        reward: '$1,000',
        sponsor: 'AI Learning Initiative',
        duration: '20 minutes',
        type: 'solo',
      },
      {
        id: 5,
        title: 'Advanced NLP: Sentiment Analysis at Scale',
        difficulty: 'Expert',
        participants: 50,
        description: 'Build a highly efficient sentiment analysis model capable of processing millions of text inputs.',
        icon: '📊',
        reward: '$20,000',
        sponsor: 'TechGiant Corp',
        duration: '60 minutes',
        type: 'team',
      },
      {
        id: 6,
        title: 'AI Ethics Challenge: Bias Detection',
        difficulty: 'Hard',
        participants: 120,
        description: 'Develop an AI system to detect and mitigate bias in machine learning models.',
        icon: '⚖️',
        reward: '$15,000',
        sponsor: 'EthicalAI Institute',
        duration: '45 minutes',
        type: 'solo',
      },
    ]);
  }, []);

  const filteredChallenges = challenges.filter(challenge =>
    challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    challenge.type === activeTab
  );

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-500',
      medium: 'bg-yellow-500',
      hard: 'bg-red-500',
      expert: 'bg-purple-500',
    };
    return colors[difficulty.toLowerCase()] || 'bg-gray-500';
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return <Star className="w-4 h-4 mr-1" />;
      case 'medium': return <Zap className="w-4 h-4 mr-1" />;
      case 'hard': return <Trophy className="w-4 h-4 mr-1" />;
      case 'expert': return <Brain className="w-4 h-4 mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          AI Speed Development Arena
        </h1>
        <p className="text-xl text-gray-300">Prove your skills in high-stakes, time-constrained AI challenges!</p>
      </div>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search challenges"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-700">
              <TabsTrigger value="solo" className="text-white data-[state=active]:bg-purple-600">Solo Challenges</TabsTrigger>
              <TabsTrigger value="team" className="text-white data-[state=active]:bg-purple-600">Team Challenges</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredChallenges.map((challenge) => (
          <Card key={challenge.id} className="bg-gray-800 border-gray-700 overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-3xl">{challenge.icon}</span>
                <div className="flex items-center">
                  {getDifficultyIcon(challenge.difficulty)}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)} text-white`}>
                    {challenge.difficulty}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
              <p className="text-gray-400 mb-4">{challenge.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {challenge.duration}</span>
                <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {challenge.participants} enrolled</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-green-400 font-bold flex items-center">
                  {challenge.reward.includes('charity') ? <Heart className="w-5 h-5 mr-1 text-red-500" /> : <Trophy className="w-5 h-5 mr-1" />}
                  {challenge.reward}
                </span>
                <span className="text-purple-400">{challenge.sponsor}</span>
              </div>
              <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                <Link to={`/challenges/${challenge.id}`}>
                  <Zap className="w-4 h-4 mr-2" /> Enter Challenge
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <p className="text-center text-gray-400">No challenges found. Try a different search term or category.</p>
      )}
    </div>
  );
};

export default Challenges;