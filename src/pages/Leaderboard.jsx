import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // TODO: Fetch leaderboard data from API
    setLeaderboard([
      { rank: 1, username: 'AIWizard', score: 9850 },
      { rank: 2, username: 'NeuralNinja', score: 9720 },
      { rank: 3, username: 'DeepLearner', score: 9600 },
      { rank: 4, username: 'CodeMaster', score: 9450 },
      { rank: 5, username: 'DataDragon', score: 9300 },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Global Leaderboard</h1>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Username</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map((entry) => (
            <TableRow key={entry.rank}>
              <TableCell className="font-medium">{entry.rank}</TableCell>
              <TableCell>{entry.username}</TableCell>
              <TableCell className="text-right">{entry.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leaderboard;