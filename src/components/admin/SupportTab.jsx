import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SupportTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Review User Feedback</h3>
          <p className="mb-4">View and respond to user feedback and suggestions.</p>
          <Button>View Feedback</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Manage Support Tickets</h3>
          <p className="mb-4">Handle open support tickets and user inquiries.</p>
          <Button>Open Ticket Dashboard</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Knowledge Base</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Update Help Articles</h3>
          <p className="mb-4">Manage and update the platform's knowledge base and FAQs.</p>
          <Button>Edit Knowledge Base</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTab;