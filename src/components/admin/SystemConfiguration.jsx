import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Bell, Globe, Bot, Github, Shield } from 'lucide-react';
import ConfigTab from './ConfigTab';
import NotificationsTab from './NotificationsTab';
import LocalizationTab from './LocalizationTab';
import LLMSettingsTab from './LLMSettingsTab';
import GitHubConfigTab from './GitHubConfigTab';
import SecurityTab from './SecurityTab';

const SystemConfiguration = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">System Configuration</h2>
      <p className="text-gray-600 mb-4">Manage system settings, notifications, localization, LLM settings, GitHub configuration, and security.</p>
      
      <Tabs defaultValue="config">
        <TabsList className="flex justify-start mb-4 flex-wrap">
          <TabsTrigger value="config"><Settings className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="localization"><Globe className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="llm-settings"><Bot className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="github-config"><Github className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="security"><Shield className="h-5 w-5" /></TabsTrigger>
        </TabsList>

        <TabsContent value="config"><ConfigTab /></TabsContent>
        <TabsContent value="notifications"><NotificationsTab /></TabsContent>
        <TabsContent value="localization"><LocalizationTab /></TabsContent>
        <TabsContent value="llm-settings"><LLMSettingsTab /></TabsContent>
        <TabsContent value="github-config"><GitHubConfigTab /></TabsContent>
        <TabsContent value="security"><SecurityTab /></TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemConfiguration;
