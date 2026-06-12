import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Star,
  ArrowLeft,
  Copy,
  Trash2,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

const Favorites = () => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/get-favourites`,
        {
          withCredentials: true,
        }
      );

      setFavorites(res?.data?.Data || []);
    } catch (err) {
      console.error("Failed to fetch favorites", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFavourite = async (feedId) => {
    try {
      setRemovingId(feedId);

      await axios.post(
        `${BASE_URL}/favourite`,
        { feedId },
        {
          withCredentials: true,
        }
      );

      setFavorites((prev) =>
        prev.filter(
          (item) => item.feedId._id !== feedId
        )
      );
    } catch (err) {
      console.error("Failed to remove favourite", err);
    } finally {
      setRemovingId(null);
    }
  };

  const handleCopy = (data, id) => {
    navigator.clipboard.writeText(
      JSON.stringify(data, null, 2)
    );

    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const FavouriteCard = ({ favourite }) => {
    const feed = favourite.feedId;

    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              {feed?.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {feed?.category}
            </p>
          </div>

          <Star
            onClick={() =>
              removingId !== feed._id &&
              removeFavourite(feed._id)
            }
            size={22}
            className={`cursor-pointer transition-all duration-200 ${
              removingId === feed._id
                ? "text-gray-400 fill-gray-400 animate-pulse"
                : "text-yellow-500 fill-yellow-500 hover:scale-110"
            }`}
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="space-y-2">
            {Object.entries(feed?.data || {}).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between gap-3 border-b border-gray-100 pb-1"
                >
                  <span className="font-medium text-gray-600 capitalize">
                    {key}
                  </span>

                  <span className="text-gray-800 break-all text-right">
                    {String(value)}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>
            Added on{" "}
            {new Date(
              favourite.createdAt
            ).toLocaleDateString()}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              handleCopy(
                feed?.data,
                favourite._id
              )
            }
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Copy size={16} />

            {copiedId === favourite._id
              ? "Copied!"
              : "Copy"}
          </button>

          <button
            onClick={() =>
              removeFavourite(feed._id)
            }
            disabled={removingId === feed._id}
            className="px-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/vault")}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Favorites
              </h1>

              <p className="text-gray-600">
                Your starred credentials
              </p>
            </div>
          </div>

          <Shield
            size={32}
            className="text-green-600"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Star
              size={50}
              className="mx-auto text-yellow-500 fill-yellow-500 mb-4"
            />

            <h3 className="text-xl font-semibold mb-2">
              No Favorites Yet
            </h3>

            <p className="text-gray-500">
              Add credentials to favorites and they
              will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 border border-yellow-200 px-4 py-2 rounded-lg text-sm font-medium">
                <Star
                  size={16}
                  className="fill-yellow-500"
                />
                {favorites.length} Favourite
                {favorites.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((fav) => (
                <FavouriteCard
                  key={fav._id}
                  favourite={fav}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;