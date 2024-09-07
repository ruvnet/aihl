import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Star, Zap, Award, Target, Cpu } from 'lucide-react';

const SoloProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Simulating API call to fetch profile data
    const fetchProfile = async () => {
      // In a real app, you would fetch this data from an API
      const mockProfile = {
        id,
        username: 'NeuralNinja42',
        avatar: '🥷',
        level: 'Epic',
        xp: 15000,
        nextLevelXp: 20000,
        rank: 2,
        winRate: '82%',
        badges: ['AI Mastermind', 'Speed Demon', 'Code Samurai'],
        recentChallenges: [
          { name: 'Quantum Quandary', score: 95, rank: 1 },
          { name: 'Neural Network Nemesis', score: 88, rank: 3 },
          { name: 'Algorithmic Avalanche', score: 92, rank: 2 },
        ],
        stats: {
          totalChallenges: 42,
          averageScore: 90,
          highestStreak: 7,
        },
        achievements: [
          { name: 'First Blood', description: 'Won your first challenge', icon: <Trophy className="h-6 w-6 text-yellow-500" /> },
          { name: 'Unstoppable', description: 'Completed 10 challenges in a row', icon: <Zap className="h-6 w-6 text-blue-500" /> },
          { name: 'AI Virtuoso', description: 'Achieved a perfect score in a Hard challenge', icon: <Star className="h-6 w-6 text-purple-500" /> },
        ],
      };
      setProfile(mockProfile);
    };

    fetchProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{profile.avatar}</span>
            <div>
              <CardTitle className="text-3xl">{profile.username}</CardTitle>
              <p className="text-xl">Level {profile.level} AI Hacker</p>
            </div>
          </div>
          <Badge className="text-xl px-3 py-1 bg-yellow-500 text-black">Rank #{profile.rank}</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mt-4">
            <div className="space-y-1">
              <p className="text-sm">XP: {profile.xp} / {profile.nextLevelXp}</p>
              <Progress value={(profile.xp / profile.nextLevelXp) * 100} className="w-64" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{profile.winRate}</p>
              <p className="text-sm">Win Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2" /> Recent Challenges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Challenge</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Rank</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profile.recentChallenges.map((challenge, index) => (
                  <TableRow key={index}>
                    <TableCell>{challenge.name}</TableCell>
                    <TableCell>{challenge.score}</TableCell>
                    <TableCell>#{challenge.rank}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cpu className="mr-2" /> Hacker Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Challenges</span>
              <Badge variant="secondary">{profile.stats.totalChallenges}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Average Score</span>
              <Badge variant="secondary">{profile.stats.averageScore}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Highest Streak</span>
              <Badge variant="secondary">{profile.stats.highestStreak}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2" /> Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profile.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-2 bg-secondary p-3 rounded-lg">
                {achievement.icon}
                <div>
                  <p className="font-semibold">{achievement.name}</p>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2" /> Skill Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.badges.map((badge, index) => (
              <Badge key={index} variant="outline" className="text-lg px-3 py-1">
                {badge}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SoloProfile;