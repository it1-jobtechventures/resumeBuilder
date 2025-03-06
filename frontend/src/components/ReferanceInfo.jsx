// import React from 'react'
// import { Link } from 'react-router-dom'

// const ReferanceInfo = ({ nextStep, prevStep }) => {
//   const [ reference , setReference] = useState(()  => {
//     const savedReference = localStorage.getItem("reference")
//     return savedReference ? JSON.parse(savedReference) : [
//       {name: '' ,company:"" , contact:""}
//     ]
//   })

//   useEffect(() => {
//     localStorage.setItem("reference" , JSON.stringify(reference))
//   }, [reference])

//   return (
//     <>
//       <div >
//         <h2 className="text-2xl text-white h-10 text-center font-bold mb-4 bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)]">References</h2>
//         <form className="p-6">
//           <div className="mb-4">
//             <label className="block text-gray-700">Reference Name</label>
//             <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter reference name" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Company</label>
//             <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter company name" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Contact Information</label>
//             <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter contact details" />
//           </div>
//           <div className="flex justify-between">
//             <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
//               Previous
//             </button>
//             <Link to={'/templates'}>
//               <button type="button" onClick={nextStep} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
//                 Select your Template
//               </button>
//             </Link>
//           </div>
//         </form>
//       </div>
//     </>
//   )
// }

// export default ReferanceInfo






//local storage
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ReferanceInfo = ({ nextStep, prevStep }) => {
  const [reference, setReference] = useState( () => {
    const savedReferenceInfo = localStorage.getItem('reference');
    return savedReferenceInfo ? JSON.parse(savedReferenceInfo) : [{    name: '',
      company: '',
      contact: ''}]
  });

  // Load data from local storage when component mounts
  // useEffect(() => {
  //   const savedReference = localStorage.getItem('reference');
  //   if (savedReference) {
  //     setReference(JSON.parse(savedReference));
  //   }
  // }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('reference', JSON.stringify(reference));
  }, [reference]);


  const handleChange = (e) => {
    setReference({
      ...reference,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div>
        <h2 className="text-2xl text-white h-10 text-center font-bold mb-4 bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)]">
          References
        </h2>
        <form className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700">Reference Name</label>
            <input type="text" name="name" className="w-full p-2 border rounded-md" placeholder="Enter reference name" value={reference.name} onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Company</label>
            <input type="text" name="company" className="w-full p-2 border rounded-md" placeholder="Enter company name" value={reference.company} onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact Information</label>
            <input type="text" name="contact" className="w-full p-2 border rounded-md" placeholder="Enter contact details" value={reference.contact} onChange={handleChange}/>
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
              Previous
            </button>
            <Link to={'/templates'}>
              <button type="button" onClick={nextStep} className="bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
                Select your Template
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReferanceInfo;


// // after css 
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const ReferanceInfo = ({ nextStep, prevStep }) => {
//   const [reference, setReference] = useState({
//     name: "",
//     company: "",
//     contact: "",
//   });

//   useEffect(() => {
//     const savedReference = localStorage.getItem("reference");
//     if (savedReference) {
//       setReference(JSON.parse(savedReference));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("reference", JSON.stringify(reference));
//   }, [reference]);

//   const handleChange = (e) => {
//     setReference({
//       ...reference,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6">
//       {/* Header */}
//       <h2 className="text-xl md:text-2xl font-bold text-center py-2 text-white rounded-md bg-gradient-to-r from-green-500 to-blue-500">
//         References
//       </h2>

//       {/* Form */}
//       <form className="bg-white shadow-lg p-6 rounded-lg mt-4">
//         {/* Reference Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium">Reference Name</label>
//           <input
//             type="text"
//             name="name"
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter reference name"
//             value={reference.name}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Company */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium">Company</label>
//           <input
//             type="text"
//             name="company"
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter company name"
//             value={reference.company}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Contact Information */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium">Contact Information</label>
//           <input
//             type="text"
//             name="contact"
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter contact details"
//             value={reference.contact}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-between mt-6">
//           <button
//             type="button"
//             onClick={prevStep}
//             className="w-1/3 py-3 bg-gray-600 text-white font-semibold rounded-md shadow-md transition-all duration-300 hover:bg-gray-700 hover:scale-105 active:scale-95"
//           >
//             Previous
//           </button>

//           <Link to="/templates">
//             <button
//               type="button"
//               onClick={nextStep}
//               className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-md shadow-md transition-all duration-300 hover:from-blue-500 hover:to-green-500 hover:scale-105 active:scale-95"
//             >
//               Select Template
//             </button>
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ReferanceInfo;
