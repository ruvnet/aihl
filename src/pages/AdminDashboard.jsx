import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Settings, BarChart2, Shield } from 'lucide-react';
import CommunityManagement from '../components/admin/CommunityManagement';
import SystemConfiguration from '../components/admin/SystemConfiguration';
import AnalyticsReporting from '../components/admin/AnalyticsReporting';
import SecurityCompliance from '../components/admin/SecurityCompliance';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('community');

  const tabs = [
    { id: 'community', label: 'Community', icon: Users, component: CommunityManagement },
    { id: 'system', label: 'System', icon: Settings, component: SystemConfiguration },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, component: AnalyticsReporting },
    { id: 'security', label: 'Security', icon: Shield, component: SecurityCompliance },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex justify-start mb-6">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center p-2">
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <tab.component />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;