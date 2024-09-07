import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    // TODO: Fetch challenges from API
    setChallenges([
      { id: 1, title: 'AI Image Recognition', difficulty: 'Medium', participants: 120 },
      { id: 2, title: 'Natural Language Processing', difficulty: 'Hard', participants: 85 },
      { id: 3, title: 'Reinforcement Learning', difficulty: 'Easy', participants: 200 },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Challenges</h1>
      
      {challenges.map((challenge) => (
        <Card key={challenge.id}>
          <CardHeader>
            <CardTitle>{challenge.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p>Difficulty: {challenge.difficulty}</p>
                <p>Participants: {challenge.participants}</p>
              </div>
              <Button asChild>
                <Link to={`/challenges/${challenge.id}`}>View Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Challenges;