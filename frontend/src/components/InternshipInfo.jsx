  import React, { useState , useEffect } from 'react'
  import { toast } from "react-toastify";

  const InternshipInfo = ({ nextStep, prevStep }) => {

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
        noticePeriod:'' , 
        internshipType: 'Permanent', 
        internshipMode: 'WFH'
      }
    ]})
    
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
          noticePeriod:'' , 
          internshipType: 'Permanent', 
          internshipMode: 'WFH'
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
  
    return (
      <>
        <div className="p-4 md:p-6 max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center h-10 mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-white">Internship Experience</h2>
          <form>
            {
              internshipExperience.map((internhip , internshipIndex) => (
                <div key={internshipIndex} className="border p-4 rounded-lg mb-6 shadow-md bg-white">
                  <h3 className="text-lg font-semibold mb-2">Internship {internshipIndex + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#4b164c]">Company Name</label>
                      <input type='text' name='company' style={{ textTransform: 'capitalize' }} value={internhip.company} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div className="mb-4">
                    <label className="block text-[#4b164c]">Company Location</label>
                    <input type='text' name='location' style={{ textTransform: 'capitalize' }} value={internhip.location} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div className="mb-4">
                      <label className="block text-[#4b164c]">Internship Title</label>
                      <input type='text' name='title' style={{ textTransform: 'capitalize' }} value={internhip.title} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div className="mb-4">
                      <label className="block text-[#4b164c]">Starting Date</label>
                      <input type='date' name='startDate' value={internhip.startDate} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div className="mb-4">
                      <label className="block text-[#4b164c]">Ending Date</label>
                      <input type='date' name='endDate' value={internhip.endDate} disabled={internhip.currentlyWorking} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div className="mb-4">
                      <input type='checkbox' checked={internhip.currentlyWorking} name='currentlyworking' value={internhip.currentlyWorking} onChange={(e) => toggleCurrentlyWorking(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                      <label className="block text-[#4b164c]">I currently work here</label>
                    </div>
                    <div className="mb-4">
                      <label className="block text-[#4b164c]">Description</label>
                      <textarea type='text' name='description' style={{ textTransform: 'capitalize' }} value={internhip.description} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div className="mb-4">
                      <label className="block text-[#4b164c]">Stipend(in LPA)</label>
                      <input type='number' min={0} name='stipend' value={internhip.stipend} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                    </div>
                    <div className="mb-4">
                      <label className="block text-[#4b164c]">Notice Period</label>
                      {/* <input type='text' name='noticePeriod' value={internhip.noticePeriod} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md"/> */}
                      <select name="noticePeriod" value={internhip.noticePeriod} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md">
                        <option disabled>Choose your notice period</option>
                        <option value='ImmediatelyJoin'>Immediately Join</option>
                        <option value='LessThan15Days'>Less than 15 days</option>
                        <option value='OneMonth'>1 month</option>
                        <option value='ThreeMonth'>3 Months</option>
                        <option value='MoreThan3Months'>More than 3 months</option>
                    </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Internship Mode</label>
                      <select name="internshipMode" value={internhip.internshipMode} onChange={(e) => handleCompanyChange(internshipIndex, e)} className="w-full p-2 border rounded-md mb-2">
                        <option value="WFH">Work From Home</option>
                        <option value="WFO">Work From Office</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Internship Type</label>
                      <select name="internshipType" value={internhip.internshipType} onChange={(e) => handleCompanyChange(internshipIndex, e)} className="w-full p-2 border rounded-md mb-2">
                        <option value="Permanent">Permanent</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                    <button onClick={() => removeInternship(internshipIndex)}>
                      remove internship
                    </button>
                  </div>
                </div>
              ))
            }
            <button type="button" onClick={addNewInternship}>
              + Add One More internsip
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
      </>
    )
  }

  export default InternshipInfo