import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Gavel, Bell, Globe, Bot, Github } from 'lucide-react';
import ConfigTab from './ConfigTab';
import AIJudiciaryTab from './AIJudiciaryTab';
import NotificationsTab from './NotificationsTab';
import LocalizationTab from './LocalizationTab';
import LLMSettingsTab from './LLMSettingsTab';
import GitHubConfigTab from './GitHubConfigTab';

const SystemConfiguration = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">System Configuration</h2>
      <p className="text-gray-600 mb-4">Manage system settings, AI judiciary, notifications, localization, LLM settings, and GitHub configuration.</p>
      
      <Tabs defaultValue="config">
        <TabsList className="flex justify-start mb-4 flex-wrap">
          <TabsTrigger value="config"><Settings className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="ai-judiciary"><Gavel className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="localization"><Globe className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="llm-settings"><Bot className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="github-config"><Github className="h-5 w-5" /></TabsTrigger>
        </TabsList>

        <TabsContent value="config"><ConfigTab /></TabsContent>
        <TabsContent value="ai-judiciary"><AIJudiciaryTab /></TabsContent>
        <TabsContent value="notifications"><NotificationsTab /></TabsContent>
        <TabsContent value="localization"><LocalizationTab /></TabsContent>
        <TabsContent value="llm-settings"><LLMSettingsTab /></TabsContent>
        <TabsContent value="github-config"><GitHubConfigTab /></TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemConfiguration;