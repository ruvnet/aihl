import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const NotificationsTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Broadcast Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input placeholder="Notification Title" />
            <Textarea placeholder="Notification Content" />
            <Button>Send Broadcast</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Manage Email Templates</h3>
          <p className="mb-4">Edit and create email templates for various system notifications.</p>
          <Button>Edit Templates</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Configure Notification Preferences</h3>
          <p className="mb-4">Set up default notification settings for users.</p>
          <Button>Configure Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsTab;