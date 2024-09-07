import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Search } from 'lucide-react';

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

  const handleCreateTeam = () => {
    // TODO: Implement team creation logic
    console.log('Creating team:', { teamName, teamDescription, lookingForMembers });
  };

  const handleJoinTeam = (teamId) => {
    // TODO: Implement team joining logic
    console.log('Joining team with ID:', teamId);
  };

  const filteredTeams = availableTeams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) && team.lookingForMembers
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create or Join a Team</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="join">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="join">Join a Team</TabsTrigger>
            <TabsTrigger value="create">Create a Team</TabsTrigger>
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
                  <Button className="mt-2" onClick={() => handleJoinTeam(team.id)}>Join Team</Button>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="create">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamDescription">Team Description</Label>
                <Input
                  id="teamDescription"
                  value={teamDescription}
                  onChange={(e) => setTeamDescription(e.target.value)}
                  placeholder="Enter team description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamLogo">Team Logo</Label>
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
                <Label htmlFor="lookingForMembers">Looking for members</Label>
              </div>
              <Button onClick={handleCreateTeam} disabled={!teamName || !teamDescription}>
                Create Team
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TeamWizard;