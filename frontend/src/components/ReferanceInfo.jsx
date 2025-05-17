import React, { useState, useEffect ,useContext} from 'react';
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ReferanceInfo = ({ nextStep, prevStep , url}) => {
  const [reference, setReference] = useState( () => {
    const savedReferenceInfo = localStorage.getItem('reference');
    return savedReferenceInfo ? JSON.parse(savedReferenceInfo) : [{    name: '',
      company: '',
      contact: ''}]
  });
  const { updateResumeData  } = useResume();
  // const {activeResumeId} = useContext(AppContext)
  const [activeResumeId, setActiveResumeId] = useState(() => localStorage.getItem("activeResumeId") || null);
  const navigate = useNavigate()
  const resumeId = activeResumeId;
  // Check if a template is selected
  const selectedTemplateId = localStorage.getItem('selectedTemplateId');

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('reference', JSON.stringify(reference));
  }, [reference]);

  const handleChange = (e) => {
    setReference({
      ...reference,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!resumeId) {
      toast.error("Resume ID is missing");
      console.error("❌ Resume ID is undefined");
      return;
    }
    try {
      const data = await axios.post(`${url}/api/reference/add-reference`, {
        userId: localStorage.getItem("temporaryUserId"),
        resumeId,
        ...reference,
      });
      toast.success(data.message || 'Saved successfully');
      nextStep();
      if (!selectedTemplateId) {
        // If no template is selected, navigate the user to the template selection page
        toast.warning("You haven't selected a template. Please select one.");
        // navigate('/templates');
        navigate('/templates', { state: { flow: 'form-first' } });
      } else {
        // If a template is selected, navigate to the resume review page
        navigate('/resume-review');
      }
    } catch (error) {
      console.error("❌ Error from backend:", error.response?.data || error);
      toast.error(error.response?.data?.error || 'Save failed');
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl text-white h-10 text-center font-bold mb-4 bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)]">
          References
        </h2>
        <form className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700">Reference Name</label>
            <input spellCheck={true} type="text" name="name" style={{ textTransform: 'capitalize' }} className="w-full p-2 border rounded-md" placeholder="Enter reference name" value={reference.name} onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Company</label>
            <input spellCheck={true} type="text" name="company" style={{ textTransform: 'capitalize' }} className="w-full p-2 border rounded-md" placeholder="Enter company name" value={reference.company} onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact Information</label>
            <input spellCheck={true} type="text" name="contact" style={{ textTransform: 'capitalize' }} className="w-full p-2 border rounded-md" placeholder="Enter contact details" value={reference.contact} onChange={handleChange}/>
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
              Previous
            </button>
            {selectedTemplateId ? (
              <button type="button" onClick={handleSave} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
                See Resume Review
              </button>
            ) : (
              <button type="button" onClick={() => navigate('/templates', { state: { flow: 'form-first' } })} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
                Select Your Template
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ReferanceInfo;
