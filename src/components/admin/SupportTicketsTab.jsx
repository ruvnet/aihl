import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from 'sonner';

const SupportTicketsTab = () => {
  const [tickets, setTickets] = useState([
    { id: 1, user: 'user1', subject: 'Login Issue', status: 'Open', createdAt: '2024-03-15' },
    { id: 2, user: 'user2', subject: 'Challenge Submission Problem', status: 'In Progress', createdAt: '2024-03-14' },
  ]);
  const [response, setResponse] = useState('');

  const handleRespond = (ticketId) => {
    // TODO: Implement respond to ticket logic
    toast.success(`Response sent for ticket ${ticketId}`);
    setResponse('');
  };

  const handleCloseTicket = (ticketId) => {
    // TODO: Implement close ticket logic
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: 'Closed' } : ticket
    ));
    toast.success(`Ticket ${ticketId} closed`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Open Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.user}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell>{ticket.createdAt}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleCloseTicket(ticket.id)} className="mr-2">Close</Button>
                    <Button onClick={() => handleRespond(ticket.id)}>Respond</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Respond to Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Enter your response..."
            className="mb-2"
          />
          <Button onClick={() => handleRespond(1)}>Send Response</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTicketsTab;