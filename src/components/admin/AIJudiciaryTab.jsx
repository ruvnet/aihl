import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const AIJudiciaryTab = () => {
  const [judiciarySettings, setJudiciarySettings] = useState({
    judgeModel: 'gpt-4',
    judgingCriteria: {
      functionality: 0.4,
      codeQuality: 0.3,
      efficiency: 0.2,
      creativity: 0.1,
    },
    autoGrading: true,
    humanReviewThreshold: 0.8,
  });

  const handleSettingChange = (key, value) => {
    setJudiciarySettings(prev => ({ ...prev, [key]: value }));
  };

  const handleJudgingCriteriaChange = (criterion, value) => {
    setJudiciarySettings(prev => ({
      ...prev,
      judgingCriteria: {
        ...prev.judgingCriteria,
        [criterion]: value / 100,
      },
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Judiciary Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Judge Model</span>
            <Select
              value={judiciarySettings.judgeModel}
              onValueChange={(value) => handleSettingChange('judgeModel', value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="custom-judge">Custom Judge</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Judging Criteria Weights</h3>
            {Object.entries(judiciarySettings.judgingCriteria).map(([criterion, weight]) => (
              <div key={criterion} className="mb-2">
                <label className="block text-sm font-medium text-gray-700">{criterion}</label>
                <Slider
                  value={[weight * 100]}
                  onValueChange={(value) => handleJudgingCriteriaChange(criterion, value[0])}
                  max={100}
                  step={1}
                />
                <span className="text-sm text-gray-500">{(weight * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span>Auto-grading Enabled</span>
            <Switch
              checked={judiciarySettings.autoGrading}
              onCheckedChange={(checked) => handleSettingChange('autoGrading', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Human Review Threshold</span>
            <Input
              type="number"
              value={judiciarySettings.humanReviewThreshold}
              onChange={(e) => handleSettingChange('humanReviewThreshold', parseFloat(e.target.value))}
              className="w-24"
              min="0"
              max="1"
              step="0.01"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIJudiciaryTab;