import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trophy, Medal, User, Search, Star, Award, Target } from 'lucide-react';

const dummyData = [
  { id: 1, username: 'AIChampion', score: 1500, challenges: 25, winRate: '85%', level: 'Expert', badges: 15 },
  { id: 2, username: 'DataNinja', score: 1450, challenges: 23, winRate: '82%', level: 'Advanced', badges: 12 },
  { id: 3, username: 'MLMaster', score: 1400, challenges: 22, winRate: '80%', level: 'Advanced', badges: 11 },
  { id: 4, username: 'NeuralNetGuru', score: 1350, challenges: 20, winRate: '78%', level: 'Intermediate', badges: 9 },
  { id: 5, username: 'DeepLearner', score: 1300, challenges: 18, winRate: '75%', level: 'Intermediate', badges: 8 },
  { id: 6, username: 'AIExplorer', score: 1250, challenges: 17, winRate: '73%', level: 'Intermediate', badges: 7 },
  { id: 7, username: 'TensorFlowPro', score: 1200, challenges: 16, winRate: '70%', level: 'Intermediate', badges: 6 },
  { id: 8, username: 'PyTorchWizard', score: 1150, challenges: 15, winRate: '68%', level: 'Beginner', badges: 5 },
  { id: 9, username: 'AlgoMaster', score: 1100, challenges: 14, winRate: '65%', level: 'Beginner', badges: 4 },
  { id: 10, username: 'DataScientist42', score: 1050, challenges: 13, winRate: '62%', level: 'Beginner', badges: 3 },
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

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'text-purple-600';
      case 'Advanced': return 'text-blue-600';
      case 'Intermediate': return 'text-green-600';
      case 'Beginner': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Global Leaderboard</h1>
        <p className="text-xl text-gray-600 mb-6">Compete with the best AI hackers worldwide!</p>
      </div>
      
      <div className="relative mb-6">
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
          <CardTitle className="text-2xl">Top Performers</CardTitle>
          <CardDescription>See how you stack up against the competition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-center hidden md:table-cell">Level</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Challenges</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Win Rate</TableHead>
                  <TableHead className="text-center hidden lg:table-cell">Badges</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((entry, index) => (
                  <TableRow key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {getRankIcon(index + 1)}
                        <span className="ml-2">{index + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{entry.username}</TableCell>
                    <TableCell className="text-right font-bold">{entry.score}</TableCell>
                    <TableCell className={`text-center hidden md:table-cell ${getLevelColor(entry.level)}`}>
                      {entry.level}
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">
                      <div className="flex items-center justify-end">
                        <Target className="mr-1 h-4 w-4" />
                        {entry.challenges}
                      </div>
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">
                      <div className="flex items-center justify-end">
                        <Star className="mr-1 h-4 w-4 text-yellow-500" />
                        {entry.winRate}
                      </div>
                    </TableCell>
                    <TableCell className="text-center hidden lg:table-cell">
                      <div className="flex items-center justify-center">
                        <Award className="mr-1 h-4 w-4 text-purple-500" />
                        {entry.badges}
                      </div>
                    </TableCell>
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