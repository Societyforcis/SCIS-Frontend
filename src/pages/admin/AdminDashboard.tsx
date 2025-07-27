import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Navigate } from 'react-router-dom';
import UserManagement from '../../components/admin/UserManagement';
import MembershipManagement from '../../components/admin/MembershipManagement';
import AnnouncementManagement from '../../components/admin/AnnouncementManagement';

const AdminDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <UserManagement />
          <MembershipManagement />
          <AnnouncementManagement />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;