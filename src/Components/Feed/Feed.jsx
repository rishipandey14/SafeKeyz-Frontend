/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import RequireAuth from "../common/RequireAuth";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addDataInFeed } from "../../features/feed/feedSlice";
import FeedCategory from "./FeedCategory";
import { showToast } from "../../features/toast/toastSlice";
import { categoryGroups } from "./feedHelper";
import AddFeedForm from "./AddFeedForm";

const CATEGORY_META = {
  loginCredentials: {
    icon: "🔐",
    accent: "from-emerald-400/70 via-emerald-500/30 to-emerald-400/10",
    description: "Store usernames, passwords, and OTP backups securely.",
  },
  apiKeys: {
    icon: "🧬",
    accent: "from-sky-400/70 via-indigo-500/30 to-sky-400/10",
    description: "Safeguard developer tokens and integration secrets.",
  },
  banking: {
    icon: "🏦",
    accent: "from-amber-400/70 via-amber-500/30 to-amber-400/10",
    description: "Manage cards, pins, and locker information with confidence.",
  },
  idCards: {
    icon: "🪪",
    accent: "from-purple-400/70 via-purple-500/30 to-purple-400/10",
    description: "Keep personal IDs and government documents at hand.",
  },
  secureNotes: {
    icon: "📝",
    accent: "from-rose-400/70 via-rose-500/30 to-rose-400/10",
    description: "Capture private notes, codes, and reminders securely.",
  },
  others: {
    icon: "✨",
    accent: "from-slate-300/60 via-slate-400/20 to-slate-300/10",
    description: "Anything unique that deserves a protected home.",
  },
};

const Feed = () => {
  const dispatch = useDispatch();
  const [groupedFeeds, setGroupedFeeds] = useState({});
  const [sharedFeeds, setSharedFeeds] = useState({}); // For shared data
  const [mainSection, setMainSection] = useState('saved'); // 'saved' or 'shared'
  const initialCategoryKey = Object.keys(categoryGroups)[0] ?? "";
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryKey);
  const [showForm, setShowForm] = useState(false);
  const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(true);
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(true);
  
  // Determine which feeds to show based on main section
  const currentFeeds = mainSection === 'saved' ? groupedFeeds : sharedFeeds;
  const activeGroup = currentFeeds[selectedCategory] ?? null;
  
  const totalItems = React.useMemo(
    () =>
      Object.values(currentFeeds).reduce(
        (acc, group) => acc + (group?.items?.length ?? 0),
        0
      ),
    [currentFeeds]
  );

  const activeMeta = CATEGORY_META[selectedCategory] || CATEGORY_META.others;
  const showEmptyState = !activeGroup || activeGroup.items.length === 0;


  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      const ownedFeeds = res?.data?.ownedFeeds || [];
      const sharedFeedsData = res?.data?.sharedFeeds || [];
      
      
      dispatch(addDataInFeed(ownedFeeds));
      groupFeedsByCategory(ownedFeeds);
      groupSharedFeedsByCategory(sharedFeedsData);
    } catch (err) {
      console.error(err);
    }
  };

  const groupFeedsByCategory = (feeds = []) => {
    const baseGroups = Object.entries(categoryGroups).reduce(
      (acc, [groupKey, group]) => {
        acc[groupKey] = {
          displayName: group.displayName,
          items: [],
        };
        return acc;
      },
      {}
    );

    feeds.forEach((feed) => {
      const matchedKey = Object.entries(categoryGroups).find(([, group]) =>
        group.includes.includes(feed.category)
      )?.[0] ?? "others";

      if (!baseGroups[matchedKey]) {
        baseGroups[matchedKey] = {
          displayName: categoryGroups[matchedKey]?.displayName || "Other Items",
          items: [],
        };
      }

      baseGroups[matchedKey].items.push(feed);
    });

    setGroupedFeeds(baseGroups);
    setSelectedCategory((prev) =>
      baseGroups[prev] ? prev : Object.keys(baseGroups)[0] ?? ""
    );
  };

  const groupSharedFeedsByCategory = (feeds = []) => {
    console.log("Grouping shared feeds:", feeds);
    const baseGroups = Object.entries(categoryGroups).reduce(
      (acc, [groupKey, group]) => {
        acc[groupKey] = {
          displayName: group.displayName,
          items: [],
        };
        return acc;
      },
      {}
    );

    feeds.forEach((feed) => {
      const matchedKey = Object.entries(categoryGroups).find(([, group]) =>
        group.includes.includes(feed.category)
      )?.[0] ?? "others";

      if (!baseGroups[matchedKey]) {
        baseGroups[matchedKey] = {
          displayName: categoryGroups[matchedKey]?.displayName || "Other Items",
          items: [],
        };
      }

      baseGroups[matchedKey].items.push(feed);
    });

    console.log("Shared feeds grouped:", baseGroups);
    setSharedFeeds(baseGroups);
    setSelectedCategory((prev) =>
      baseGroups[prev] ? prev : Object.keys(baseGroups)[0] ?? ""
    );
  };

  const handleDelete = async (itemId) => {
    
    try {
      await axios.delete(`${BASE_URL}/feed/${itemId}`, {
        withCredentials: true,
      });
      dispatch(showToast("Deleted successfully"));
      fetchFeed();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = async (updatedItem) => {
    try {
      await axios.patch(`${BASE_URL}/feed/${updatedItem._id}`, updatedItem, {
        withCredentials: true,
      });
      dispatch(showToast("Feed updated successfully"));
      fetchFeed(); // Refresh
    } catch (err) {
      console.error("Update failed", err);
      dispatch(showToast("Failed to update data"));
    }
  };

  const handleShare = async (shareData) => {
    try {
      await axios.post(`${BASE_URL}/give-access`, {
        feedId: shareData.feedId,
        email: shareData.recipientEmail,
        permission: shareData.permission || "read"
      }, {
        withCredentials: true,
      });
      dispatch(showToast("Access granted successfully"));
      fetchFeed();
    } catch (err) {
      console.error("Share failed", err);
      dispatch(showToast("Failed to grant access"));
      throw err;
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleMainSectionChange = (section) => {
    setMainSection(section);
    setShowForm(false);
    setSelectedCategory(Object.keys(categoryGroups)[0] ?? "");
  };

  const handleCategoryClick = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setShowForm(false); // Close form when switching categories
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const getCategoryIcon = (key) => CATEGORY_META[key]?.icon || "�️";

  return (
    <RequireAuth>
    <div className="flex h-screen bg-gray-50">
      {/* Main Section Sidebar */}
      <div 
        className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-500 ease-in-out ${
          isMainSidebarOpen ? 'w-56 p-4' : 'w-16 p-3'
        }`}
      >
        <div className={`flex items-center mb-6 transition-all duration-300 ${isMainSidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {isMainSidebarOpen && <h2 className="text-xl font-bold text-gray-900">Vault</h2>}
          <button
            onClick={() => setIsMainSidebarOpen(!isMainSidebarOpen)}
            className="text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300 p-2 rounded-lg shadow-sm border border-gray-300 cursor-pointer"
            title={isMainSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isMainSidebarOpen ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
        <nav className="space-y-2">
          <button
            onClick={() => handleMainSectionChange('saved')}
            className={`w-full rounded-xl transition-all duration-300 flex items-center cursor-pointer ${
              isMainSidebarOpen ? 'px-4 py-3.5 gap-3 text-left' : 'px-3 py-3 justify-center'
            } ${
              mainSection === 'saved'
                ? 'bg-green-50 text-green-600 border border-green-200'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-transparent'
            }`}
            title="Saved Data"
          >
            <span className="text-xl">💾</span>
            {isMainSidebarOpen && <span className="font-semibold">Saved Data</span>}
          </button>
          <button
            onClick={() => handleMainSectionChange('shared')}
            className={`w-full rounded-xl transition-all duration-300 flex items-center cursor-pointer ${
              isMainSidebarOpen ? 'px-4 py-3.5 gap-3 text-left' : 'px-3 py-3 justify-center'
            } ${
              mainSection === 'shared'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'
            }`}
            title="Shared"
          >
            <span className="text-xl">🤝</span>
            {isMainSidebarOpen && <span className="font-semibold">Shared</span>}
          </button>
        </nav>
      </div>

      {/* Category Sidebar */}
      <div 
        className={`bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-500 ease-in-out ${
          isCategorySidebarOpen ? 'w-64 p-4' : 'w-16 p-3'
        }`}
      >
        <div className={`flex items-center mb-6 transition-all duration-300 ${isCategorySidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {isCategorySidebarOpen && <h2 className="text-xl font-bold text-gray-900">Categories</h2>}
          <button
            onClick={() => setIsCategorySidebarOpen(!isCategorySidebarOpen)}
            className="text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300 p-2 rounded-lg shadow-sm border border-gray-300 cursor-pointer"
            title={isCategorySidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isCategorySidebarOpen ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {Object.entries(currentFeeds).map(([key, group]) => (
            <button
              key={key}
              onClick={() => handleCategoryClick(key)}
              className={`w-full rounded-xl transition-all duration-300 flex items-center group cursor-pointer ${
                isCategorySidebarOpen ? 'px-3 py-3 text-left justify-between' : 'px-3 py-3 justify-center'
              } ${
                selectedCategory === key
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-transparent'
              }`}
              title={group.displayName}
            >
              <div className={`flex items-center ${isCategorySidebarOpen ? 'gap-3' : ''}`}>
                <span className="text-xl">{getCategoryIcon(key)}</span>
                {isCategorySidebarOpen && <span className="font-semibold text-sm">{group.displayName}</span>}
              </div>
              {isCategorySidebarOpen && (
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full transition-all duration-300 ${
                  selectedCategory === key
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'
                }`}>
                  {group.items.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-md flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-3xl">{activeMeta.icon}</span>
                <div>
                  <div>{mainSection === 'saved' ? 'Saved Data' : 'Shared Data'}</div>
                  <div className="text-sm font-normal text-gray-600 mt-1">
                    {currentFeeds[selectedCategory]?.displayName || "Your Vault"}
                  </div>
                </div>
              </h1>
              <p className="text-sm text-gray-600 mt-3">
                {mainSection === 'saved' 
                  ? activeMeta.description 
                  : 'Data shared with you by other users'}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-700 bg-gray-100 px-4 py-2.5 rounded-xl border border-gray-200">
                <span className="text-gray-600">Total: </span>
                <span className="font-bold text-gray-900">{totalItems}</span>
              </div>

              {mainSection === 'saved' && (
                <button
                  onClick={toggleForm}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md flex items-center gap-2 ${
                    showForm
                      ? "bg-red-600 hover:bg-red-700 text-white border border-red-600"
                      : "bg-green-600 hover:bg-green-700 text-white border border-green-600"
                  }`}
                >
                  {showForm ? (
                    <>
                      <span>✕</span>
                      <span>Close</span>
                    </>
                  ) : (
                    <>
                      <span>+</span>
                      <span>Add Data</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Add Form - Only show for Saved Data */}
          {showForm && mainSection === 'saved' && (
            <AddFeedForm
              onFeedAdded={() => {
                fetchFeed();
                setShowForm(false);
              }}
              preSelectedCategory={selectedCategory}
            />
          )}

          {/* Empty State or Category Data */}
          {showEmptyState ? (
            <div className="text-center py-12 text-gray-600">
              {mainSection === 'shared' ? (
                <>
                  <p className="text-3xl mb-2">🤝</p>
                  <p>No shared items in this category yet.</p>
                  <p className="text-sm mt-1">Items shared with you will appear here.</p>
                </>
              ) : (
                <>
                  <p>No items found in this category yet.</p>
                  <p className="text-sm mt-1">Try adding some data to get started!</p>
                </>
              )}
            </div>
          ) : (
            <FeedCategory
              displayName={currentFeeds[selectedCategory].displayName}
              items={currentFeeds[selectedCategory].items}
              // Allow edit for owned items always; for shared items will be gated by permission inside FeedCard
              onEdit={handleEdit}
              onDelete={mainSection === 'saved' ? handleDelete : null}
              onShare={mainSection === 'saved' ? handleShare : null}
            />
          )}
        </div>
      </div>
    </div>
    </RequireAuth>
  );
};

export default Feed;
