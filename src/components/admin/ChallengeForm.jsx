import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ChallengeForm = ({ challenge, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (challenge) {
      setFormData(challenge);
    }
  }, [challenge]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
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
        <Button type="submit">{challenge ? 'Update' : 'Create'} Challenge</Button>
      </div>
    </form>
  );
};

export default ChallengeForm;
