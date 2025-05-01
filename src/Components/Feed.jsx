import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addDataInFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [showIndex, setShowIndex] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      if (feed && feed.length > 0) return;
      try {
        const res = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        });
        console.log(res?.data?.feeds);
        dispatch(addDataInFeed(res?.data?.feeds || []));
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeed();
  }, [dispatch, feed]);

  if (!feed) return <p className="text-center mt-8">Loading...</p>;
  if (feed.length === 0)
    return <h1 className="font-bold text-center mt-8">No Saved Data</h1>;

  const categorizedFeed = feed.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(categorizedFeed);
  console.log(feed);
  console.log(categorizedFeed);
  console.log(categories);
  console.log(categorizedFeed[categories[0]]);
  
  return (
    <div className=" flex flex-col p-3 gap-2 ">
      {categories.map((category, index) => (
        <FeedCategory
          key={category}
          category={category}
          items={categorizedFeed[category]}
          showItems={showIndex === index}
          setShowIndex={() => setShowIndex(showIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default Feed;
