import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ModerationSettingsModal = ({ onClose }) => {
  const [settings, setSettings] = useState({
    autoModeration: true,
    profanityFilter: true,
    spamDetection: true,
    linkBlocking: false,
    maxMessagesPerMinute: 10,
    bannedWords: "spam,scam,offensive",
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving moderation settings:', settings);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Moderation Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="autoModeration">Auto Moderation</Label>
            <Switch
              id="autoModeration"
              checked={settings.autoModeration}
              onCheckedChange={() => handleToggle('autoModeration')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="profanityFilter">Profanity Filter</Label>
            <Switch
              id="profanityFilter"
              checked={settings.profanityFilter}
              onCheckedChange={() => handleToggle('profanityFilter')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="spamDetection">Spam Detection</Label>
            <Switch
              id="spamDetection"
              checked={settings.spamDetection}
              onCheckedChange={() => handleToggle('spamDetection')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="linkBlocking">Link Blocking</Label>
            <Switch
              id="linkBlocking"
              checked={settings.linkBlocking}
              onCheckedChange={() => handleToggle('linkBlocking')}
            />
          </div>
          <div>
            <Label htmlFor="maxMessagesPerMinute">Max Messages Per Minute</Label>
            <Input
              id="maxMessagesPerMinute"
              name="maxMessagesPerMinute"
              type="number"
              value={settings.maxMessagesPerMinute}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="bannedWords">Banned Words (comma-separated)</Label>
            <Input
              id="bannedWords"
              name="bannedWords"
              value={settings.bannedWords}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModerationSettingsModal;