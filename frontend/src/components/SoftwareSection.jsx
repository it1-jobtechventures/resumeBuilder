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
  // const {activeResumeId} = useContext(AppContext)
  const [activeResumeId, setActiveResumeId] = useState(() => localStorage.getItem("activeResumeId") || null);
  const resumeId = activeResumeId;

  // Save to local storage whenev
  useEffect(() => {
    localStorage.setItem('softwareInfo' , JSON.stringify(softwareList))
  },[softwareList])

  useEffect(() => {
    if(softwareList.length === 0) {
      setSoftwareList(
        [{ name: '', rating: 0 }]
      )
    }
  },[])


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
    try {
      const data = await axios.post(`${url}/api/softwareInfo/add-software`, {
        userId: localStorage.getItem("temporaryUserId"),
        resumeId,
        softwareSkills: softwareList,
      })
      toast.success(data.message || 'Saved successfully');
    } catch (error) {
      console.error("❌ Error from backend:", error.response?.data || error);
      toast.error(error.response?.data?.error || 'Save failed');
    }
  };

  return (
    <>
      <div className="p-6 bg-white rounded-md shadow-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Software Proficiency</h2>
        {softwareList.map((software, index) => (
          <div key={index} className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-b pb-4">
            <input type="text" spellCheck={true} className="flex-1 p-2 border rounded-md text-gray-800" placeholder="Enter software name" style={{ textTransform: "capitalize" }} value={software.name} onChange={(e) => handleSoftwareChange(index, e.target.value)} />
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} title={`${star} star${star > 1 ? "s" : ""}`} className={`cursor-pointer text-xl ${ software.rating >= star ? "text-yellow-400" : "text-gray-300" }`}
                  onClick={() => handleRatingChange(index, star)}
                />
              ))}
            </div>
            {softwareList.length > 1 && (
              <button type="button" onClick={() => removeSoftware(index)} className="text-red-500 hover:text-red-700 text-2xl" title="Remove" >
                <RxCross2 />
              </button>
            )}
          </div>
        ))}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button type="button" onClick={addSoftware} className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-md hover:from-blue-500 hover:to-green-500 transition" >
            + Add Another Software
          </button>
          <button onClick={handleSave} className="w-full sm:w-auto bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default SoftwareSection;