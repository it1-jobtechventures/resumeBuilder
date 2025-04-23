import React, { useState , useEffect ,useContext , useRef ,useMemo} from 'react'
import { toast } from "react-toastify";
import jobTypeData from '../assets/jobTypeData';
import DatePicker from 'react-datepicker'; 
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import JoditEditor from 'jodit-react';
import CreatableSelect from 'react-select/creatable'
import location from "../assets/locationData";

  const InternshipInfo = ({ nextStep, prevStep , url}) => {
    const [internshipExperience , setInternshipExperience] = useState(() => {
      const savedData = localStorage.getItem('internshipExperience')
      return savedData ? JSON.parse(savedData) : 
      [{
        company:'',
        location:'',
        title:'' , 
        startDate: '' , 
        endDate: '' , 
        currentlyWorking: false, 
        description: '' , 
        stipend: '', 
        internshipType: '', 
        internshipMode: ''
      }
    ]})
    const { updateResumeData  } = useResume();
    const {activeResumeId} = useContext(AppContext)
    console.log('iE',activeResumeId)
    const resumeId = activeResumeId;
    const editor = useRef(null);

    useEffect(() => {
      localStorage.setItem('internshipExperience', JSON.stringify(internshipExperience));
    }, [internshipExperience]);
 
    //handle input change 
    const handleCompanyChange = (index , event) => {
      const updatedInternship = [...internshipExperience]
      updatedInternship[index][event.target.name]= event.target.value;
      setInternshipExperience(updatedInternship)
    }

    const toggleCurrentlyWorking = (internshipIndex) => {
      const updatedInternship = [...internshipExperience]
      updatedInternship[internshipIndex].currentlyWorking =
        !updatedInternship[internshipIndex].currentlyWorking;
      if (updatedInternship[internshipIndex].currentlyWorking) {
        updatedInternship[internshipIndex].endDate=''; //clear end date
      }
      setInternshipExperience(updatedInternship)
    }

    const addNewInternship = () => {
      setInternshipExperience([
        ...internshipExperience,
        {
          company:'',
          location:'',
          title:'' , 
          startDate: '' , 
          endDate: '' , 
          currentlyWorking: false, 
          description: '' , 
          stipend: '', 
          internshipType: '', 
          internshipMode: ''
        }
      ])
    }

    const removeInternship = (index) => {
      const updatedInternship = internshipExperience.filter((_, i) => i !==index);
      setInternshipExperience(updatedInternship)
    }

    const validateForm = () => {
      const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    
      for (const internship of internshipExperience) {
        if (internship.company.trim() !== "") {
          // Check if required fields are filled
          if (
            !internship.location.trim() ||
            !internship.title.trim() ||
            !internship.startDate ||
            (!internship.currentlyWorking && !internship.endDate) || // End date required if not currently working
            !internship.description.trim() ||
            !internship.internshipMode
          ) {
            toast.error("Please fill all fields if the Company Name is entered.");
            return false;
          }
    
          // Validate that start date is not in the future
          if (internship.startDate > today) {
            toast.error("Start date cannot be in the future.");
            return false;
          }

          // Ensure Start Date is before End Date
         const start = new Date(internship.startDate);
          const end = internship.endDate ? new Date(internship.endDate) : null;
            if (end && start >= end) {
              toast.error('Start Date cannot be after or equal to End Date.');
            return false;
          }
    
          // Validate stipend is not negative
          if (internship.stipend !== "" && Number(internship.stipend) < 0) {
            toast.error("Stipend cannot be negative.");
            return false;
          }
        }
      }
    
      return true; // Return true if all checks pass
    };
    

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  useEffect(() => {
    if(internshipExperience.length === 0){
      setInternshipExperience([
        {
          company: '',
          location: '',
          title: '',
          startDate: '',
          endDate: '',
          currentlyWorking: false,
          description: '',
          stipend: '',
          internshipType: '',
          internshipMode: ''
        }
      ]);
    }


  }, []);

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

      const locationOption = () =>{
        return location.map((loc) => ({
          value:loc.city_name.toLowerCase().replace(/\s+/g, '-'),
          label: loc.city_name
        }))
      }

  const handleSave = async (e) => {
    e.preventDefault();

      // Check if internship data is empty and update local storage accordingly
  const isEmpty = internshipExperience.every(item =>
    !item.company &&
    !item.location &&
    !item.title &&
    !item.startDate &&
    !item.endDate &&
    !item.description &&
    !item.stipend &&
    !item.internshipType &&
    !item.internshipMode &&
    item.currentlyWorking === false
  );

  if (isEmpty) {
    localStorage.setItem("internshipExperience", JSON.stringify([]));
    toast.info("No internship experience added. Skipping...");
        nextStep();
        return;
  } else {
    localStorage.setItem("internshipExperience", JSON.stringify(internshipExperience));
  }

    if (!validateForm()) return;
  
    if (!resumeId) {
      toast.error("Resume ID is missing");
      console.error("❌ Resume ID is undefined");
      return;
    }
  
    console.log("📤 Sending data to backend:", { resumeId, ...internshipExperience });
  
    try {
      const data = await axios.post(`${url}/api/internship/add-internship`, {
        userId: localStorage.getItem("temporaryUserId"),
        resumeId,
        internships: internshipExperience,
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
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-white h-12 mb-6 flex items-center justify-center rounded-md shadow-md bg-gradient-to-r from-green-500 to-blue-500">
            Internship Experience
          </h2>
          <form className="space-y-6">
            {internshipExperience.map((internhip, internshipIndex) => (
              <div key={internshipIndex} className="border p-6 rounded-lg shadow-md bg-white space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Internship {internshipIndex + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Company Name</label>
                    <input spellCheck={true} type="text" name="company" value={internhip.company}onChange={(e) => handleCompanyChange(internshipIndex, e)} style={{ textTransform: 'capitalize' }}className="w-full p-2 border rounded-md" placeholder="Enter company name"/>
                  </div>
                  <div>
                    <label className="block text-gray-700">Company Location</label>
                    <CreatableSelect name="location" isSearchable isClearable options={locationOption()} value={locationOption().find((loc) => loc.value === internhip.location) ||
                      { label: internhip.location, value: internhip.location }}onChange={(e) =>handleCompanyChange(internshipIndex, {target: { name: 'location', value: e?.value || '' },})}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Internship Title</label>
                    <input spellCheck={true} type="text" name="title" value={internhip.title} onChange={(e) => handleCompanyChange(internshipIndex, e)} style={{ textTransform: 'capitalize' }} className="w-full p-2 border rounded-md" placeholder="Enter internship title"/>
                  </div>
                  <div>
                    <label className="block text-gray-700">Starting Date</label>
                    <DatePicker
                      selected={internhip.startDate ? new Date(internhip.startDate) : null}
                      onChange={(date) =>handleCompanyChange(internshipIndex, {target: { name: 'startDate', value: date?.toISOString().split('T')[0] || '' },})}
                      className="w-full p-2 border rounded-md"
                      placeholderText="Joining Date"
                      dateFormat="dd/MM/yyyy"
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Ending Date</label>
                    <DatePicker
                      selected={internhip.endDate ? new Date(internhip.endDate) : null}
                      onChange={(date) => handleCompanyChange(internshipIndex, { target: { name: 'endDate', value: date?.toISOString().split('T')[0] || '' }, })}
                      className="w-full p-2 border rounded-md"
                      placeholderText="Ending Date"
                      disabled={internhip.currentlyWorking}
                      dateFormat="dd/MM/yyyy"
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:col-span-2">
                    <input spellCheck={true} type="checkbox" checked={internhip.currentlyWorking} onChange={(e) => toggleCurrentlyWorking(internshipIndex, e)} className="h-5 w-5"/>
                    <label className="text-gray-700">I currently work here</label>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700">Description</label>
                    <JoditEditor ref={editor} config={editorConfig} spellCheck={true}
                      value={internhip.description}
                      onBlur={(newContent) => { const updated = [...internshipExperience];  updated[internshipIndex].description = newContent; setInternshipExperience(updated); }}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Stipend (in LPA)</label>
                    <input spellCheck={true} type="number" name="stipend" min={0} value={internhip.stipend} onChange={(e) => handleCompanyChange(internshipIndex, e)} className="w-full p-2 border rounded-md" placeholder="Enter stipend"/>
                  </div>
                  <div>
                    <label className="block text-gray-700">Internship Mode</label>
                    <select name="internshipMode" value={internhip.internshipMode} onChange={(e) => handleCompanyChange(internshipIndex, e)} className="w-full p-2 border rounded-md">
                      <option value="">Select Internship Mode</option>
                      <option value="WFH">Work From Home</option>
                      <option value="WFO">Work From Office</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">Internship Type</label>
                    <select name="internshipType" value={internhip.internshipType} onChange={(e) => handleCompanyChange(internshipIndex, e)} style={{ textTransform: 'capitalize' }}className="w-full p-2 border rounded-md">
                      <option value="">Select Internship Type</option>
                      {jobTypeData.map((type, idx) => (
                        <option key={idx} value={type.job_type}>{type.job_type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button type="button" onClick={() => removeInternship(internshipIndex)} className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-md hover:from-blue-500 hover:to-green-500 transition-all">
                  Remove Internship
                </button>
              </div>
            ))}
            <button type="button" onClick={addNewInternship}className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-md hover:from-blue-500 hover:to-green-500 transition-all duration-300">
              + Add Another Internship
            </button>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
              <button type="button"onClick={prevStep}className="w-full sm:w-auto bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition">
                Previous
              </button>
              <button type="button" onClick={handleSave} className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-md hover:from-blue-500 hover:to-green-500 transition-all">
                Next
              </button>
            </div>
          </form>
        </div>
      </>
    )
  }

  export default InternshipInfo