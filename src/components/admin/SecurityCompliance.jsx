import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Key, Database, Zap } from 'lucide-react';
import SecurityTab from './SecurityTab';
import APIManagementTab from './APIManagementTab';
import BackupRecoveryTab from './BackupRecoveryTab';
import SystemHealthTab from './SystemHealthTab';

const SecurityCompliance = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Security & Compliance</h2>
      <p className="text-gray-600 mb-4">Manage security settings, API access, backups, and system health.</p>
      
      <Tabs defaultValue="security">
        <TabsList className="flex justify-start mb-4">
          <TabsTrigger value="security"><Shield className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="api"><Key className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="backup"><Database className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="health"><Zap className="h-5 w-5" /></TabsTrigger>
        </TabsList>

        <TabsContent value="security"><SecurityTab /></TabsContent>
        <TabsContent value="api"><APIManagementTab /></TabsContent>
        <TabsContent value="backup"><BackupRecoveryTab /></TabsContent>
        <TabsContent value="health"><SystemHealthTab /></TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityCompliance;