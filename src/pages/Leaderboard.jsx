import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trophy, Medal, User, Search } from 'lucide-react';

const dummyData = [
  { id: 1, username: 'AIChampion', score: 1500, challenges: 25, winRate: '85%' },
  { id: 2, username: 'DataNinja', score: 1450, challenges: 23, winRate: '82%' },
  { id: 3, username: 'MLMaster', score: 1400, challenges: 22, winRate: '80%' },
  { id: 4, username: 'NeuralNetGuru', score: 1350, challenges: 20, winRate: '78%' },
  { id: 5, username: 'DeepLearner', score: 1300, challenges: 18, winRate: '75%' },
  { id: 6, username: 'AIExplorer', score: 1250, challenges: 17, winRate: '73%' },
  { id: 7, username: 'TensorFlowPro', score: 1200, challenges: 16, winRate: '70%' },
  { id: 8, username: 'PyTorchWizard', score: 1150, challenges: 15, winRate: '68%' },
  { id: 9, username: 'AlgoMaster', score: 1100, challenges: 14, winRate: '65%' },
  { id: 10, username: 'DataScientist42', score: 1050, challenges: 13, winRate: '62%' },
];

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState(dummyData);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = dummyData.filter(entry =>
      entry.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setLeaderboardData(filteredData);
  }, [searchTerm]);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="text-yellow-500" />;
    if (rank === 2) return <Medal className="text-gray-400" />;
    if (rank === 3) return <Medal className="text-amber-600" />;
    return <User className="text-blue-500" />;
  };

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Global Leaderboard</h1>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Challenges</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Win Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((entry, index) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {getRankIcon(index + 1)}
                        <span className="ml-2">{index + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell>{entry.username}</TableCell>
                    <TableCell className="text-right">{entry.score}</TableCell>
                    <TableCell className="text-right hidden md:table-cell">{entry.challenges}</TableCell>
                    <TableCell className="text-right hidden md:table-cell">{entry.winRate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;