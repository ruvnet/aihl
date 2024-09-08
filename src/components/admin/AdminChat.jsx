import React, { useState, useEffect } from 'react';
import { View } from 'react-native-web';
import { GiftedChat } from 'react-native-gifted-chat';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOpenAI } from '@/hooks/useOpenAI';
import { useDocumentation } from '@/hooks/useDocumentation';
import { supabase } from '@/integrations/supabase/supabase';

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const { sendMessage } = useOpenAI();
  const { getRelevantDocs } = useDocumentation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const onSend = async (newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

    const userMessage = newMessages[0];
    const relevantDocs = await getRelevantDocs(userMessage.text);
    const context = relevantDocs.map(doc => doc.content).join('\n\n');

    const aiResponse = await sendMessage(userMessage.text, context);
    const aiMessage = {
      _id: Math.round(Math.random() * 1000000),
      text: aiResponse,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'AI Assistant',
        avatar: 'https://placeimg.com/140/140/tech',
      },
    };

    setMessages(previousMessages => GiftedChat.append(previousMessages, [aiMessage]));
  };

  return (
    <Card className="h-[calc(100vh-4rem)]">
      <CardHeader>
        <CardTitle>Admin Chat</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <View style={{ flex: 1 }}>
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: user?.id || 1,
            }}
            renderUsernameOnMessage
            showAvatarForEveryMessage
          />
        </View>
      </CardContent>
    </Card>
  );
};

export default AdminChat;