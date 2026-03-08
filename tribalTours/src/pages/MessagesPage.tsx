import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ChatWindow } from '../components/ChatWindow';
export function MessagesPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  if (!user) return null;
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>
        <div className="h-[calc(100vh-200px)] min-h-[600px]">
          <ChatWindow currentUserId={user.id} />
        </div>
      </div>
    </div>);

}