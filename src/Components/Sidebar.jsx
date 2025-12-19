import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutGrid, 
  CreditCard, 
  FileText, 
  Archive,
  Star,
  Eye,
  Upload,
  Settings,
  Key,
  Shield,
  User,
  Briefcase
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navigationItems = [
    {
      icon: LayoutGrid,
      label: "All Items",
      path: "/vault-items",
      badge: null,
    },
    {
      icon: Briefcase,
      label: "Vault",
      path: "/vault",
      badge: null,
    },
    {
      icon: FileText,
      label: "Documents",
      path: "/documents",
      badge: null,
    },
    {
      icon: Shield,
      label: "Password Health",
      path: "/health",
      badge: null,
    },
  ];

  const categoriesItems = [
    {
      icon: Key,
      label: "Logins",
      path: "/vault-items?category=loginCredentials",
    },
    {
      icon: Shield,
      label: "Identities",
      path: "/vault-items?category=idCards",
    },
  ];

  const tagsItems = [
    {
      icon: Star,
      label: "Favorites",
      path: "/favorites",
    },
    {
      icon: Eye,
      label: "Watchtower",
      path: "/watchtower",
    },
    {
      icon: Upload,
      label: "Imported",
      path: "/imported",
    },
    {
      icon: Archive,
      label: "Archive",
      path: "/archive",
    },
  ];

  const NavItem = ({ icon: Icon, label, path, badge, onClick }) => (
    <button
      onClick={() => {
        if (onClick) onClick();
        else navigate(path);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
        isActive(path)
          ? "bg-green-50 text-green-600"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <Icon size={20} className={isActive(path) ? "text-green-600" : "text-gray-700 group-hover:text-gray-900"} />
      <span className="flex-1 text-left font-medium text-sm">{label}</span>
      {badge && (
        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      <svg 
        className={`w-4 h-4 transition-transform ${isActive(path) ? "text-green-600" : "text-gray-400 group-hover:text-gray-600"}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );

  const SectionTitle = ({ children }) => (
    <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-4 mb-2 mt-6">
      {children}
    </h3>
  );

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-screen overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-100 transition-colors shadow-sm border border-gray-200">
          <div className="relative">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 text-sm truncate">All your passwords in one</p>
            <p className="text-xs text-gray-600 truncate">secure place</p>
          </div>
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Get Started Button */}
      <div className="p-4">
        <button
          onClick={() => navigate("/vault")}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Get Started
        </button>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto px-2">
        {/* Main Navigation */}
        <div className="mb-2">
          {navigationItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </div>

        {/* Favorites */}
        <SectionTitle>Favorites</SectionTitle>
        <NavItem
          icon={Star}
          label="Favorites"
          path="/favorites"
        />

        {/* Watchtower */}
        <SectionTitle>Watchtower</SectionTitle>
        <NavItem
          icon={Eye}
          label="Watchtower"
          path="/watchtower"
        />

        {/* Imported */}
        <SectionTitle>Imported</SectionTitle>
        <NavItem
          icon={Upload}
          label="Imported"
          path="/imported"
        />

        {/* Categories */}
        <SectionTitle>Categories</SectionTitle>
        {categoriesItems.map((item, idx) => (
          <NavItem key={idx} {...item} />
        ))}

        {/* Tags */}
        <SectionTitle>Tags</SectionTitle>
        <NavItem
          icon={Star}
          label="Starter Kit"
          path="/tags/starter"
        />

        {/* Archive */}
        <SectionTitle>Archive</SectionTitle>
        <NavItem
          icon={Archive}
          label="Archive"
          path="/archive"
        />
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => navigate("/settings")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
        >
          <Settings size={20} />
          <span className="flex-1 text-left font-medium text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
