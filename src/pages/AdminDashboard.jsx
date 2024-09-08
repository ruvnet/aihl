import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Trophy, Users, Settings, Gavel, BarChart2, DollarSign, Shield, Bell, Flag, Zap, Plug, Globe, Database, MessageSquare, Calendar, Award, Key } from 'lucide-react';
import HomeTab from '../components/admin/HomeTab';
import ChallengesTab from '../components/admin/ChallengesTab';
import UsersTab from '../components/admin/UsersTab';
import ConfigTab from '../components/admin/ConfigTab';
import AIJudiciaryTab from '../components/admin/AIJudiciaryTab';
import AnalyticsTab from '../components/admin/AnalyticsTab';
import FinanceTab from '../components/admin/FinanceTab';
import SecurityTab from '../components/admin/SecurityTab';
import NotificationsTab from '../components/admin/NotificationsTab';
import ContentModerationTab from '../components/admin/ContentModerationTab';
import SystemHealthTab from '../components/admin/SystemHealthTab';
import IntegrationsTab from '../components/admin/IntegrationsTab';
import LocalizationTab from '../components/admin/LocalizationTab';
import BackupRecoveryTab from '../components/admin/BackupRecoveryTab';
import SupportTab from '../components/admin/SupportTab';
import EventsTab from '../components/admin/EventsTab';
import GamificationTab from '../components/admin/GamificationTab';
import APIManagementTab from '../components/admin/APIManagementTab';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="home" className="space-y-4">
            <TabsList className="flex justify-start overflow-x-auto">
              <TabsTrigger value="home" className="p-2">
                <Home className="h-5 w-5 mr-2" />
                Home
              </TabsTrigger>
              <TabsTrigger value="challenges" className="p-2">
                <Trophy className="h-5 w-5 mr-2" />
                Challenges
              </TabsTrigger>
              <TabsTrigger value="users" className="p-2">
                <Users className="h-5 w-5 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="config" className="p-2">
                <Settings className="h-5 w-5 mr-2" />
                Config
              </TabsTrigger>
              <TabsTrigger value="ai-judiciary" className="p-2">
                <Gavel className="h-5 w-5 mr-2" />
                AI Judiciary
              </TabsTrigger>
              <TabsTrigger value="analytics" className="p-2">
                <BarChart2 className="h-5 w-5 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="finance" className="p-2">
                <DollarSign className="h-5 w-5 mr-2" />
                Finance
              </TabsTrigger>
              <TabsTrigger value="security" className="p-2">
                <Shield className="h-5 w-5 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="p-2">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="content-moderation" className="p-2">
                <Flag className="h-5 w-5 mr-2" />
                Content Moderation
              </TabsTrigger>
              <TabsTrigger value="system-health" className="p-2">
                <Zap className="h-5 w-5 mr-2" />
                System Health
              </TabsTrigger>
              <TabsTrigger value="integrations" className="p-2">
                <Plug className="h-5 w-5 mr-2" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="localization" className="p-2">
                <Globe className="h-5 w-5 mr-2" />
                Localization
              </TabsTrigger>
              <TabsTrigger value="backup-recovery" className="p-2">
                <Database className="h-5 w-5 mr-2" />
                Backup & Recovery
              </TabsTrigger>
              <TabsTrigger value="support" className="p-2">
                <MessageSquare className="h-5 w-5 mr-2" />
                Support
              </TabsTrigger>
              <TabsTrigger value="events" className="p-2">
                <Calendar className="h-5 w-5 mr-2" />
                Events
              </TabsTrigger>
              <TabsTrigger value="gamification" className="p-2">
                <Award className="h-5 w-5 mr-2" />
                Gamification
              </TabsTrigger>
              <TabsTrigger value="api-management" className="p-2">
                <Key className="h-5 w-5 mr-2" />
                API Management
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
            <TabsContent value="security">
              <SecurityTab />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationsTab />
            </TabsContent>
            <TabsContent value="content-moderation">
              <ContentModerationTab />
            </TabsContent>
            <TabsContent value="system-health">
              <SystemHealthTab />
            </TabsContent>
            <TabsContent value="integrations">
              <IntegrationsTab />
            </TabsContent>
            <TabsContent value="localization">
              <LocalizationTab />
            </TabsContent>
            <TabsContent value="backup-recovery">
              <BackupRecoveryTab />
            </TabsContent>
            <TabsContent value="support">
              <SupportTab />
            </TabsContent>
            <TabsContent value="events">
              <EventsTab />
            </TabsContent>
            <TabsContent value="gamification">
              <GamificationTab />
            </TabsContent>
            <TabsContent value="api-management">
              <APIManagementTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;