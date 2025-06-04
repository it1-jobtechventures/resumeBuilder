import React, { useState, useEffect ,useContext} from 'react';
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios'
import { RxCross2 } from "react-icons/rx";

const AccomplishmentsSection = ({url}) => {
  const [accomplishments, setAccomplishments] = useState(() => {
    // Retrieve from local storage or initialize with a single empty entry
    const savedAccomplishments = localStorage.getItem('accomplishments');
    return savedAccomplishments ? JSON.parse(savedAccomplishments) : [''];
  });

  const { updateResumeData  } = useResume();
  // const {activeResumeId} = useContext(AppContext)
  const [activeResumeId, setActiveResumeId] = useState(() => localStorage.getItem("activeResumeId") || null);
  const resumeId = activeResumeId;

  // Save to local storage whenever accomplishments change
  useEffect(() => {
    localStorage.setItem('accomplishments', JSON.stringify(accomplishments));
  }, [accomplishments]);

  useEffect(() => {
    if(accomplishments.length === 0) {
      setAccomplishments(
        [""]
      )
    }
  },[])

  const handleAccomplishmentChange = (index, value) => {
    const updatedAccomplishments = [...accomplishments];
    updatedAccomplishments[index] = value;
    setAccomplishments(updatedAccomplishments);
  };

  const addAccomplishment = () => {
    setAccomplishments([...accomplishments, '']);
  };

  const removeAccomplishment = (index) => {
    const updatedAccomplishments = accomplishments.filter((_, i) => i !== index);
    setAccomplishments(updatedAccomplishments);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!resumeId) {
      toast.error("Resume ID is missing");
      console.error("❌ Resume ID is undefined");
      return;
    }
    try {
      const data = await axios.post(`${url}/api/accomplishment/add-accomplishment`, {
        userId: localStorage.getItem("temporaryUserId"),
        resumeId,
        accomplishment: accomplishments.map((item) => ({ name: item })),
      });
      toast.success(data.message || 'Saved successfully');
    } catch (error) {
      console.error("❌ Error from backend:", error.response?.data || error);
      toast.error(error.response?.data?.error || 'Save failed');
    }
  };

  return (
    <>
      <div className="p-6 bg-white rounded-md shadow-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Accomplishments</h2>
        <form className="space-y-4">
          {accomplishments.map((accomplishment, index) => (
            <div key={index} className="flex items-center gap-3">
              <input type="text" spellCheck={true} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none capitalize" placeholder="Enter an accomplishment" value={accomplishment} onChange={(e) => handleAccomplishmentChange(index, e.target.value)} style={{ textTransform: 'capitalize' }}/>
              {accomplishments.length > 1 && (
                <button type="button" onClick={() => removeAccomplishment(index)} className="text-red-600 hover:text-red-800 text-xl" title="Remove">
                  <RxCross2 />
                </button>
              )}
            </div>
          ))}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <button type="button" onClick={addAccomplishment} className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-md hover:from-blue-500 hover:to-green-500 transition">
              + Add Another Accomplishment
            </button>
            <button type="button" onClick={handleSave} className="w-full sm:w-auto bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
              Save Accomplishments
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AccomplishmentsSection;
