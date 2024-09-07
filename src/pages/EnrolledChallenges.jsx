import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const EnrolledChallenges = () => {
  const [enrolledChallenges, setEnrolledChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  useEffect(() => {
    // TODO: Fetch enrolled and completed challenges from API
    setEnrolledChallenges([
      { id: 1, title: 'AI Image Recognition', status: 'In Progress' },
      { id: 2, title: 'Natural Language Processing', status: 'Not Started' },
    ]);
    setCompletedChallenges([
      { id: 3, title: 'Reinforcement Learning', completionDate: '2024-02-15' },
      { id: 4, title: 'Computer Vision Challenge', completionDate: '2024-01-20' },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Challenges</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Enrolled Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          {enrolledChallenges.length > 0 ? (
            <ul className="space-y-2">
              {enrolledChallenges.map((challenge) => (
                <li key={challenge.id} className="flex justify-between items-center">
                  <span>{challenge.title}</span>
                  <div>
                    <span className="mr-2 text-sm text-gray-500">{challenge.status}</span>
                    <Button asChild size="sm">
                      <Link to={`/challenges/${challenge.id}`}>View</Link>
                    </Button>
                  </div>
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
            <ul className="space-y-2">
              {completedChallenges.map((challenge) => (
                <li key={challenge.id} className="flex justify-between items-center">
                  <span>{challenge.title}</span>
                  <div>
                    <span className="mr-2 text-sm text-gray-500">Completed: {challenge.completionDate}</span>
                    <Button asChild size="sm">
                      <Link to={`/challenges/${challenge.id}`}>View</Link>
                    </Button>
                  </div>
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