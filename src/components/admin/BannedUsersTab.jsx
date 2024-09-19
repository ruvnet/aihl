import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import BanUserModal from './modals/BanUserModal';

const BannedUsersTab = () => {
  const [bannedUsers, setBannedUsers] = useState([
    { id: 1, username: 'hacker123', reason: 'Cheating', banStart: '2024-03-01', banEnd: '2024-06-01', proof: 'Screenshot of unauthorized tool usage', ruling: 'First offense, 3-month ban' },
    { id: 2, username: 'spammer456', reason: 'Spam', banStart: '2024-02-15', banEnd: '2024-05-15', proof: 'Multiple reports from users', ruling: 'Repeated offense, 3-month ban' },
  ]);

  const [newBan, setNewBan] = useState({
    username: '',
    reason: '',
    banStart: '',
    banEnd: '',
    proof: '',
    ruling: '',
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [isUnbanModalOpen, setIsUnbanModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBan(prev => ({ ...prev, [name]: value }));
  };

  const handleBanUser = () => {
    setBannedUsers(prev => [...prev, { id: prev.length + 1, ...newBan }]);
    setNewBan({ username: '', reason: '', banStart: '', banEnd: '', proof: '', ruling: '' });
  };

  const handleUnban = (user) => {
    setSelectedUser(user);
    setIsUnbanModalOpen(true);
  };

  const confirmUnban = (reason) => {
    setBannedUsers(prev => prev.filter(user => user.id !== selectedUser.id));
    setIsUnbanModalOpen(false);
    setSelectedUser(null);
    // Here you would typically call an API to update the user's ban status
    console.log(`Unbanned user ${selectedUser.username} for reason: ${reason}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Banned Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Ban Start</TableHead>
              <TableHead>Ban End</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bannedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.reason}</TableCell>
                <TableCell>{user.banStart}</TableCell>
                <TableCell>{user.banEnd}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Details</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ban Details: {user.username}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Proof</Label>
                          <p>{user.proof}</p>
                        </div>
                        <div>
                          <Label>Ruling</Label>
                          <p>{user.ruling}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" className="ml-2" onClick={() => handleUnban(user)}>
                    Unban
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Ban New User</h3>
          <div className="space-y-4">
            <Input
              name="username"
              placeholder="Username"
              value={newBan.username}
              onChange={handleInputChange}
            />
            <Input
              name="reason"
              placeholder="Reason"
              value={newBan.reason}
              onChange={handleInputChange}
            />
            <div className="flex space-x-4">
              <Input
                name="banStart"
                type="date"
                placeholder="Ban Start Date"
                value={newBan.banStart}
                onChange={handleInputChange}
              />
              <Input
                name="banEnd"
                type="date"
                placeholder="Ban End Date"
                value={newBan.banEnd}
                onChange={handleInputChange}
              />
            </div>
            <Textarea
              name="proof"
              placeholder="Proof"
              value={newBan.proof}
              onChange={handleInputChange}
            />
            <Textarea
              name="ruling"
              placeholder="Ruling"
              value={newBan.ruling}
              onChange={handleInputChange}
            />
            <Button onClick={handleBanUser}>Ban User</Button>
          </div>
        </div>
      </CardContent>
      {selectedUser && (
        <BanUserModal
          user={selectedUser}
          isOpen={isUnbanModalOpen}
          onClose={() => setIsUnbanModalOpen(false)}
          onConfirm={confirmUnban}
          isBanning={false}
        />
      )}
    </Card>
  );
};

export default BannedUsersTab;
