import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { Calendar, Clock, Trophy, Users } from 'lucide-react';

const EnrolledChallenges = () => {
  const [enrolledChallenges, setEnrolledChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  useEffect(() => {
    // Simulating API fetch with sample data
    setEnrolledChallenges([
      {
        id: 1,
        title: 'AI Image Recognition Challenge',
        status: 'In Progress',
        difficulty: 'Medium',
        dueDate: '2024-04-15',
        participants: 120,
        description: 'Develop an AI model to accurately recognize and classify images across various categories.',
      },
      {
        id: 2,
        title: 'Natural Language Processing Innovation',
        status: 'Not Started',
        difficulty: 'Hard',
        dueDate: '2024-05-01',
        participants: 85,
        description: 'Create an advanced NLP system capable of understanding and generating human-like text.',
      },
    ]);
    setCompletedChallenges([
      {
        id: 3,
        title: 'Reinforcement Learning for Game AI',
        completionDate: '2024-02-15',
        difficulty: 'Easy',
        score: 95,
        participants: 200,
        description: 'Implement a reinforcement learning algorithm to train an AI agent to play a simple game.',
      },
      {
        id: 4,
        title: 'Computer Vision Object Detection',
        completionDate: '2024-01-20',
        difficulty: 'Medium',
        score: 88,
        participants: 150,
        description: 'Develop an object detection system using state-of-the-art computer vision techniques.',
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
          {isCompleted ? (
            <>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">Completed: {challenge.completionDate}</span>
              </div>
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                <span className="text-sm">Score: {challenge.score}/100</span>
              </div>
            </>
          ) : (
            <div className="flex items-center col-span-2">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">Due: {challenge.dueDate}</span>
            </div>
          )}
        </div>
        <Button asChild className="w-full">
          <Link to={`/challenges/${challenge.id}`}>
            {isCompleted ? 'View Results' : 'View Details'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Challenges</h1>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Enrolled Challenges</h2>
        {enrolledChallenges.length > 0 ? (
          enrolledChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} isCompleted={false} />
          ))
        ) : (
          <p>You are not enrolled in any challenges yet.</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Completed Challenges</h2>
        {completedChallenges.length > 0 ? (
          completedChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} isCompleted={true} />
          ))
        ) : (
          <p>You haven't completed any challenges yet.</p>
        )}
      </div>
    </div>
  );
};

export default EnrolledChallenges;