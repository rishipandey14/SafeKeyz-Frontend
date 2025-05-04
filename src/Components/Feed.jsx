import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addDataInFeed } from "../utils/feedSlice";
import FeedCategory from "./FeedCategory";

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

const Feed = () => {
  const dispatch = useDispatch();
  const [groupedFeeds, setGroupedFeeds] = useState({});

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
      // if no match add to others
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

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Feeds</h1>
      <div className="space-y-4">
        {Object.entries(groupedFeeds).map(([key, group]) => (
          <FeedCategory
            key={key}
            displayName={group.displayName}
            items={group.items}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;