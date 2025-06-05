import React, { useState , useEffect} from "react";
import ProjectSection from "./ProjectSection";
import CertificationSection from "./CertificationSection";
import HobbiesSection from "./HobbiesSection";
import LanguagesSection from "./LanguagesSection";
import AccomplishmentSection from "./AccomplishmentSection";
import VolunteeringSection from "./VolunteeringSection";
import SoftwareSection from "./SoftwareSection";
import SocialMediaSection from "./SocialMediaSection";

const ExtraSection = ({ nextStep, prevStep , url}) => {
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
  const [isVisible, setIsVisible] = useState(false);

  
  const check =() =>{
    if (localStorage.getItem("projects") === 0) {
      localStorage.setItem("projects",JSON.stringify([]))
    }
    if (localStorage.getItem("certifications") === 0) {
      localStorage.setItem("certifications", JSON.stringify([]))
    }
    if (localStorage.getItem("accomplishments") === 0) {
      localStorage.setItem("accomplishments", JSON.stringify([]))
    }
    if (localStorage.getItem("softwareInfo") === 0) {
      localStorage.setItem("softwareInfo", JSON.stringify([]))
    }
    if (localStorage.getItem("interests") === 0) {
      localStorage.setItem("interests",JSON.stringify([]))
    }
    if (localStorage.getItem("languages") === 0) {
      localStorage.setItem("languages", JSON.stringify([]))
    }
    if (localStorage.getItem("socialLinks") === 0) {
      localStorage.setItem("socialLinks", JSON.stringify([]))
    }
    if (localStorage.getItem("volunteering") === 0) {
      localStorage.setItem("volunteering", JSON.stringify([]))
    }
  }

  useEffect(() => {
    check()
  },[])

  const handleNext = () => {
    check()
    nextStep()
  }

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

  // Scroll event listener in a separate useEffect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means it runs only once (on mount and unmount)

  // Function to scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          {selectedSections.includes("Projects") && <ProjectSection  url={url}/>}
          {selectedSections.includes("Certifications") && <CertificationSection  url={url}/>}
          {selectedSections.includes("Hobbies") && <HobbiesSection  url={url}/>}
          {selectedSections.includes("Languages") && <LanguagesSection  url={url}/>}
          {selectedSections.includes("Accomplishments") && <AccomplishmentSection  url={url}/>}
          {selectedSections.includes("Social Media") && <SocialMediaSection url={url} />}
          {selectedSections.includes("Software") && <SoftwareSection  url={url}/>}
          {selectedSections.includes("Volunteering") && <VolunteeringSection  url={url}/>}
        </div>
      )}
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md w-1/3 hover:bg-gray-600 transition">
          Previous
        </button>
        <button type="button" onClick={handleNext} className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-md w-1/3 hover:opacity-90 transition" >
          Next
        </button>
      </div>
      {/* Back to Top Button */}
      {isVisible && (
        <button onClick={scrollToTop} className="fixed bottom-6 h-8 w-8 right-6 bg-gradient-to-r from-green-500 to-blue-500 text-white  rounded-full shadow-lg hover:opacity-90 transition">
          ↑
        </button>
      )}
    </div>
  );
};

export default ExtraSection;
// import React, { useState , useEffect} from "react";
// import ProjectSection from "./ProjectSection";
// import CertificationSection from "./CertificationSection";
// import HobbiesSection from "./HobbiesSection";
// import LanguagesSection from "./LanguagesSection";
// import AccomplishmentSection from "./AccomplishmentSection";
// import VolunteeringSection from "./VolunteeringSection";
// import SoftwareSection from "./SoftwareSection";
// import SocialMediaSection from "./SocialMediaSection";
// import { useLocation } from "react-router-dom";

// const ExtraSection = ({ nextStep, prevStep , url}) => {
//   const [selectedSections, setSelectedSections] = useState(() => {
//     const savedSections = localStorage.getItem("selectedSections");
//     return savedSections ? JSON.parse(savedSections) : [];
//   });

//   const sections = [
//     "Projects",
//     "Certifications",
//     "Hobbies",
//     "Languages",
//     "Accomplishments",
//     "Social Media",
//     "Software",
//     "Volunteering",
//   ];
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     // Save the selected sections to localStorage whenever it changes
//     localStorage.setItem("selectedSections", JSON.stringify(selectedSections));
//   }, [selectedSections]);

//   const toggleSection = (section) => {
//     setSelectedSections((prev) =>
//       prev.includes(section)
//         ? prev.filter((item) => item !== section)
//         : [...prev, section]
//     );
//   };

//   // Scroll event listener in a separate useEffect
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 300) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     // Cleanup event listener when component unmounts
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []); // Empty dependency array means it runs only once (on mount and unmount)

//   // Function to scroll the page to the top
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const useLocalStorageSanitizer = () => {
//   const location = useLocation();

//   useEffect(() => {
//     setMissingLocalStorageDefaults(); // Run on every page change
//   }, [location.pathname]); // re-run when route/path changes
// };
//   const isAllFieldsEmpty = (obj) => {
//   return Object.values(obj).every(
//     (value) => typeof value === "string" && value.trim() === ""
//   );
// };

// const setMissingLocalStorageDefaults = () => {
//   const sectionKeys = {
//     certifications: ["name"],
//     projects: ["name", "deployedLink", "summary", "githubLink"],
//     hobbies: ["name"],
//     languages: ["name"],
//     accomplishments: ["name"],
//     socialMedia: ["platform", "link"],
//     software: ["name"],
//     volunteering: ["organization", "role", "description"],
//   };

//   Object.entries(sectionKeys).forEach(([key, fields]) => {
//     const raw = localStorage.getItem(key);

//     if (!raw || raw === "null" || raw === "undefined") {
//       localStorage.setItem(key, JSON.stringify([]));
//       console.log(`🔧 Set empty array for: ${key} (no data found)`);
//       return;
//     }

//     try {
//       const parsed = JSON.parse(raw);
//       if (
//         Array.isArray(parsed) &&
//         parsed.length > 0 &&
//         parsed.every((item) =>
//           fields.every((field) => !item[field] || item[field].trim() === "")
//         )
//       ) {
//         localStorage.setItem(key, JSON.stringify([]));
//         console.log(`🟡 Set empty array for: ${key} (all fields empty)`);
//       }
//     } catch (e) {
//       console.warn(`⚠️ Failed to parse ${key}, resetting.`);
//       localStorage.setItem(key, JSON.stringify([]));
//     }
//   });
// };
// useEffect(() => {
//   // Call on initial mount
//   setMissingLocalStorageDefaults();

//   // Run on tab re-focus (when returning to tab)
//   const handleVisibilityChange = () => {
//     if (document.visibilityState === "visible") {
//       setMissingLocalStorageDefaults();
//     }
//   };

//   // Run before leaving the page
//   const handleBeforeUnload = () => {
//     setMissingLocalStorageDefaults();
//   };

//   document.addEventListener("visibilitychange", handleVisibilityChange);
//   window.addEventListener("beforeunload", handleBeforeUnload);

//   return () => {
//     document.removeEventListener("visibilitychange", handleVisibilityChange);
//     window.removeEventListener("beforeunload", handleBeforeUnload);
//   };
// }, []);


// const handleNext = () => {
//   setMissingLocalStorageDefaults();
//   nextStep(); // existing navigation function
// };

//   return (
//     <div className="p-4 md:p-6 max-w-3xl mx-auto">
//       <h2 className="text-xl md:text-2xl font-bold text-center py-2 text-white rounded-md bg-gradient-to-r from-green-500 to-blue-500">
//         Additional Information
//       </h2>
//       <div className="bg-white shadow-lg p-6 rounded-lg mt-4">
//         <h3 className="text-lg font-semibold mb-3 text-gray-700">
//           Select Sections to Add:
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {sections.map((section) => (
//             <label key={section} className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-200 transition">
//               <input type="checkbox" checked={selectedSections.includes(section)} onChange={() => toggleSection(section)} className="accent-green-500"/>
//               <span className="text-gray-800">{section}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Render selected sections dynamically inside a card */}
//       {selectedSections.length > 0 && (
//         <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
//           <h3 className="text-lg font-semibold mb-3 text-gray-700">Your Selections</h3>
//           {selectedSections.includes("Projects") && <ProjectSection  url={url}/>}
//           {selectedSections.includes("Certifications") && <CertificationSection  url={url}/>}
//           {selectedSections.includes("Hobbies") && <HobbiesSection  url={url}/>}
//           {selectedSections.includes("Languages") && <LanguagesSection  url={url}/>}
//           {selectedSections.includes("Accomplishments") && <AccomplishmentSection  url={url}/>}
//           {selectedSections.includes("Social Media") && <SocialMediaSection url={url} />}
//           {selectedSections.includes("Software") && <SoftwareSection  url={url}/>}
//           {selectedSections.includes("Volunteering") && <VolunteeringSection  url={url}/>}
//         </div>
//       )}
//       {/* Navigation Buttons */}
//       <div className="flex justify-between mt-6">
//         <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md w-1/3 hover:bg-gray-600 transition">
//           Previous
//         </button>
//         <button type="button" onClick={handleNext} className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-md w-1/3 hover:opacity-90 transition" >
//           Next
//         </button>
//       </div>
//       {/* Back to Top Button */}
//       {isVisible && (
//         <button onClick={scrollToTop} className="fixed bottom-6 h-8 w-8 right-6 bg-gradient-to-r from-green-500 to-blue-500 text-white  rounded-full shadow-lg hover:opacity-90 transition">
//           ↑
//         </button>
//       )}
//     </div>
//   );
// };

// export default ExtraSection;
