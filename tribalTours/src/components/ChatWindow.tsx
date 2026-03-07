import React, { useEffect, useState, useRef } from 'react';
import {
  SendIcon,
  UserIcon,
  SearchIcon,
  InfoIcon,
  MessageSquareIcon } from
'lucide-react';
import { useMessages } from '../hooks/useMessages';
import { mockUsers, mockGuides } from '../data/mockData';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
interface ChatWindowProps {
  currentUserId: string;
  targetUserId?: string;
  listingContext?: {
    id: string;
    title: string;
  };
}
export function ChatWindow({
  currentUserId,
  targetUserId,
  listingContext
}: ChatWindowProps) {
  const {
    messages,
    sendMessage,
    getConversation,
    getConversations,
    markConversationAsRead
  } = useMessages();
  const [activeConversationId, setActiveConversationId] = useState<
    string | null>(
    targetUserId || null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversations = getConversations(currentUserId);
  const activeConversation = activeConversationId ?
  getConversation(currentUserId, activeConversationId) :
  [];
  useEffect(() => {
    if (activeConversationId) {
      markConversationAsRead(currentUserId, activeConversationId);
    }
  }, [activeConversationId, messages]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [activeConversation]);
  // Find user details helper
  const getUserDetails = (userId: string) => {
    const user =
    mockUsers.find((u) => u.id === userId) ||
    mockGuides.find((g) => g.id === userId);
    return (
      user || {
        id: userId,
        name: 'Unknown User',
        role: 'tawo'
      });

  };
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversationId) return;
    sendMessage(currentUserId, activeConversationId, newMessage);
    setNewMessage('');
  };
  const filteredConversations = conversations.filter((conv) => {
    const otherId = conv.participants.find((id) => id !== currentUserId) || '';
    const otherUser = getUserDetails(otherId);
    return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  return (
    <div className="flex h-[600px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Sidebar - Conversation List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Messages</h2>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2 bg-gray-100 border-transparent rounded-md text-sm focus:bg-white focus:border-ocean focus:ring-1 focus:ring-ocean"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />

          </div>
        </div>

        <div className="flex-grow overflow-y-auto">
          {filteredConversations.length > 0 ?
          <div className="divide-y divide-gray-100">
              {filteredConversations.map((conv) => {
              const otherId =
              conv.participants.find((id) => id !== currentUserId) || '';
              const otherUser = getUserDetails(otherId);
              const isActive = activeConversationId === otherId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(otherId)}
                  className={`p-4 cursor-pointer hover:bg-gray-100 transition-colors flex items-center ${isActive ? 'bg-ocean/5 border-l-4 border-ocean' : 'border-l-4 border-transparent'}`}>

                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-olive text-white flex items-center justify-center font-bold text-lg">
                        {otherUser.name.charAt(0)}
                      </div>
                      {conv.unreadCount > 0 &&
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white">
                          {conv.unreadCount}
                        </span>
                    }
                    </div>
                    <div className="ml-3 flex-grow overflow-hidden">
                      <div className="flex justify-between items-baseline">
                        <h3
                        className={`font-semibold truncate ${conv.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'}`}>

                          {otherUser.name}
                        </h3>
                        {conv.lastMessage &&
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                            {new Date(
                          conv.lastMessage.timestamp
                        ).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric'
                        })}
                          </span>
                      }
                      </div>
                      <p
                      className={`text-sm truncate mt-0.5 ${conv.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>

                        {conv.lastMessage?.content || 'No messages yet'}
                      </p>
                    </div>
                  </div>);

            })}
            </div> :

          <div className="p-8 text-center text-gray-500">
              <MessageSquareIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No conversations found.</p>
            </div>
          }
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="w-2/3 flex flex-col bg-white">
        {activeConversationId ?
        <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white shadow-sm z-10">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-olive text-white flex items-center justify-center font-bold">
                  {getUserDetails(activeConversationId).name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h2 className="font-bold text-gray-900">
                    {getUserDetails(activeConversationId).name}
                  </h2>
                  <p className="text-xs text-gray-500 capitalize">
                    {getUserDetails(activeConversationId).role}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <InfoIcon className="w-5 h-5 text-gray-400" />
              </Button>
            </div>

            {/* Context Banner (if applicable) */}
            {listingContext &&
          <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex items-center text-sm text-amber-800">
                <InfoIcon className="w-4 h-4 mr-2" />
                Inquiring about:{' '}
                <strong className="ml-1">{listingContext.title}</strong>
              </div>
          }

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {activeConversation.length > 0 ?
            activeConversation.map((msg, index) => {
              const isMine = msg.senderId === currentUserId;
              const showAvatar =
              index === 0 ||
              activeConversation[index - 1].senderId !== msg.senderId;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>

                      {!isMine && showAvatar &&
                  <div className="w-8 h-8 rounded-full bg-olive text-white flex items-center justify-center font-bold text-xs mr-2 mt-1 flex-shrink-0">
                          {getUserDetails(msg.senderId).name.charAt(0)}
                        </div>
                  }
                      {!isMine && !showAvatar && <div className="w-10" />}

                      <div
                    className={`max-w-[70%] ${isMine ? 'order-1' : 'order-2'}`}>

                        <div
                      className={`px-4 py-2 rounded-2xl ${isMine ? 'bg-ocean text-white rounded-tr-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'}`}>

                          <p className="text-sm whitespace-pre-wrap">
                            {msg.content}
                          </p>
                        </div>
                        <span
                      className={`text-[10px] text-gray-400 mt-1 block ${isMine ? 'text-right' : 'text-left'}`}>

                          {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                        </span>
                      </div>
                    </div>);

            }) :

            <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <MessageSquareIcon className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="font-medium text-gray-900">
                    Start a conversation
                  </p>
                  <p className="text-sm mt-1">
                    Send a message to{' '}
                    {getUserDetails(activeConversationId).name}
                  </p>
                </div>
            }
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <form
              onSubmit={handleSendMessage}
              className="flex items-end space-x-2">

                <div className="flex-grow">
                  <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full border-gray-300 rounded-xl focus:ring-ocean focus:border-ocean resize-none py-3 px-4 shadow-sm"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }} />

                </div>
                <Button
                type="submit"
                disabled={!newMessage.trim()}
                className="rounded-xl h-[48px] px-6">

                  <SendIcon className="w-5 h-5" />
                </Button>
              </form>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </> :

        <div className="h-full flex flex-col items-center justify-center text-gray-500 bg-gray-50">
            <div className="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
              <MessageSquareIcon className="w-12 h-12 text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Your Messages
            </h2>
            <p className="max-w-xs text-center">
              Select a conversation from the sidebar to start chatting with your
              Giya or Tawo.
            </p>
          </div>
        }
      </div>
    </div>);

}