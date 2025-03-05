import React, { useEffect, useState } from 'react'

const GeneralInfo = ({nextStep}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    phone1: '',
    phone2: '',
    city: '',
    country: '',
    pincode: '',
    address: '',
    experience: '',
    linkedin: '',
    portfolio: '',
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('generalInfo'));
    if (storedData) {
      setFormData(storedData);
    }
  },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    localStorage.setItem('generalInfo', JSON.stringify(updatedData));
  };

  return (
    <>
    <div className='flex justify-center items-center min-h-screen p-4 bg-gray-100'>
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl text-center font-bold text-white p-3 rounded-t-xl bg-[linear-gradient(90deg,_#54DF71_0%,_#037CD5_100%)]">Basic Information</h2>
        <div className='flex  justify-center'>
        <form className='grid gap-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="">
              <label className="block text-[#4b164c] font-semibold">First Name<span className='text-red-700 pl-0.5'>*</span></label>
              <input type="text" value={formData.firstName} name='firstName' onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Rohit" required />
            </div>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">Last Name<span className='text-red-700 pl-0.5'>*</span></label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Sharma" required/>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">Email<span className='text-red-700 pl-0.5'>*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="rohit@gmail.com" required/>
            </div>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">DOB</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your DOB" />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">Phone Number<span className='text-red-700 pl-0.5'>*</span></label>
              <input type="tel" name="phone1" value={formData.phone1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your phone number" required/>
            </div>
            <div className="">
              <label className="block text-[#4b164c] font-bold">Phone Number</label>
              <input type="tel" name="phone2" value={formData.phone2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your optional phone number" />
            </div>
          </div>
          <div className="">
            <label className="block text-[#4b164c] font-bold">Address</label>
            <textarea type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your full address" rows={4} />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className="mb-4">  
                <label className="block text-[#4b164c] font-bold">Country<span className='text-red-700 pl-0.5'>*</span></label>
                <input type="text"name="country" value={formData.country} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your Country" required/>
              </div>
              <div className="mb-4">
                <label className="block text-[#4b164c] font-bold">Pincode</label>
                <input type="Number" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your Pincode" />
              </div>
            </div>
          </div>
          <div className="">
              <label className="block text-[#4b164c] font-bold">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your City" />
            </div>
          <div className="mb-4">
            <label className="block text-[#4b164c] font-bold">Total Experience</label>
            <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your Total Experience"  />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">LinkedIn Url</label>
              <input type="url" name="linkedin"  value={formData.linkedin} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your linkedin url" />
            </div>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">Portfolio</label>
              <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your Portfolio" />
            </div>
          </div>
          <div className="flex lg:justify-end ">
            <button type="button" onClick={nextStep} className="w-full  lg:w-auto bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
              Next
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default GeneralInfo


// after css
// import React, { useState, useEffect } from 'react';

// const GeneralInfo = ({ nextStep }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     dob: '',
//     phone1: '',
//     phone2: '',
//     city: '',
//     country: '',
//     pincode: '',
//     address: '',
//     experience: '',
//     linkedin: '',
//     portfolio: '',
//   });

//   useEffect(() => {
//     const storedData = JSON.parse(localStorage.getItem('generalInfo'));
//     if (storedData) {
//       setFormData(storedData);
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedData = { ...formData, [name]: value };
//     setFormData(updatedData);
//     localStorage.setItem('generalInfo', JSON.stringify(updatedData));
//   };

//   return (
//     <div className='flex justify-center items-center min-h-screen p-4 bg-gray-100'>
//       <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
//         <h2 className="text-2xl text-center font-bold text-white p-3 rounded-t-xl bg-[linear-gradient(90deg,_#54DF71_0%,_#037CD5_100%)]">
//           Basic Information
//         </h2>
        
//         <form className="grid gap-4">
//           {/* Name Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 font-semibold">First Name <span className='text-red-600'>*</span></label>
//               <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Rohit" required />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-semibold">Last Name <span className='text-red-600'>*</span></label>
//               <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Sharma" required />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 font-semibold">Email <span className='text-red-600'>*</span></label>
//             <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="rohit@gmail.com" required />
//           </div>

//           {/* DOB & Phone Numbers */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 font-semibold">DOB</label>
//               <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-semibold">Phone Number <span className='text-red-600'>*</span></label>
//               <input type="tel" name="phone1" value={formData.phone1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
//             </div>
//           </div>

//           {/* Address Fields */}
//           <div>
//             <label className="block text-gray-700 font-semibold">Address</label>
//             <textarea name="address" value={formData.address} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" rows={3} />
//           </div>

//           {/* Country & Pincode */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 font-semibold">Country <span className='text-red-600'>*</span></label>
//               <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-semibold">Pincode</label>
//               <input type="number" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" />
//             </div>
//           </div>

//           {/* Experience */}
//           <div>
//             <label className="block text-gray-700 font-semibold">Total Experience</label>
//             <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" />
//           </div>

//           {/* LinkedIn & Portfolio */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 font-semibold">LinkedIn URL</label>
//               <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-semibold">Portfolio</label>
//               <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" />
//             </div>
//           </div>

//           {/* Next Button */}
//           <div className="flex justify-end">
//             <button type="button" onClick={nextStep} className="bg-gradient-to-r from-[#54DF71] to-[#037CD5] text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
//               Next
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default GeneralInfo;
