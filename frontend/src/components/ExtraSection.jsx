import React, { useState } from "react";
import ProjectSection from "./ProjectSection";
import CertificationSection from "./CertificationSection";
import HobbiesSection from "./HobbiesSection";
import LanguagesSection from "./LanguagesSection";
import AccomplishmentSection from "./AccomplishmentSection";
import VolunteeringSection from "./VolunteeringSection";
import SoftwareSection from "./SoftwareSection";
import SocialMediaSection from "./SocialMediaSection";

const ExtraSection = ({ nextStep, prevStep }) => {
  const [selectedSections, setSelectedSections] = useState(() => {
    const savedSections = localStorage.getItem("selectedSections");
    return savedSections ? JSON.parse(savedSections) : [];
  });

  const sections = [
    "Projects",
    "Certifications",
    "Hobbies",
    "Languages",
    "Accomplishments",
    "Social Media",
    "Software",
    "Volunteering",
  ];

  useEffect(() => {
    // Save the selected sections to localStorage whenever it changes
    localStorage.setItem("selectedSections", JSON.stringify(selectedSections));
  }, [selectedSections]);

  const toggleSection = (section) => {
    setSelectedSections((prev) =>
      prev.includes(section)
        ? prev.filter((item) => item !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-center py-2 text-white rounded-md bg-gradient-to-r from-green-500 to-blue-500">
        Additional Information
      </h2>
      <div className="bg-white shadow-lg p-6 rounded-lg mt-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">
          Select Sections to Add:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sections.map((section) => (
            <label key={section} className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-200 transition">
              <input type="checkbox" checked={selectedSections.includes(section)} onChange={() => toggleSection(section)} className="accent-green-500"/>
              <span className="text-gray-800">{section}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Render selected sections dynamically inside a card */}
      {selectedSections.length > 0 && (
        <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Your Selections</h3>
          {selectedSections.includes("Projects") && <ProjectSection />}
          {selectedSections.includes("Certifications") && <CertificationSection />}
          {selectedSections.includes("Hobbies") && <HobbiesSection />}
          {selectedSections.includes("Languages") && <LanguagesSection />}
          {selectedSections.includes("Accomplishments") && <AccomplishmentSection />}
          {selectedSections.includes("Social Media") && <SocialMediaSection />}
          {selectedSections.includes("Software") && <SoftwareSection />}
          {selectedSections.includes("Volunteering") && <VolunteeringSection />}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md w-1/3 hover:bg-gray-600 transition">
          Previous
        </button>
        <button type="button" onClick={nextStep} className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-md w-1/3 hover:opacity-90 transition" >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExtraSection;
