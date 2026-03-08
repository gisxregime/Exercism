import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardIcon,
  UsersIcon,
  ListIcon,
  UserIcon,
  SearchIcon,
  EyeIcon,
  TrashIcon,
  FilterIcon,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import {
  mockGuides,
  mockListings,
  mockApplications,
  mockUsers,
} from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // ─── ALL HOOKS AT TOP LEVEL ────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Applications — real state so Approve/Reject updates the UI
  const [applications, setApplications] = useState(mockApplications);

  // Listings filters
  const [listingSearch, setListingSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Users filters
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  // Guides search
  const [guideSearch, setGuideSearch] = useState('');

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  // ─── TABS CONFIG ───────────────────────────────────────────────────────────
  const tabs = [
    { id: 'overview',     label: 'Overview',           icon: HomeIcon      },
    { id: 'applications', label: 'Guide Applications', icon: ClipboardIcon },
    { id: 'guides',       label: 'Manage Guides',      icon: UsersIcon     },
    { id: 'listings',     label: 'Manage Listings',    icon: ListIcon      },
    { id: 'users',        label: 'All Users',          icon: UserIcon      },
  ];

  // ─── HANDLERS ─────────────────────────────────────────────────────────────
  const handleApprove = (id) =>
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'approved' } : a))
    );

  const handleReject = (id) =>
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'rejected' } : a))
    );

  // ─── DERIVED / FILTERED DATA ───────────────────────────────────────────────
  const pendingCount = applications.filter((a) => a.status === 'pending').length;

  const categories = ['All', ...Array.from(new Set(mockListings.map((l) => l.category)))];

  const filteredListings = mockListings.filter((l) => {
    const matchSearch = l.title.toLowerCase().includes(listingSearch.toLowerCase());
    const matchCat = categoryFilter === 'All' || l.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const filteredGuides = mockGuides.filter((g) =>
    g.name.toLowerCase().includes(guideSearch.toLowerCase())
  );

  const allUsers = [...mockUsers, ...mockGuides];
  const filteredUsers = allUsers.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchRole = roleFilter === 'All' || u.role === roleFilter.toLowerCase();
    return matchSearch && matchRole;
  });

  // ─── OVERVIEW ──────────────────────────────────────────────────────────────
  const renderOverview = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-l-4 border-l-ocean">
          <p className="text-sm text-gray-500 font-medium mb-1">Total Users</p>
          <p className="text-3xl font-bold text-gray-900">
            {mockUsers.length + mockGuides.length}
          </p>
        </Card>
        <Card className="p-6 border-l-4 border-l-olive">
          <p className="text-sm text-gray-500 font-medium mb-1">Active Guides</p>
          <p className="text-3xl font-bold text-gray-900">
            {mockGuides.filter((g) => g.isApproved).length}
          </p>
        </Card>
        <Card className="p-6 border-l-4 border-l-amber-500 bg-amber-50">
          <p className="text-sm text-amber-800 font-medium mb-1">Pending Applications</p>
          <p className="text-3xl font-bold text-amber-600">{pendingCount}</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-purple-500">
          <p className="text-sm text-gray-500 font-medium mb-1">Total Listings</p>
          <p className="text-3xl font-bold text-gray-900">{mockListings.length}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Pending Applications</h3>
          <div className="space-y-3">
            {applications
              .filter((a) => a.status === 'pending')
              .map((app) => (
                <div
                  key={app.id}
                  className="flex justify-between items-center p-3 border border-gray-100 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">Applicant ID: {app.userId}</p>
                    <p className="text-xs text-gray-500">
                      Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button size="sm" onClick={() => setActiveTab('applications')}>
                    Review
                  </Button>
                </div>
              ))}
            {pendingCount === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">
                No pending applications 🎉
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );

  // ─── APPLICATIONS ──────────────────────────────────────────────────────────
  const renderApplications = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Guide Applications</h2>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600 text-sm">Applicant ID</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Date Applied</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Documents</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="p-4 text-sm font-medium text-gray-900">{app.userId}</td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(app.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm text-ocean hover:underline cursor-pointer">
                    {app.documents.length} files
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={
                        app.status === 'pending'
                          ? 'amber'
                          : app.status === 'approved'
                          ? 'success'
                          : 'danger'
                      }
                    >
                      {app.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {app.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(app.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleReject(app.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // ─── GUIDES ────────────────────────────────────────────────────────────────
  const renderGuides = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Guides</h2>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search guides..."
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-ocean focus:border-ocean"
            value={guideSearch}
            onChange={(e) => setGuideSearch(e.target.value)}
          />
        </div>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600 text-sm">Name</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Location</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Rating</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredGuides.map((guide) => (
                <tr key={guide.id} className="hover:bg-gray-50">
                  <td className="p-4 text-sm font-medium text-gray-900">{guide.name}</td>
                  <td className="p-4 text-sm text-gray-500">{guide.location}</td>
                  <td className="p-4 text-sm text-gray-500">★ {guide.rating}</td>
                  <td className="p-4">
                    <Badge variant={guide.isApproved ? 'success' : 'gray'}>
                      {guide.isApproved ? 'Active' : 'Deactivated'}
                    </Badge>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-ocean">
                      <EyeIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredGuides.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No guides found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // ─── LISTINGS ──────────────────────────────────────────────────────────────
  const renderListings = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">Manage Listings</h2>
        <div className="flex space-x-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search listings..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-ocean focus:border-ocean"
              value={listingSearch}
              onChange={(e) => setListingSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:ring-ocean focus:border-ocean appearance-none bg-white"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <FilterIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600 text-sm">Title</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Guide</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Location</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Price</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Category</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredListings.map((listing) => {
                const guide = mockGuides.find((g) => g.id === listing.guideId);
                return (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td
                      className="p-4 text-sm font-medium text-gray-900 max-w-xs truncate"
                      title={listing.title}
                    >
                      {listing.title}
                    </td>
                    <td className="p-4 text-sm text-gray-500">{guide?.name || 'Unknown'}</td>
                    <td className="p-4 text-sm text-gray-500">{listing.location}</td>
                    <td className="p-4 text-sm text-gray-900 font-medium">
                      ₱{listing.price.toLocaleString()}
                    </td>
                    <td className="p-4 text-sm text-gray-500">{listing.category}</td>
                    <td className="p-4">
                      <Badge variant={listing.isActive ? 'success' : 'gray'}>
                        {listing.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-ocean"
                        onClick={() => alert(`Toggle status for ${listing.title}`)}
                      >
                        {listing.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this listing?')) {
                            alert('Listing deleted');
                          }
                        }}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredListings.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No listings found matching your criteria.
            </div>
          )}
        </div>
      </Card>
    </div>
  );

  // ─── USERS ─────────────────────────────────────────────────────────────────
  const renderUsers = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Users</h2>
          <p className="text-sm text-gray-500 mt-1">Total: {filteredUsers.length} users</p>
        </div>
        <div className="flex space-x-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search name or email..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-ocean focus:border-ocean"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:ring-ocean focus:border-ocean appearance-none bg-white"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="Tawo">Tawo</option>
              <option value="Giya">Giya</option>
              <option value="Admin">Admin</option>
            </select>
            <FilterIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600 text-sm">Name</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Email</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Role</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Location</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Joined Date</th>
                <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="p-4 text-sm font-medium text-gray-900">{u.name}</td>
                  <td className="p-4 text-sm text-gray-500">{u.email}</td>
                  <td className="p-4">
                    <Badge
                      variant={
                        u.role === 'admin' ? 'amber' : u.role === 'giya' ? 'olive' : 'ocean'
                      }
                      className="capitalize"
                    >
                      {u.role}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-gray-500">{u.location || '-'}</td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-ocean">
                      <EyeIcon className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No users found matching your criteria.
            </div>
          )}
        </div>
      </Card>
    </div>
  );

  // ─── LAYOUT ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center sticky top-16 z-20">
        <span className="font-bold">Admin Menu</span>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-600 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-full md:w-64 bg-gray-900 text-white flex-shrink-0 md:min-h-[calc(100vh-64px)] md:sticky md:top-16 ${
          isMobileMenuOpen ? 'block' : 'hidden md:block'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-ocean text-white flex items-center justify-center font-bold">
              A
            </div>
            <div>
              <p className="font-bold line-clamp-1">Admin Panel</p>
              <p className="text-xs text-gray-400">LaagTa System</p>
            </div>
          </div>

          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-ocean text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  {tab.label}
                  {/* Pending badge on Applications tab */}
                  {tab.id === 'applications' && pendingCount > 0 && (
                    <span className="ml-auto bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 md:p-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'overview'     && renderOverview()}
          {activeTab === 'applications' && renderApplications()}
          {activeTab === 'guides'       && renderGuides()}
          {activeTab === 'listings'     && renderListings()}
          {activeTab === 'users'        && renderUsers()}
        </div>
      </div>
    </div>
  );
}