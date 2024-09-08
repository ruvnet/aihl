import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SecurityTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Access Logs</h3>
          <p className="mb-4">Review recent admin access logs and suspicious activities.</p>
          <Button>View Access Logs</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">GDPR Compliance</h3>
          <p className="mb-4">Manage data protection and privacy settings.</p>
          <Button>Configure GDPR Settings</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Audits</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Schedule Security Audit</h3>
          <p className="mb-4">Set up regular security audits for the platform.</p>
          <Button>Schedule Audit</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTab;