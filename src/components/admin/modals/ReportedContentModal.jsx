import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ReportedContentModal = ({ onClose }) => {
  const [reportedContent, setReportedContent] = useState([
    { id: 1, reporter: 'User1', content: 'This is inappropriate content', type: 'comment', status: 'pending' },
    { id: 2, reporter: 'User2', content: 'Spam message here', type: 'message', status: 'pending' },
    // Add more mock reported content as needed
  ]);

  const handleUpdateStatus = (id, newStatus) => {
    setReportedContent(reportedContent.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Reported Content</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          {reportedContent.map((item) => (
            <div key={item.id} className="mb-4 p-2 border rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Reported by: {item.reporter}</span>
                <span className="text-sm text-gray-500">Type: {item.type}</span>
              </div>
              <p className="mb-2">{item.content}</p>
              <div className="flex justify-between items-center">
                <Select
                  value={item.status}
                  onValueChange={(value) => handleUpdateStatus(item.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="actioned">Actioned</SelectItem>
                    <SelectItem value="dismissed">Dismissed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="destructive" size="sm">Delete Content</Button>
              </div>
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

export default ReportedContentModal;