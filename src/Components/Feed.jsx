import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addDataInFeed } from "../utils/feedSlice";
import FeedCategory from "./FeedCategory";
import { showToast } from "../utils/toastSlice";

const categoryGroups = {
  loginCredentials: {
    displayName: "Login Credentials",
    includes: ["userId-password"],
  },
  apiKeys: {
    displayName: "API Keys",
    includes: ["apiKey"],
  },
  banking: {
    displayName: "Banking Info",
    includes: ["creditCard", "debitCard", "bankLockerKey"],
  },
  idCards: {
    displayName: "Identification Cards",
    includes: ["aadharCard", "panCard"],
  },
  secureNotes: {
    displayName: "Secure Notes",
    includes: ["note"],
  },
  others: {
    displayName: "Other Items",
    includes: ["others"],
  },
};

const categoryFields = {
  "userId-password": ["username", "password"],
  apiKey: ["apiKey"],
  creditCard: ["cardNumber", "expiry", "cvv"],
  debitCard: ["cardNumber", "expiry", "cvv", "pin"],
  bankLockerKey: ["lockerId", "location"],
  aadharCard: ["aadharNumber", "name"],
  panCard: ["panNumber", "name"],
  note: ["title", "content"],
  others: ["key", "value"],
};

const Feed = () => {
  const dispatch = useDispatch();
  const [groupedFeeds, setGroupedFeeds] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [fieldValues, setFieldValues] = useState({});

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

  const handleInputChange = (field, value) => {
    setFieldValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddFeed = async () => {
    try {
      const payload = {
        title,
        category: selectedCategory,
        data: fieldValues,
      };

      await axios.post(BASE_URL + "/feed/add", payload, { withCredentials: true });
      dispatch(showToast("Data added successfully"));
      setTitle("");
      setSelectedCategory("");
      setFieldValues({});
      setShowForm(false);
      fetchFeed();
    } catch (err) {
      console.error(err);
      dispatch(showToast("Failed to add data"));
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Feeds</h1>

      {/* Add Data Button + Form */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-gray-200 px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {showForm ? "Close" : "➕ Add Data"}
        </button>

        {showForm && (
          <div className="mt-4 space-y-3 bg-gray-600 p-4 rounded-md shadow">
            {/* Category first */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setFieldValues({});
              }}
              className="w-full border p-2 rounded-md"
            >
              <option value="" className="bg-gray-400">Select category</option>
              {Object.values(categoryGroups).flatMap((group) =>
                group.includes.map((cat) => (
                  <option key={cat} value={cat} className="bg-gray-400">
                    {group.displayName} - {cat}
                  </option>
                ))
              )}
            </select>

            {/* Title second */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full border p-2 rounded-md"
            />

            {/* Dynamic Inputs */}
            {selectedCategory &&
              categoryFields[selectedCategory]?.map((field) => (
                <input
                  key={field}
                  type="text"
                  value={fieldValues[field] || ""}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  placeholder={`Enter ${field}`}
                  className="w-full border p-2 rounded-md"
                />
              ))}

            <button
              onClick={handleAddFeed}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {Object.entries(groupedFeeds).map(([key, group]) => (
          <FeedCategory
            key={key}
            displayName={group.displayName}
            items={group.items}
            onEdit={() => {}}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
