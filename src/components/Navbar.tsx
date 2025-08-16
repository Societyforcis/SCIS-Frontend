"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { scrollToTop } from "../utils/scrollUtils"
import { useNavigationWithLoading } from "../hooks/useNavigationWithLoading"
import {
  ChevronDown,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Shield,
  Brain,
  Building2,
  Calendar,
  LogIn,
  UserPlus,
  User,
  Settings,
  LogOut,
  UserCircle,
  Bell,
  BellRing,
  BookOpen,
  
} from "lucide-react"
import lo from "./images/lo.png"
import { useAppSelector, useAppDispatch } from "../redux/hooks"
import { logout, setAuth } from "../redux/slices/authSlice"
import axios from 'axios';

declare global {
  interface WindowEventMap {
    authStatusChanged: CustomEvent
  }
}

const getMenuItems = (isAdmin: boolean) => [
  {
    title: "AboutUs",
    icon: Shield,
    items: [
      { name: "Overview", path: "/overview" },
      { name: "Vision & Mission", path: "/vision-mission" },
      { name: "History", path: "/history" },
    ],
  },
  {
    title: "CyIntelligence",
    icon: Brain,
    items: [
      { name: "Research", path: "/research" },
      { name: "Innovation & Technology", path: "/technology" },
      { name: "Solutions", path: "/solutions" },
    ],
  },
  {
    title: "Governance",
    icon: Building2,
    items: [
      { name: "Board", path: "/board" },
      { name: "Policies", path: "/policies" },
      { name: "Reports", path: "/reports" },
      { name: "MOU", path: "/mou" },
    ],
  },
  {
    title: "Happenings",
    icon: Calendar,
    items: [
      { name: "Events", path: "/events" },
      { name: "FDP", path: "/fdp" },
      { name: "Webinars", path: "/webinars" },
      { name: "Conferences", path: "/conferences" },
    ],
  },
  {
    title: "Membership",
    icon: User,
    items: [
      { name: "Awards", path: "/awards" },
      { name: "Benefits", path: "/benefits" },
    ],
  },
  {
    title: "Journals",
    icon: BookOpen,
    items: [
  
      { name: "Journal", path: "/Journals" },
    ],
  },
  // ...(isAdmin ? [{
  //   title: "Dashboard",
  //   icon: Shield,
  //   items: [
  //     { name: "Admin Dashboard", path: "/admin" },
  //     { name: "Analytics", path: "/admin/analytics" },
  //     { name: "Users", path: "/admin/users" },
  //   ],
  // }] : []),
  {
    title: "ReachUs",
    icon: Mail,
    items: [{ name: "ContactUs", path: "/contact" }],
  },
]

interface NotificationCount {
  count: number;
}

const Navbar = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate()
  const { navigateWithLoading } = useNavigationWithLoading()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (!token || !userStr) {
          return { isAuthenticated: false, user: null };
        }

        try {
          const user = JSON.parse(userStr);
          return {
            isAuthenticated: true,
            user
          };
        } catch (parseError) {
          console.error('Error parsing user data:', parseError);
          // Clear invalid data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          return { isAuthenticated: false, user: null };
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        return { isAuthenticated: false, user: null };
      }
    };

    // Check auth status on mount
    checkAuthStatus();
    
    // Set up event listeners
    window.addEventListener("storage", checkAuthStatus);
    window.addEventListener("authStatusChanged", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("authStatusChanged", checkAuthStatus);
    };
  }, [dispatch, isAuthenticated])

  // Update the fetchUnreadCount function
const fetchUnreadCount = async () => {
  const token = localStorage.getItem('token');
  if (!token || !user?._id) {
    return;
  }
  
  try {
    const apiBase = process.env.NODE_ENV === 'production' 
      ? '/api' 
      : `${import.meta.env.VITE_API_URL}/api`;
      
    const response = await fetch(`${apiBase}/notifications/unread-count`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        setUnreadCount(result.data.count);
      }
    }
  } catch (error) {
    console.error('Error fetching unread count:', error);
  }
};

  // Set up polling for unread notifications
useEffect(() => {
  if (isAuthenticated && user?._id) {
    // Fetch immediately on mount
    fetchUnreadCount();
    
    // Then fetch every 30 seconds
    const intervalId = setInterval(fetchUnreadCount, 30000);
    
    // Clean up on unmount
    return () => clearInterval(intervalId);
  }
}, [isAuthenticated, user]);

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId') || '65f8e4b7d4f8a8c8f8f8';
      
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/notifications/mark-all-read?userId=${userId}`,
        {},
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );
      
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showNotifications && !target.closest('.notification-dropdown')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const handleLogout = () => {
    // Dispatch logout action first
    dispatch(logout())

    // Then clear local storage
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.removeItem("userRole")

    setShowProfileDropdown(false)
    window.dispatchEvent(new CustomEvent("authStatusChanged"))

    // Navigate after everything is cleared
    navigate("/")
  }

  const handleNavigation = (path: string) => {
    scrollToTop()
    navigateWithLoading(path)
    setIsMobileMenuOpen(false)
    setShowProfileDropdown(false)
  }

  const profileMenuItems = [
    { label: "My Profile", path: "/profile", icon: User },
    { label: "Settings", path: "/settings", icon: Settings },
    { label: "Notifications", path: "/notifications", icon: Bell },
    { label: "Membership", path: "/membership", icon: Shield },
  ]

  // Get menu items based on admin status
  const menuItems = getMenuItems(user?.isAdmin || false)

  const handleNotificationClick = () => {
    navigate('/notifications');
    setShowNotifications(false);
  };

  const handleNotificationIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Instead of toggling dropdown, navigate directly to notifications page
    navigate('/notifications');
  };

  const notificationButton = (
    <div className="relative">
      <button
        onClick={handleNotificationIconClick}
        className="p-1 xl:p-2 rounded-full hover:bg-gray-100 relative"
        aria-label="Notifications"
      >
        {unreadCount > 0 ? (
          <BellRing className="h-4 w-4 xl:h-5 xl:w-5 text-gray-600" />
        ) : (
          <Bell className="h-4 w-4 xl:h-5 xl:w-5 text-gray-600" />
        )}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 xl:h-5 xl:w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 notification-dropdown"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-700">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div 
              className="p-4 text-center text-gray-500 cursor-pointer hover:bg-gray-50"
              onClick={handleNotificationClick}
            >
              View all notifications
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-4">
        <div className="border-b py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 text-sm text-gray-600"></div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2 text-gray-600 font-medium">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                <span className="text-xs sm:text-sm">info@societycis.org</span>
              </div>
              <div className="hidden sm:flex gap-2 sm:gap-4 border-l pl-2 sm:pl-4">
                <a
                  href="https://www.facebook.com/"
                  className="text-gray-600 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="https://twitter.com/"
                  className="text-gray-600 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="https://www.LinkedIn.com/"
                  className="text-gray-600 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <div className="py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Logo and title */}
              <div className="flex items-center gap-4">
                <img
                  src={lo || "/placeholder.svg"}
                  alt="logo"
                  className="h-16 w-16 sm:h-24 sm:w-24 lg:h-36 lg:w-36 object-contain transform hover:scale-105 transition-transform duration-300"
                />
                <Link to="/" className="hidden sm:block">
                  <div className="text-left">
                    <div className="text-sm lg:text-base text-gray-600 font-medium">
                      Society for
                    </div>
                    <div className="font-serif text-xl lg:text-2xl font-bold text-[#2d3436]">
                      Cyber Intelligent System
                      <p className="text-sm text-blue-600 mt-1 font-normal">
                        <span>Reg: S.No: 78/2025</span>
                        <br />
                        <span>DARPAN (NGO): PY/2025/0684517</span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="hidden lg:flex items-center justify-end flex-grow ml-4 xl:ml-[150px]">
                {/* Add admin indicator */}
                {user?.isAdmin && (
                  <button
                    onClick={() => handleNavigation("/admin")}
                    className="flex items-center gap-1 xl:gap-2 px-2 xl:px-4 py-2 mr-2 xl:mr-4 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors text-xs xl:text-sm font-semibold"
                  >
                    <Shield className="h-3 w-3 xl:h-4 xl:w-4" />
                    <span className="hidden xl:inline">Admin Dashboard</span>
                    <span className="xl:hidden">Admin</span>
                  </button>
                )}

                {/* Existing menu items */}
                {menuItems.map((item) => (
                  <div
                    key={item.title}
                    className="relative"
                    onMouseEnter={() => setActiveMenu(item.title)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <button className={`flex items-center px-1 xl:px-4 text-xs xl:text-sm ${
                      item.title === "ReachUs" && user?.isAdmin ? 
                      "text-red-500 font-semibold" : 
                      "text-gray-700"
                    } hover:text-red-500 transition-all duration-300 font-medium whitespace-nowrap`}>
                      <item.icon className="h-3 w-3 xl:h-4 xl:w-4 mr-1" />
                      <span className="hidden xl:inline">{item.title}</span>
                      <span className="xl:hidden text-xs">{item.title.slice(0, 4)}</span>
                      <ChevronDown
                        className={`h-3 w-3 xl:h-4 xl:w-4 ml-0.5 xl:ml-1 transform transition-transform duration-300 ${
                          activeMenu === item.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeMenu === item.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 mt-2 z-50"
                        >
                          {item.items.map((subItem) => (
                            <button
                              key={subItem.name}
                              onClick={() => {
                                scrollToTop()
                                navigateWithLoading(subItem.path)
                                setActiveMenu(null)
                              }}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500 font-medium w-full text-left"
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="hidden sm:flex items-center gap-1 xl:gap-2 ml-2 xl:ml-4">
                  {isAuthenticated ? (
                    <div className="relative">
                      <button
                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                        className="flex items-center gap-1 xl:gap-2 p-2 rounded-full hover:bg-red-50 transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 xl:w-10 xl:h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <User className="h-4 w-4 xl:h-5 xl:w-5 text-white" />
                        </div>
                        <ChevronDown
                          className={`h-3 w-3 xl:h-4 xl:w-4 text-gray-600 transition-transform duration-300 ${showProfileDropdown ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence>
                        {showProfileDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full right-0 w-64 bg-white shadow-xl rounded-xl py-3 mt-2 z-50 border border-gray-100"
                          >
                            {/* User Info */}
                            <div className="px-4 py-3 border-b border-gray-100">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                                  <User className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">Welcome back!</p>
                                  <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                                </div>
                              </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                              {user?.isAdmin && (
                                <button
                                  onClick={() => handleNavigation("/admin")}
                                  className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 w-full text-left font-semibold border-b border-gray-100"
                                >
                                  <Shield className="h-4 w-4" />
                                  Admin Dashboard
                                </button>
                              )}
                              
                              {/* Existing menu items */}
                              <button
                                onClick={() => handleNavigation("/profile")}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 w-full text-left transition-all duration-200"
                              >
                                <UserCircle className="h-4 w-4" />
                                My Profile
                              </button>
                              <button
                                onClick={() => handleNavigation("/membership")}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 w-full text-left transition-all duration-200"
                              >
                                <Shield className="h-4 w-4" />
                                Membership
                              </button>
                              <button
                                onClick={() => handleNavigation("/notifications")}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 w-full text-left transition-all duration-200"
                              >
                                <Bell className="h-4 w-4" />
                                Notifications
                              </button>
                              <button
                                onClick={() => handleNavigation("/settings")}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 w-full text-left transition-all duration-200"
                              >
                                <Settings className="h-4 w-4" />
                                Settings
                              </button>
                            </div>

                            {/* Logout */}
                            <div className="border-t border-gray-100 pt-2">
                              <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-all duration-200 font-medium"
                              >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          scrollToTop()
                          navigateWithLoading("/login")
                        }}
                        className="flex items-center gap-1 xl:gap-2 text-gray-700 hover:text-red-500 transition-all duration-300 font-medium text-xs xl:text-sm px-2 xl:px-3 py-1 xl:py-2"
                      >
                        <LogIn className="h-3 w-3 xl:h-4 xl:w-4" />
                        <span className="hidden lg:inline">SignIn</span>
                      </button>
                      <button
                        onClick={() => {
                          scrollToTop()
                          navigateWithLoading("/signIn")
                        }}
                        className="flex items-center gap-1 xl:gap-2 px-2 xl:px-4 py-1 xl:py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-xs xl:text-sm"
                      >
                        <UserPlus className="h-3 w-3 xl:h-4 xl:w-4" />
                        <span className="hidden lg:inline">CreateAccount</span>
                        <span className="lg:hidden">Join</span>
                      </button>
                    </>
                  )}
                </div>
                {isAuthenticated && notificationButton}
              </div>

              <div className="flex items-center gap-2 lg:gap-4">
                {/* Mobile notification button for authenticated users */}
                {isAuthenticated && (
                  <div className="lg:hidden">
                    {notificationButton}
                  </div>
                )}
                
                <button
                  className="lg:hidden p-2 transition-all duration-300 hover:opacity-70"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <div
                    className={`w-6 h-0.5 bg-gray-600 mb-1.5 transition-transform ${
                      isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  ></div>
                  <div className={`w-6 h-0.5 bg-gray-600 mb-1.5 ${isMobileMenuOpen ? "opacity-0" : ""}`}></div>
                  <div
                    className={`w-6 h-0.5 bg-gray-600 transition-transform ${
                      isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  ></div>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden mt-4"
                >
                  {menuItems.map((item) => (
                    <div key={item.title} className="py-2">
                      <button
                        onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
                        className={`flex items-center justify-between w-full px-4 py-2 ${
                          item.title === "ReachUs" && user?.isAdmin ? 
                          "text-red-500 font-semibold" : 
                          "text-gray-700"
                        } font-medium`}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          {item.title}
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${activeMenu === item.title ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence>
                        {activeMenu === item.title && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gray-50 px-8 py-2"
                          >
                            {item.items.map((subItem) => (
                              <button
                                key={subItem.name}
                                onClick={() => {
                                  scrollToTop()
                                  navigateWithLoading(subItem.path)
                                  setIsMobileMenuOpen(false)
                                  setActiveMenu(null)
                                }}
                                className="block py-2 text-sm text-gray-600 hover:text-red-500 font-medium w-full text-left"
                              >
                                {subItem.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  <div className="sm:hidden py-4 border-t border-gray-100 mt-2">
                    {isAuthenticated ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 px-4 py-2">
                          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">Welcome back!</p>
                            <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                          </div>
                        </div>
                        
                        {/* Add admin dashboard button at the top for admin users */}
                        {user?.isAdmin && (
                          <button
                            onClick={() => handleNavigation("/admin")}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 w-full text-left font-semibold"
                          >
                            <Shield className="h-4 w-4" />
                            Admin Dashboard
                          </button>
                        )}

                        {/* Regular menu items */}
                        <button
                          onClick={() => handleNavigation("/profile")}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500 w-full text-left"
                        >
                          <UserCircle className="h-4 w-4" />
                          My Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 w-full text-left font-medium"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            scrollToTop()
                            navigateWithLoading("/login")
                            setIsMobileMenuOpen(false)
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500 w-full text-left"
                        >
                          <LogIn className="h-4 w-4" />
                          Sign In
                        </button>
                        <button
                          onClick={() => {
                            scrollToTop()
                            navigateWithLoading("/signup")
                            setIsMobileMenuOpen(false)
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500 w-full text-left"
                        >
                          <UserPlus className="h-4 w-4" />
                          CreateAccount
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
