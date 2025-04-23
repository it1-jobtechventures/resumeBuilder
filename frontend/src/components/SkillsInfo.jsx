import React, { useState ,useEffect , useContext } from "react";
import { Trash2 } from "lucide-react";
import axios from 'axios'
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const SkillsInfo = ({ nextStep, prevStep , url }) => {
  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem("skills");
    return savedSkills ? JSON.parse(savedSkills) : [{ name: "", level: 0}]
  });

    const { updateResumeData  } = useResume();
    const {activeResumeId} = useContext(AppContext)
    console.log('skilss',activeResumeId)
    const resumeId = activeResumeId;

  useEffect(() => {
    localStorage.setItem('skills' , JSON.stringify(skills))
  },[skills])
  
  const handleSkillChange = (index, event) => {
    const updatedSkills = [...skills];
    const value = event.target.value;
  
    updatedSkills[index].name = value;
  
    // Clear level if name is empty
    if (value.trim() === "") {
      updatedSkills[index].level = "";
    }
  
    setSkills(updatedSkills);
  };
  
  // Handle skill level change
  const handleSkillLevelChange = (index, event) => {
    const updatedSkills = [...skills];
    updatedSkills[index].level = event.target.value;
    setSkills(updatedSkills);
  };

  // Add a new skill entry
  const addSkill = () => {
    setSkills([...skills, { name: "", level: "0"}]);
  };

  // Remove a skill entry
  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  useEffect(() => {
    if(skills.length === 0){
      setSkills(
        [{ name: "", level: "0" }]
      )
    }
  },[])

    const handleSave = async (e) => {
      e.preventDefault();
      
      if (!resumeId) {
        toast.error("Resume ID is missing");
        console.error("❌ Resume ID is undefined");
        return;
      }
    
      // Check if there are any skills entered
      let validSkills = skills.filter(skill => skill.name.trim() && skill.level);

      if (validSkills.length === 0) {
        validSkills.push({ name: "", level: "" });  // Now works because validSkills is declared as let
      }
       else {
        console.log("📤 Sending valid skills data to backend:", { resumeId, skills: validSkills });
      }
    
      try {
        // Send the request with valid skills (empty array if skipped)
        const data = await axios.post(`${url}/api/skills/add-skills`, {
          userId: localStorage.getItem("temporaryUserId"),
          resumeId,
          skills: validSkills,
        });
    
        console.log("✅ Response from backend:", data);
        toast.success(data.message || 'Saved successfully');
        nextStep();
      } catch (error) {
        console.error("❌ Error from backend:", error.response?.data || error);
        toast.error(error.response?.data?.error || 'Save failed');
      }
    };
    
  return (
    <>
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <h2 className="text-2xl font-bold text-white text-center h-12 flex items-center justify-center rounded-lg mb-6 shadow-md bg-gradient-to-r from-green-500 to-blue-500">
          Skills
        </h2>
        <form className="p-6 bg-white shadow-md rounded-lg space-y-6">
          {skills.map((skill, index) => (
            <div key={index} className="border p-4 rounded-md bg-gray-50 relative animate-fade-in">
              <div className="flex justify-between items-center mb-3">
                <label className="text-gray-700 font-medium"> Skill {index + 1} </label>
                {skills.length > 1 && (
                  <button type="button" onClick={() => removeSkill(index)} className="text-red-600 hover:text-red-800 transition-colors duration-300" aria-label={`Remove skill ${index + 1}`} >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              <input spellCheck={true} type="text" value={skill.name} onChange={(e) => handleSkillChange(index, e)} placeholder="e.g., JavaScript" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize"/>
              <label className="block mt-4 text-gray-700 font-semibold">Proficiency: {skill.level}% </label>
              <input spellCheck={true} type="range" min="0" max="100" value={skill.level} onChange={(e) => handleSkillLevelChange(index, e)} className="w-full mt-1 accent-green-500 hover:accent-green-600 transition-all cursor-pointer"/>
            </div>
          ))}
          <button type="button" onClick={addSkill}className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-md hover:from-blue-500 hover:to-green-500 transition-all duration-300 shadow-md">
            + Add Another Skill
          </button>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <button type="button" onClick={prevStep} className="w-full sm:w-auto bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition">
              Previous
            </button>
            <button type="button" onClick={handleSave} className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-md hover:from-blue-500 hover:to-green-500 transition-all" >
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SkillsInfo;