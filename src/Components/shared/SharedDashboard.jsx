import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../common/RequireAuth";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useSelector } from "react-redux";
import { Share2, Lock, Unlock, Eye, Copy, Trash2, ArrowLeft, Shield, Clock } from "lucide-react";

const SharedDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user?.user);
  const [sharedWithMe, setSharedWithMe] = useState([]);
  const [sharedByMe, setSharedByMe] = useState([]);
  const [activeTab, setActiveTab] = useState("sharedWithMe");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchSharedCredentials();
  }, []);

  const fetchSharedCredentials = async () => {
    try {
      setLoading(true);
      const [withMeRes, byMeRes] = await Promise.all([
        axios.get(BASE_URL + "/access/shared-with-me", { withCredentials: true }),
        axios.get(BASE_URL + "/access/shared-by-me", { withCredentials: true }),
      ]);

      setSharedWithMe(withMeRes?.data?.data || []);
      setSharedByMe(byMeRes?.data?.data || []);
      setError("");
    } catch (err) {
      console.error("Failed to fetch shared credentials:", err);
      setError("Failed to load shared credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPassword = (value, id) => {
    navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRevokeAccess = async (feedId, email) => {
    try {
      if (!window.confirm(`Are you sure you want to revoke access for ${email}?`)) {
        return;
      }
      await axios.delete(`${BASE_URL}/access/revoke-access/${feedId}/${email}`, {
        withCredentials: true,
      });
      fetchSharedCredentials();
    } catch (err) {
      console.error("Failed to revoke access:", err);
      setError("Failed to revoke access");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const CredentialCard = ({ credential, isSharedByMe = false }) => {
    const getPermissionColor = (permission) => {
      return permission === "write"
        ? "bg-green-100 text-green-700 border-green-300"
        : "bg-blue-100 text-blue-700 border-blue-300";
    };

    const getPermissionIcon = (permission) => {
      return permission === "write" ? <Unlock size={14} /> : <Lock size={14} />;
    };

    const getCategoryColor = (category) => {
      const colors = {
        "userId-password": "bg-emerald-50 text-emerald-700 border-emerald-200",
        creditCard: "bg-blue-50 text-blue-700 border-blue-200",
        apiKey: "bg-purple-50 text-purple-700 border-purple-200",
        note: "bg-rose-50 text-rose-700 border-rose-200",
        others: "bg-gray-50 text-gray-700 border-gray-200",
      };
      return colors[category] || colors.others;
    };

    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg truncate">{credential.title}</h3>
            <p className={`text-xs font-medium mt-2 inline-block px-3 py-1 rounded-full border ${getCategoryColor(credential.category)}`}>
              {credential.category?.replace(/([A-Z])/g, " $1").trim() || "Other"}
            </p>
          </div>
          <Shield className="text-green-600 flex-shrink-0" size={20} />
        </div>

        <div className="space-y-3 mb-4">
          {isSharedByMe && credential.sharedWithUsers && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs font-semibold text-gray-600 mb-2">Shared With:</p>
              <div className="space-y-2">
                {credential.sharedWithUsers.map((share, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white p-2 rounded border border-gray-200">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{share.emailId}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded border flex items-center gap-1 ${getPermissionColor(share.permission)}`}>
                          {getPermissionIcon(share.permission)}
                          {share.permission}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={12} />
                          {formatDate(share.sharedAt)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRevokeAccess(credential._id, share.emailId)}
                      className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isSharedByMe && (
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-600">Shared By:</span>
                <span className="text-sm font-medium text-gray-900">{credential.owner?.firstName} {credential.owner?.lastName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-600">Email:</span>
                <span className="text-sm text-gray-700">{credential.owner?.emailId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-600">Permission:</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded border flex items-center gap-1 ${getPermissionColor(credential.permission)}`}>
                  {getPermissionIcon(credential.permission)}
                  {credential.permission}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-600">Shared At:</span>
                <span className="text-xs text-gray-500">{formatDate(credential.sharedAt)}</span>
              </div>
            </div>
          )}

          {credential.data && (
            <div className="bg-gray-50 rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
              <p className="text-xs font-semibold text-gray-600">Details:</p>
              <div className="text-xs text-gray-700 space-y-1">
                {typeof credential.data === "object" ? (
                  Object.entries(credential.data).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-start gap-2">
                      <span className="font-medium text-gray-600 capitalize">{key}:</span>
                      <span className="text-right break-words max-w-xs">{String(value)}</span>
                    </div>
                  ))
                ) : (
                  <p>{credential.data}</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              const dataStr = JSON.stringify(credential.data, null, 2);
              handleCopyPassword(dataStr, credential._id);
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            <Copy size={16} />
            <span>{copiedId === credential._id ? "Copied!" : "Copy Details"}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/vault")}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Shared Credentials</h1>
                <p className="text-gray-600 mt-1">Manage shared passwords and sensitive data</p>
              </div>
            </div>
            <Share2 className="text-green-600" size={32} />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("sharedWithMe")}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === "sharedWithMe"
                  ? "text-green-600 border-green-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <Eye size={18} />
                <span>Shared With Me</span>
                <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {sharedWithMe.length}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("sharedByMe")}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === "sharedByMe"
                  ? "text-green-600 border-green-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <Share2 size={18} />
                <span>Shared By Me</span>
                <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {sharedByMe.length}
                </span>
              </div>
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <>
              {activeTab === "sharedWithMe" && (
                <div>
                  {sharedWithMe.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                      <Eye className="mx-auto mb-4 text-gray-400" size={48} />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Shared Credentials</h3>
                      <p className="text-gray-600">
                        Credentials shared with you will appear here
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sharedWithMe.map((credential) => (
                        <CredentialCard key={credential._id} credential={credential} isSharedByMe={false} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "sharedByMe" && (
                <div>
                  {sharedByMe.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                      <Share2 className="mx-auto mb-4 text-gray-400" size={48} />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Shared Credentials</h3>
                      <p className="text-gray-600">
                        You haven't shared any credentials yet
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sharedByMe.map((credential) => (
                        <CredentialCard key={credential._id} credential={credential} isSharedByMe={true} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </RequireAuth>
  );
};

export default SharedDashboard;
