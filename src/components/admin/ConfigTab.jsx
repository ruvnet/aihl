import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ConfigTab = () => {
  const [configSettings, setConfigSettings] = useState({
    aiJudgingEnabled: true,
    maxParticipants: 100,
    challengeDuration: 30,
    difficultyLevel: 'medium',
  });

  const handleConfigChange = (key, value) => {
    setConfigSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>AI Judging Enabled</span>
            <Switch
              checked={configSettings.aiJudgingEnabled}
              onCheckedChange={(checked) => handleConfigChange('aiJudgingEnabled', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Max Participants</span>
            <Input
              type="number"
              value={configSettings.maxParticipants}
              onChange={(e) => handleConfigChange('maxParticipants', parseInt(e.target.value))}
              className="w-24"
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Challenge Duration (minutes)</span>
            <Input
              type="number"
              value={configSettings.challengeDuration}
              onChange={(e) => handleConfigChange('challengeDuration', parseInt(e.target.value))}
              className="w-24"
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Default Difficulty</span>
            <Select
              value={configSettings.difficultyLevel}
              onValueChange={(value) => handleConfigChange('difficultyLevel', value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigTab;