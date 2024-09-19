import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatLogReviewModal = ({ onClose }) => {
  const [chatLogs, setChatLogs] = useState([
    { id: 1, user: 'User1', message: 'Hello, how are you?', timestamp: '2024-03-15T10:30:00Z' },
    { id: 2, user: 'User2', message: 'I\'m good, thanks!', timestamp: '2024-03-15T10:31:00Z' },
    // Add more mock chat logs as needed
  ]);

  const handleDeleteMessage = (id) => {
    setChatLogs(chatLogs.filter(log => log.id !== id));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Chat Log Review</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          {chatLogs.map((log) => (
            <div key={log.id} className="mb-4 p-2 border rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">{log.user}</span>
                <span className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
              </div>
              <p>{log.message}</p>
              <Button variant="destructive" size="sm" className="mt-2" onClick={() => handleDeleteMessage(log.id)}>
                Delete Message
              </Button>
            </div>
          ))}
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatLogReviewModal;