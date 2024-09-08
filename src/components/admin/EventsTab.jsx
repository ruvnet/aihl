import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EventsTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Special Events</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Manage Special Events</h3>
          <p className="mb-4">Create and manage special AI hacking events.</p>
          <Button>Create New Event</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Seasonal Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Seasonal Challenge Management</h3>
          <p className="mb-4">Set up and configure seasonal AI challenges.</p>
          <Button>Manage Seasonal Challenges</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Event Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Event Performance Metrics</h3>
          <p className="mb-4">View analytics and performance data for past events.</p>
          <Button>View Event Analytics</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsTab;