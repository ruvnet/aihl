import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, DollarSign, Users, Trophy } from 'lucide-react';
import AnalyticsTab from './AnalyticsTab';
import FinanceTab from './FinanceTab';
import LeaderboardTab from './LeaderboardTab';
import EventsTab from './EventsTab';

const AnalyticsReporting = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Analytics & Reporting</h2>
      <p className="text-gray-600 mb-4">Access platform analytics, financial data, leaderboards, and event metrics.</p>
      
      <Tabs defaultValue="analytics">
        <TabsList className="flex justify-start mb-4">
          <TabsTrigger value="analytics"><BarChart2 className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="finance"><DollarSign className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="leaderboard"><Trophy className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="events"><Users className="h-5 w-5" /></TabsTrigger>
        </TabsList>

        <TabsContent value="analytics"><AnalyticsTab /></TabsContent>
        <TabsContent value="finance"><FinanceTab /></TabsContent>
        <TabsContent value="leaderboard"><LeaderboardTab /></TabsContent>
        <TabsContent value="events"><EventsTab /></TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsReporting;