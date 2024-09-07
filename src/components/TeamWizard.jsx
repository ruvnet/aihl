import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Search, Users, BarChart2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TeamWizard = () => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [lookingForMembers, setLookingForMembers] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableTeams, setAvailableTeams] = useState([
    { id: 1, name: 'AI Innovators', members: 3, description: 'Pushing the boundaries of AI', lookingForMembers: true },
    { id: 2, name: 'Data Wizards', members: 2, description: 'Mastering the art of data science', lookingForMembers: true },
    { id: 3, name: 'ML Pioneers', members: 4, description: 'Exploring new frontiers in machine learning', lookingForMembers: false },
  ]);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', role: 'Team Lead' },
    { id: 2, name: 'Jane Smith', role: 'ML Engineer' },
    { id: 3, name: 'Bob Johnson', role: 'Data Scientist' },
  ]);
  const [teamPerformance, setTeamPerformance] = useState([
    { challenge: 'AI Image Recognition', score: 95, rank: 3 },
    { challenge: 'NLP Innovation', score: 88, rank: 7 },
    { challenge: 'Reinforcement Learning', score: 92, rank: 5 },
  ]);

  const handleCreateTeam = () => {
    // TODO: Implement team creation logic
    console.log('Creating team:', { teamName, teamDescription, lookingForMembers });
  };

  const filteredTeams = availableTeams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) && team.lookingForMembers
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Team Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="join">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="join">Join a Team</TabsTrigger>
            <TabsTrigger value="create">Create a Team</TabsTrigger>
            <TabsTrigger value="dashboard">Team Dashboard</TabsTrigger>
          </TabsList>
          <TabsContent value="join">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search teams"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {filteredTeams.map((team) => (
                <Card key={team.id} className="p-4">
                  <h3 className="font-bold">{team.name}</h3>
                  <p className="text-sm text-gray-500">{team.description}</p>
                  <p className="text-sm">Members: {team.members}</p>
                  <Button className="mt-2" asChild>
                    <Link to={`/team-application/${team.id}`}>Apply to Join</Link>
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="create">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="teamName">Team Name</label>
                <Input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="teamDescription">Team Description</label>
                <Textarea
                  id="teamDescription"
                  value={teamDescription}
                  onChange={(e) => setTeamDescription(e.target.value)}
                  placeholder="Enter team description"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="teamLogo">Team Logo</label>
                <Input
                  id="teamLogo"
                  type="file"
                  accept="image/*"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="lookingForMembers"
                  checked={lookingForMembers}
                  onCheckedChange={setLookingForMembers}
                />
                <label htmlFor="lookingForMembers">Looking for members</label>
              </div>
              <Button onClick={handleCreateTeam} disabled={!teamName || !teamDescription}>
                Create Team
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="dashboard">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2" />
                    Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>{member.name}</TableCell>
                          <TableCell>{member.role}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart2 className="mr-2" />
                    Team Performance
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
                      {teamPerformance.map((performance, index) => (
                        <TableRow key={index}>
                          <TableCell>{performance.challenge}</TableCell>
                          <TableCell>{performance.score}</TableCell>
                          <TableCell>{performance.rank}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TeamWizard;