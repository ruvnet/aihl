import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ChallengeList = ({ challenges, onEdit, onDelete }) => {
  return (
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
              <Button variant="outline" className="mr-2" onClick={() => onEdit(challenge)}>Edit</Button>
              <Button variant="destructive" onClick={() => onDelete(challenge.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ChallengeList;
