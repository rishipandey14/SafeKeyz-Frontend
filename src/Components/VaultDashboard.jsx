import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequireAuth from "./common/RequireAuth";
import AddItemModal from "./AddItemModal";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { 
  LayoutGrid, 
  Lock, 
  CreditCard, 
  FileText, 
  Wallet, 
  Code, 
  Zap,
  Search,
  Plus,
  Settings,
  X
} from "lucide-react";

const VaultDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user?.user);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [vaultStats, setVaultStats] = useState({});

  useEffect(() => {
    // Check if user is new (you can use localStorage or user data)
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
    fetchVaultStats();
  }, []);

  const fetchVaultStats = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      const feeds = res?.data?.ownedFeeds || [];
      
      // Group feeds by category
      const stats = {};
      feeds.forEach((feed) => {
        const category = feed.category || "others";
        stats[category] = (stats[category] || 0) + 1;
      });
      setVaultStats(stats);
    } catch (err) {
      console.error("Failed to fetch vault stats:", err);
    }
  };

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    localStorage.setItem("hasSeenWelcome", "true");
  };

  const handleTakeTour = () => {
    setShowWelcome(false);
    localStorage.setItem("hasSeenWelcome", "true");
    // You can implement a tour here
  };

  // Vault categories matching backend exactly with better icons
  const vaultCategories = [
    {
      id: "userId-password",
      name: "Login Credentials",
      icon: Lock,
      color: "from-emerald-600 to-teal-600",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-700",
      count: vaultStats["userId-password"] || 0,
      description: "Usernames & Passwords"
    },
    {
      id: "creditCard",
      name: "Credit & Debit Cards",
      icon: CreditCard,
      color: "from-blue-600 to-cyan-600",
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      count: (vaultStats.creditCard || 0) + (vaultStats.debitCard || 0),
      description: "Payment Methods"
    },
    {
      id: "apiKey",
      name: "API Keys",
      icon: Code,
      color: "from-purple-600 to-pink-600",
      bgColor: "bg-purple-100",
      textColor: "text-purple-700",
      count: vaultStats.apiKey || 0,
      description: "Developer Keys"
    },
    {
      id: "aadharCard",
      name: "ID Cards",
      icon: Wallet,
      color: "from-orange-600 to-red-600",
      bgColor: "bg-orange-100",
      textColor: "text-orange-700",
      count: (vaultStats.aadharCard || 0) + (vaultStats.panCard || 0),
      description: "Identity Documents"
    },
    {
      id: "note",
      name: "Secure Notes",
      icon: FileText,
      color: "from-rose-600 to-pink-600",
      bgColor: "bg-rose-100",
      textColor: "text-rose-700",
      count: vaultStats.note || 0,
      description: "Private Notes & Docs"
    },
    {
      id: "bankLockerKey",
      name: "Banking & Keys",
      icon: Zap,
      color: "from-slate-600 to-gray-600",
      bgColor: "bg-slate-100",
      textColor: "text-slate-700",
      count: vaultStats.bankLockerKey || 0,
      description: "Bank Details & Keys"
    },
    {
      id: "others",
      name: "Other Items",
      icon: LayoutGrid,
      color: "from-indigo-600 to-blue-600",
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-700",
      count: vaultStats.others || 0,
      description: "Miscellaneous Items"
    },
  ];

  const totalItems = Object.values(vaultStats).reduce((acc, val) => acc + val, 0);

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50 text-gray-800">

        {/* Welcome Modal */}
        {showWelcome && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 border border-gray-200 relative animate-fadeIn">
              <button
                onClick={handleWelcomeClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-yellow-400 to-amber-500 p-6 rounded-2xl shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">
                Welcome to our vault!
              </h2>
              <p className="text-gray-600 text-center mb-8 leading-relaxed">
                In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={handleTakeTour}
                  className="flex-1 bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Take Short Tour
                </button>
                <button
                  onClick={handleWelcomeClose}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-all duration-200 border-2 border-gray-300"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Items</h1>
              <p className="text-gray-600 mt-1">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your vault
              </p>
            </div>
            <button
              onClick={() => setIsAddItemModalOpen(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus size={18} />
              <span>Add Item</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search vault"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-gray-800 placeholder-gray-500 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all border border-gray-300"
              />
            </div>
          </div>

          {/* Vault Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vaultCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => navigate(`/vault-items?category=${category.id}`)}
                  className="group bg-white hover:bg-gray-50 border border-gray-200 hover:border-green-400 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden relative"
                >
                  {/* Gradient background behind icon */}
                  <div className={`absolute inset-0 ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Icon Container */}
                  <div className="relative mb-6 flex items-center justify-between">
                    <div className={`p-4 rounded-xl ${category.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${category.textColor}`} strokeWidth={2} />
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full group-hover:bg-green-100 transition-colors">
                      {category.count} {category.count === 1 ? "item" : "items"}
                    </span>
                  </div>

                  {/* Category Info */}
                  <div className="relative space-y-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors text-lg line-clamp-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                      {category.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="relative mt-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/vault-items?category=${category.id}`);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                    >
                      <Plus size={16} />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Item Modal */}
        <AddItemModal 
          isOpen={isAddItemModalOpen} 
          onClose={() => setIsAddItemModalOpen(false)}
          onItemAdded={fetchVaultStats}
        />
      </div>
    </RequireAuth>
  );
};

export default VaultDashboard;
