import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LeaderboardTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Leaderboard Management</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Global Leaderboard</h3>
          <p className="mb-4">Manage and adjust the global leaderboard rankings.</p>
          <Button>View Global Leaderboard</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Challenge Leaderboards</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Manage Challenge Rankings</h3>
          <p className="mb-4">View and modify leaderboards for specific challenges.</p>
          <Button>Manage Challenge Leaderboards</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historical Data</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Access Past Rankings</h3>
          <p className="mb-4">View and export historical leaderboard data.</p>
          <Button>Access Historical Data</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardTab;