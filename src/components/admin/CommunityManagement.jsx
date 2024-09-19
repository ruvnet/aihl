import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Trophy, MessageSquare, Flag, Ban } from 'lucide-react';
import UsersTab from './UsersTab';
import ChallengesTab from './ChallengesTab';
import SupportTab from './SupportTab';
import ContentModerationTab from './ContentModerationTab';
import BannedUsersTab from './BannedUsersTab';

const CommunityManagement = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Community Management</h2>
      <p className="text-gray-600 mb-4">Manage users, challenges, support, content moderation, and banned users.</p>
      
      <Tabs defaultValue="users">
        <TabsList className="flex justify-start mb-4">
          <TabsTrigger value="users"><Users className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="challenges"><Trophy className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="support"><MessageSquare className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="moderation"><Flag className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="banned"><Ban className="h-5 w-5" /></TabsTrigger>
        </TabsList>

        <TabsContent value="users"><UsersTab /></TabsContent>
        <TabsContent value="challenges"><ChallengesTab /></TabsContent>
        <TabsContent value="support"><SupportTab /></TabsContent>
        <TabsContent value="moderation"><ContentModerationTab /></TabsContent>
        <TabsContent value="banned"><BannedUsersTab /></TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityManagement;
