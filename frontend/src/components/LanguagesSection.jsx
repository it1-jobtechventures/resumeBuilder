import React, { useState, useEffect ,useContext} from 'react';
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios'
import language from '../assets/language';
import { RxCross2 } from "react-icons/rx";

const LanguagesSection = () => {
  const [languages, setLanguages] = useState(() => {
    // Retrieve from local storage or initialize with a single empty entry
    const savedLanguages = localStorage.getItem('languages');
    return savedLanguages ? JSON.parse(savedLanguages) : [{ language: '',   customLanguage: '', level: '' }];
  });
  const { updateResumeData  } = useResume();
  // const {activeResumeId} = useContext(AppContext)
  const [activeResumeId, setActiveResumeId] = useState(() => localStorage.getItem("activeResumeId") || null);
  const resumeId = activeResumeId;

  // Save to local storage whenev
  // Save to local storage whenever languages change
  useEffect(() => {
    localStorage.setItem('languages', JSON.stringify(languages));
  }, [languages]);

  const handleChange = (index, field, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index][field] = value;

    //If "Others" is selected, reste the language field
    if (field === 'language' && value !== 'Others') {
      updatedLanguages[index].customLanguage = '' ;
    }
    setLanguages(updatedLanguages);
  };

  const addLanguage = () => {
    setLanguages([...languages, { language: '', customLanguage: '' , level: '' }]);
  };

  const removeLanguage = (index) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!resumeId) {
      toast.error("Resume ID is missing");
      console.error("❌ Resume ID is undefined");
      return;
    }
    try {
      const data = await axios.post('http://localhost:5000/api/language/add-language', {
        userId: localStorage.getItem("temporaryUserId"),
        resumeId,
        languages,
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Languages</h2>
        <form className="space-y-6">
          {languages.map((lang, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center border border-gray-300 p-4 rounded-md bg-gray-50 shadow-sm">
              {/* Language Dropdown */}
              <select className="p-3 border rounded-md w-full" value={lang.language} onChange={(e) => handleChange(index, 'language', e.target.value)}>
                <option value="">Select Language</option>
                {language.map((lan) => (
                  <option key={lan.id} value={lan.language}>
                    {lan.language}
                  </option>
                ))}
              </select>
              {/* Custom Language Input */}
              {lang.language === 'Others' && (
                <input  type="text" placeholder="Enter Language" spellCheck={true} value={lang.customLanguage} onChange={(e) => handleChange(index, 'customLanguage', e.target.value)} className="p-3 border rounded-md w-full capitalize"/>
              )}
              {/* Proficiency Dropdown */}
              <select className="p-3 border rounded-md w-full capitalize" value={lang.level} onChange={(e) => handleChange(index, 'level', e.target.value)}>
                <option value="" disabled>Select Proficiency</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Fluent">Fluent</option>
                <option value="Native">Native</option>
              </select>
              {/* Remove Button */}
              {languages.length > 1 && (
                <div className="col-span-full flex justify-end">
                  <button type="button" onClick={() => removeLanguage(index)} className="text-red-600 hover:text-red-800 text-xl" title="Remove Language">
                    <RxCross2 />
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
            <button type="button" onClick={addLanguage} className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-md hover:from-blue-500 hover:to-green-500 transition">
              + Add One More Language
            </button>
            <button type="button" onClick={handleSave} className="w-full sm:w-auto bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
              Save Languages
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LanguagesSection;