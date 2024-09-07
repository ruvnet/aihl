import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Users, Zap, Award, Target, Cpu, GitBranch } from 'lucide-react';
import { Button } from "@/components/ui/button";

const TeamProfile = () => {
  const { id } = useParams();

  // Mock data for the team profile
  const team = {
    id,
    name: 'Quantum Quorum',
    avatar: '⚛️',
    level: 'Legendary',
    xp: 50000,
    nextLevelXp: 75000,
    rank: 2,
    winRate: '88%',
    members: [
      { id: 1, username: 'QuantumQueen', role: 'Team Lead', avatar: '👑' },
      { id: 2, username: 'NeuralNinja', role: 'AI Specialist', avatar: '🥷' },
      { id: 3, username: 'ByteBard', role: 'Full-Stack Dev', avatar: '🎭' },
    ],
    recentChallenges: [
      { name: 'AI Singularity Sprint', score: 98, rank: 1 },
      { name: 'Quantum Entanglement Enigma', score: 95, rank: 2 },
      { name: 'Neural Network Nexus', score: 97, rank: 1 },
    ],
    stats: {
      totalChallenges: 75,
      averageScore: 94,
      highestStreak: 12,
    },
    achievements: [
      { name: 'Dream Team', description: 'Won 5 challenges in a row', icon: <Trophy className="h-6 w-6 text-yellow-500" /> },
      { name: 'Synergy Surge', description: 'Achieved perfect teamwork score', icon: <Zap className="h-6 w-6 text-blue-500" /> },
      { name: 'Quantum Leap', description: 'Completed the hardest challenge in record time', icon: <Award className="h-6 w-6 text-purple-500" /> },
    ],
    specializations: ['Quantum Computing', 'Neural Networks', 'Ethical AI'],
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{team.avatar}</span>
            <div>
              <CardTitle className="text-3xl">{team.name}</CardTitle>
              <p className="text-xl">Level {team.level} AI Collective</p>
            </div>
          </div>
          <Badge className="text-xl px-3 py-1 bg-yellow-500 text-black">Rank #{team.rank}</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mt-4">
            <div className="space-y-1">
              <p className="text-sm">Team XP: {team.xp} / {team.nextLevelXp}</p>
              <Progress value={(team.xp / team.nextLevelXp) * 100} className="w-64" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{team.winRate}</p>
              <p className="text-sm">Win Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2" /> Team Roster
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {team.members.map((member) => (
              <Card key={member.id}>
                <CardContent className="flex items-center space-x-4 py-4">
                  <span className="text-2xl">{member.avatar}</span>
                  <div>
                    <p className="font-semibold">{member.username}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2" /> Recent Team Challenges
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
                {team.recentChallenges.map((challenge, index) => (
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
              <Cpu className="mr-2" /> Team Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Challenges</span>
              <Badge variant="secondary">{team.stats.totalChallenges}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Average Score</span>
              <Badge variant="secondary">{team.stats.averageScore}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Highest Streak</span>
              <Badge variant="secondary">{team.stats.highestStreak}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2" /> Team Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {team.achievements.map((achievement, index) => (
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
            <Target className="mr-2" /> Team Specializations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {team.specializations.map((spec, index) => (
              <Badge key={index} variant="outline" className="text-lg px-3 py-1">
                {spec}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GitBranch className="mr-2" /> Team Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center space-x-4">
          <Button asChild>
            <Link to="/challenges">Join New Challenge</Link>
          </Button>
          <Button variant="outline">
            Manage Team
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamProfile;