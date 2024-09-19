import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const BanUserModal = ({ user, onClose, isBanning = true }) => {
  const [banReason, setBanReason] = useState('');
  const [banDuration, setBanDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement ban/unban logic here
    console.log(isBanning ? 'Banning user:' : 'Unbanning user:', user);
    console.log('Reason:', banReason);
    console.log('Duration:', banDuration);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isBanning ? 'Ban User' : 'Unban User'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label>User</Label>
              <p className="mt-1 text-sm text-gray-600">{user.username}</p>
            </div>
            {isBanning && (
              <div>
                <Label htmlFor="duration">Ban Duration (in days)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={banDuration}
                  onChange={(e) => setBanDuration(e.target.value)}
                  placeholder="Enter number of days"
                />
              </div>
            )}
            <div>
              <Label htmlFor="reason">{isBanning ? 'Ban' : 'Unban'} Reason</Label>
              <Textarea
                id="reason"
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                placeholder={`Reason for ${isBanning ? 'banning' : 'unbanning'} the user...`}
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{isBanning ? 'Ban User' : 'Unban User'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BanUserModal;