import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useChallenges, useAddChallenge, useUpdateChallenge, useDeleteChallenge } from '@/integrations/supabase/hooks/challenges';
import { toast } from 'sonner';

const ChallengeForm = ({ challenge, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(challenge || {
    title: '',
    description: '',
    difficulty: 'Medium',
    startTime: '',
    endTime: '',
    maxParticipants: 0,
    buyIn: 0,
    prizePool: 0,
    githubRepoUrl: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="title"
        placeholder="Challenge Title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <Textarea
        name="description"
        placeholder="Challenge Description"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
      <Select
        name="difficulty"
        value={formData.difficulty}
        onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
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
        value={formData.startTime}
        onChange={handleInputChange}
        required
      />
      <Input
        name="endTime"
        type="datetime-local"
        value={formData.endTime}
        onChange={handleInputChange}
        required
      />
      <Input
        name="maxParticipants"
        type="number"
        placeholder="Max Participants"
        value={formData.maxParticipants}
        onChange={handleInputChange}
        required
      />
      <Input
        name="buyIn"
        type="number"
        placeholder="Buy-in Amount"
        value={formData.buyIn}
        onChange={handleInputChange}
        required
      />
      <Input
        name="prizePool"
        type="number"
        placeholder="Prize Pool"
        value={formData.prizePool}
        onChange={handleInputChange}
        required
      />
      <Input
        name="githubRepoUrl"
        placeholder="GitHub Repository URL"
        value={formData.githubRepoUrl}
        onChange={handleInputChange}
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Challenge</Button>
      </div>
    </form>
  );
};

const ChallengesTab = () => {
  const { data: challenges, isLoading, isError } = useChallenges();
  const addChallenge = useAddChallenge();
  const updateChallenge = useUpdateChallenge();
  const deleteChallenge = useDeleteChallenge();
  const [editingChallenge, setEditingChallenge] = useState(null);

  const handleAddChallenge = (newChallenge) => {
    addChallenge.mutate(newChallenge, {
      onSuccess: () => {
        toast.success('Challenge added successfully');
        setEditingChallenge(null);
      },
      onError: (error) => toast.error(`Error adding challenge: ${error.message}`),
    });
  };

  const handleUpdateChallenge = (updatedChallenge) => {
    updateChallenge.mutate(updatedChallenge, {
      onSuccess: () => {
        toast.success('Challenge updated successfully');
        setEditingChallenge(null);
      },
      onError: (error) => toast.error(`Error updating challenge: ${error.message}`),
    });
  };

  const handleDeleteChallenge = (id) => {
    deleteChallenge.mutate(id, {
      onSuccess: () => toast.success('Challenge deleted successfully'),
      onError: (error) => toast.error(`Error deleting challenge: ${error.message}`),
    });
  };

  if (isLoading) return <div>Loading challenges...</div>;
  if (isError) return <div>Error loading challenges</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingChallenge ? 'Edit Challenge' : 'Create New Challenge'}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChallengeForm
            challenge={editingChallenge}
            onSubmit={editingChallenge ? handleUpdateChallenge : handleAddChallenge}
            onCancel={() => setEditingChallenge(null)}
          />
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
                  <TableCell>{new Date(challenge.startTime).toLocaleString()}</TableCell>
                  <TableCell>{new Date(challenge.endTime).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" className="mr-2" onClick={() => setEditingChallenge(challenge)}>Edit</Button>
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
