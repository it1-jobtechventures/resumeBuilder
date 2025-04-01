import React, { useState ,useEffect } from "react";
import { Trash2 } from "lucide-react";

const SkillsInfo = ({ nextStep, prevStep }) => {
  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem("skills");
    return savedSkills ? JSON.parse(savedSkills) : [{ name: "", level: 50 }]
  });

  useEffect(() => {
    localStorage.setItem('skills' , JSON.stringify(skills))
  },[skills])
  
  // Handle skill name change
  const handleSkillChange = (index, event) => {
    const updatedSkills = [...skills];
    updatedSkills[index].name = event.target.value;
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
    setSkills([...skills, { name: "", level: 50 }]);
  };

  // Remove a skill entry
  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
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
          <button type="button" onClick={addSkill} className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-300 mt-2 shadow-md">
            + Add Another Skill
          </button>
          <div className="flex justify-between mt-6">
            <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
              Previous
            </button>
            <button type="button" onClick={nextStep} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SkillsInfo;