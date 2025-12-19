import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RequireAuth from "./common/RequireAuth";
import AddItemModal from "./AddItemModal";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { 
  Search, 
  Plus, 
  Eye, 
  EyeOff, 
  Copy, 
  Edit, 
  Trash2,
  Star,
  X,
  Check,
  ExternalLink,
  Share2,
  Clock,
  Lock,
  CreditCard,
  Code,
  Wallet,
  FileText,
  Zap,
  LayoutGrid,
  ArrowRight,
  Bookmark
} from "lucide-react";

const VaultItems = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPassword, setShowPassword] = useState({});
  const [copiedField, setCopiedField] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchQuery, categoryFilter]);

  const fetchItems = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      const feeds = res?.data?.ownedFeeds || [];
      setItems(feeds);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    }
  };

  const filterItems = () => {
    let filtered = items;

    // Filter by category if specified
    if (categoryFilter) {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const handleCopy = async (value, fieldName) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const togglePasswordVisibility = (fieldName) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`${BASE_URL}/feed/${selectedItem._id}`, {
        withCredentials: true,
      });
      fetchItems();
      setSelectedItem(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...selectedItem.data });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(
        `${BASE_URL}/feed/${selectedItem._id}`,
        { ...selectedItem, data: editedData },
        { withCredentials: true }
      );
      fetchItems();
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedData({});
  };

  const getCategoryIcon = (category) => {
    const icons = {
      loginCredentials: "🔐",
      banking: "🏦",
      apiKeys: "🧬",
      idCards: "🪪",
      secureNotes: "📝",
      others: "✨",
    };
    return icons[category] || "📁";
  };

  const getCategoryConfig = (category) => {
    const configs = {
      "userId-password": {
        name: "Login Credentials",
        icon: Lock,
        color: "from-emerald-600 to-teal-600",
        bgColor: "bg-emerald-100",
        textColor: "text-emerald-700",
        borderColor: "border-emerald-300",
      },
      creditCard: {
        name: "Credit & Debit Cards",
        icon: CreditCard,
        color: "from-blue-600 to-cyan-600",
        bgColor: "bg-blue-100",
        textColor: "text-blue-700",
        borderColor: "border-blue-300",
      },
      apiKey: {
        name: "API Keys",
        icon: Code,
        color: "from-purple-600 to-pink-600",
        bgColor: "bg-purple-100",
        textColor: "text-purple-700",
        borderColor: "border-purple-300",
      },
      aadharCard: {
        name: "ID Cards",
        icon: Wallet,
        color: "from-orange-600 to-red-600",
        bgColor: "bg-orange-100",
        textColor: "text-orange-700",
        borderColor: "border-orange-300",
      },
      panCard: {
        name: "ID Cards",
        icon: Wallet,
        color: "from-orange-600 to-red-600",
        bgColor: "bg-orange-100",
        textColor: "text-orange-700",
        borderColor: "border-orange-300",
      },
      note: {
        name: "Secure Notes",
        icon: FileText,
        color: "from-rose-600 to-pink-600",
        bgColor: "bg-rose-100",
        textColor: "text-rose-700",
        borderColor: "border-rose-300",
      },
      bankLockerKey: {
        name: "Banking & Keys",
        icon: Zap,
        color: "from-slate-600 to-gray-600",
        bgColor: "bg-slate-100",
        textColor: "text-slate-700",
        borderColor: "border-slate-300",
      },
      debitCard: {
        name: "Credit & Debit Cards",
        icon: CreditCard,
        color: "from-blue-600 to-cyan-600",
        bgColor: "bg-blue-100",
        textColor: "text-blue-700",
        borderColor: "border-blue-300",
      },
      others: {
        name: "Other Items",
        icon: LayoutGrid,
        color: "from-indigo-600 to-blue-600",
        bgColor: "bg-indigo-100",
        textColor: "text-indigo-700",
        borderColor: "border-indigo-300",
      },
    };
    return configs[category] || configs.others;
  };

  const formatFieldName = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const renderFieldValue = (key, value) => {
    const isPassword = key.toLowerCase().includes("password") || 
                       key.toLowerCase().includes("pin") ||
                       key.toLowerCase().includes("secret");
    const isUrl = key.toLowerCase().includes("url") || 
                  key.toLowerCase().includes("website") ||
                  key.toLowerCase().includes("link");

    if (isEditing) {
      return (
        <input
          type={isPassword && !showPassword[key] ? "password" : "text"}
          value={editedData[key] || ""}
          onChange={(e) =>
            setEditedData((prev) => ({ ...prev, [key]: e.target.value }))
          }
          className="w-full bg-white text-gray-900 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-300"
        />
      );
    }

    return (
      <div className="flex items-center gap-2 group">
        <span className="text-gray-900 flex-1 break-all">
          {isPassword && !showPassword[key] ? "••••••••••" : value}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {isPassword && (
            <button
              onClick={() => togglePasswordVisibility(key)}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              title={showPassword[key] ? "Hide" : "Show"}
            >
              {showPassword[key] ? (
                <EyeOff size={16} className="text-gray-600" />
              ) : (
                <Eye size={16} className="text-gray-600" />
              )}
            </button>
          )}
          <button
            onClick={() => handleCopy(value, key)}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors relative"
            title="Copy"
          >
            {copiedField === key ? (
              <Check size={16} className="text-green-600" />
            ) : (
              <Copy size={16} className="text-gray-600" />
            )}
          </button>
          {isUrl && (
            <a
              href={value.startsWith("http") ? value : `https://${value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              title="Open in new tab"
            >
              <ExternalLink size={16} className="text-gray-600" />
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <RequireAuth>
      <div className="flex h-screen bg-gray-50">
        {/* Middle Panel - Items List */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
          {/* Category Header */}
          {categoryFilter && (() => {
            const categoryConfig = getCategoryConfig(categoryFilter);
            const IconComponent = categoryConfig.icon;
            return (
              <div className={`px-4 py-3 border-b border-gray-200 ${categoryConfig.bgColor}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${categoryConfig.bgColor} border ${categoryConfig.borderColor}`}>
                    <IconComponent className={`w-5 h-5 ${categoryConfig.textColor}`} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Category</p>
                    <h2 className={`text-sm font-bold ${categoryConfig.textColor}`}>{categoryConfig.name}</h2>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200 space-y-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search vault"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all border border-gray-200"
              />
            </div>
            <button
              onClick={() => setIsAddItemModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
            >
              <Plus size={18} />
              <span>Add Item</span>
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                <p className="font-medium mb-2">No items found</p>
                <p className="text-sm mb-4">Add your first credential to get started</p>
                <button
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium bg-green-50 hover:bg-green-100 px-3 py-2 rounded-lg transition-colors"
                >
                  <Plus size={16} />
                  Add Item
                </button>
              </div>
            ) : (
              filteredItems.map((item) => {
                const categoryConfig = getCategoryConfig(item.category);
                const IconComponent = categoryConfig.icon;
                return (
                  <button
                    key={item._id}
                    onClick={() => {
                      setSelectedItem(item);
                      setIsEditing(false);
                    }}
                    className={`w-full p-4 border-b border-gray-100 hover:bg-gradient-to-r from-gray-50 to-transparent transition-all group ${
                      selectedItem?._id === item._id ? `bg-gradient-to-r ${categoryConfig.bgColor.replace('bg-', 'from-')} border-l-4 ${categoryConfig.borderColor}` : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${categoryConfig.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <IconComponent className={`w-6 h-6 ${categoryConfig.textColor}`} strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate group-hover:text-green-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 truncate group-hover:text-gray-700 transition-colors">
                          {item.data?.email || item.data?.username || item.data?.accountNumber || item.data?.cardNumber || item.data?.key || ""}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-green-600 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Panel - Item Details */}
        <div className="flex-1 bg-white overflow-y-auto">
          {selectedItem ? (
            <div className="max-w-3xl mx-auto p-8">
              {(() => {
                const categoryConfig = getCategoryConfig(selectedItem.category);
                const IconComponent = categoryConfig.icon;
                return (
                  <>
                    {/* Header */}
                    <div className="mb-8 pb-6 border-b border-gray-200">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 ${categoryConfig.bgColor} rounded-2xl flex items-center justify-center`}>
                            <IconComponent className={`w-8 h-8 ${categoryConfig.textColor}`} strokeWidth={2} />
                          </div>
                          <div className="flex-1">
                            <p className={`text-xs font-bold uppercase tracking-wide ${categoryConfig.textColor} mb-1`}>
                              {categoryConfig.name}
                            </p>
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">
                              {selectedItem.title}
                            </h1>
                            <p className={`text-sm ${categoryConfig.textColor} font-medium`}>
                              {selectedItem.data?.email || selectedItem.data?.username || selectedItem.data?.accountNumber || selectedItem.data?.cardNumber || selectedItem.data?.key || "Credential"}
                            </p>
                          </div>
                        </div>
                        <button className={`p-2 ${categoryConfig.bgColor} hover:opacity-80 rounded-lg transition-all`}>
                          <Star size={24} className={categoryConfig.textColor} />
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        {isEditing ? (
                          <>
                            <button
                              onClick={handleSaveEdit}
                              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                              <Check size={18} />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                              <X size={18} />
                              <span>Cancel</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={handleEdit}
                              className={`flex items-center gap-2 bg-white hover:${categoryConfig.bgColor} text-gray-700 px-4 py-2 rounded-lg font-medium transition-all border-2 ${categoryConfig.borderColor} hover:text-${categoryConfig.textColor.split('-')[1]}-700`}
                            >
                              <Edit size={18} />
                              <span>Edit</span>
                            </button>
                            <button className={`flex items-center gap-2 bg-white hover:${categoryConfig.bgColor} text-gray-700 px-4 py-2 rounded-lg font-medium transition-all border-2 ${categoryConfig.borderColor} hover:text-${categoryConfig.textColor.split('-')[1]}-700`}>
                              <Share2 size={18} />
                              <span>Share</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Item Details */}
                    <div className="space-y-6">
                      {Object.entries(selectedItem.data || {}).map(([key, value]) => (
                        <div key={key} className="group">
                          <label className={`block text-sm font-semibold ${categoryConfig.textColor} mb-2 uppercase tracking-wide`}>
                            {formatFieldName(key)}
                          </label>
                          <div className={`p-3 rounded-lg ${categoryConfig.bgColor} border ${categoryConfig.borderColor}`}>
                            {renderFieldValue(key, value)}
                          </div>
                        </div>
                      ))}

                      {/* Website Section */}
                      {selectedItem.data?.website && (
                        <div className="pt-6 border-t border-gray-200">
                          <label className={`block text-sm font-semibold ${categoryConfig.textColor} mb-3 uppercase tracking-wide`}>
                            Website Info
                          </label>
                          <p className="text-gray-900 mb-3 break-all font-medium">{selectedItem.data.website}</p>
                          <p className="text-sm text-gray-600">
                            You can use this {categoryConfig.name.toLowerCase()} to sign in on {selectedItem.data.website}
                          </p>
                        </div>
                      )}

                      {/* Tags Section */}
                      <div className="pt-6 border-t border-gray-200">
                        <label className={`block text-sm font-semibold ${categoryConfig.textColor} mb-3 uppercase tracking-wide`}>
                          Tags & Actions
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <span className={`${categoryConfig.bgColor} text-gray-700 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 border ${categoryConfig.borderColor}`}>
                            {categoryConfig.name}
                            <button className="hover:text-red-600 transition-colors">
                              <X size={14} />
                            </button>
                          </span>
                        </div>
                      </div>

                      {/* Timestamps */}
                      {(selectedItem.createdAt || selectedItem.updatedAt) && (
                        <div className="pt-6 border-t border-gray-200 text-sm text-gray-600 space-y-2">
                          {selectedItem.createdAt && (
                            <div className="flex items-center gap-2">
                              <Clock size={16} />
                              <span>
                                Created: {new Date(selectedItem.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {selectedItem.updatedAt && (
                            <div className="flex items-center gap-2">
                              <Clock size={16} />
                              <span>
                                Modified: {new Date(selectedItem.updatedAt).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Delete Button */}
                      {!isEditing && (
                        <div className="pt-6 border-t border-gray-200">
                          <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-all font-medium"
                          >
                            <Trash2 size={18} />
                            <span>Delete Credential</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-600">
                <p className="text-xl mb-2">Select an item to view details</p>
                <p className="text-sm">
                  Choose an item from the list to see its information
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Add Item Modal */}
        <AddItemModal 
          isOpen={isAddItemModalOpen} 
          onClose={() => setIsAddItemModalOpen(false)}
          onItemAdded={fetchItems}
        />
      </div>
    </RequireAuth>
  );
};

export default VaultItems;
