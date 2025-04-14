import React, { useState, useEffect ,useContext} from 'react';
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios'

const AccomplishmentsSection = ({url}) => {
  const [accomplishments, setAccomplishments] = useState(() => {
    // Retrieve from local storage or initialize with a single empty entry
    const savedAccomplishments = localStorage.getItem('accomplishments');
    return savedAccomplishments ? JSON.parse(savedAccomplishments) : [''];
  });
  const { updateResumeData  } = useResume();
  const {activeResumeId} = useContext(AppContext)
  console.log('acc',activeResumeId)
  const resumeId = activeResumeId;

  // Save to local storage whenever accomplishments change
  useEffect(() => {
    localStorage.setItem('accomplishments', JSON.stringify(accomplishments));
  }, [accomplishments]);

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
    console.log("📤 Sending data to backend:", { resumeId, ...accomplishments });
  
    try {
      const data = await axios.post(`${url}/api/accomplishment/add-accomplishment`, {
        userId: localStorage.getItem("temporaryUserId"),
        resumeId,
        accomplishment: accomplishments.map((item) => ({ name: item })),
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
      <h2 className="text-2xl font-bold mb-4">Accomplishments</h2>
      {accomplishments.map((accomplishment, index) => (
        <div key={index} className="mb-4 flex items-center">
          <input type="text" className="w-full p-2 border rounded-md" style={{ textTransform: 'capitalize' }} placeholder="Enter an accomplishment" value={accomplishment} onChange={(e) => handleAccomplishmentChange(index, e.target.value)}/>
          {accomplishments.length > 1 && (
            <button type="button" onClick={() => removeAccomplishment(index)} className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
              X
            </button>
          )}
        </div>
      ))}
      <button onClick={handleSave}>save</button>
      <button type="button"onClick={addAccomplishment} className="mt-2 bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
        + Add Another Accomplishment
      </button>
    </div>
  );
};

export default AccomplishmentsSection;
