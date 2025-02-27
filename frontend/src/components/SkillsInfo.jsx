// import React from 'react'

// const SkillsInfo = ({ nextStep, prevStep }) => {
//   return (
//     <>
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4">Skills</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700">Skill 1</label>
//             <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter a skill" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Skill 2</label>
//             <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter another skill" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Skill 3</label>
//             <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter another skill" />
//           </div>
//           <div className="flex justify-between">
//             <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
//               Previous
//             </button>
//             <button type="button" onClick={nextStep} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
//               Next
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   )
// }

// export default SkillsInfo
import React, { useState } from "react";

const SkillsInfo = ({ nextStep, prevStep }) => {
  const [skills, setSkills] = useState([
    { name: "", level: 50 } // Default skill entry with 50% level
  ]);

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
    <div >
      <h2 className="text-2xl text-white h-10 text-center font-bold mb-4 bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)]">Skills</h2>
      <form className="p-6">
        {skills.map((skill, index) => (
          <div key={index} className="mb-4 border p-4 rounded-md relative">
            <label className="block text-gray-700">Skill {index + 1}</label>
            <input
              type="text"
              value={skill.name}
              onChange={(e) => handleSkillChange(index, e)}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Enter a skill"
            />

            <label className="block text-gray-700">Proficiency</label>
            <input
              type="range"
              min="0"
              max="100"
              value={skill.level}
              onChange={(e) => handleSkillLevelChange(index, e)}
              className="w-full"
            />
            <p className="text-right text-gray-600">{skill.level}%</p>

            {/* Remove Button (except for the first skill) */}
            {skills.length > 1 && (
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addSkill}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
        >
          + Add Another Skill
        </button>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SkillsInfo;
