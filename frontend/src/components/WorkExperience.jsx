// import React from 'react'

// const WorkExperience = ({ nextStep, prevStep }) => {
//   return (
//     <>
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
//       <form>
//         <div className="mb-4">
//           <label className="block text-gray-700">Job Title</label>
//           <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your job title" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Company Name</label>
//           <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter company name" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Location</label>
//           <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter years of Location" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Years of Experience</label>
//           <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter years of experience" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Starting Date</label>
//           <input type="date" className="w-full p-2 border rounded-md" placeholder="Enter Staring data" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Ending Date</label>
//           <input type="date" className="w-full p-2 border rounded-md" placeholder="Enter Ending date" />
//         </div>
//         <div className="mb-4 ">
//           <input type="checkbox" className="w-full p-2 border rounded-md" placeholder="Enter Ending date" />
//           <label className="block text-gray-700">I currently working here </label>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Summary</label>
//           <textarea type="text" className="w-full p-2 border rounded-md" placeholder="Enter your job discription" rows={4} />
//         </div>
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

// export default WorkExperience
import React, { useState } from 'react';

const WorkExperience = ({ nextStep, prevStep }) => {
  const [workExperience, setWorkExperience] = useState([
    {
      company: '',
      location: '',
      roles: [
        { title: '', startDate: '', endDate: '', currentlyWorking: false, description: '' }
      ]
    }
  ]);

  // Handle input changes
  const handleCompanyChange = (index, event) => {
    const updatedExperience = [...workExperience];
    updatedExperience[index][event.target.name] = event.target.value;
    setWorkExperience(updatedExperience);
  };

  const handleRoleChange = (companyIndex, roleIndex, event) => {
    const updatedExperience = [...workExperience];
    updatedExperience[companyIndex].roles[roleIndex][event.target.name] = event.target.value;
    setWorkExperience(updatedExperience);
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
      description: ''
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
        roles: [{ title: '', startDate: '', endDate: '', currentlyWorking: false, description: '' }]
      }
    ]);
  };

  return (
    <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
      <form>
        {workExperience.map((company, companyIndex) => (
          <div key={companyIndex} className="border p-4 rounded-md mb-6">
            <h3 className="text-lg font-semibold mb-2">Company {companyIndex + 1}</h3>

            <div className="mb-4">
              <label className="block text-gray-700">Company Name</label>
              <input
                type="text"
                name="company"
                value={company.company}
                onChange={(e) => handleCompanyChange(companyIndex, e)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter company name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={company.location}
                onChange={(e) => handleCompanyChange(companyIndex, e)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter company location"
              />
            </div>

            {/* Roles Section */}
            {company.roles.map((role, roleIndex) => (
              <div key={roleIndex} className="border-l-4 border-blue-500 p-4 mb-4">
                <h4 className="text-md font-semibold mb-2">Position {roleIndex + 1}</h4>

                <div className="mb-4">
                  <label className="block text-gray-700">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={role.title}
                    onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter your job title"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="mb-4 w-1/2">
                    <label className="block text-gray-700">Starting Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={role.startDate}
                      onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <div className="mb-4 w-1/2">
                    <label className="block text-gray-700">Ending Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={role.endDate}
                      disabled={role.currentlyWorking}
                      onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={role.currentlyWorking}
                    onChange={() => toggleCurrentlyWorking(companyIndex, roleIndex)}
                    className="h-5 w-5"
                  />
                  <label className="text-gray-700">I currently work here</label>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Job Description</label>
                  <textarea
                    name="description"
                    value={role.description}
                    onChange={(e) => handleRoleChange(companyIndex, roleIndex, e)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Describe your responsibilities"
                    rows={3}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => addNewRole(companyIndex)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Another Designation in this Company
                </button>
              </div>
            ))}
          </div>
        ))}

        <button
          type="button"
          onClick={addNewCompany}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
        >
          + Add Another Company
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

export default WorkExperience;

