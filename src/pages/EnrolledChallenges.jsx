import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const EnrolledChallenges = () => {
  const [enrolledChallenges, setEnrolledChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  useEffect(() => {
    // TODO: Fetch enrolled and completed challenges from API
    setEnrolledChallenges([
      { id: 1, title: 'AI Image Recognition', status: 'In Progress', difficulty: 'Medium', dueDate: '2024-04-15' },
      { id: 2, title: 'Natural Language Processing', status: 'Not Started', difficulty: 'Hard', dueDate: '2024-05-01' },
    ]);
    setCompletedChallenges([
      { id: 3, title: 'Reinforcement Learning', completionDate: '2024-02-15', difficulty: 'Easy', score: 95 },
      { id: 4, title: 'Computer Vision Challenge', completionDate: '2024-01-20', difficulty: 'Medium', score: 88 },
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Challenges</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Enrolled Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          {enrolledChallenges.length > 0 ? (
            <ul className="space-y-4">
              {enrolledChallenges.map((challenge) => (
                <li key={challenge.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{challenge.title}</h3>
                      <div className="flex space-x-2 mt-1">
                        <Badge className={getStatusColor(challenge.status)}>{challenge.status}</Badge>
                        <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                      </div>
                    </div>
                    <Button asChild size="sm">
                      <Link to={`/challenges/${challenge.id}`}>View Details</Link>
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">Due Date: {challenge.dueDate}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>You are not enrolled in any challenges yet.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          {completedChallenges.length > 0 ? (
            <ul className="space-y-4">
              {completedChallenges.map((challenge) => (
                <li key={challenge.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{challenge.title}</h3>
                      <div className="flex space-x-2 mt-1">
                        <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                        <Badge className="bg-green-500">Completed</Badge>
                      </div>
                    </div>
                    <Button asChild size="sm">
                      <Link to={`/challenges/${challenge.id}`}>View Results</Link>
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">Completed: {challenge.completionDate}</p>
                  <p className="text-sm text-gray-600">Score: {challenge.score}/100</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven't completed any challenges yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrolledChallenges;