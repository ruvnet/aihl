import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Trophy, Users, Settings, Gavel, BarChart2, DollarSign } from 'lucide-react';
import HomeTab from '../components/admin/HomeTab';
import ChallengesTab from '../components/admin/ChallengesTab';
import UsersTab from '../components/admin/UsersTab';
import ConfigTab from '../components/admin/ConfigTab';
import AIJudiciaryTab from '../components/admin/AIJudiciaryTab';
import AnalyticsTab from '../components/admin/AnalyticsTab';
import FinanceTab from '../components/admin/FinanceTab';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="home" className="space-y-4">
            <TabsList className="flex justify-start overflow-x-auto">
              <TabsTrigger value="home" className="p-2" title="Home">
                <Home className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger value="challenges" className="p-2" title="Challenges">
                <Trophy className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger value="users" className="p-2" title="Users">
                <Users className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger value="config" className="p-2" title="Config">
                <Settings className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger value="ai-judiciary" className="p-2" title="AI Judiciary">
                <Gavel className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger value="analytics" className="p-2" title="Analytics">
                <BarChart2 className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger value="finance" className="p-2" title="Finance">
                <DollarSign className="h-5 w-5" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home">
              <HomeTab />
            </TabsContent>

            <TabsContent value="challenges">
              <ChallengesTab />
            </TabsContent>

            <TabsContent value="users">
              <UsersTab />
            </TabsContent>

            <TabsContent value="config">
              <ConfigTab />
            </TabsContent>

            <TabsContent value="ai-judiciary">
              <AIJudiciaryTab />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsTab />
            </TabsContent>

            <TabsContent value="finance">
              <FinanceTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;