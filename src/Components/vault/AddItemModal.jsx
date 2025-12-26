import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toast/toastSlice";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

const CATEGORIES = {
  "userId-password": "Login Credentials",
  creditCard: "Credit Card",
  debitCard: "Debit Card",
  apiKey: "API Keys",
  bankLockerKey: "Bank Locker",
  aadharCard: "Aadhar Card",
  panCard: "PAN Card",
  note: "Secure Notes",
  others: "Others",
};

const CATEGORY_FIELDS = {
  "userId-password": ["username", "email", "password", "website", "recoveryEmail", "phoneNumber"],
  creditCard: ["cardNumber", "cardholderName", "expiryDate", "cvv", "pin", "bankName"],
  debitCard: ["cardNumber", "cardholderName", "expiryDate", "cvv", "pin", "bankName"],
  apiKey: ["apiKey", "secretKey", "baseUrl", "serviceName"],
  bankLockerKey: ["lockerNumber", "bankName", "keyCode", "location"],
  aadharCard: ["aadharNumber", "name", "dob", "address", "gender"],
  panCard: ["panNumber", "name", "fatherName", "dob"],
  note: ["content"],
  others: ["field1", "field2", "field3"],
};

const AddItemModal = ({ isOpen, onClose, onItemAdded, preSelectedCategory }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(preSelectedCategory || "userId-password");
  const [fieldValues, setFieldValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (preSelectedCategory) {
      setSelectedCategory(preSelectedCategory);
      setFieldValues({});
    }
  }, [preSelectedCategory]);

  const handleFieldChange = (field, value) => {
    setFieldValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      dispatch(showToast("Please enter a title"));
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        title: title.trim(),
        category: selectedCategory,
        data: fieldValues,
      };

      await axios.post(BASE_URL + "/feed/add", payload, { withCredentials: true });

      dispatch(showToast("Item added successfully"));
      setTitle("");
      setFieldValues({});
      setSelectedCategory("userId-password");
      onItemAdded();
      onClose();
    } catch (err) {
      console.error("Error adding item:", err);
      dispatch(showToast(err.response?.data?.error || "Failed to add item"));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const fields = CATEGORY_FIELDS[selectedCategory] || [];

  return (
    <Modal open={isOpen} onClose={onClose} title="Add New Item">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Item Title *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Gmail Account, PayPal Card" className="w-full bg-gray-50 text-gray-900 border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
          <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); setFieldValues({}); }} className="w-full bg-gray-50 text-gray-900 border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Item Details</h3>
          {fields.map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">{field.replace(/([A-Z])/g, " $1").trim()}</label>
              <input type={
                field.toLowerCase().includes("password") || field.toLowerCase().includes("pin") || field.toLowerCase().includes("cvv")
                  ? "password"
                  : field.toLowerCase().includes("content")
                  ? "textarea"
                  : "text"
              } value={fieldValues[field] || ""} onChange={(e) => handleFieldChange(field, e.target.value)} placeholder={`Enter ${field}`} className="w-full bg-white text-gray-900 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm" />
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="flex-1 flex items-center justify-center gap-2">
            <Plus size={18} />
            {isLoading ? "Adding..." : "Add Item"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddItemModal;
