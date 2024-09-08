import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

const LLMSettingsTab = () => {
  const [settings, setSettings] = useState({
    apiKey: '',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000,
    judgingPrompt: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: Implement secure storage of API key
    localStorage.setItem('llmSettings', JSON.stringify(settings));
    toast.success('LLM settings saved successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>LLM Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">OpenAI API Key</label>
          <Input
            id="apiKey"
            name="apiKey"
            type="password"
            value={settings.apiKey}
            onChange={handleChange}
            placeholder="Enter your OpenAI API key"
          />
        </div>
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
          <Select name="model" value={settings.model} onValueChange={(value) => handleSelectChange('model', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">Temperature</label>
          <Input
            id="temperature"
            name="temperature"
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={settings.temperature}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="maxTokens" className="block text-sm font-medium text-gray-700">Max Tokens</label>
          <Input
            id="maxTokens"
            name="maxTokens"
            type="number"
            min="1"
            value={settings.maxTokens}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="judgingPrompt" className="block text-sm font-medium text-gray-700">Judging Prompt</label>
          <Textarea
            id="judgingPrompt"
            name="judgingPrompt"
            value={settings.judgingPrompt}
            onChange={handleChange}
            placeholder="Enter the prompt for judging submissions"
            rows={4}
          />
        </div>
        <Button onClick={handleSave}>Save Settings</Button>
      </CardContent>
    </Card>
  );
};

export default LLMSettingsTab;