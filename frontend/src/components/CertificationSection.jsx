import React, { useState, useEffect, useContext } from 'react';
import { useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";

const CertificationSection = ({ nextStep, prevStep , url}) => {
  const [certifications, setCertifications] = useState(() => {
    const savedCertifications = localStorage.getItem('certifications');
    return savedCertifications ? JSON.parse(savedCertifications) : [{ name: "" }];
  });

  const { updateResumeData } = useResume();
  const { activeResumeId } = useContext(AppContext);
  const resumeId = activeResumeId;

  useEffect(() => {
    localStorage.setItem('certifications', JSON.stringify(certifications));
  }, [certifications]);

  const handleAddCertification = () => {
    setCertifications([...certifications, { name: "" }]);
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
  };

  const handleChange = (index, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = { name: value }; // Store as object with 'name'
    setCertifications(updatedCertifications);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!resumeId) {
      toast.error("Resume ID is missing");
      console.error("❌ Resume ID is undefined");
      return;
    }
    console.log("📤 Sending data to backend:", { resumeId, certifications });
    try {
      const data = await axios.post(`${url}/api/certificate/add-certificate`, {
        userId: localStorage.getItem("temporaryUserId"),
        resumeId,
        certifications, // Send certifications as an array of objects
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
      <h2 className="text-2xl font-bold mb-4">Certifications</h2>
      <form>
        {certifications.map((certification, index) => (
          <div key={index} className="mb-4 flex items-center">
            <input spellCheck={true} type="text" className="w-full p-2 border rounded-md" style={{ textTransform: 'capitalize' }} placeholder="Enter certification" value={certification.name} onChange={(e) => handleChange(index, e.target.value)} />
            {certifications.length > 1 && (
              <button type="button" onClick={() => handleRemoveCertification(index)} className="ml-2 text-red-500 hover:text-red-700 font-extrabold text-3xl">
                <RxCross2 />
              </button>
            )}
          </div>
        ))}
        <button onClick={handleSave}>Save</button>
        <button type="button" onClick={handleAddCertification} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
          + Add Certification
        </button>
      </form>
    </div>
  );
};

export default CertificationSection;
