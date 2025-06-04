import React, { useState, useEffect ,useContext} from 'react';
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios'
import { RxCross2 } from "react-icons/rx";

const VolunteeringSection = ({url}) => {
  const [volunteering, setVolunteering] = useState(() => {
    const savedVolunteering = localStorage.getItem('volunteering');
    return savedVolunteering ? JSON.parse(savedVolunteering) : [''];
  });
  const { updateResumeData  } = useResume();
  // const {activeResumeId} = useContext(AppContext)
  const [activeResumeId, setActiveResumeId] = useState(() => localStorage.getItem("activeResumeId") || null);
  const resumeId = activeResumeId;

  // Save to local storage whenev
  useEffect(() => {
    localStorage.setItem('volunteering', JSON.stringify(volunteering));
  }, [volunteering]);

  useEffect(() => {
    if(volunteering.length === 0) {
      setVolunteering(
        [""]
      )
    }
  },[])

  const handleVolunteeringChange = (index, value) => {
    const updatedVolunteering = [...volunteering];
    updatedVolunteering[index] = value;
    setVolunteering(updatedVolunteering);
  };

  const addVolunteering = () => {
    setVolunteering([...volunteering, '']);
  };

  const removeVolunteering = (index) => {
    const updatedVolunteering = volunteering.filter((_, i) => i !== index);
    setVolunteering(updatedVolunteering);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!resumeId) {
      toast.error("Resume ID is missing");
      console.error("❌ Resume ID is undefined");
      return;
    }
    try {
      const data = await axios.post(`${url}/api/volunteering/add-volunteering`, {
        userId: localStorage.getItem("temporaryUserId"),
        resumeId,
        volunteerings:volunteering.map((item) => ({ name: item })),
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Volunteering</h2>
        {volunteering.map((item, index) => (
          <div key={index} className="mb-4 flex items-center gap-3">
            <input type="text" spellCheck={true} className="w-full p-2 border rounded-md text-gray-800" style={{ textTransform: "capitalize" }} placeholder="Enter volunteering experience" value={item} onChange={(e) => handleVolunteeringChange(index, e.target.value)} />
            {volunteering.length > 1 && (
              <button type="button" onClick={() => removeVolunteering(index)} className="text-red-500 hover:text-red-700 text-2xl" title="Remove">
                <RxCross2 />
              </button>
            )}
          </div>
        ))}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button type="button" onClick={addVolunteering} className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-md hover:from-blue-500 hover:to-green-500 transition">
            + Add Another Volunteering Experience
          </button>
          <button onClick={handleSave} className="w-full sm:w-auto bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
            Save
          </button>
        </div>
      </div>
    </>
  );
};
export default VolunteeringSection;