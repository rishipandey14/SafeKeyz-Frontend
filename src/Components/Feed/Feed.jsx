/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addDataInFeed } from "../../utils/feedSlice";
import FeedCategory from "./FeedCategory";
import { showToast } from "../../utils/toastSlice";
import { categoryGroups } from "./FeedHelper";
import AddFeedForm from "./AddFeedForm";

const Feed = () => {
  const dispatch = useDispatch();
  const [groupedFeeds, setGroupedFeeds] = useState({});
  const [showForm, setShowForm] = useState(false);

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

  const groupFeedsByCategory = (feeds) => {
    const groups = {};

    feeds.forEach((feed) => {
      for (const [groupKey, group] of Object.entries(categoryGroups)) {
        if (group.includes.includes(feed.category)) {
          if (!groups[groupKey]) {
            groups[groupKey] = {
              displayName: group.displayName,
              items: [],
            };
          }
          groups[groupKey].items.push(feed);
          return;
        }
      }

      if (!groups["others"]) {
        groups["others"] = {
          displayName: "Other Items",
          items: [],
        };
      }
      groups["others"].items.push(feed);
    });

    setGroupedFeeds(groups);
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
  }

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Feeds</h1>

      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-gray-200 px-4 py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
        >
          {showForm ? "Close" : "➕ Add Data"}
        </button>
        {showForm && <AddFeedForm onFeedAdded={fetchFeed} />}
      </div>

      <div className="space-y-4">
        {Object.entries(groupedFeeds).map(([key, group]) => (
          <FeedCategory
            key={key}
            displayName={group.displayName}
            items={group.items}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
