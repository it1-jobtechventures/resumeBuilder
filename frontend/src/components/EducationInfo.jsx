// import React from 'react'

// const EducationInfo = ({ nextStep, prevStep }) => {
//   return (
//     <>
//       <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Education</h2>
//       <form>
//         <div className="mb-4">
//           <label className="block text-gray-700">School Name</label>
//           <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your School Name" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Location</label>
//           <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter School Location" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Degree</label>
//           <select type="text" className="w-full p-2 border rounded-md" placeholder="Enter years of Location" >
//             <option>Higher School</option>
//             <option>Master degree</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Field of Study</label>
//           <input type="text" className="w-full p-2 border rounded-md" placeholder="E.g. Computer Science" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Graduation Date (or expected Graduation Date)</label>
//           <input type="date" className="w-full p-2 border rounded-md" placeholder="Enter Staring data" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">CGPA/Percentage</label>
//           <input type="Number" className="w-full p-2 border rounded-md" placeholder="Enter Your score" />
//         </div>
//         {/* <div className="mb-4">
//           <label className="block text-gray-700">Ending Date</label>
//           <input type="date" className="w-full p-2 border rounded-md" placeholder="Enter Ending date" />
//         </div>
//         <div className="mb-4 ">
//           <input type="checkbox" className="w-full p-2 border rounded-md" placeholder="Enter Ending date" />
//           <label className="block text-gray-700">I currently working here </label>
//         </div> */}
//         <div className="flex justify-between">
//           <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
//             Previous
//           </button>
//           <button type="button" onClick={nextStep} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
//             Next
//           </button>
//         </div>
//       </form>
//     </div>
//     </>
//   )
// }

// export default EducationInfo

import React, { useState } from "react";

const EducationInfo = ({ nextStep, prevStep }) => {
  const [educationList, setEducationList] = useState([
    { school: "", location: "", degree: "", field: "", graduationDate: "", cgpa: "" },
  ]);

  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEducationList = [...educationList];
    updatedEducationList[index][name] = value;
    setEducationList(updatedEducationList);
  };

  const addNewEducation = () => {
    setEducationList([...educationList, { school: "", location: "", degree: "", field: "", graduationDate: "", cgpa: "" }]);
  };

  const removeEducation = (index) => {
    if (educationList.length > 1) {
      setEducationList(educationList.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Education</h2>
      <form>
        {educationList.map((education, index) => (
          <div key={index} className="border p-4 rounded-md mb-6">
            <h3 className="text-lg font-semibold mb-2">Education {index + 1}</h3>

            <div className="mb-4">
              <label className="block text-gray-700">School Name</label>
              <input
                type="text"
                name="school"
                value={education.school}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your School Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={education.location}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter School Location"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Degree</label>
              <select
                name="degree"
                value={education.degree}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Degree</option>
                <option value="Higher School">Higher School</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Field of Study</label>
              <input
                type="text"
                name="field"
                value={education.field}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full p-2 border rounded-md"
                placeholder="E.g. Computer Science"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Graduation Date (or expected Graduation Date)</label>
              <input
                type="date"
                name="graduationDate"
                value={education.graduationDate}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">CGPA/Percentage</label>
              <input
                type="number"
                name="cgpa"
                value={education.cgpa}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Your Score"
              />
            </div>

            {educationList.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove This Education
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addNewEducation}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
        >
          + Add Another Education
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

export default EducationInfo;
