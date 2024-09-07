import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Search, Users, BarChart2, Trophy, Zap, Sword, Shield } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const TeamWizard = () => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [lookingForMembers, setLookingForMembers] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableTeams, setAvailableTeams] = useState([
    { id: 1, name: 'AI Innovators', members: 3, description: 'Pushing the boundaries of AI', lookingForMembers: true, winnings: 25000, rank: 5 },
    { id: 2, name: 'Data Wizards', members: 2, description: 'Mastering the art of data science', lookingForMembers: true, winnings: 18000, rank: 12 },
    { id: 3, name: 'ML Pioneers', members: 4, description: 'Exploring new frontiers in machine learning', lookingForMembers: false, winnings: 32000, rank: 3 },
  ]);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', role: 'Team Lead', avatar: '🧙‍♂️' },
    { id: 2, name: 'Jane Smith', role: 'ML Engineer', avatar: '🦹‍♀️' },
    { id: 3, name: 'Bob Johnson', role: 'Data Scientist', avatar: '🧠' },
  ]);
  const [teamPerformance, setTeamPerformance] = useState([
    { challenge: 'AI Image Recognition', score: 95, rank: 3, prize: 5000 },
    { challenge: 'NLP Innovation', score: 88, rank: 7, prize: 2000 },
    { challenge: 'Reinforcement Learning', score: 92, rank: 5, prize: 3000 },
  ]);

  const handleCreateTeam = () => {
    console.log('Creating squad:', { teamName, teamDescription, lookingForMembers });
  };

  const filteredTeams = availableTeams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) && team.lookingForMembers
  );

  const totalWinnings = teamPerformance.reduce((sum, challenge) => sum + challenge.prize, 0);

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-purple-900 text-white shadow-neon">
      <CardHeader>
        <CardTitle className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          AI Hacker Squad HQ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="join" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="join" className="text-white">Join</TabsTrigger>
            <TabsTrigger value="create" className="text-white">Create</TabsTrigger>
            <TabsTrigger value="dashboard" className="text-white">Stats</TabsTrigger>
          </TabsList>
          <TabsContent value="join">
            <JoinTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredTeams={filteredTeams} />
          </TabsContent>
          <TabsContent value="create">
            <CreateTab
              teamName={teamName}
              setTeamName={setTeamName}
              teamDescription={teamDescription}
              setTeamDescription={setTeamDescription}
              lookingForMembers={lookingForMembers}
              setLookingForMembers={setLookingForMembers}
              handleCreateTeam={handleCreateTeam}
            />
          </TabsContent>
          <TabsContent value="dashboard">
            <DashboardTab teamMembers={teamMembers} teamPerformance={teamPerformance} totalWinnings={totalWinnings} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const JoinTab = ({ searchTerm, setSearchTerm, filteredTeams }) => (
  <div className="space-y-4">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder="Search squads"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 bg-gray-800 text-white border-gray-700"
      />
    </div>
    {filteredTeams.map((team) => (
      <Card key={team.id} className="bg-gray-800 border-purple-500 hover:border-pink-500 transition-colors">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-purple-400">{team.name}</h3>
            <Badge className="bg-yellow-500 text-black">Rank #{team.rank}</Badge>
          </div>
          <p className="text-sm text-gray-300 mb-2">{team.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
            <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {team.members} members</span>
            <span className="flex items-center"><Trophy className="w-4 h-4 mr-1" /> ${team.winnings.toLocaleString()} won</span>
          </div>
          <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Link to={`/team-application/${team.id}`}>
              <Zap className="w-4 h-4 mr-2" /> Apply to Join
            </Link>
          </Button>
        </CardContent>
      </Card>
    ))}
  </div>
);

const CreateTab = ({ teamName, setTeamName, teamDescription, setTeamDescription, lookingForMembers, setLookingForMembers, handleCreateTeam }) => (
  <div className="space-y-4">
    <Input
      value={teamName}
      onChange={(e) => setTeamName(e.target.value)}
      placeholder="Enter squad name"
      className="bg-gray-800 text-white border-gray-700"
    />
    <Textarea
      value={teamDescription}
      onChange={(e) => setTeamDescription(e.target.value)}
      placeholder="Describe your squad's mission"
      className="bg-gray-800 text-white border-gray-700"
    />
    <Input
      type="file"
      accept="image/*"
      className="bg-gray-800 text-white border-gray-700"
    />
    <div className="flex items-center space-x-2">
      <Switch
        checked={lookingForMembers}
        onCheckedChange={setLookingForMembers}
      />
      <label className="text-purple-300">Recruiting new members</label>
    </div>
    <Button onClick={handleCreateTeam} disabled={!teamName || !teamDescription} className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
      <Sword className="w-4 h-4 mr-2" /> Forge Squad
    </Button>
  </div>
);

const DashboardTab = ({ teamMembers, teamPerformance, totalWinnings }) => (
  <div className="space-y-6">
    <Card className="bg-gray-800 border-purple-500">
      <CardHeader>
        <CardTitle className="flex items-center text-purple-400">
          <Users className="mr-2" /> Squad Roster
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-purple-300">Hacker</TableHead>
              <TableHead className="text-purple-300">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  <span className="mr-2">{member.avatar}</span>
                  {member.name}
                </TableCell>
                <TableCell>{member.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    <Card className="bg-gray-800 border-purple-500">
      <CardHeader>
        <CardTitle className="flex items-center text-purple-400">
          <BarChart2 className="mr-2" /> Squad Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-purple-300">Challenge</TableHead>
              <TableHead className="text-purple-300">Score</TableHead>
              <TableHead className="text-purple-300">Rank</TableHead>
              <TableHead className="text-purple-300">Prize</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamPerformance.map((performance, index) => (
              <TableRow key={index}>
                <TableCell>{performance.challenge}</TableCell>
                <TableCell>{performance.score}</TableCell>
                <TableCell>#{performance.rank}</TableCell>
                <TableCell>${performance.prize.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right">
          <p className="text-xl font-bold text-green-400">Total Winnings: ${totalWinnings.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default TeamWizard;