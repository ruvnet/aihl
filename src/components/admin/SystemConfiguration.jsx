import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Gavel, Bell, Globe } from 'lucide-react';
import ConfigTab from './ConfigTab';
import AIJudiciaryTab from './AIJudiciaryTab';
import NotificationsTab from './NotificationsTab';
import LocalizationTab from './LocalizationTab';

const SystemConfiguration = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">System Configuration</h2>
      <p className="text-gray-600 mb-4">Manage system settings, AI judiciary, notifications, and localization.</p>
      
      <Tabs defaultValue="config">
        <TabsList className="flex justify-start mb-4">
          <TabsTrigger value="config"><Settings className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="ai-judiciary"><Gavel className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="localization"><Globe className="h-5 w-5" /></TabsTrigger>
        </TabsList>

        <TabsContent value="config"><ConfigTab /></TabsContent>
        <TabsContent value="ai-judiciary"><AIJudiciaryTab /></TabsContent>
        <TabsContent value="notifications"><NotificationsTab /></TabsContent>
        <TabsContent value="localization"><LocalizationTab /></TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemConfiguration;