import React, { useState, useEffect ,useContext} from 'react';
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios'
import { FaStar } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";

const SoftwareSection = ({url}) => {
  const [softwareList, setSoftwareList] = useState(() => {
    const savedSoftware = localStorage.getItem('softwareInfo');
    return savedSoftware ? JSON.parse(savedSoftware):[{ name: '', rating: 0 }];
  });
  const { updateResumeData  } = useResume();
  const {activeResumeId} = useContext(AppContext)
console.log('sof',activeResumeId)
const resumeId = activeResumeId;
  // Save to local storage whenev
  useEffect(() => {
    localStorage.setItem('softwareInfo' , JSON.stringify(softwareList))
  },[softwareList])

  const handleSoftwareChange = (index, value) => {
    const updatedSoftware = [...softwareList];
    updatedSoftware[index].name = value;
    setSoftwareList(updatedSoftware);
  };

  const handleRatingChange = (index, rating) => {
    const updatedSoftware = [...softwareList];
    updatedSoftware[index].rating = rating;
    setSoftwareList(updatedSoftware);
  };

  const addSoftware = () => {
    setSoftwareList([...softwareList, { name: '', rating: 0 }]);
  };

  const removeSoftware = (index) => {
    const updatedSoftware = softwareList.filter((_, i) => i !== index);
    setSoftwareList(updatedSoftware);
  };

    const handleSave = async (e) => {
      e.preventDefault();
      
      if (!resumeId) {
        toast.error("Resume ID is missing");
        console.error("❌ Resume ID is undefined");
        return;
      }
    
      console.log("📤 Sending data to backend:", { resumeId, ...softwareList });
    
      try {
        const data = await axios.post(`${url}/api/softwareInfo/add-software`, {
          userId: localStorage.getItem("temporaryUserId"),
          resumeId,
          softwareSkills: softwareList,
        });
    
        console.log("✅ Response from backend:", data);
    
  
        toast.success(data.message || 'Saved successfully');
    
      } catch (error) {
        console.error("❌ Error from backend:", error.response?.data || error);
        toast.error(error.response?.data?.error || 'Save failed');
      }
    };
    
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Software</h2>
      {softwareList.map((software, index) => (
        <div key={index} className="mb-4 flex items-center justify-around">
          <input type="text" style={{ textTransform: 'capitalize' }} className="w-1/2 p-2 border rounded-md" placeholder="Enter software name" value={software.name} onChange={(e) => handleSoftwareChange(index, e.target.value)}/>
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar key={star} className={`cursor-pointer text-xl ${software.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`} onClick={() => handleRatingChange(index, star)}/>
            ))}
          </div>
          {softwareList.length > 1 && (
            <button type="button" onClick={() => removeSoftware(index)} className=" text-red-500 hover:text-red-700 font-extrabold text-3xl">
              <RxCross2/>
            </button>
          )}
        </div>
      ))}
      <button onClick={handleSave}>save</button>
      <button type="button" onClick={addSoftware} className="mt-2 bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
        + Add One More Software
      </button>
    </div>
  );
};

export default SoftwareSection;
