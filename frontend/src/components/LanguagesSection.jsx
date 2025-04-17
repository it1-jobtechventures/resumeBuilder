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
  const {activeResumeId} = useContext(AppContext)
console.log('cer',activeResumeId)
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
    
      console.log("📤 Sending data to backend:", { resumeId, ...languages });
    
      try {
        const data = await axios.post('http://localhost:5000/api/language/add-language', {
          userId: localStorage.getItem("temporaryUserId"),
          resumeId,
          languages,
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
      <h2 className="text-2xl font-bold mb-4">Languages</h2>
      <form>
        {languages.map((lang, index) => (
          <div key={index} className="mb-4 flex items-center space-x-2">
            <select className="p-2 border rounded-md w-1/2" value={lang.language} onChange={(e) => handleChange(index, 'language', e.target.value)}>
              <option value="">Select Language</option>
              {language.map(lan => (
                <option key={lan.id} value={lan.language}>{lan.language}</option>
              ))}
            </select>
            {lang.language === 'Others' && (<input type='text' placeholder='Enter Language' className="p-2 border rounded-md w-1/2" value={lang.customLanguage} onChange={(e) => handleChange(index, 'customLanguage', e.target.value)}/>)}
            <select className="p-2 border rounded-md w-1/2" style={{ textTransform: 'capitalize' }} value={lang.level} onChange={(e) => handleChange(index, 'level', e.target.value)}>
              <option value="" disabled>Select Proficiency</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Fluent">Fluent</option>
              <option value="Native">Native</option>
            </select>
            {languages.length > 1 && (
              <button type="button" onClick={() => removeLanguage(index)} className="text-red-500 hover:text-red-700 font-extrabold text-3xl">
                <RxCross2/>
              </button>
            )}
          </div>
        ))}
        <button onClick={handleSave}>save</button>
        <button type="button" onClick={addLanguage} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
          Add One More Language
        </button>
      </form>
    </div>
  );
};

export default LanguagesSection;