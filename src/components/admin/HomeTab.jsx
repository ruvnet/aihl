import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HomeTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Admin Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Use this dashboard to manage the AI Hacking League platform:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Generate and manage AI challenges</li>
          <li>Monitor user activities and submissions</li>
          <li>Configure system settings and judging criteria</li>
          <li>Review analytics and financial data</li>
        </ul>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total Users: 3,000</p>
              <p>New Registrations (Last 7 days): 150</p>
              <p>Active Users (Last 30 days): 2,500</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total Revenue: $75,000</p>
              <p>Payouts (Last 30 days): $25,000</p>
              <p>Current Prize Pool: $50,000</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeTab;