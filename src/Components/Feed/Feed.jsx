/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addDataInFeed } from "../../utils/feedSlice";
import FeedCategory from "./FeedCategory";
import { showToast } from "../../utils/toastSlice";
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
      const feeds = res?.data?.feeds;
      dispatch(addDataInFeed(feeds));
      groupFeedsByCategory(feeds);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSharedFeed = async () => {
    try {
      // TODO: Replace with actual shared feed API endpoint
      // const res = await axios.get(BASE_URL + "/feed/shared", {
      //   withCredentials: true,
      // });
      // const feeds = res?.data?.feeds;
      // groupSharedFeedsByCategory(feeds);
      
      // For now, using empty data structure
      groupSharedFeedsByCategory([]);
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
      await axios.put(`${BASE_URL}/feed/${updatedItem._id}`, updatedItem, {
        withCredentials: true,
      });
      dispatch(showToast("Feed updated successfully"));
      fetchFeed(); // Refresh
    } catch (err) {
      console.error("Update failed", err);
      dispatch(showToast("Failed to update data"));
    }
  }

  useEffect(() => {
    fetchFeed();
    fetchSharedFeed();
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
    <div className="flex h-screen bg-gray-950">
      {/* Main Section Sidebar */}
      <div 
        className={`bg-gradient-to-b from-gray-950 to-black border-r border-gray-800 flex flex-col transition-all duration-500 ease-in-out ${
          isMainSidebarOpen ? 'w-48 p-3' : 'w-14 p-2'
        }`}
      >
        <div className={`flex items-center mb-4 transition-all duration-300 ${isMainSidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {isMainSidebarOpen && <h2 className="text-lg font-bold text-white px-2">Feed</h2>}
          <button
            onClick={() => setIsMainSidebarOpen(!isMainSidebarOpen)}
            className="text-white bg-gray-800 hover:bg-gray-700 transition-all duration-300 p-2 rounded-md shadow-md hover:shadow-lg hover:scale-110 border border-gray-600 cursor-pointer"
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
            className={`w-full rounded-lg transition-all duration-300 flex items-center hover:scale-105 cursor-pointer ${
              isMainSidebarOpen ? 'px-4 py-3 gap-3 text-left' : 'px-2 py-2.5 justify-center'
            } ${
              mainSection === 'saved'
                ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
            title="Saved Data"
          >
            <span className="text-xl">💾</span>
            {isMainSidebarOpen && <span className="font-medium">Saved Data</span>}
          </button>
          <button
            onClick={() => handleMainSectionChange('shared')}
            className={`w-full rounded-lg transition-all duration-300 flex items-center hover:scale-105 cursor-pointer ${
              isMainSidebarOpen ? 'px-4 py-3 gap-3 text-left' : 'px-2 py-2.5 justify-center'
            } ${
              mainSection === 'shared'
                ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
            title="Shared"
          >
            <span className="text-xl">🤝</span>
            {isMainSidebarOpen && <span className="font-medium">Shared</span>}
          </button>
        </nav>
      </div>

      {/* Category Sidebar */}
      <div 
        className={`bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 flex flex-col transition-all duration-500 ease-in-out ${
          isCategorySidebarOpen ? 'w-56 p-3' : 'w-14 p-2'
        }`}
      >
        <div className={`flex items-center mb-4 transition-all duration-300 ${isCategorySidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {isCategorySidebarOpen && <h2 className="text-lg font-bold text-white px-2">Categories</h2>}
          <button
            onClick={() => setIsCategorySidebarOpen(!isCategorySidebarOpen)}
            className="text-white bg-gray-800 hover:bg-gray-700 transition-all duration-300 p-2 rounded-md shadow-md hover:shadow-lg hover:scale-110 border border-gray-600 cursor-pointer"
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
        <nav className="flex-1 space-y-1.5">
          {Object.entries(currentFeeds).map(([key, group]) => (
            <button
              key={key}
              onClick={() => handleCategoryClick(key)}
              className={`w-full rounded-lg transition-all duration-300 flex items-center group hover:scale-105 cursor-pointer ${
                isCategorySidebarOpen ? 'px-3 py-2.5 text-left justify-between' : 'px-2 py-2.5 justify-center'
              } ${
                selectedCategory === key
                  ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
              title={group.displayName}
            >
              <div className={`flex items-center ${isCategorySidebarOpen ? 'gap-2.5' : ''}`}>
                <span className="text-xl">{getCategoryIcon(key)}</span>
                {isCategorySidebarOpen && <span className="font-medium text-sm">{group.displayName}</span>}
              </div>
              {isCategorySidebarOpen && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full transition-all duration-300 ${
                  selectedCategory === key
                    ? 'bg-white text-green-600'
                    : 'bg-gray-800 text-gray-400 group-hover:bg-gray-700'
                }`}>
                  {group.items.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-4">
          {/* Header Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4 shadow-lg flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{activeMeta.icon}</span>
                {mainSection === 'saved' ? 'Saved Data' : 'Shared Data'} - {currentFeeds[selectedCategory]?.displayName || "Your Feed"}
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                {mainSection === 'saved' 
                  ? activeMeta.description 
                  : 'Data shared with you by other users'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-300 bg-gray-800 px-3 py-1.5 rounded-lg">
                Total Items: <span className="font-semibold text-white">{totalItems}</span>
              </div>

              {mainSection === 'saved' && (
                <button
                  onClick={toggleForm}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition shadow-md flex items-center gap-2 ${
                    showForm
                      ? "bg-red-600 hover:bg-red-500 text-white"
                      : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white"
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
            <div className="text-center py-12 text-gray-500">
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
              onEdit={mainSection === 'saved' ? handleEdit : null}
              onDelete={mainSection === 'saved' ? handleDelete : null}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
