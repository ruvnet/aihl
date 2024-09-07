import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, User, Search, Star, Award, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

const soloLeaderboardData = [
  { id: 1, username: 'AIWizard42', score: 15000, challenges: 25, winRate: '85%', level: 'Legendary', badges: 15, avatar: '🧙‍♂️' },
  { id: 2, username: 'NeuralNinja', score: 14500, challenges: 23, winRate: '82%', level: 'Epic', badges: 12, avatar: '🥷' },
  { id: 3, username: 'QuantumQueen', score: 14000, challenges: 22, winRate: '80%', level: 'Epic', badges: 11, avatar: '👑' },
  { id: 4, username: 'CyberSamurai', score: 13500, challenges: 20, winRate: '78%', level: 'Rare', badges: 9, avatar: '⚔️' },
  { id: 5, username: 'DataDruid', score: 13000, challenges: 18, winRate: '75%', level: 'Rare', badges: 8, avatar: '🧝' },
  { id: 6, username: 'RoboRanger', score: 12500, challenges: 17, winRate: '73%', level: 'Rare', badges: 7, avatar: '🤖' },
  { id: 7, username: 'AlgoAlchemist', score: 12000, challenges: 16, winRate: '70%', level: 'Uncommon', badges: 6, avatar: '🧪' },
  { id: 8, username: 'ByteBard', score: 11500, challenges: 15, winRate: '68%', level: 'Uncommon', badges: 5, avatar: '🎭' },
  { id: 9, username: 'PixelPaladin', score: 11000, challenges: 14, winRate: '65%', level: 'Common', badges: 4, avatar: '🛡️' },
  { id: 10, username: 'LogicLancer', score: 10500, challenges: 13, winRate: '62%', level: 'Common', badges: 3, avatar: '🏇' },
  { id: 11, username: 'SyntaxSorcerer', score: 10000, challenges: 12, winRate: '60%', level: 'Common', badges: 2, avatar: '🧙' },
  { id: 12, username: 'BinaryBarbarian', score: 9500, challenges: 11, winRate: '58%', level: 'Novice', badges: 1, avatar: '🪓' },
];

const teamLeaderboardData = [
  { id: 1, teamName: 'Neural Nexus', score: 50000, members: 3, challenges: 50, winRate: '90%', level: 'Mythic', badges: 25, avatar: '🧠' },
  { id: 2, teamName: 'Quantum Quorum', score: 48000, members: 3, challenges: 48, winRate: '88%', level: 'Legendary', badges: 22, avatar: '⚛️' },
  { id: 3, teamName: 'Cyber Centurions', score: 46000, members: 3, challenges: 46, winRate: '86%', level: 'Epic', badges: 20, avatar: '🛡️' },
  { id: 4, teamName: 'Data Dragons', score: 44000, members: 3, challenges: 44, winRate: '84%', level: 'Epic', badges: 18, avatar: '🐉' },
  { id: 5, teamName: 'Algorithm Avatars', score: 42000, members: 3, challenges: 42, winRate: '82%', level: 'Rare', badges: 16, avatar: '🧝‍♀️' },
  { id: 6, teamName: 'Binary Behemoths', score: 40000, members: 3, challenges: 40, winRate: '80%', level: 'Rare', badges: 14, avatar: '🦏' },
  { id: 7, teamName: 'Pixel Pioneers', score: 38000, members: 3, challenges: 38, winRate: '78%', level: 'Uncommon', badges: 12, avatar: '🚀' },
  { id: 8, teamName: 'Logic Legends', score: 36000, members: 3, challenges: 36, winRate: '76%', level: 'Uncommon', badges: 10, avatar: '🏆' },
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('solo');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const data = activeTab === 'solo' ? soloLeaderboardData : teamLeaderboardData;
    const filtered = data.filter(entry =>
      (activeTab === 'solo' ? entry.username : entry.teamName).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  const pageCount = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="text-yellow-500" />;
    if (rank === 2) return <Medal className="text-gray-400" />;
    if (rank === 3) return <Medal className="text-amber-600" />;
    return <User className="text-blue-500" />;
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Mythic': return 'text-purple-600 font-bold';
      case 'Legendary': return 'text-orange-500 font-bold';
      case 'Epic': return 'text-indigo-600 font-semibold';
      case 'Rare': return 'text-blue-600 font-semibold';
      case 'Uncommon': return 'text-green-600';
      case 'Common': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Global Leaderboard</h1>
        <p className="text-xl text-gray-600 mb-6">Compete with the best AI hackers worldwide!</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="solo">Solo Rankings</TabsTrigger>
          <TabsTrigger value="team">Team Rankings</TabsTrigger>
        </TabsList>
        
        <div className="mt-4">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder={`Search ${activeTab === 'solo' ? 'players' : 'teams'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <TabsContent value="solo">
            <LeaderboardTable data={currentData} getRankIcon={getRankIcon} getLevelColor={getLevelColor} isSolo={true} />
          </TabsContent>
          
          <TabsContent value="team">
            <LeaderboardTable data={currentData} getRankIcon={getRankIcon} getLevelColor={getLevelColor} isSolo={false} />
          </TabsContent>
        </div>
      </Tabs>
      
      <div className="flex justify-center mt-4 space-x-2">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="self-center">
          Page {currentPage} of {pageCount}
        </span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
          disabled={currentPage === pageCount}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const LeaderboardTable = ({ data, getRankIcon, getLevelColor, isSolo }) => (
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
              <TableHead>{isSolo ? 'Player' : 'Team'}</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-center">Level</TableHead>
              <TableHead className="text-right">{isSolo ? 'Challenges' : 'Members'}</TableHead>
              <TableHead className="text-right">Win Rate</TableHead>
              <TableHead className="text-center">Badges</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((entry, index) => (
              <TableRow key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {getRankIcon(index + 1)}
                    <span className="ml-2">{index + 1}</span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">
                  <Link to={`/${isSolo ? 'player' : 'team'}/${entry.id}`} className="flex items-center hover:text-blue-500 transition-colors">
                    <span className="mr-2">{entry.avatar}</span>
                    {isSolo ? entry.username : entry.teamName}
                  </Link>
                </TableCell>
                <TableCell className="text-right font-bold">{entry.score.toLocaleString()}</TableCell>
                <TableCell className={`text-center ${getLevelColor(entry.level)}`}>
                  {entry.level}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    {isSolo ? <Target className="mr-1 h-4 w-4" /> : <Users className="mr-1 h-4 w-4" />}
                    {isSolo ? entry.challenges : entry.members}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <Star className="mr-1 h-4 w-4 text-yellow-500" />
                    {entry.winRate}
                  </div>
                </TableCell>
                <TableCell className="text-center">
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
);

export default Leaderboard;