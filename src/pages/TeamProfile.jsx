import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Users, Zap, Award, Target, Cpu, GitBranch } from 'lucide-react';
import { Button } from "@/components/ui/button";

const TeamProfile = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    // Simulating API call to fetch team data
    const fetchTeam = async () => {
      // In a real app, you would fetch this data from an API
      const mockTeam = {
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
      setTeam(mockTeam);
    };

    fetchTeam();
  }, [id]);

  if (!team) {
    return <div>Loading...</div>;
  }

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" /> Team Roster
            </CardTitle>
          </CardHeader>
          <CardContent>
            {team.members.map((member) => (
              <div key={member.id} className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{member.avatar}</span>
                <span className="font-semibold">{member.username}</span>
                <span className="text-sm text-muted-foreground">({member.role})</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2" /> Recent Team Challenges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Cpu className="mr-2" /> Team Stats & Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Stats</h3>
              {Object.entries(team.stats).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center mb-1">
                  <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                  <Badge variant="secondary">{value}</Badge>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-semibold mb-2">Achievements</h3>
              {team.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  {achievement.icon}
                  <div>
                    <p className="font-semibold">{achievement.name}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
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

      <div className="flex justify-center space-x-4">
        <Button asChild>
          <Link to="/challenges">Join New Challenge</Link>
        </Button>
        <Button variant="outline">
          Manage Team
        </Button>
      </div>
    </div>
  );
};

export default TeamProfile;