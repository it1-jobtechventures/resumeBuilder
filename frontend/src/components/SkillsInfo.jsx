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
  
  // // Handle skill name change
  // const handleSkillChange = (index, event) => {
  //   const updatedSkills = [...skills];
  //   updatedSkills[index].name = event.target.value;
  //   setSkills(updatedSkills);
  // };
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

    // const handleSave = async (e) => {
    //   e.preventDefault();
     
    
    //   if (!resumeId) {
    //     toast.error("Resume ID is missing");
    //     console.error("❌ Resume ID is undefined");
    //     return;
    //   }
    
    //   console.log("📤 Sending data to backend:", { resumeId, ...skills });
    
    //   try {
    //     const data = await axios.post(`${url}/api/skills/add-skills`, {
    //       userId: localStorage.getItem("temporaryUserId"),
    //       resumeId,
    //       skills,
    //     });
    
    //     console.log("✅ Response from backend:", data);
    

    //     toast.success(data.message || 'Saved successfully');
    //     nextStep();
    //   } catch (error) {
    //     console.error("❌ Error from backend:", error.response?.data || error);
    //     toast.error(error.response?.data?.error || 'Save failed');
    //   }
    // };
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
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl text-white h-12 flex items-center justify-center font-bold rounded-lg mb-4 shadow-md bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)]">Skills</h2>
        <form className="p-6 bg-white shadow-md rounded-lg">
          {skills.map((skill, index) => (
            <div key={index} className="mb-6 border p-4 rounded-md relative bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700">Skill {index + 1}</label>
                {
                  skills.length > 1 && (
                    <button type="button" onClick={() => removeSkill(index)} className="text-red-600 hover:text-red-800 transition-all duration-300">
                      <Trash2 size={18} />
                    </button>
                  )
                }
              </div>
              <input type="text" value={skill.name} style={{ textTransform: 'capitalize' }} onChange={(e) => handleSkillChange(index, e)} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3" placeholder="Enter a skill (e.g., JavaScript)"/>
              <label className="block text-gray-700 font-semibold mb-1">Proficiency ({skill.level}%)</label>
              <input type="range" min="0" max="100" value={skill.level} onChange={(e) => handleSkillLevelChange(index, e)} className="w-full accent-green-500 hover:accent-green-600 cursor-pointer"/>
            </div>
          ))}
          <button type="button" onClick={addSkill} className="w-full bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)] transition-all duration-300 mt-2 shadow-md">
            + Add Another Skill
          </button>
          <div className="flex justify-between mt-6">
            <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
              Previous
            </button>
            <button type="button" onClick={handleSave} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SkillsInfo;