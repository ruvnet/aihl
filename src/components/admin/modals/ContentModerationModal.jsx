import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ContentModerationModal = ({ content, onClose }) => {
  const [moderationAction, setModerationAction] = useState('');
  const [moderationNote, setModerationNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement content moderation logic here
    console.log('Moderation action:', moderationAction);
    console.log('Moderation note:', moderationNote);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Moderate Content</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label>Content to Moderate</Label>
              <p className="mt-1 text-sm text-gray-600">{content}</p>
            </div>
            <div>
              <Label htmlFor="action">Moderation Action</Label>
              <Select
                name="action"
                value={moderationAction}
                onValueChange={setModerationAction}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approve">Approve</SelectItem>
                  <SelectItem value="flag">Flag for Review</SelectItem>
                  <SelectItem value="remove">Remove Content</SelectItem>
                  <SelectItem value="ban">Ban User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="note">Moderation Note</Label>
              <Textarea
                id="note"
                value={moderationNote}
                onChange={(e) => setModerationNote(e.target.value)}
                placeholder="Add a note about this moderation action..."
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Submit Moderation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContentModerationModal;