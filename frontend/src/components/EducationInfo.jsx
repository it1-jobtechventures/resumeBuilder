import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import degreeData from "../assets/degreeData";
import location from "../assets/locationData";
import DatePicker from 'react-datepicker'; 
import Select from 'react-select'
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import axios from 'axios'

const EducationInfo = ({ nextStep, prevStep , url }) => {

  const [educationList, setEducationList] = useState(() => {
    const savedEducation = localStorage.getItem("education");
    return savedEducation ? JSON.parse(savedEducation) :[
      { school: "", location: "", degree: "", field: "", graduationDate: "", cgpa: "" ,educationMode:"" },
    ]
  });

    const { updateResumeData  } = useResume();
    const {activeResumeId} = useContext(AppContext)
    const resumeId = activeResumeId;
    console.log('edu',activeResumeId)

  useEffect(()=>{
    localStorage.setItem("education" , JSON.stringify(educationList))
  },[educationList])

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

    const locationOption = () =>{
      return location.map((loc) => ({
        value:loc.city_name.toLowerCase().replace(/\s+/g, '-'),
        label: loc.city_name
      }))
    }

  const validateEducation = () => {
    for (const edu of educationList) {
      if (edu.school.trim() !== "") {
        if (
          !edu.location.trim() ||
          !edu.degree ||
          !edu.field.trim() ||
          !edu.graduationDate ||
          !edu.educationMode ||
          !edu.cgpa.trim()
        ) {
          toast.error("Please fill all fields if School Name is entered.");
          return false;
        }
      }
    }
    return true;
  };

  // const handleNext = () => {
  //   if (validateEducation()) {
  //     nextStep();
  //   }
  // };

    useEffect(() => {
      if (educationList.length === 0) {
        setEducationList([
          { school: "", location: "", degree: "", field: "", graduationDate: "", cgpa: "" ,educationMode:"" },
        ]);
      }
    }, []);

    const degree = () => {
      // Use optional chaining to handle cases where degreeData may be undefined or null
      return degreeData?.map((deg) => ({
        value: deg.degree,
        label: deg.degree,
      })) || []; // Ensure the function returns an empty array if degreeData is empty or undefined
    };
    
    // const handleNext = async (e) => {
    //   e.preventDefault();
    //   if (validateEducation()) {
    //     try {
    //       for (const education of educationList) {
    //         if (education.school.trim() !== "") {
    //           await axios.post('http://localhost:5000/api/education/add-education', {
    //             userId: localStorage.getItem("temporaryUserId"),
    //             resumeId,
    //             ...education,
    //           });
    //         }
    //       }
    //       nextStep();
    //     } catch (error) {
    //       console.error("Error saving education:", error);
    //       toast.error("Something went wrong while saving education");
    //     }
    //   }
    // };

    const handleNext = async (e) => {
      e.preventDefault();
      console.log("📋 Starting education validation...");

      if (validateEducation()) {
        try {
          console.log("✅ Validation passed.");
          console.log("📚 Education list to be submitted:", educationList);
          for (const education of educationList) {
            if (education.school.trim() !== "") {
              const payload = {
                userId: localStorage.getItem("temporaryUserId"),
                resumeId,
                ...education,
              };
              console.log("📤 Sending education data to backend:", payload);
              const res = await axios.post(`${url}/api/education/add-education`, {                userId: localStorage.getItem("temporaryUserId"),
                resumeId,
                ...education,});
              console.log("✅ Education saved:", res.data);
            } else {
              console.log("⛔ Skipping empty education entry:", education);
            }
          }
          console.log("🎓 All valid education entries processed.");
          nextStep();
        } catch (error) {
          console.error("❌ Error saving education:", error);
          toast.error("Something went wrong while saving education");
        }
      } else {
        console.warn("🚫 Validation failed. Not submitting.");
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
                <input type="text" style={{ textTransform: 'capitalize' }} name="school" value={education.school} onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" placeholder="Enter your School Name"/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                {/* <input type="text" style={{ textTransform: 'capitalize' }} name="location" value={education.location} onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" placeholder="Enter School Location"/> */}
                {/* <select style={{ textTransform: 'capitalize' }} name="location" value={education.location} onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" placeholder="Enter School Location">
                  {location.map((loc) => (
                    <option value={loc.city_name}>{loc.city_name}</option>
                  ))}
                </select> */}
                                <Select name="location" options={locationOption()} isSearchable style={{ textTransform: 'capitalize' }} 
                                value={locationOption().find((loc) =>loc.value===education.location)} 
                                onChange={(e) => handleEducationChange(index, {target:{name:'location',value:e.value}})} className="w-full p-2 border rounded-md" placeholder="Select an location">
                
                                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="mb-4">
                <label className="block text-gray-700">Degree</label>
                {/* <select name="degree" style={{ textTransform: 'capitalize' }} value={education.degree} onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all">
                  <option value="">Select Degree</option>
                  {degreeData.map((degree) => (
                    <option value={degree.degree}>{degree.degree}</option>
                  ))}
                </select> */}
                {/* <Select options={degree()} style={{textTransform:'capitalize'}} isSearchable placeholder='Select Degree' value={degree().find((deg) => deg.value === education.degree)} onChange={(e) => handleEducationChange(index, e)}/> */}
                <Select
  options={degree()} // Use degree() to get options
  style={{ textTransform: 'capitalize' }} // Apply style for text capitalization
  isSearchable // Make the dropdown searchable
  placeholder="Select Degree" // Set placeholder
  
  value={degree().find((deg) => deg.value === education.degree)} // Find the selected degree
  onChange={(selectedOption) => {
    const event = {
      target: {
        name: "degree",
        value: selectedOption?.value || "",
      }
    };
    handleEducationChange(index, event);
  }}
  // onChange={(selectedOption) => handleEducationChange(index, selectedOption)} // Handle change with selectedOption
/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Field of Study</label>
                <input type="text" name="field" value={education.field} style={{ textTransform: 'capitalize' }}onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" placeholder="E.g. Computer Science"/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Graduation Date (or expected Graduation Date)</label>
                {/* <input type="date" name="graduationDate" value={education.graduationDate} style={{ textTransform: 'capitalize' }} onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"/> */}
                <DatePicker
                  selected={education.graduationDate ? new Date(education.graduationDate) : null}
                  onChange={(date) => handleEducationChange(index, { target: { name: 'graduationDate', value: date } })}
                  dateFormat="yyyy/MM/dd"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                  placeholderText="Select graduation date"
                />
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
              <input type="number" min={0} name="cgpa" value={education.cgpa} onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded-md" placeholder="Enter Your Score"/>
            </div>
            {educationList.length > 1 && (
              <button type="button" onClick={() => removeEducation(index)} className="text-red-600 hover:text-red-800 text-sm">
                Remove This Education
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addNewEducation} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)] w-full">
          + Add Another Education
        </button>
        <div className="flex justify-between mt-6">
          <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Previous
          </button>
          <button type="button" onClick={handleNext} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default EducationInfo;