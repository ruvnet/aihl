import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useChallenges, useAddChallenge, useUpdateChallenge, useDeleteChallenge } from '@/integrations/supabase/hooks/challenges';
import { toast } from 'sonner';
import ChallengeForm from './ChallengeForm';
import ChallengeList from './ChallengeList';

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

      <ChallengeList
        challenges={challenges}
        onEdit={setEditingChallenge}
        onDelete={handleDeleteChallenge}
      />
    </div>
  );
};

export default ChallengesTab;
