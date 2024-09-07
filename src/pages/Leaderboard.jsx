import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RealtimeLeaderboard } from 'realtime-leaderboard';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const leaderboard = new RealtimeLeaderboard({
      apiKey: 'your-api-key', // Replace with your actual API key
      leaderboardId: 'global-leaderboard',
    });

    const unsubscribe = leaderboard.subscribe((data) => {
      setLeaderboardData(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const sortedLeaderboard = [...leaderboardData].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Global Leaderboard</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLeaderboard.map((entry, index) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{entry.username}</TableCell>
                  <TableCell>{entry.score}</TableCell>
                  <TableCell>{new Date(entry.updatedAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;