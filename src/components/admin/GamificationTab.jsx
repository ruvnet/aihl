import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GamificationTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Manage Achievements</h3>
          <p className="mb-4">Create and edit user achievements and badges.</p>
          <Button>Edit Achievements</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>XP System</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Configure XP and Levels</h3>
          <p className="mb-4">Adjust the experience points system and user levels.</p>
          <Button>Configure XP System</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leaderboards</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Leaderboard Settings</h3>
          <p className="mb-4">Manage global and challenge-specific leaderboards.</p>
          <Button>Edit Leaderboard Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationTab;