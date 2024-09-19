import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ChallengesTab = () => {
  const [challenges, setChallenges] = useState([
    { id: 1, title: 'AI Chatbot Challenge', difficulty: 'Medium', startTime: '2024-04-01', endTime: '2024-04-02' },
    { id: 2, title: 'Image Recognition Contest', difficulty: 'Hard', startTime: '2024-05-15', endTime: '2024-05-16' },
  ]);

  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    difficulty: 'Medium',
    startTime: '',
    endTime: '',
    maxParticipants: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChallenge({ ...newChallenge, [name]: value });
  };

  const handleAddChallenge = (e) => {
    e.preventDefault();
    setChallenges([...challenges, { ...newChallenge, id: challenges.length + 1 }]);
    setNewChallenge({
      title: '',
      description: '',
      difficulty: 'Medium',
      startTime: '',
      endTime: '',
      maxParticipants: 0,
    });
  };

  const handleDeleteChallenge = (id) => {
    setChallenges(challenges.filter(challenge => challenge.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddChallenge} className="space-y-4">
            <Input
              name="title"
              placeholder="Challenge Title"
              value={newChallenge.title}
              onChange={handleInputChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Challenge Description"
              value={newChallenge.description}
              onChange={handleInputChange}
              required
            />
            <Select
              name="difficulty"
              value={newChallenge.difficulty}
              onValueChange={(value) => setNewChallenge({ ...newChallenge, difficulty: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
            <Input
              name="startTime"
              type="datetime-local"
              value={newChallenge.startTime}
              onChange={handleInputChange}
              required
            />
            <Input
              name="endTime"
              type="datetime-local"
              value={newChallenge.endTime}
              onChange={handleInputChange}
              required
            />
            <Input
              name="maxParticipants"
              type="number"
              placeholder="Max Participants"
              value={newChallenge.maxParticipants}
              onChange={handleInputChange}
              required
            />
            <Button type="submit">Add Challenge</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {challenges.map((challenge) => (
                <TableRow key={challenge.id}>
                  <TableCell>{challenge.title}</TableCell>
                  <TableCell>{challenge.difficulty}</TableCell>
                  <TableCell>{challenge.startTime}</TableCell>
                  <TableCell>{challenge.endTime}</TableCell>
                  <TableCell>
                    <Button variant="outline" className="mr-2">Edit</Button>
                    <Button variant="destructive" onClick={() => handleDeleteChallenge(challenge.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengesTab;
