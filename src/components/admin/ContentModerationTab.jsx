import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContentModerationTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chat Log Review</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Review Recent Chat Logs</h3>
          <p className="mb-4">Examine recent chat messages for inappropriate content.</p>
          <Button>View Chat Logs</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reported Content</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Handle User Reports</h3>
          <p className="mb-4">Review and take action on content reported by users.</p>
          <Button>View Reported Content</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Moderation Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Configure Moderation Rules</h3>
          <p className="mb-4">Set up and adjust automated content moderation rules.</p>
          <Button>Edit Moderation Rules</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentModerationTab;