import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const useLocalStorageLeaderboard = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useLocalStorageLeaderboard('leaderboard', [
    { userId: '1', username: 'AIWizard', score: 9850, firstSubmission: '2024-03-01T10:00:00Z', lastSubmission: '2024-03-10T15:30:00Z', githubUsername: 'aiwizard' },
    { userId: '2', username: 'NeuralNinja', score: 9720, firstSubmission: '2024-03-02T11:00:00Z', lastSubmission: '2024-03-11T14:45:00Z', githubUsername: 'neuralninja' },
    { userId: '3', username: 'DeepLearner', score: 9600, firstSubmission: '2024-03-03T09:30:00Z', lastSubmission: '2024-03-12T16:15:00Z', githubUsername: 'deeplearner' },
    { userId: '4', username: 'CodeMaster', score: 9450, firstSubmission: '2024-03-04T13:00:00Z', lastSubmission: '2024-03-13T11:30:00Z', githubUsername: 'codemaster' },
    { userId: '5', username: 'DataDragon', score: 9300, firstSubmission: '2024-03-05T14:30:00Z', lastSubmission: '2024-03-14T10:00:00Z', githubUsername: 'datadragon' },
  ]);

  useEffect(() => {
    // In a real application, you would fetch data from an API here
    // For now, we're using the initial data from localStorage
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
                <TableHead>First Submission</TableHead>
                <TableHead>Last Submission</TableHead>
                <TableHead>GitHub</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLeaderboard.map((entry, index) => (
                <TableRow key={entry.userId}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{entry.username}</TableCell>
                  <TableCell>{entry.score}</TableCell>
                  <TableCell>{new Date(entry.firstSubmission).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(entry.lastSubmission).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <a href={`https://github.com/${entry.githubUsername}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {entry.githubUsername}
                    </a>
                  </TableCell>
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