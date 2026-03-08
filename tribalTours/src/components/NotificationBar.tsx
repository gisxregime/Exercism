import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BellIcon,
  CalendarIcon,
  MessageSquareIcon,
  StarIcon,
  InfoIcon,
  CheckIcon } from
'lucide-react';
import { mockNotifications } from '../data/mockData';
import { Notification } from '../types';
export function NotificationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] =
  useState<Notification[]>(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node))
      {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({
        ...n,
        isRead: true
      }))
    );
  };
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) =>
      n.id === id ?
      {
        ...n,
        isRead: true
      } :
      n
      )
    );
  };
  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <CalendarIcon className="w-5 h-5 text-ocean" />;
      case 'message':
        return <MessageSquareIcon className="w-5 h-5 text-olive" />;
      case 'rating':
        return <StarIcon className="w-5 h-5 text-amber-500" />;
      default:
        return <InfoIcon className="w-5 h-5 text-gray-500" />;
    }
  };
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-ocean relative p-2 focus:outline-none">

        <BellIcon className="w-5 h-5" />
        {unreadCount > 0 &&
        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
            {unreadCount}
          </span>
        }
      </button>

      {isOpen &&
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-gray-900">Notifications</h3>
            {unreadCount > 0 &&
          <button
            onClick={markAllAsRead}
            className="text-xs text-ocean hover:text-ocean/80 font-medium flex items-center">

                <CheckIcon className="w-3 h-3 mr-1" />
                Mark all read
              </button>
          }
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ?
          <div className="divide-y divide-gray-100">
                {notifications.map((notification) =>
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-start ${!notification.isRead ? 'bg-ocean/5' : ''}`}>

                    <div className="flex-shrink-0 mt-1 bg-white p-2 rounded-full shadow-sm border border-gray-100">
                      {getIcon(notification.type)}
                    </div>
                    <div className="ml-3 flex-grow">
                      <p
                  className={`text-sm ${!notification.isRead ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>

                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatTime(notification.createdAt)}
                      </p>
                    </div>
                    {!notification.isRead &&
              <div className="w-2 h-2 bg-ocean rounded-full mt-2 flex-shrink-0"></div>
              }
                  </div>
            )}
              </div> :

          <div className="p-8 text-center text-gray-500">
                <BellIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No notifications yet</p>
              </div>
          }
          </div>

          <div className="p-3 border-t border-gray-100 text-center bg-gray-50">
            <Link
            to="/tawo-dashboard"
            className="text-sm font-medium text-ocean hover:text-ocean/80"
            onClick={() => setIsOpen(false)}>

              View Dashboard
            </Link>
          </div>
        </div>
      }
    </div>);

}