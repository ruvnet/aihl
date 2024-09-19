import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAddChallenge, useUpdateChallenge, useDeleteChallenge, useChallenges } from '@/integrations/supabase/hooks/challenges';
import { toast } from 'sonner';

const ChallengesTab = () => {
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    difficulty: 'Medium',
    start_time: '',
    end_time: '',
    max_participants: 0,
  });
  const [editingChallenge, setEditingChallenge] = useState(null);

  const { data: challenges, isLoading, isError } = useChallenges();
  const addChallengeMutation = useAddChallenge();
  const updateChallengeMutation = useUpdateChallenge();
  const deleteChallengeMutation = useDeleteChallenge();

  const handleInputChange = (e, challengeState, setterFunction) => {
    const { name, value } = e.target;
    setterFunction({ ...challengeState, [name]: value });
  };

  const handleAddChallenge = async (e) => {
    e.preventDefault();
    try {
      await addChallengeMutation.mutateAsync(newChallenge);
      setNewChallenge({
        title: '',
        description: '',
        difficulty: 'Medium',
        start_time: '',
        end_time: '',
        max_participants: 0,
      });
      toast.success('Challenge added successfully');
    } catch (error) {
      toast.error('Failed to add challenge');
    }
  };

  const handleUpdateChallenge = async (e) => {
    e.preventDefault();
    try {
      await updateChallengeMutation.mutateAsync(editingChallenge);
      setEditingChallenge(null);
      toast.success('Challenge updated successfully');
    } catch (error) {
      toast.error('Failed to update challenge');
    }
  };

  const handleDeleteChallenge = async (id) => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      try {
        await deleteChallengeMutation.mutateAsync(id);
        toast.success('Challenge deleted successfully');
      } catch (error) {
        toast.error('Failed to delete challenge');
      }
    }
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
          <form onSubmit={editingChallenge ? handleUpdateChallenge : handleAddChallenge} className="space-y-4">
            <Input
              name="title"
              placeholder="Challenge Title"
              value={editingChallenge ? editingChallenge.title : newChallenge.title}
              onChange={(e) => handleInputChange(e, editingChallenge || newChallenge, editingChallenge ? setEditingChallenge : setNewChallenge)}
              required
            />
            <Textarea
              name="description"
              placeholder="Challenge Description"
              value={editingChallenge ? editingChallenge.description : newChallenge.description}
              onChange={(e) => handleInputChange(e, editingChallenge || newChallenge, editingChallenge ? setEditingChallenge : setNewChallenge)}
              required
            />
            <Select
              name="difficulty"
              value={editingChallenge ? editingChallenge.difficulty : newChallenge.difficulty}
              onValueChange={(value) => handleInputChange({ target: { name: 'difficulty', value } }, editingChallenge || newChallenge, editingChallenge ? setEditingChallenge : setNewChallenge)}
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
              name="start_time"
              type="datetime-local"
              value={editingChallenge ? editingChallenge.start_time : newChallenge.start_time}
              onChange={(e) => handleInputChange(e, editingChallenge || newChallenge, editingChallenge ? setEditingChallenge : setNewChallenge)}
              required
            />
            <Input
              name="end_time"
              type="datetime-local"
              value={editingChallenge ? editingChallenge.end_time : newChallenge.end_time}
              onChange={(e) => handleInputChange(e, editingChallenge || newChallenge, editingChallenge ? setEditingChallenge : setNewChallenge)}
              required
            />
            <Input
              name="max_participants"
              type="number"
              placeholder="Max Participants"
              value={editingChallenge ? editingChallenge.max_participants : newChallenge.max_participants}
              onChange={(e) => handleInputChange(e, editingChallenge || newChallenge, editingChallenge ? setEditingChallenge : setNewChallenge)}
              required
            />
            <Button type="submit">{editingChallenge ? 'Update Challenge' : 'Add Challenge'}</Button>
            {editingChallenge && (
              <Button type="button" variant="outline" onClick={() => setEditingChallenge(null)}>Cancel Edit</Button>
            )}
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
                <TableHead>Max Participants</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {challenges.map((challenge) => (
                <TableRow key={challenge.id}>
                  <TableCell>{challenge.title}</TableCell>
                  <TableCell>{challenge.difficulty}</TableCell>
                  <TableCell>{new Date(challenge.start_time).toLocaleString()}</TableCell>
                  <TableCell>{new Date(challenge.end_time).toLocaleString()}</TableCell>
                  <TableCell>{challenge.max_participants}</TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => setEditingChallenge(challenge)} className="mr-2">Edit</Button>
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
