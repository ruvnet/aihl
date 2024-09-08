import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HomeTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This dashboard provides comprehensive tools for managing the AI Hacking League platform. Here's an overview of the available sections:</p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li><strong>Challenges:</strong> Manage AI challenges, create new ones, and monitor ongoing competitions.</li>
            <li><strong>Users:</strong> Oversee user accounts, roles, and activities.</li>
            <li><strong>Config:</strong> Adjust system-wide settings and configurations.</li>
            <li><strong>AI Judiciary:</strong> Manage the AI-powered judging system for challenges.</li>
            <li><strong>Analytics:</strong> Access detailed platform analytics and generate reports.</li>
            <li><strong>Finance:</strong> Handle financial transactions, payouts, and revenue tracking.</li>
            <li><strong>Security:</strong> Monitor and manage platform security settings.</li>
            <li><strong>Notifications:</strong> Manage system-wide notifications and announcements.</li>
            <li><strong>Content Moderation:</strong> Review and moderate user-generated content.</li>
            <li><strong>System Health:</strong> Monitor the platform's performance and health metrics.</li>
            <li><strong>Integrations:</strong> Manage third-party integrations and APIs.</li>
            <li><strong>Localization:</strong> Handle language settings and translations.</li>
            <li><strong>Backup & Recovery:</strong> Manage data backups and system recovery options.</li>
            <li><strong>Support:</strong> Access tools for user support and issue resolution.</li>
            <li><strong>Events:</strong> Manage special events and seasonal challenges.</li>
            <li><strong>Gamification:</strong> Configure achievements, levels, and other gamification elements.</li>
            <li><strong>API Management:</strong> Oversee API keys, usage, and documentation.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeTab;