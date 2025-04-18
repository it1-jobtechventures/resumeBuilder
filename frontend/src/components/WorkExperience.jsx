// import React, { useState,useEffect } from 'react';
// import { toast } from 'react-toastify';

// const WorkExperience = ({ nextStep, prevStep }) => {
//   const [workExperience, setWorkExperience] = useState(() => {
//     const savedData = localStorage.getItem('workExperience');
//     return savedData ? JSON.parse(savedData):[
//       {
//         company: '',
//         location: '',
//         industry: '',
//         totalCompanyExperience: '',
//         roles: [
//           { title: '', startDate: '', endDate: '', currentlyWorking: false, description: '',ctc: '', noticePeriod: '',teamSize: '',jobType: 'Permanent',jobMode: 'WFH'}
//         ]
//       }
//     ]
//   });

//   useEffect(() => {
//     localStorage.setItem('workExperience' ,JSON.stringify(workExperience))
//   },[workExperience])

//   // Handle input changes
//   const handleCompanyChange = (index, event) => {
//     const updatedExperience = [...workExperience];
//     updatedExperience[index][event.target.name] = event.target.value;
//     setWorkExperience(updatedExperience);
//   };

//   const handleRoleChange = (companyIndex, roleIndex, event) => {
//     const updatedExperience = [...workExperience];
//     updatedExperience[companyIndex].roles[roleIndex][event.target.name] = event.target.value;
//     setWorkExperience(updatedExperience);
//   };

//   // Toggle "Currently Working Here"
//   const toggleCurrentlyWorking = (companyIndex, roleIndex) => {
//     const updatedExperience = [...workExperience];
//     updatedExperience[companyIndex].roles[roleIndex].currentlyWorking =
//       !updatedExperience[companyIndex].roles[roleIndex].currentlyWorking;
//     if (updatedExperience[companyIndex].roles[roleIndex].currentlyWorking) {
//       updatedExperience[companyIndex].roles[roleIndex].endDate = ''; // Clear end date
//     }
//     setWorkExperience(updatedExperience);
//   };

//   // Add a new designation (role) in the same company
//   const addNewRole = (companyIndex) => {
//     const updatedExperience = [...workExperience];
//     updatedExperience[companyIndex].roles.push({
//       title: '',
//       startDate: '',
//       endDate: '',
//       currentlyWorking: false,
//       description: '',
//       ctc: '', 
//       noticePeriod: '',
//       teamSize: '',
//       jobType: 'Permanent',
//       jobMode: 'WFH'
//     });
//     setWorkExperience(updatedExperience);
//   };

//   // Add a new company
//   const addNewCompany = () => {
//     setWorkExperience([
//       ...workExperience,
//       {
//         company: '',
//         location: '',
//         industry: '',
//         totalCompanyExperience: '',
//         roles: [{ title: '', startDate: '', endDate: '', currentlyWorking: false, description: '' ,ctc: '', noticePeriod: '',teamSize: '',jobType: 'Permanent',jobMode: 'WFH'}]
//       }
//     ]);
//   };


//   const validateFields = () => {
//     for (const company of workExperience) {
//       if (company.company.trim()) {
//         if (!company.location.trim()) {
//           toast.error('Location is required when adding a company name.');
//           return false;
//         }
//         if (!company.totalCompanyExperience) {
//           toast.error('Company Experience is required when adding a company name.');
//           return false;
//         }
//         for (const role of company.roles) {
//           if (!role.title.trim()) {
//             toast.error('Job Title is required when adding a company name.');
//             return false;
//           }
//           if (role.ctc && role.ctc < 0) {
//             toast.error('CTC cannot be negative.');
//             return false;
//           }
//           if (!role.startDate) {
//             toast.error('Start Date is required when adding a company name.');
//             return false;
//           }
//           if (!role.currentlyWorking && !role.endDate) {
//             toast.error('End Date is required when adding a company name.');
//             return false;
//           }
//           const today = new Date().toISOString().split('T')[0];
//           if (role.startDate > today) {
//             toast.error('Start Date cannot be in the future.');
//             return false;
//           }
//           if (role.endDate && role.endDate > today) {
//             toast.error('End Date cannot be in the future.');
//             return false;
//           }
//           if (role.endDate && role.startDate > role.endDate) {
//             toast.error('Start Date cannot be after End Date.');
//             return false;
//           }
//         }
//       }
//     }
//     return true;
//   };

//   const handleNext = () => {
//     if (validateFields()) {
//       nextStep();
//     }
//   };


//   const removeCompany = (index) => {
//     const updatedExperience = workExperience.filter((_, i) => i !== index);
//     setWorkExperience(updatedExperience);
//   };

//   const removeRole = (companyIndex, roleIndex) => {
//     const updatedExperience = [...workExperience];
//     updatedExperience[companyIndex].roles.splice(roleIndex, 1);
//     setWorkExperience(updatedExperience);
//   };

//   return (
//     <>
//       <div className="p-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-md mb-4">Work Experience</h2>
//         <form className='p-6'>
//           {workExperience.map((company, companyIndex) => (
//             <div key={companyIndex} className="border p-4 rounded-md mb-6">
//               <h3 className="text-lg font-semibold mb-2">Company {companyIndex + 1}</h3>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Company Name</label>
//                 <input type="text" name="company" value={company.company} onChange={(e) => handleCompanyChange(companyIndex, e)} className="w-full p-2 border rounded-md" placeholder="Enter company name"/>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Location</label>
//                 <input type="text" name="location" value={company.location} onChange={(e) => handleCompanyChange(companyIndex, e)} className="w-full p-2 border rounded-md" placeholder="Enter company location"/>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Company Industry</label>
//                 <input type="text" name="industry" value={company.industry} onChange={(e) => handleCompanyChange(companyIndex, e)} className="w-full p-2 border rounded-md" placeholder="Enter company Industry"/>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Company Experience</label>
//                 <input type="Number" name="totalCompanyExperience" value={company.totalCompanyExperience} onChange={(e) => handleCompanyChange(companyIndex, e)} className="w-full p-2 border rounded-md" placeholder="total Company Experience In Year"/>
//               </div>
//               <button type="button" onClick={() => removeCompany(companyIndex )} className="text-blue-600 hover:text-blue-800 text-sm">
//                 - remove company
//               </button>
//               {company.roles.map((role, roleIndex) => (
//                 <div key={roleIndex} className="border-l-4 border-blue-500 p-4 mb-4">
//                   <h4 className="text-md font-semibold mb-2">Position {roleIndex + 1}</h4>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Job Title</label>
//                     <input type="text" name="title" value={role.title} onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)} className="w-full p-2 border rounded-md" placeholder="Enter your job title"/>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">CTC</label>
//                     <input type="number" name="ctc" value={role.ctc} onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)} className="w-full p-2 border rounded-md" placeholder="Enter your Cuurent ctc in lpa"/>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Notice period</label>
//                     <input type="text" name="noticePeriod" value={role.noticePeriod} onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)} className="w-full p-2 border rounded-md" placeholder="Enter your notice period"/>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Team size</label>
//                     <input type="number" name="teamSize" value={role.teamSize} onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)} className="w-full p-2 border rounded-md" placeholder="Enter your job title"/>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Job Type</label>
//                     <select name="jobType" value={role.jobType} onChange={(e) => handleRoleChange(companyIndex,roleIndex, e)} className="w-full p-2 border rounded-md mb-2">
//                       <option value="Permanent">Permanent</option>
//                       <option value="Contract">Contract</option>
//                     </select>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Job Mode</label>
//                     <select name="jobMode" value={role.jobMode} onChange={(e) => handleRoleChange(companyIndex,roleIndex, e)} className="w-full p-2 border rounded-md mb-2">
//                       <option value="WFH">Work From Home</option>
//                       <option value="WFO">Work From Office</option>
//                       <option value="Hybrid">Hybrid</option>
//                     </select>
//                   </div>
//                   <div className="flex gap-4">
//                     <div className="mb-4 w-1/2">
//                       <label className="block text-gray-700">Starting Date</label>
//                       <input type="date" name="startDate" value={role.startDate} onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)} className="w-full p-2 border rounded-md"/>
//                     </div>
//                     <div className="mb-4 w-1/2">
//                       <label className="block text-gray-700">Ending Date</label>
//                       <input type="date" name="endDate" value={role.endDate} disabled={role.currentlyWorking} onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)} className="w-full p-2 border rounded-md"/>
//                     </div>
//                   </div>
//                   <div className="mb-4 flex items-center gap-2">
//                     <input type="checkbox" checked={role.currentlyWorking} onChange={() => toggleCurrentlyWorking(companyIndex, roleIndex)} className="h-5 w-5"/>
//                     <label className="text-gray-700">I currently work here</label>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Job Description</label>
//                     <textarea name="description" value={role.description} onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)} className="w-full p-2 border rounded-md" placeholder="Describe your responsibilities" rows={3}/>
//                   </div>
//                   <button type="button" onClick={() => addNewRole(companyIndex)} className="text-blue-600 hover:text-blue-800 text-sm">
//                     + Add Another Designation in this Company
//                   </button>
//                   <button type="button" onClick={() => removeRole(companyIndex ,roleIndex)} className="text-blue-600 hover:text-blue-800 text-sm">
//                     - remove role
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ))}
//           <button type="button" onClick={addNewCompany} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full">
//             + Add Another Company
//           </button>
//           <div className="flex justify-between mt-6">
//             <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
//               Previous
//             </button>
//             <button type="button" onClick={handleNext} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
//               Next
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default WorkExperience;


import React, { useState,useEffect, useContext , useRef ,useMemo} from 'react';
import { toast } from 'react-toastify';
import Select from "react-select";
import axios from "axios";
import location from '../assets/locationData';
import industryData from '../assets/industryData';
import jobTypeData from '../assets/jobTypeData';
import DatePicker from 'react-datepicker'; 
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import JoditEditor from 'jodit-react';

const WorkExperience = ({ nextStep, prevStep , url}) => {
  const [industries, setIndustries] = useState([]);
  const { updateResumeData  } = useResume();
  const {activeResumeId} = useContext(AppContext)
  const resumeId = activeResumeId;
  const editor = useRef(null);

  const [workExperience, setWorkExperience] = useState(() => {
    const savedData = localStorage.getItem('workExperience');
    return savedData ? JSON.parse(savedData):[
      {
        company: '',
        location: '',
        industry: '',
        totalCompanyExperience: '',
        roles: [
          { title: '', startDate: '', endDate: '', currentlyWorking: false, description: '',ctc: '',teamSize: '',jobType: '',jobMode: ''}
        ]
      }
    ]
  });

  useEffect(() => {
    localStorage.setItem('workExperience' ,JSON.stringify(workExperience))
  },[workExperience])

  console.log("we" , activeResumeId)

  const handleCompanyChange = (index, event) => {
    const updatedExperience = [...workExperience];
    updatedExperience[index][event.target.name] = event.target.value;
    setWorkExperience(updatedExperience);
  
    // Save the updated work experience in localStorage
    localStorage.setItem('workExperience', JSON.stringify(updatedExperience));
  };

  // Toggle "Currently Working Here"
  const toggleCurrentlyWorking = (companyIndex, roleIndex) => {
    const updatedExperience = [...workExperience];
    updatedExperience[companyIndex].roles[roleIndex].currentlyWorking =
      !updatedExperience[companyIndex].roles[roleIndex].currentlyWorking;
    if (updatedExperience[companyIndex].roles[roleIndex].currentlyWorking) {
      updatedExperience[companyIndex].roles[roleIndex].endDate = ''; // Clear end date
    }
    setWorkExperience(updatedExperience);
  };

  // Add a new designation (role) in the same company
  const addNewRole = (companyIndex) => {
    const updatedExperience = [...workExperience];
    updatedExperience[companyIndex].roles.push({
      title: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: '',
      ctc: '', 
      teamSize: '',
      jobType: '',
      jobMode: ''
    });
    setWorkExperience(updatedExperience);
  };

  // Add a new company
  const addNewCompany = () => {
    setWorkExperience([
      ...workExperience,
      {
        company: '',
        location: '',
        industry: '',
        totalCompanyExperience: '',
        roles: [{ title: '', startDate: '', endDate: '', currentlyWorking: false, description: '' ,ctc: '', teamSize: '',jobType: '',jobMode: ''}]
      }
    ]);
  };


  const validateFields = () => {
    for (const company of workExperience) {
      if (company.company.trim()) {
        if (!company.location.trim()) {
          toast.error('Location is required when adding a company name.');
          return false;
        }
        if (!company.totalCompanyExperience) {
          toast.error('Company Experience is required when adding a company name.');
          return false;
        }
        for (const role of company.roles) {
          if (!role.title.trim()) {
            toast.error('Job Title is required when adding a company name.');
            return false;
          }
          if (role.ctc && role.ctc < 0) {
            toast.error('CTC cannot be negative.');
            return false;
          }
          if (!role.startDate) {
            toast.error('Start Date is required when adding a company name.');
            return false;
          }
          if (!role.currentlyWorking && !role.endDate) {
            toast.error('End Date is required when adding a company name.');
            return false;
          }
          const today = new Date().toISOString().split('T')[0];
          if (role.startDate > today) {
            toast.error('Start Date cannot be in the future.');
            return false;
          }
          if (role.endDate && role.endDate > today) {
            toast.error('End Date cannot be in the future.');
            return false;
          }
          if (role.endDate && role.startDate > role.endDate) {
            toast.error('Start Date cannot be after End Date.');
            return false;
          }
          // Ensure Start Date is before End Date
          const start = new Date(role.startDate);
          const end = role.endDate ? new Date(role.endDate) : null;
          if (end && start >= end) {
            toast.error('Start Date cannot be after or equal to End Date.');
            return false;
          }
        }
      }
    }
    return true;
  };

  const local = localStorage.getItem('temporaryUserId')
  console.log("tempuserid", local)

  const handleNext = () => {
    if (validateFields()) {
      nextStep();
    }
  };


  const removeCompany = (index) => {
    const updatedExperience = workExperience.filter((_, i) => i !== index);
    setWorkExperience(updatedExperience);
  };

  const removeRole = (companyIndex, roleIndex) => {
    const updatedExperience = [...workExperience];
    updatedExperience[companyIndex].roles.splice(roleIndex, 1);
    setWorkExperience(updatedExperience);
  };

  
  // Update role change handler to handle dates properly
  const handleRoleChange = (companyIndex, roleIndex, event) => {
    const updatedExperience = [...workExperience];
    updatedExperience[companyIndex].roles[roleIndex][event.target.name] = event.target.value;
    setWorkExperience(updatedExperience);
  };

  // Handle date change (to update the date format)
  const handleDateChange = (date, companyIndex, roleIndex, field) => {
    const updatedExperience = [...workExperience];
    updatedExperience[companyIndex].roles[roleIndex][field] = date;
    setWorkExperience(updatedExperience);
  };
 
  useEffect(() => {
    if (workExperience.length === 0) {
      setWorkExperience([
        {
          company: '',
          location: '',
          industry: '',
          totalCompanyExperience: '',
          roles: [
            { title: '', startDate: '', endDate: '', currentlyWorking: false, description: '', ctc: '', teamSize: '', jobType: '', jobMode: '' }
          ]
        }
      ]);
    }
  }, []);
  
  
  const industriesOption = () => {
    // Return the array of options, each with value and label
    return industryData.map((indus) => ({
      value: indus.industry_name.toLowerCase().replace(/\s+/g, '-'), // Using lowercase and hyphen for value
      label: indus.industry_name // The label will be the industry name
    }));
  }


  const jobTypeOptions = () => {
    return jobTypeData?.map((job) => ({
      value: job.job_type,
      label: job.job_type, // Use `label` instead of `name` for Select options for clarity
    })) || []; // Handle empty or undefined `jobTypeData` gracefully
  };

  const locationOption = () =>{
    return location.map((loc) => ({
      value:loc.city_name.toLowerCase().replace(/\s+/g, '-'),
      label: loc.city_name
    }))
  }
  

  const editorConfig = useMemo(() => ({
    readonly: false,
    height: 400,
    toolbarSticky: false,
    buttons: [
      'bold', 'italic', 'underline', 'ul', 'ol', 'font', 'fontsize',
      'paragraph', 'align', 'undo', 'redo', 'link', 'image', 'video'
    ],
    uploader: {
      insertImageAsBase64URI: true,
    }
  }), []);

const handleSubmit = async (e) => {
  e.preventDefault();

  const isAllEmpty = workExperience.every(company =>
    !company.company.trim() &&
    company.roles.every(role =>
      !role.title.trim() &&
      !role.startDate &&
      !role.endDate &&
      !role.description &&
      !role.ctc &&
      !role.teamSize
    )
  );

  // If all fields are empty, allow user to skip
  if (isAllEmpty) {
       // Save empty array to localStorage
       localStorage.setItem('workExperience', JSON.stringify([]));
    toast.info("No work experience added. Skipping...");
    nextStep();
    return;
  }

  // Validate if any data is present
  if (!validateFields()) return;

  try {
    for (let companyData of workExperience) {
      const payload = {
        userId: localStorage.getItem("temporaryUserId"),
        resumeId,
        ...companyData,
      };
      console.log("📤 Sending work experience to backend:", payload);
      const res = await axios.post(`${url}/api/workExperience/add-workExperince`, payload);
      console.log("✅ Response from backend:", res.data);
    }
    toast.success("Work experience saved successfully!");
    nextStep();
  } catch (error) {
    toast.error("Failed to save work experience");
    console.error("❌ Error while saving work experience:", error);
  }
};

  return (
    <>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-md mb-4">Work Experience</h2>
        <form className='p-6'>
          {workExperience.map((company, companyIndex) => (
            <div key={companyIndex} className="border p-4 rounded-md mb-6">
              <h3 className="text-lg font-semibold mb-2">Company {companyIndex + 1}</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Company Name</label>
                <input type="text" name="company" style={{ textTransform: 'capitalize' }} value={company.company} onChange={(e) => handleCompanyChange(companyIndex, e)} className="w-full p-2 border rounded-md" placeholder="Enter company name"/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <Select name="location" options={locationOption()} isSearchable style={{ textTransform: 'capitalize' }} 
                  value={locationOption().find((loc) =>loc.value===company.location)} 
                  onChange={(e) => handleCompanyChange(companyIndex, {target:{name:'location',value:e.value}})} className="w-full p-2 border rounded-md" placeholder="Select an location">
                </Select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Company Industry</label>
                <Select options={industriesOption()}  style={{ textTransform: 'capitalize' }} isSearchable placeholder="Select an industry..."
                  value={industriesOption().find((ind) => ind.value === company.industry)} // Find the selected option based on value
                  onChange={(selectedOption) => {handleCompanyChange(companyIndex, {target: { name: 'industry', value: selectedOption.value },});}}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Company Experience</label>
                <input type="Number" min={0} name="totalCompanyExperience" value={company.totalCompanyExperience} onChange={(e) => handleCompanyChange(companyIndex, e)} className="w-full p-2 border rounded-md" placeholder="total Company Experience In Year"/>
              </div>
              <button type="button" onClick={() => removeCompany(companyIndex )} className="mb-6 bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md ">
                - remove company
              </button>
              {company.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="border-l-4 border-blue-500 p-4 mb-4 pt-4">
                  <h4 className="text-md font-semibold mb-2">Position {roleIndex + 1}</h4>
                  <div className="mb-4">
                    <label className="block text-gray-700">Job Title</label>
                    <input type="text" name="title" style={{ textTransform: 'capitalize' }} value={role.title} onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)} className="w-full p-2 border rounded-md" placeholder="Enter your job title"/>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">CTC (In LPA)</label>
                    <input type="number" name="ctc" style={{ textTransform: 'capitalize' }} value={role.ctc} onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)} className="w-full p-2 border rounded-md" placeholder="Enter your current ctc in lpa" min={0}/>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Team size</label>
                    <input type="number" min={0} name="teamSize" value={role.teamSize} onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)} className="w-full p-2 border rounded-md" placeholder="Enter your job title"/>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Job Type</label>
                    <Select options={jobTypeOptions()} value={jobTypeOptions().find(option => option.value === role.jobType)} 
                      onChange={(selectedOption) => { handleRoleChange(companyIndex, roleIndex, { target: { name: 'jobType', value: selectedOption?.value },});}}className="w-full p-2 border rounded-md"placeholder="Select your job type" isSearchable
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Job Mode</label>
                    <select name="jobMode" style={{ textTransform: 'capitalize' }} value={role.jobMode} onChange={(e) => handleRoleChange(companyIndex,roleIndex, e)} className="w-full p-2 border rounded-md mb-2">
                      <option selected disabled value=''>Select your job Mode</option>
                      <option value="WFH">Work From Home</option>
                      <option value="WFO">Work From Office</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div className="flex gap-4">
                    <div className="mb-4 w-1/2">
                      <label className="block text-gray-700">Starting Date</label>
                      <DatePicker
                        selected={role.startDate ? new Date(role.startDate) : null}
                        onChange={(date) => handleDateChange(date, companyIndex, roleIndex, 'startDate')}
                        dateFormat="dd/MM/yyyy"
                        className="w-full p-2 border rounded-md"
                        placeholderText="Select start date"
                        dropdownMode='select'
                        showMonthDropdown
                        showYearDropdown
                      />
                    </div>
                    <div className="mb-4 w-1/2">
                      <label className="block text-gray-700">Ending Date</label>
                      <DatePicker
                        selected={role.endDate ? new Date(role.endDate) : null}
                        onChange={(date) => handleDateChange(date, companyIndex, roleIndex, 'endDate')}
                        dateFormat="dd/MM/yyyy"
                        disabled={role.currentlyWorking}
                        className="w-full p-2 border rounded-md"
                        placeholderText="Select end date"
                        dropdownMode='select'
                        showMonthDropdown
                        showYearDropdown
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex items-center gap-2">
                    <input type="checkbox" checked={role.currentlyWorking} onChange={() => toggleCurrentlyWorking(companyIndex, roleIndex)} className="h-5 w-5"/>
                    <label className="text-gray-700">I currently work here</label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Job Description</label>
                    <JoditEditor value={role.description} config={editorConfig} onBlur={(newContent) => {const updatedExperience = [...workExperience];updatedExperience[companyIndex].roles[roleIndex].description = newContent; setWorkExperience(updatedExperience);}}/>
                  </div>
                  <div className='flex justify-between flex-col gap-5 lg:flex-row'>
                    <button type="button" onClick={() => addNewRole(companyIndex)} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
                      + Add Another Designation in this Company
                    </button>
                    <button type="button" onClick={() => removeRole(companyIndex ,roleIndex)} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600">
                      - remove role
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <button type="button" onClick={addNewCompany} className=" w-full bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
            + Add Another Company
          </button>
          <div className="flex justify-between mt-6">
            <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
              Previous
            </button>
            <button type="button" onClick={handleSubmit} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WorkExperience;