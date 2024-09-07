import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TeamWizard = () => {
  const [step, setStep] = useState(1);
  const [action, setAction] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [availableTeams, setAvailableTeams] = useState([
    { id: 1, name: 'AI Innovators', members: 3, description: 'Pushing the boundaries of AI' },
    { id: 2, name: 'Data Wizards', members: 2, description: 'Mastering the art of data science' },
    { id: 3, name: 'ML Pioneers', members: 4, description: 'Exploring new frontiers in machine learning' },
  ]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // TODO: Implement team creation or joining logic
    console.log('Action:', action);
    console.log('Team Name:', teamName);
    console.log('Team Description:', teamDescription);
    // Reset form and go back to step 1
    setStep(1);
    setAction('');
    setTeamName('');
    setTeamDescription('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create or Join a Team</CardTitle>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <Label>What would you like to do?</Label>
            <RadioGroup value={action} onValueChange={setAction}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="create" id="create" />
                <Label htmlFor="create">Create a new team</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="join" id="join" />
                <Label htmlFor="join">Join an existing team</Label>
              </div>
            </RadioGroup>
            <Button onClick={handleNext} disabled={!action}>Next</Button>
          </div>
        )}

        {step === 2 && action === 'create' && (
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
            <div className="flex justify-between">
              <Button onClick={handleBack} variant="outline">Back</Button>
              <Button onClick={handleSubmit} disabled={!teamName || !teamDescription}>Create Team</Button>
            </div>
          </div>
        )}

        {step === 2 && action === 'join' && (
          <div className="space-y-4">
            <Label>Available Teams</Label>
            {availableTeams.map((team) => (
              <Card key={team.id} className="p-4">
                <h3 className="font-bold">{team.name}</h3>
                <p className="text-sm text-gray-500">{team.description}</p>
                <p className="text-sm">Members: {team.members}</p>
                <Button className="mt-2" onClick={() => handleSubmit()}>Join Team</Button>
              </Card>
            ))}
            <Button onClick={handleBack} variant="outline">Back</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamWizard;