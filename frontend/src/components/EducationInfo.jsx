import React, { useEffect, useState } from "react";

const EducationInfo = ({ nextStep, prevStep }) => {
  const [educationList, setEducationList] = useState(() => {
    const savedEducation = localStorage.getItem("education");
    return savedEducation ? JSON.parse(savedEducation) :[
      { school: "", location: "", degree: "", field: "", graduationDate: "", cgpa: "" ,educationMode:"" },
    ]
  });

  useEffect(()=>{
    localStorage.setItem("education" , JSON.stringify(educationList))
  },[educationList])

  // const handleEducationChange = (index, event) => {
  //   const { name, value } = event.target;
  //   const updatedEducationList = [...educationList];
  //   updatedEducationList[index][name] = value;
  //   setEducationList(updatedEducationList);
  // };
  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEducationList = [...educationList];
    
    if (name.startsWith("educationMode")) {
      updatedEducationList[index]["educationMode"] = value;
    } else {
      updatedEducationList[index][name] = value;
    }
  
    setEducationList(updatedEducationList);
  };
  
  const addNewEducation = () => {
    setEducationList([...educationList, { school: "", location: "", degree: "", field: "", graduationDate: "", cgpa: "" ,educationMode:""}]);
  };

  const removeEducation = (index) => {
    if (educationList.length > 1) {
      setEducationList(educationList.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-6" >
      <h2 className="text-2xl text-white font-bold text-center mb-6 py-3 rounded-md shadow-lg bg-gradient-to-r from-green-400 to-blue-500">Education</h2>
      <form className="space-y-6">
        {educationList.map((education, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 animate-fade-in">
            <h3 className="text-lg font-semibold mb-3">Education {index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700">School Name</label>
                <input type="text" name="school" value={education.school} onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" placeholder="Enter your School Name"/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input type="text" name="location" value={education.location} onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" placeholder="Enter School Location"/>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="mb-4">
                <label className="block text-gray-700">Degree</label>
                <select name="degree" value={education.degree} onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all">
                  <option value="">Select Degree</option>
                  <option value="Higher School">Higher School</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Field of Study</label>
                <input type="text" name="field" value={education.field} onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" placeholder="E.g. Computer Science"/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Graduation Date (or expected Graduation Date)</label>
                <input type="date" name="graduationDate" value={education.graduationDate} onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"/>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Mode of Education</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="radio" name={`educationMode-${index}`} value="Online" checked={education.educationMode === "Online"} onChange={(e) => handleEducationChange(index, e)} className="mr-2"/>
                  Online
                </label>
                <label className="flex items-center">
                  <input type="radio" name={`educationMode-${index}`} value="Offline" checked={education.educationMode === "Offline"} onChange={(e) => handleEducationChange(index, e)} className="mr-2"/>
                  Offline
                </label>
                <label className="flex items-center">
                  <input type="radio" name={`educationMode-${index}`} value="Hybrid" checked={education.educationMode === "Hybrid"} onChange={(e) => handleEducationChange(index, e)} className="mr-2"/>
                  Hybrid
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">CGPA/Percentage</label>
              <input type="number" name="cgpa" value={education.cgpa} onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded-md" placeholder="Enter Your Score"/>
            </div>
            {educationList.length > 1 && (
              <button type="button" onClick={() => removeEducation(index)} className="text-red-600 hover:text-red-800 text-sm">
                Remove This Education
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addNewEducation} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full">
          + Add Another Education
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
  );
};

export default EducationInfo;
