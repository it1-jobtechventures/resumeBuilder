// import React from 'react'
// import { BsInstagram } from "react-icons/bs";
// import { RiFacebookBoxFill } from "react-icons/ri";
// import { FaWhatsapp } from "react-icons/fa";
// import { RiTwitterXFill } from "react-icons/ri";
// import { FaPinterest } from "react-icons/fa6"

// const SocialMediaSection = () => {
//   return (
//     <>
//         <main className='border  m-1.5'>
//             <div className='flex flex-col gap-6 p-10'>
//                 <div className='flex items-center gap-4 border h-12 p-2'>
//                     <BsInstagram className='text-2xl'/>
//                     <input type='url' placeholder='Enter your Instagram profile link' className='outline-none w-full'/>
//                 </div>
//                 <div className='flex items-center gap-4 border h-12 p-2'>
//                     <RiFacebookBoxFill className='text-2xl'/>
//                     <input type='url' placeholder='Enter your facebook profile link' className='outline-none w-full'/>
//                 </div>
//                 <div className='flex items-center gap-4 border h-12 p-2'>
//                     <FaWhatsapp className='text-2xl'/>
//                     <input type='url' placeholder="Enter your What's app profile link" className='outline-none w-full'/>
//                 </div>
//                 <div className='flex items-center gap-4 border h-12 p-2'>
//                     <RiTwitterXFill className='text-2xl'/>
//                     <input type='url' placeholder='Enter your X profile link' className='outline-none w-full'/>
//                 </div>
//                 <div className='flex items-center gap-4 border h-12 p-2'>
//                     <FaPinterest className='text-2xl'/>
//                     <input type='url' placeholder='Enter your Pinterest profile link' className='outline-none w-full'/>
//                 </div>
//             </div>
//         </main>
//     </>
//   )
// }

// export default SocialMediaSection




//local storage
import React, { useState, useEffect } from 'react';
import { BsInstagram } from "react-icons/bs";
import { RiFacebookBoxFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaPinterest } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";

const SocialMediaSection = () => {
  const [socialLinks, setSocialLinks] = useState(() => {
    const savedLinks = localStorage.getItem('socialLinks');
    return savedLinks ? JSON.parse(savedLinks) :[ {
      instagram: '',
      facebook: '',
      whatsapp: '',
      twitter: '',
      pinterest: '',
      linkedin:'',
      portfolio:''
    }]
  });

  useEffect(() => {
    localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
  }, [socialLinks]);

  const handleChange = (platform, value) => {
    setSocialLinks(prev => ({ ...prev, [platform]: value }));
  };

  return (
    <main className="border m-1.5">
      <div className="flex flex-col gap-6 p-10">
        <div className="flex items-center gap-4 border h-12 p-2">
          <BsInstagram className="text-2xl" />
          <input 
            type="url" 
            placeholder="Enter your Instagram profile link" 
            className="outline-none w-full" 
            value={socialLinks.instagram} 
            onChange={(e) => handleChange('instagram', e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 border h-12 p-2">
          <RiFacebookBoxFill className="text-2xl" />
          <input 
            type="url" 
            placeholder="Enter your Facebook profile link" 
            className="outline-none w-full" 
            value={socialLinks.facebook} 
            onChange={(e) => handleChange('facebook', e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 border h-12 p-2">
          <FaWhatsapp className="text-2xl" />
          <input 
            type="url" 
            placeholder="Enter your WhatsApp profile link" 
            className="outline-none w-full" 
            value={socialLinks.whatsapp} 
            onChange={(e) => handleChange('whatsapp', e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 border h-12 p-2">
          <RiTwitterXFill className="text-2xl" />
          <input 
            type="url" 
            placeholder="Enter your X profile link" 
            className="outline-none w-full" 
            value={socialLinks.twitter} 
            onChange={(e) => handleChange('twitter', e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 border h-12 p-2">
          <FaPinterest className="text-2xl" />
          <input 
            type="url" 
            placeholder="Enter your Pinterest profile link" 
            className="outline-none w-full" 
            value={socialLinks.pinterest} 
            onChange={(e) => handleChange('pinterest', e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 border h-12 p-2">
          <FaLinkedinIn className="text-2xl" />
          <input 
            type="url" 
            placeholder="Enter your Linkedin profile link" 
            className="outline-none w-full" 
            value={socialLinks.linkedin} 
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 border h-12 p-2">
          <FaSchool className="text-2xl" />
          <input 
            type="url" 
            placeholder="Enter your portfolio link" 
            className="outline-none w-full" 
            value={socialLinks.portfolio} 
            onChange={(e) => handleChange('portfolio', e.target.value)}
          />
        </div>
      </div>
    </main>
  );
};

export default SocialMediaSection;
