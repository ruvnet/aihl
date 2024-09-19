import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Trophy, MessageSquare, Flag, Ban } from 'lucide-react';
import { Button } from "@/components/ui/button";
import UsersTab from './UsersTab';
import ChallengesTab from './ChallengesTab';
import ContentModerationTab from './ContentModerationTab';
import BannedUsersTab from './BannedUsersTab';
import UserEditModal from './modals/UserEditModal';
import ChallengeEditModal from './modals/ChallengeEditModal';
import ContentModerationModal from './modals/ContentModerationModal';
import BanUserModal from './modals/BanUserModal';

const CommunityManagement = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (modalType, item = null) => {
    setActiveModal(modalType);
    setSelectedItem(item);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedItem(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Community Management</h2>
      <p className="text-gray-600 mb-4">Manage users, challenges, content moderation, and banned users.</p>
      
      <Tabs defaultValue="users">
        <TabsList className="flex justify-start mb-4 flex-wrap">
          <TabsTrigger value="users"><Users className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="challenges"><Trophy className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="moderation"><Flag className="h-5 w-5" /></TabsTrigger>
          <TabsTrigger value="banned"><Ban className="h-5 w-5" /></TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UsersTab onEdit={(user) => openModal('user', user)} />
        </TabsContent>
        <TabsContent value="challenges">
          <ChallengesTab onEdit={(challenge) => openModal('challenge', challenge)} />
        </TabsContent>
        <TabsContent value="moderation">
          <ContentModerationTab onModerate={(content) => openModal('moderation', content)} />
        </TabsContent>
        <TabsContent value="banned">
          <BannedUsersTab onUnban={(user) => openModal('unban', user)} />
        </TabsContent>
      </Tabs>

      {activeModal === 'user' && (
        <UserEditModal user={selectedItem} onClose={closeModal} />
      )}
      {activeModal === 'challenge' && (
        <ChallengeEditModal challenge={selectedItem} onClose={closeModal} />
      )}
      {activeModal === 'moderation' && (
        <ContentModerationModal content={selectedItem} onClose={closeModal} />
      )}
      {activeModal === 'unban' && (
        <BanUserModal user={selectedItem} onClose={closeModal} isBanning={false} />
      )}
    </div>
  );
};

export default CommunityManagement;
