// import React from 'react'

// const AddSection = ({ nextStep, prevStep }) => {
//   return (
//     <>
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700">Certifications</label>
//             <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter certifications" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Languages</label>
//             <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter languages you know" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Hobbies & Interests</label>
//             <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your hobbies and interests" />
//           </div>
//           <div className="flex justify-between">
//             <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
//               Previous
//             </button>
//             <button type="button" onClick={nextStep} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
//               Next
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   )
// }

// export default AddSection

import React, { useState } from 'react'
import ProjectSection from './ProjectSection';
import CertificationSection from './CertificationSection';
import HobbiesSection from './HobbiesSection';
import LanguagesSection from './LanguagesSection';
import AccomplishmentSection from './AccomplishmentSection';
import AdditionalInfoSection from './AdditionalInfoSection';
import VolunteeringSection from './VolunteeringSection';
import SoftwareSection from './SoftwareSection';
import SocialMediaSection from './SocialMediaSection';

const ExtraSection = ({ nextStep, prevStep }) => {
  const [selectedSections, setSelectedSections] = useState([]);

  const sections = [
    "Projects",
    "Certifications",
    "Hobbies",
    "Languages",
    "Accomplishments",
    "Social Media",
    "Additional Information",
    "Software",
    "Volunteering",
  ];

  const toggleSection = (section) => {
    setSelectedSections((prev) =>
      prev.includes(section)
        ? prev.filter((item) => item !== section)
        : [...prev, section]
    );
  };
  return (
    <>
    <div >
      <h2 className="text-2xl text-white h-10 text-center font-bold mb-4 bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)]">Additional Information</h2>
      <div className="flex flex-col text-xl font-semibold gap-4 mb-4 p-6">
        {sections.map((section) => (
          <label key={section} className="flex items-center space-x-2">
            <input type="checkbox" checked={selectedSections.includes(section)} onChange={() => toggleSection(section)}/>
            <span>{section}</span>
          </label>
        ))}
      </div>
      {/* Render selected sections dynamically */}
      {selectedSections.includes("Projects") && <ProjectSection />}
      {selectedSections.includes("Certifications") && <CertificationSection />}
      {selectedSections.includes("Hobbies") && <HobbiesSection />}
      {selectedSections.includes("Languages") && <LanguagesSection />}
      {selectedSections.includes("Accomplishments") && <AccomplishmentSection />}
      {selectedSections.includes("Social Media") && <SocialMediaSection/>}
      {selectedSections.includes("Additional Information") && <AdditionalInfoSection />}
      {selectedSections.includes("Software") && <SoftwareSection />}
      {selectedSections.includes("Volunteering") && <VolunteeringSection />}

      <div className="flex justify-between mt-4">
        <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
          Previous
        </button>
        <button type="button" onClick={nextStep} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md">
          Next
        </button>
      </div>
    </div></>
  )
}

export default ExtraSection