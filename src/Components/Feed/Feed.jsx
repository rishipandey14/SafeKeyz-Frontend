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

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 text-gray-300 ">
      <h1 className="text-3xl font-bold mb-6 text-center text-white bg-gray-500 rounded-xl">Your Feed</h1>

      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className= {`bg-green-200 cursor-pointer text-green-700 font-semibold px-4 py-2 rounded-md hover:bg-green-300 transition shadow 
            ${showForm 
              ? 'bg-red-200 hover:bg-red-300 text-red-700'
              : 'bg-green-200 hover:bg-green-300 text-green-700'}`}
        >
          {showForm ? "Close" : "Add Data"}
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
