import React, { useState, useEffect ,useContext} from 'react';
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios'
import { RxCross2 } from "react-icons/rx";

const HobbiesSection = ({url}) => {
  const [interests, setInterests] = useState(() => {
    // Retrieve from local storage or initialize with a single empty field
    const savedInterests = localStorage.getItem('interests');
    return savedInterests ? JSON.parse(savedInterests) : [''];
  });
  const { updateResumeData  } = useResume();
  // const {activeResumeId} = useContext(AppContext)
  const [activeResumeId, setActiveResumeId] = useState(() => localStorage.getItem("activeResumeId") || null);
console.log('intrest',activeResumeId)
const resumeId = activeResumeId;
  // Save to local storage whenev
  // Save to local storage whenever interests change
  useEffect(() => {
    localStorage.setItem('interests', JSON.stringify(interests));
  }, [interests]);

  const handleInterestChange = (index, value) => {
    const updatedInterests = [...interests];
    updatedInterests[index] = value;
    setInterests(updatedInterests);
  };

  const addInterest = () => {
    setInterests([...interests, '']);
  };

  const removeInterest = (index) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    setInterests(updatedInterests);
  };

    const handleSave = async (e) => {
      e.preventDefault();
      if (!resumeId) {
        toast.error("Resume ID is missing");
        console.error("❌ Resume ID is undefined");
        return;
      }
      const formattedInterests = interests
        .filter((item) => item.trim() !== "")
        .map((item) => ({ name: item }));
      console.log("📤 Sending data to backend:", {
        resumeId,
        interests: formattedInterests,
      });
      try {
        const data = await axios.post(
          `${url}/api/interest/add-interest`,
          {
            userId: localStorage.getItem("temporaryUserId"),
            resumeId,
            interests: formattedInterests,
          }
        );
        console.log("✅ Response from backend:", data);
        toast.success(data.data.message || "Saved successfully");
      } catch (error) {
        console.error("❌ Error from backend:", error.response?.data || error);
        toast.error(error.response?.data?.error || "Save failed");
      }
    };
    
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Interests & Hobbies</h2>
      {interests.map((interest, index) => (
        <div key={index} className="mb-4 flex items-center">
          <input spellCheck={true} type="text" style={{ textTransform: 'capitalize' }} className="w-full p-2 border rounded-md" placeholder="Enter an interest or hobby" value={interest} onChange={(e) => handleInterestChange(index, e.target.value)}/>
          {interests.length > 1 && (
            <button type="button" onClick={() => removeInterest(index)} className="ml-2 text-red-500 hover:text-red-700 font-extrabold text-3xl">
              <RxCross2/>
            </button>
          )}
        </div>
      ))}
      <button onClick={handleSave}>save</button>
      <button type="button" onClick={addInterest} className="mt-2 bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
        + Add Another Interest/Hobby
      </button>
    </div>
  );
};

export default HobbiesSection;
