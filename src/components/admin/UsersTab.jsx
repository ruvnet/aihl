import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from 'sonner';

const UsersTab = () => {
  const [userId, setUserId] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [users, setUsers] = useState([
    { id: 1, username: 'user1', email: 'user1@example.com', activity: 'Active', contributions: 5 },
    { id: 2, username: 'user2', email: 'user2@example.com', activity: 'Inactive', contributions: 2 },
  ]);

  const handleUpdateUsername = async () => {
    // TODO: Implement username update logic
    toast.success('Username updated successfully');
  };

  const handleViewUserActivity = (userId) => {
    // TODO: Implement view user activity logic
    toast.info(`Viewing activity for user ${userId}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Update Username</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
            />
            <Input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="New username"
            />
            <Button onClick={handleUpdateUsername}>Update</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Contributions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.activity}</TableCell>
                  <TableCell>{user.contributions}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleViewUserActivity(user.id)}>View Activity</Button>
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

export default UsersTab;
