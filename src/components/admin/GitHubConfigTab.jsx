import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const GitHubConfigTab = () => {
  const [config, setConfig] = useState({
    accessToken: '',
    organization: '',
    repository: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: Implement secure storage of GitHub access token
    localStorage.setItem('githubConfig', JSON.stringify(config));
    toast.success('GitHub configuration saved successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>GitHub Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="accessToken" className="block text-sm font-medium text-gray-700">GitHub Access Token</label>
          <Input
            id="accessToken"
            name="accessToken"
            type="password"
            value={config.accessToken}
            onChange={handleChange}
            placeholder="Enter your GitHub access token"
          />
        </div>
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Organization</label>
          <Input
            id="organization"
            name="organization"
            value={config.organization}
            onChange={handleChange}
            placeholder="Enter the GitHub organization name"
          />
        </div>
        <div>
          <label htmlFor="repository" className="block text-sm font-medium text-gray-700">Repository</label>
          <Input
            id="repository"
            name="repository"
            value={config.repository}
            onChange={handleChange}
            placeholder="Enter the GitHub repository name"
          />
        </div>
        <Button onClick={handleSave}>Save Configuration</Button>
      </CardContent>
    </Card>
  );
};

export default GitHubConfigTab;