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
import CreatableSelect from 'react-select/creatable'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const WorkExperience = ({ nextStep, prevStep , url}) => {
  const [industries, setIndustries] = useState([]);
  const { updateResumeData  } = useResume();
  // const {activeResumeId} = useContext(AppContext)
  const [activeResumeId, setActiveResumeId] = useState(() => localStorage.getItem("activeResumeId") || null);
  const resumeId = activeResumeId;
  const editor = useRef(null);
  const [editorData, setEditorData] = useState();
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

  const generateDescription = async (companyIndex, roleIndex) => {
    const company = workExperience[companyIndex];
    const role = company.roles[roleIndex];
    if (!company.company || !company.totalCompanyExperience || !role.title) {
      toast.warning("Please fill in Company Name, Experience, and Job Title before generating.");
      return;
    }
    try {
      toast.info("Generating Job description...");
      const response = await axios.post(`${url}/api/ai/generate-jobdescription`, {
        companyName: company.company,
        companyExperience: company.totalCompanyExperience,
        jobTitle: role.title,
      });
      const summary = response.data.summary || "";
      const updatedExperience = [...workExperience];
      updatedExperience[companyIndex].roles[roleIndex].description = summary;
      setWorkExperience(updatedExperience);
      toast.success("Description generated successfully!");
    } catch (error) {
      toast.error("Failed to generate description.");
      console.error("Error generating description:", error);
    }
  };

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
        const res = await axios.post(`${url}/api/workExperience/add-workExperince`, payload);
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
      <form className="space-y-8 max-w-6xl mx-auto p-4 sm:p-8 bg-gray-50 rounded-lg">
        {workExperience.map((company, companyIndex) => (
          <div key={companyIndex} className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg space-y-6 transition-all duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-[#4b164c]">Company {companyIndex + 1}</h3>
              <button type="button" onClick={() => removeCompany(companyIndex)} className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition">
                – Remove Company
              </button>
            </div>
            {/* Company Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-purple-800 font-medium mb-1">Company Name</label>
                <input type="text" name="company" className="w-full p-3 border border-gray-300 rounded-lg capitalize focus:ring-2 focus:ring-blue-500" placeholder="Enter company name" value={company.company} onChange={(e) => handleCompanyChange(companyIndex, e)} />
              </div>
              <div>
                <label className="block text-purple-800 font-medium mb-1">Location</label>
                <CreatableSelect name="location" options={locationOption()} isSearchable className="capitalize" value={locationOption().find((loc) => loc.value === company.location) || { label: company.location, value: company.location }} onChange={(e) => handleCompanyChange(companyIndex, { target: { name: 'location', value: e.value } })} placeholder="Select a location" isClearable />
              </div>
              <div>
                <label className="block text-purple-800 font-medium mb-1">Industry</label>
                <CreatableSelect options={industriesOption()} className="capitalize" isSearchable placeholder="Select an industry..." value={industriesOption().find((ind) => ind.value === company.industry) || { label: company.industry, value: company.industry }} onChange={(selectedOption) => handleCompanyChange(companyIndex, { target: { name: 'industry', value: selectedOption.value } })} />
              </div>
              <div>
                <label className="block text-purple-800 font-medium mb-1">Total Experience</label>
                <input type="number" min={0} name="totalCompanyExperience" className="w-full p-3 border border-gray-300 rounded-lg" value={company.totalCompanyExperience} placeholder="Experience in years" onChange={(e) => handleCompanyChange(companyIndex, e)} />
              </div>
            </div>
            {/* Roles Section */}
            {company.roles.map((role, roleIndex) => (
              <div key={roleIndex} className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-md space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-blue-600">Designation {roleIndex + 1}</h4>
                  <button type="button" onClick={() => removeRole(companyIndex, roleIndex)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition">
                    – Remove Role
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-purple-800 font-medium mb-1">Job Title</label>
                    <input type="text" name="title" value={role.title} className="w-full p-3 border border-gray-300 rounded-lg capitalize" onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)} placeholder="Enter your job title" />
                  </div>
                  <div>
                    <label className="block text-purple-800 font-medium mb-1">CTC (In LPA)</label>
                    <input type="number" name="ctc" min={0} className="w-full p-3 border border-gray-300 rounded-lg" value={role.ctc} placeholder="Current CTC" onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)} />
                  </div>
                  <div>
                    <label className="block text-purple-800 font-medium mb-1">Team Size</label>
                    <input type="number" min={0} name="teamSize" className="w-full p-3 border border-gray-300 rounded-lg" value={role.teamSize} onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)} placeholder="Team size" />
                  </div>
                  <div>
                    <label className="block text-purple-800 font-medium mb-1">Job Type</label>
                    <Select options={jobTypeOptions()} value={jobTypeOptions().find((opt) => opt.value === role.jobType)} onChange={(selectedOption) => handleRoleChange(companyIndex, roleIndex, { target: { name: 'jobType', value: selectedOption?.value } })} placeholder="Select job type" isSearchable className="w-full" />
                  </div>
                  <div>
                    <label className="block text-purple-800 font-medium mb-1">Job Mode</label>
                    <select name="jobMode" className="w-full p-3 border border-gray-300 rounded-lg capitalize" value={role.jobMode} onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)}>
                      <option value="">Select job mode</option>
                      <option value="WFH">Work From Home</option>
                      <option value="WFO">Work From Office</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
                {/* Dates and Checkbox */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-purple-800 font-medium mb-1">Start Date</label>
                    <DatePicker selected={role.startDate ? new Date(role.startDate) : null} onChange={(date) => handleDateChange(date, companyIndex, roleIndex, 'startDate')} dateFormat="MM/yyyy" className="w-full p-3 border border-gray-300 rounded-lg" placeholderText="Select start date" dropdownMode="select" showMonthDropdown showYearDropdown />
                  </div>
                  <div>
                    <label className="block text-purple-800 font-medium mb-1">End Date</label>
                    <DatePicker selected={role.endDate ? new Date(role.endDate) : null} onChange={(date) => handleDateChange(date, companyIndex, roleIndex, 'endDate')} dateFormat="MM/yyyy" className="w-full p-3 border border-gray-300 rounded-lg" disabled={role.currentlyWorking} placeholderText="Select end date" dropdownMode="select" showMonthDropdown showYearDropdown />
                    <div className="mt-2 flex items-center gap-2">
                      <input type="checkbox" checked={role.currentlyWorking} onChange={() => toggleCurrentlyWorking(companyIndex, roleIndex)} className="h-4 w-4" />
                      <label className="text-purple-800">I currently work here</label>
                    </div>
                  </div>
                </div>
                {/* Description */}
                <div>
                  <label className="block text-purple-800 font-medium mb-1">Job Description</label>
                  <CKEditor editor={ ClassicEditor }
                    key={`${companyIndex}-${roleIndex}`}
                    data={role.description}  
                    config={ {
                      licenseKey:'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDkxNjc5OTksImp0aSI6ImQ0MTAzODkwLThlNjAtNDAzNi04MDgyLThhNDUyYjFlYTcxYyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjAyZGExM2I1In0.O80gcsNxnnBbi9Xpz7MW-MGD8WmuvT6q5xAayzBuYLHXvOOFPpiqZhoYE-o2UfmMkPDdusZFrE8GU5LGMKlPlA',
                      // plugins: [ Essentials, Paragraph, Bold, Italic, FormatPainter ],
                      toolbar: ['undo','redo','|','bold','italic','underline','|','heading','formatPainter','|','link','imageUpload','|','bulletedList','numberedList','blockQuote',],
                    }}
                    onChange={(event , editor) => {const data = editor.getData(); handleRoleChange(companyIndex , roleIndex,{target:{name:'description', value:data}})}}
                  />
                  <button type="button" onClick={() => generateDescription(companyIndex, roleIndex)} className="mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
                    ✨ Generate Job Description
                  </button>
                </div>
                {/* Add Role Button */}
                <div className="text-right">
                  <button type="button" onClick={() => addNewRole(companyIndex)} className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white px-4 py-2 rounded-md transition">
                    + Add Another Designation
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
          <button type="button" onClick={addNewCompany} className="w-full sm:w-auto bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white px-6 py-3 rounded-md transition">
            + Add Another Company
          </button>
          <div className="flex gap-4 w-full sm:w-auto justify-center">
            <button type="button" onClick={prevStep} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md transition">
              Previous
            </button>
            <button type="button" onClick={handleSubmit} className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white px-6 py-3 rounded-md transition">
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default WorkExperience;