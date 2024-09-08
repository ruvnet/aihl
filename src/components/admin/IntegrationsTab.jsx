import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const IntegrationsTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Third-Party Services</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Manage Integrations</h3>
          <p className="mb-4">Configure and manage third-party service integrations.</p>
          <Button>View Integrations</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Connections</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">External API Management</h3>
          <p className="mb-4">Set up and monitor connections to external APIs.</p>
          <Button>Manage API Connections</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhook Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Set Up Webhooks</h3>
          <p className="mb-4">Configure webhooks for real-time data updates.</p>
          <Button>Configure Webhooks</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsTab;