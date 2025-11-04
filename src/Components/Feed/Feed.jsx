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
  const initialCategoryKey = Object.keys(categoryGroups)[0] ?? "";
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryKey);
  const [showForm, setShowForm] = useState(false);
  const activeGroup = groupedFeeds[selectedCategory] ?? null;
  
  const totalItems = React.useMemo(
    () =>
      Object.values(groupedFeeds).reduce(
        (acc, group) => acc + (group?.items?.length ?? 0),
        0
      ),
    [groupedFeeds]
  );

  const summaryCards = React.useMemo(
    () =>
      Object.keys(categoryGroups).map((key) => ({
        key,
        label: categoryGroups[key].displayName,
        count: groupedFeeds[key]?.items?.length ?? 0,
      })),
    [groupedFeeds]
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
  }, []);

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
      {/* Sidebar */}
      <div className="w-56 bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 p-3 flex flex-col">
        <h2 className="text-lg font-bold text-white mb-4 px-2">Categories</h2>
        <nav className="flex-1 space-y-1.5">
          {Object.entries(groupedFeeds).map(([key, group]) => (
            <button
              key={key}
              onClick={() => handleCategoryClick(key)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                selectedCategory === key
                  ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{getCategoryIcon(key)}</span>
                <span className="font-medium text-sm">{group.displayName}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                selectedCategory === key
                  ? 'bg-white text-green-600'
                  : 'bg-gray-800 text-gray-400 group-hover:bg-gray-700'
              }`}>
                {group.items.length}
              </span>
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
                {groupedFeeds[selectedCategory]?.displayName || "Your Feed"}
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                {activeMeta.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-300 bg-gray-800 px-3 py-1.5 rounded-lg">
                Total Items: <span className="font-semibold text-white">{totalItems}</span>
              </div>

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
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
            {summaryCards.map((card) => (
              <div
                key={card.key}
                onClick={() => handleCategoryClick(card.key)}
                className={`cursor-pointer p-3 rounded-lg border ${
                  selectedCategory === card.key
                    ? "bg-gradient-to-r from-green-600/80 to-green-500/70 border-green-400 text-white"
                    : "bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800 hover:border-gray-700"
                } transition`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-xl">{getCategoryIcon(card.key)}</span>
                  <span className="text-sm font-medium mt-1">{card.label}</span>
                  <span className="text-xs text-gray-400">
                    {card.count} item{card.count !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Form */}
          {showForm && (
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
              <p>No items found in this category yet.</p>
              <p className="text-sm mt-1">Try adding some data to get started!</p>
            </div>
          ) : (
            <FeedCategory
              displayName={groupedFeeds[selectedCategory].displayName}
              items={groupedFeeds[selectedCategory].items}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
