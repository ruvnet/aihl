import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Trophy, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EnrolledChallenges = () => {
  const [enrolledChallenges, setEnrolledChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  useEffect(() => {
    setEnrolledChallenges([
      {
        id: 1,
        title: '15-Minute AI Chatbot Sprint',
        status: 'In Progress',
        difficulty: 'Hard',
        timeLimit: '15 minutes',
        participants: 120,
        description: 'Build a functional AI chatbot using GPT-3.5 in just 15 minutes.',
      },
      {
        id: 2,
        title: 'Rapid ML Model Deployment',
        status: 'Not Started',
        difficulty: 'Medium',
        timeLimit: '30 minutes',
        participants: 85,
        description: 'Train and deploy a machine learning model for real-time predictions in 30 minutes.',
      },
    ]);
    setCompletedChallenges([
      {
        id: 3,
        title: 'AI-Powered App Prototype',
        completionDate: '2024-02-15',
        difficulty: 'Medium',
        timeLimit: '60 minutes',
        score: 95,
        participants: 200,
        description: 'Created a working prototype of an AI-powered mobile app in 60 minutes.',
      },
      {
        id: 4,
        title: 'Rapid NLP Solution',
        completionDate: '2024-01-20',
        difficulty: 'Hard',
        timeLimit: '45 minutes',
        score: 88,
        participants: 150,
        description: 'Developed a natural language processing solution in 45 minutes.',
      },
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-500';
      case 'Not Started': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const ChallengeCard = ({ challenge, isCompleted }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{challenge.title}</span>
          {!isCompleted && (
            <Badge className={getStatusColor(challenge.status)}>{challenge.status}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center">
            <Badge className={getDifficultyColor(challenge.difficulty)} variant="outline">
              {challenge.difficulty}
            </Badge>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">{challenge.participants} participants</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">Time Limit: {challenge.timeLimit}</span>
          </div>
          {isCompleted ? (
            <div className="flex items-center">
              <Trophy className="w-4 h-4 mr-2" />
              <span className="text-sm">Score: {challenge.score}/100</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              <span className="text-sm">Ready to code!</span>
            </div>
          )}
        </div>
        <Button asChild className="w-full">
          <Link to={`/challenge-management/${challenge.id}`}>
            {isCompleted ? 'View Results' : 'Start Challenge'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My AI Speed Challenges</h1>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Challenges</TabsTrigger>
          <TabsTrigger value="completed">Completed Challenges</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          {enrolledChallenges.length > 0 ? (
            enrolledChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} isCompleted={false} />
            ))
          ) : (
            <p>You are not enrolled in any active AI speed challenges. Join one now!</p>
          )}
        </TabsContent>
        <TabsContent value="completed">
          {completedChallenges.length > 0 ? (
            completedChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} isCompleted={true} />
            ))
          ) : (
            <p>You haven't completed any AI speed challenges yet. Start one to test your rapid development skills!</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnrolledChallenges;