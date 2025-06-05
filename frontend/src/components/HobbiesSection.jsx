import React, { useState, useEffect } from 'react';
import { useResume } from '../context/FormContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";

const HobbiesSection = ({ url }) => {
  const [interests, setInterests] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("interests") || "[]");
    return (stored.length === 1 && stored[0] === "") || stored.length === 0 ? [''] : stored;
  });

  const { updateResumeData } = useResume();
  const [activeResumeId, setActiveResumeId] = useState(() => localStorage.getItem("activeResumeId") || null);
  const resumeId = activeResumeId;

  // Persist to localStorage whenever interests change
  useEffect(() => {
    const isEmpty = interests.every((i) => i.trim() === "");
    localStorage.setItem("interests", JSON.stringify(isEmpty ? [] : interests));
  }, [interests]);

  const handleInterestChange = (index, value) => {
    const updated = [...interests];
    updated[index] = value;
    setInterests(updated);
  };

  const addInterest = () => setInterests([...interests, ""]);

  const removeInterest = (index) => {
    const updated = interests.filter((_, i) => i !== index);
    setInterests(updated.length === 0 ? [''] : updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!resumeId) {
      toast.error("Resume ID is missing");
      console.error("❌ Resume ID is undefined");
      return;
    }

    const validInterests = interests
      .filter((item) => item.trim() !== "")
      .map((item) => ({ name: item.trim() }));

    if (validInterests.length === 0) {
      localStorage.setItem("interests", JSON.stringify([]));
      toast.info("No interests added. Skipping...");
    }

    try {
      const { data } = await axios.post(`${url}/api/interest/add-interest`, {
        userId: localStorage.getItem("temporaryUserId"),
        resumeId,
        interests: validInterests,
      });

      toast.success(data.message || "Saved successfully");
    } catch (error) {
      console.error("❌ Error from backend:", error.response?.data || error);
      toast.error(error.response?.data?.error || "Save failed");
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Interests & Hobbies</h2>
      <form className="space-y-6">
        {interests.map((interest, index) => (
          <div key={index} className="flex items-center gap-4 border border-gray-300 p-4 rounded-md bg-gray-50 shadow-sm">
            <input
              type="text"
              spellCheck={true}
              placeholder="Enter an interest or hobby"
              value={interest}
              onChange={(e) => handleInterestChange(index, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md capitalize focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {interests.length > 1 && (
              <button
                type="button"
                onClick={() => removeInterest(index)}
                className="text-red-600 hover:text-red-800 text-xl"
                title="Remove"
              >
                <RxCross2 />
              </button>
            )}
          </div>
        ))}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            type="button"
            onClick={addInterest}
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-md hover:from-blue-500 hover:to-green-500 transition"
          >
            + Add Another Interest/Hobby
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="w-full sm:w-auto bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Save Interests
          </button>
        </div>
      </form>
    </div>
  );
};

export default HobbiesSection;
