import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { Navigate, useNavigate } from 'react-router-dom';
import { Users, BadgeCheck, Bell, Settings, BarChart } from 'lucide-react';
import { setAuth } from '../../redux/slices/authSlice';
import Swal from 'sweetalert2';

// Import admin components
import UserManagement from '../../components/admin/UserManagement';
import MembershipManagement from '../../components/admin/MembershipManagement';
import AnnouncementManagement from '../../components/admin/AnnouncementManagement';
import ProfileManagement from '../../components/admin/ProfileManagement';
import NewsletterSubscriberManagement from '../../components/admin/NewsletterSubscriberManagement';

const AdminDashboard = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [stats, setStats] = useState([
    { label: 'Total Users', value: '...', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Members', value: '...', icon: BadgeCheck, color: 'bg-green-500' },
    { label: 'Notifications', value: '...', icon: Bell, color: 'bg-yellow-500' },
    { label: 'Newsletter Subscribers', value: '...', icon: BarChart, color: 'bg-purple-500' },
  ]);
  
  // Fetch dashboard stats
  useEffect(() => {
    if (token && activeTab === 'overview') {
      fetchDashboardStats();
    }
  }, [token, activeTab]);

  const fetchDashboardStats = async () => {
    try {
      // Fetch users count
      const usersResponse = await fetch('http://localhost:5000/api/admin/stats/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Fetch memberships count
      const membershipsResponse = await fetch('http://localhost:5000/api/admin/stats/memberships', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Fetch notifications count
      const notificationsResponse = await fetch('http://localhost:5000/api/admin/stats/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Fetch newsletter subscribers count
      const newsletterResponse = await fetch('http://localhost:5000/api/admin/stats/newsletter', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const usersData = await usersResponse.json();
      const membershipsData = await membershipsResponse.json();
      const notificationsData = await notificationsResponse.json();
      const newsletterData = await newsletterResponse.json();
      
      setStats([
        { label: 'Total Users', value: usersData.count.toString(), icon: Users, color: 'bg-blue-500' },
        { label: 'Active Members', value: membershipsData.count.toString(), icon: BadgeCheck, color: 'bg-green-500' },
        { label: 'Notifications', value: notificationsData.count.toString(), icon: Bell, color: 'bg-yellow-500' },
        { label: 'Newsletter Subscribers', value: newsletterData.count.toString(), icon: BarChart, color: 'bg-purple-500' },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      // First check if auth is already in Redux store
      if (token && (user?.isAdmin || user?.email === 'societyforcis.org@gmail.com')) {
        console.log("Admin auth already in Redux store");
        
        // If user has the special email but isAdmin flag is not set, update it
        if (user?.email === 'societyforcis.org@gmail.com' && !user.isAdmin) {
          dispatch(setAuth({
            token,
            user: { ...user, isAdmin: true }
          }));
        }
        
        setIsCheckingAuth(false);
        return;
      }

      // Then check localStorage
      const localToken = localStorage.getItem('token');
      const localUser = localStorage.getItem('user');
      
      if (localToken && localUser) {
        try {
          const parsedUser = JSON.parse(localUser);
          
          // Check if user has the special admin email
          const isAdminEmail = parsedUser.email === 'societyforcis.org@gmail.com';
          
          // Update isAdmin flag if it's the admin email
          if (isAdminEmail && !parsedUser.isAdmin) {
            parsedUser.isAdmin = true;
            // Update localStorage with the modified user
            localStorage.setItem('user', JSON.stringify(parsedUser));
          }
          
          // Restore auth state from localStorage to Redux
          dispatch(setAuth({
            token: localToken,
            user: parsedUser
          }));
          
          console.log("Restored auth state from localStorage");
          
          // Check if the restored user is admin or has admin email
          if (!parsedUser.isAdmin && !isAdminEmail) {
            // User is not admin, redirect to home
            Swal.fire({
              title: 'Access Denied',
              text: 'You do not have admin privileges',
              icon: 'error',
              confirmButtonText: 'Go to Home'
            }).then(() => {
              navigate('/');
            });
          }
          
          setIsCheckingAuth(false);
          return;
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
          // Clear corrupted data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      
      setIsCheckingAuth(false);
      
      // If we reach here, no valid auth was found
      Swal.fire({
        title: 'Authentication Required',
        text: 'Please login as administrator',
        icon: 'warning',
        confirmButtonText: 'Login',
      }).then(() => {
        navigate('/login', { 
          state: { 
            from: '/admin',
            message: 'Please login as administrator' 
          } 
        });
      });
    };

    checkAuth();
  }, [dispatch, navigate, token, user]);

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if not admin after auth check is complete
  if (!user?.isAdmin && user?.email !== 'societyforcis.org@gmail.com') {
    return <Navigate to="/" replace />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserManagement/>;
      case 'profiles':
        return <ProfileManagement />;
      case 'memberships':
        return <MembershipManagement />;
      case 'announcements':
        return <AnnouncementManagement />;
      case 'newsletters':
        return <NewsletterSubscriberManagement />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700">
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'users'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab('memberships')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'memberships'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Memberships
              </button>
              <button
                onClick={() => setActiveTab('announcements')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'announcements'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Announcements
              </button>
              <button
                onClick={() => setActiveTab('profiles')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'profiles'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Profiles
              </button>
              <button
                onClick={() => setActiveTab('newsletters')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'newsletters'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Newsletter Subs
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;