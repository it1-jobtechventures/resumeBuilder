import React, { useState } from 'react'

const InternshipInfo = ({ nextStep, prevStep }) => {
  const [intershipExperience , setInternshipExperience] = useState([
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

  //handle input change 
  const handleCompanyChange = (index , event) => {
    const updatedInternship = [...intershipExperience]
    updatedInternship[index][event.target.name]= event.target.value;
    setInternshipExperience(updatedInternship)
  }

  const toggleCurrentlyWorking = (internshipIndex) => {
    const updatedInternship = [...intershipExperience]
    updatedInternship[internshipIndex].currentlyWorking =
      !updatedInternship[internshipIndex].currentlyWorking;
    if (updatedInternship[internshipIndex].currentlyWorking) {
      updatedInternship[internshipIndex].endDate=''; //clear end date
    }
    setInternshipExperience(updatedInternship)
  }

  const addNewInternship = () => {
    setInternshipExperience([
      ...intershipExperience,
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
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-center h-10 mb-4 bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] text-white">Internship Experience</h2>
        <form>
          {
            intershipExperience.map((internhip , internshipIndex) => (
              <div key={internshipIndex} className="border p-4 rounded-md mb-6">
                <h3 className="text-lg font-semibold mb-2">Internship {internshipIndex + 1}</h3>
                <div className="mb-4">
                  <label className="block text-[#4b164c]">Company Name</label>
                  <input type='text' name='company' value={internhip.company} onChange={(e) => handleCompanyChange(internhip , e)} className="w-full p-2 border rounded-md"/>
                </div>
                <div className="mb-4">
                  <label className="block text-[#4b164c]">Company Location</label>
                  <input type='text' name='location' value={internhip.location} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                </div>
                <div className="mb-4">
                  <label className="block text-[#4b164c]">Internship Title</label>
                  <input type='text' name='title' value={internhip.title} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                </div>
                <div className="mb-4">
                  <label className="block text-[#4b164c]">Starting Date</label>
                  <input type='date' name='startDate' value={internhip.startDate} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                </div>
                <div className="mb-4">
                  <label className="block text-[#4b164c]">Ending Date</label>
                  <input type='date' name='endDate' value={internhip.endDate} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                </div>
                <div className="mb-4">
                  <input type='checkbox' checked={internhip.currentlyWorking} name='currentlyworking' value={internhip.currentlyWorking} onChange={(e) => toggleCurrentlyWorking(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                  <label className="block text-[#4b164c]">I currently work here</label>
                </div>
                <div className="mb-4">
                  <label className="block text-[#4b164c]">Description</label>
                  <textarea type='text' name='description' value={internhip.description} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                </div>
                <div className="mb-4">
                  <label className="block text-[#4b164c]">Stipend</label>
                  <input type='number' name='stipend' value={internhip.stipend} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                </div>
                <div className="mb-4">
                  <label className="block text-[#4b164c]">Notice Period</label>
                  <input type='text' name='noticePeriod' value={internhip.noticePeriod} onChange={(e) => handleCompanyChange(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Internship Mode</label>
                    <select name="inernshipMode" value={internhip.internshipMode} onChange={(e) => handleCompanyChange(internshipIndex, e)} className="w-full p-2 border rounded-md mb-2">
                      <option value="WFH">Work From Home</option>
                      <option value="WFO">Work From Office</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Internship Type</label>
                    <select name="internshipType" value={internhip.internshipType} onChange={(e) => handleCompanyChange(companyIndex, e)} className="w-full p-2 border rounded-md mb-2">
                      <option value="Permanent">Permanent</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                <div className="mb-4">
                  <label className="block text-[#4b164c]">Company Name</label>
                  <input type='text' name='company' value={internhip.company} onChange={(e) => handleCompanyChage(internshipIndex , e)} className="w-full p-2 border rounded-md"/>
                </div>
              </div>
            ))
          }
          <button type="button" onClick={addNewInternship}>
            + Add aother internsip
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
  )
}

export default InternshipInfo