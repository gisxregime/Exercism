import { useState, useEffect } from 'react';
import { Message, Conversation } from '../types';
import { mockMessages } from '../data/mockData';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('laagta_messages');
    if (stored) {
      setMessages(JSON.parse(stored));
    } else {
      setMessages(mockMessages);
      localStorage.setItem('laagta_messages', JSON.stringify(mockMessages));
    }
  }, []);

  const saveMessages = (newMessages: Message[]) => {
    setMessages(newMessages);
    localStorage.setItem('laagta_messages', JSON.stringify(newMessages));
  };

  const sendMessage = (
  senderId: string,
  receiverId: string,
  content: string) =>
  {
    const newMessage: Message = {
      id: `m_${Math.random().toString(36).substr(2, 9)}`,
      senderId,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    saveMessages([...messages, newMessage]);
    return newMessage;
  };

  const getConversation = (userId1: string, userId2: string) => {
    return messages.
    filter(
      (m) =>
      m.senderId === userId1 && m.receiverId === userId2 ||
      m.senderId === userId2 && m.receiverId === userId1
    ).
    sort(
      (a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  };

  const getConversations = (userId: string): Conversation[] => {
    const userMessages = messages.filter(
      (m) => m.senderId === userId || m.receiverId === userId
    );

    // Group by other participant
    const conversationsMap = new Map<string, Message[]>();

    userMessages.forEach((m) => {
      const otherId = m.senderId === userId ? m.receiverId : m.senderId;
      if (!conversationsMap.has(otherId)) {
        conversationsMap.set(otherId, []);
      }
      conversationsMap.get(otherId)?.push(m);
    });

    const conversations: Conversation[] = [];

    conversationsMap.forEach((msgs, otherId) => {
      const sortedMsgs = msgs.sort(
        (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      const lastMessage = sortedMsgs[0];
      const unreadCount = msgs.filter(
        (m) => m.receiverId === userId && !m.isRead
      ).length;

      conversations.push({
        id: `conv_${userId}_${otherId}`,
        participants: [userId, otherId],
        lastMessage,
        unreadCount
      });
    });

    return conversations.sort((a, b) => {
      if (!a.lastMessage || !b.lastMessage) return 0;
      return (
        new Date(b.lastMessage.timestamp).getTime() -
        new Date(a.lastMessage.timestamp).getTime());

    });
  };

  const markAsRead = (messageId: string) => {
    const updated = messages.map((m) =>
    m.id === messageId ? { ...m, isRead: true } : m
    );
    saveMessages(updated);
  };

  const markConversationAsRead = (userId: string, otherId: string) => {
    const updated = messages.map((m) =>
    m.receiverId === userId && m.senderId === otherId && !m.isRead ?
    { ...m, isRead: true } :
    m
    );
    saveMessages(updated);
  };

  return {
    messages,
    sendMessage,
    getConversation,
    getConversations,
    markAsRead,
    markConversationAsRead
  };
}