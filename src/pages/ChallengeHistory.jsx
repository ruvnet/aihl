import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const ChallengeHistory = () => {
  const [challengeHistory, setChallengeHistory] = useState([]);

  useEffect(() => {
    // TODO: Fetch challenge history from API
    setChallengeHistory([
      {
        id: 1,
        title: 'AI Image Recognition Challenge',
        completionDate: '2024-02-15',
        score: 95,
        difficulty: 'Medium',
        rank: 3,
      },
      {
        id: 2,
        title: 'Natural Language Processing Innovation',
        completionDate: '2024-01-20',
        score: 88,
        difficulty: 'Hard',
        rank: 7,
      },
      {
        id: 3,
        title: 'Reinforcement Learning for Game AI',
        completionDate: '2023-12-10',
        score: 92,
        difficulty: 'Easy',
        rank: 1,
      },
    ]);
  }, []);

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
      <h1 className="text-3xl font-bold">Challenge History</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Past Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Challenge</TableHead>
                <TableHead>Completion Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Rank</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {challengeHistory.map((challenge) => (
                <TableRow key={challenge.id}>
                  <TableCell>
                    <Link to={`/challenges/${challenge.id}`} className="text-blue-500 hover:underline">
                      {challenge.title}
                    </Link>
                  </TableCell>
                  <TableCell>{challenge.completionDate}</TableCell>
                  <TableCell>{challenge.score}/100</TableCell>
                  <TableCell>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>{challenge.rank}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengeHistory;