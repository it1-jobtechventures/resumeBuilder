import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import degreeData from "../assets/degreeData";
import location from "../assets/locationData";
import DatePicker from 'react-datepicker'; 
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import clgName from "../assets/clgName";
import CreatableSelect from 'react-select/creatable'

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

    useEffect(() => {
      if (educationList.length === 0) {
        setEducationList([
          { school: "", location: "", degree: "", field: "", graduationDate: "", cgpa: "" ,educationMode:"" },
        ]);
      }
    }, []);

    const degree = () => {
      return degreeData?.map((deg) => ({
        value: deg.degree,
        label: deg.degree,
      })) || [];
    };
    
    const schoolName = ()=> {
      return clgName.map((sch) => ({
        value : sch.college_name,
        label: sch.college_name
      }))
    }

    const handleNext = async (e) => {
      e.preventDefault();
      console.log("📋 Starting education validation...");

      const isEMpty = educationList.every(edu =>
        !edu.school &&
        !edu.location &&
        !edu.degree && 
        !edu.field && 
        !edu.graduationDate && 
        !edu.educationMode
      )

      if(isEMpty){
        localStorage.setItem('education',JSON.stringify([]))
        toast.info("No Education added. Skipping...");
            nextStep();
            return;
      }
   
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
              const res = await axios.post(`${url}/api/education/add-education`, {  userId: localStorage.getItem("temporaryUserId"),
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
    };

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white text-center mb-6 py-3 rounded-md shadow-lg bg-gradient-to-r from-green-400 to-blue-500">
          Education
        </h2>
        <form className="space-y-6">
          {educationList.map((education, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 animate-fade-in">
              <h3 className="text-lg font-semibold mb-4 text-[#4b164c]">Education {index + 1}</h3>
              {/* School & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium">School Name</label>
                  <CreatableSelect name="school" options={schoolName()} isSearchable className="capitalize"value={schoolName().find((school) => school.value === education.school) || {label: education.school,value: education.school,}}onChange={(e) => handleEducationChange(index, {target: { name: 'school', value: e.value }, })}placeholder="Enter your School Name" isClearable/>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Location</label>
                  <CreatableSelect name="location" options={locationOption()} isSearchable className="capitalize" value={locationOption().find((loc) => loc.value === education.location) || {label: education.location, value: education.location,} }onChange={(e) =>handleEducationChange(index, {target: { name: 'location', value: e.value },})}placeholder="Select location" isClearable/>
                </div>
              </div>
              {/* Degree / Field / Graduation Date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <label className="block text-gray-700 font-medium">Degree</label>
                  <CreatableSelect options={degree()} className="capitalize" isSearchable placeholder="Select Degree" value={degree().find((deg) => deg.value === education.degree) || {label: education.degree,value: education.degree,}}onChange={(selectedOption) => {const event = {target: {ame: 'degree',value: selectedOption?.value || '',}, };handleEducationChange(index, event);}}isClearable/>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Field of Study</label>
                  <input type="text" name="field" className="w-full p-3 border rounded-md capitalize focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" value={education.field} onChange={(e) => handleEducationChange(index, e)} placeholder="e.g. Computer Science"/>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Graduation Date</label>
                  <DatePicker selected={education.graduationDate ? new Date(education.graduationDate) : null}onChange={(date) =>handleEducationChange(index, {target: { name: 'graduationDate', value: date },})}dateFormat="dd/MM/yyyy"className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"placeholderText="Select graduation date"dropdownMode="select"showMonthDropdown showYearDropdown/>
                </div>
              </div>
              {/* Mode of Education */}
              <div className="mt-6">
                <label className="block text-gray-700 font-medium">Mode of Education</label>
                <div className="flex flex-wrap gap-6 mt-2">
                  {['Online', 'Offline', 'Hybrid'].map((mode) => (
                    <label key={mode} className="flex items-center gap-2 text-gray-700">
                      <input type="radio" name={`educationMode-${index}`} value={mode} checked={education.educationMode === mode} onChange={(e) => handleEducationChange(index, e)} className="h-4 w-4"/>
                      {mode}
                    </label>
                  ))}
                </div>
              </div>
              {/* CGPA */}
              <div className="mt-6">
                <label className="block text-gray-700 font-medium">CGPA / Percentage</label>
                <input type="number" name="cgpa" min={0} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" value={education.cgpa} onChange={(e) => handleEducationChange(index, e)} placeholder="Enter your score"/>
              </div>
              {/* Remove Button */}
              {educationList.length > 1 && (
                <div className="mt-4">
                  <button type="button" onClick={() => removeEducation(index)} className="text-red-600 hover:text-red-800 text-sm">
                    Remove This Education
                  </button>
                </div>
              )}
            </div>
          ))}
          {/* Add New Button */}
          <button type="button" onClick={addNewEducation} className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white px-6 py-3 rounded-md transition">
            + Add Another Education
          </button>
          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <button type="button" onClick={prevStep} className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md transition">
              Previous
            </button>
            <button type="button" onClick={handleNext} className="w-full sm:w-auto bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white px-6 py-3 rounded-md transition">
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EducationInfo;