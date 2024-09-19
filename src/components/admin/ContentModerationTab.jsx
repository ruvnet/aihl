import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChatLogReviewModal from './modals/ChatLogReviewModal';
import ReportedContentModal from './modals/ReportedContentModal';
import ModerationSettingsModal from './modals/ModerationSettingsModal';

const ContentModerationTab = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chat Log Review</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Review Recent Chat Logs</h3>
          <p className="mb-4">Examine recent chat messages for inappropriate content.</p>
          <Button onClick={() => openModal('chatLog')}>View Chat Logs</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reported Content</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Handle User Reports</h3>
          <p className="mb-4">Review and take action on content reported by users.</p>
          <Button onClick={() => openModal('reportedContent')}>View Reported Content</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Moderation Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Configure Moderation Rules</h3>
          <p className="mb-4">Set up and adjust automated content moderation rules.</p>
          <Button onClick={() => openModal('moderationSettings')}>Edit Moderation Rules</Button>
        </CardContent>
      </Card>

      {activeModal === 'chatLog' && (
        <ChatLogReviewModal onClose={closeModal} />
      )}
      {activeModal === 'reportedContent' && (
        <ReportedContentModal onClose={closeModal} />
      )}
      {activeModal === 'moderationSettings' && (
        <ModerationSettingsModal onClose={closeModal} />
      )}
    </div>
  );
};

export default ContentModerationTab;
