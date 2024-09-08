import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SystemHealthTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Server Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Monitor Server Metrics</h3>
          <p className="mb-4">View real-time server performance statistics.</p>
          <Button>View Server Metrics</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">API Call Statistics</h3>
          <p className="mb-4">Monitor API usage and performance.</p>
          <Button>View API Stats</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Error Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">System Error Reports</h3>
          <p className="mb-4">Review recent system errors and exceptions.</p>
          <Button>View Error Logs</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealthTab;