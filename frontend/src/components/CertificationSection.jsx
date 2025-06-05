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
  // const { activeResumeId } = useContext(AppContext);
  const [activeResumeId, setActiveResumeId] = useState(() => localStorage.getItem("activeResumeId") || null);
  const resumeId = activeResumeId;

  useEffect(() => {
    localStorage.setItem('certifications', JSON.stringify(certifications));
  }, [certifications]);

  useEffect(() => {
    if(certifications.length === 0){
      setCertifications(
        [{name: ''}]
      )
    }
  },[])

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

    const isEMpty = certifications.every(certi => !certi.name?.trim())
    if(isEMpty){
      localStorage.setItem("certifications",JSON.stringify([]))
      toast.info("No certificates added. Skipping...");
      return;
    }

    try {
      const data = await axios.post(`${url}/api/certificate/add-certificate`, {
        userId: localStorage.getItem("temporaryUserId"),
        resumeId,
        certifications, // Send certifications as an array of objects
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
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Certifications</h2>
      <form className="space-y-6">
        {certifications.map((certification, index) => (
          <div key={index} className="flex items-center gap-4 border border-gray-300 rounded-md p-4 bg-gray-50 shadow-sm">
            <input type="text" spellCheck={true} placeholder="Enter certification name" value={certification.name} onChange={(e) => handleChange(index, e.target.value)} className="w-full p-3 border border-gray-300 rounded-md capitalize focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            {certifications.length > 1 && (
              <button type="button" onClick={() => handleRemoveCertification(index)} className="text-red-600 hover:text-red-800 text-xl" title="Remove">
                <RxCross2 />
              </button>
            )}
          </div>
        ))}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button type="button" onClick={handleAddCertification} className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-md hover:from-blue-500 hover:to-green-500 transition" >
            + Add Certification
          </button>
          <button type="button" onClick={handleSave} className="w-full sm:w-auto bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
            Save Certifications
          </button>
        </div>
      </form>
    </div>
  </>
  );
};

export default CertificationSection;
