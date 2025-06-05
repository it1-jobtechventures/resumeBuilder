import React, { useState, useEffect ,useContext} from 'react';
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios'
import { BsInstagram } from "react-icons/bs";
import { RiFacebookBoxFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaPinterest } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const SocialMediaSection = ({url}) => {
  const [socialLinks, setSocialLinks] = useState(() => {
    const savedLinks = localStorage.getItem('socialLinks');
    return savedLinks ? JSON.parse(savedLinks) :[ {
      instagram: '',
      facebook: '',
      whatsapp: '',
      twitter: '',
      pinterest: '',
      linkedin:'',
      portfolio:'',
      github:''
    }]
  });
  const { updateResumeData  } = useResume();
  // const {activeResumeId} = useContext(AppContext)
  const [activeResumeId, setActiveResumeId] = useState(() => localStorage.getItem("activeResumeId") || null);
  const resumeId = activeResumeId;

  // Save to local storage whenev
  useEffect(() => {
    localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
  }, [socialLinks]);

  const handleChange = (platform, value) => {
    setSocialLinks(prev => ({ ...prev, [platform]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!resumeId) {
      toast.error("Resume ID is missing");
      console.error("❌ Resume ID is undefined");
      return;
    }

    const isEmpty = socialLinks.every(sl => 
      !sl.instagram && !sl.facebook && !sl.whatsapp && !sl.twitter && !sl.pinterest && !sl.linkedin && !sl.portfolio && !sl.github
    )

    if (isEmpty) {
      localStorage.setItem('socialLinks' ,JSON.stringify([]))
      toast.info("No social Links added. Skipping...");
      return;
    }

    try {
      const data = await axios.post(`${url}/api/socialMedia/add-socialLink`, {
        userId: localStorage.getItem("temporaryUserId"),
        resumeId,
        socialLinks,
      });
      toast.success(data.message || 'Saved successfully');
    } catch (error) {
      console.error("❌ Error from backend:", error.response?.data || error);
      toast.error(error.response?.data?.error || 'Save failed');
    }
  };

  return (
    <main className="border m-1.5">
      <div className="flex flex-col gap-6 p-10">
        <div className="flex items-center gap-4 border h-12 p-2">
          <BsInstagram className="text-2xl" />
          <input spellCheck={true} type="url" placeholder="Enter your Instagram profile link" className="outline-none w-full" value={socialLinks.instagram} onChange={(e) => handleChange('instagram', e.target.value)}/>
        </div>
        <div className="flex items-center gap-4 border h-12 p-2">
          <RiFacebookBoxFill className="text-2xl" />
          <input spellCheck={true} type="url" placeholder="Enter your Facebook profile link" className="outline-none w-full" value={socialLinks.facebook} onChange={(e) => handleChange('facebook', e.target.value)}/>
        </div>
        <div className="flex items-center gap-4 border h-12 p-2">
          <FaWhatsapp className="text-2xl" />
          <input spellCheck={true} type="url" placeholder="Enter your WhatsApp profile link" className="outline-none w-full" value={socialLinks.whatsapp} onChange={(e) => handleChange('whatsapp', e.target.value)}/>
        </div>
        <div className="flex items-center gap-4 border h-12 p-2">
          <RiTwitterXFill className="text-2xl" />
          <input spellCheck={true} type="url" placeholder="Enter your X profile link" className="outline-none w-full" value={socialLinks.twitter} onChange={(e) => handleChange('twitter', e.target.value)}/>
        </div>
        <div className="flex items-center gap-4 border h-12 p-2">
          <FaPinterest className="text-2xl" />
          <input spellCheck={true} type="url" placeholder="Enter your Pinterest profile link" className="outline-none w-full" value={socialLinks.pinterest} onChange={(e) => handleChange('pinterest', e.target.value)}/>
        </div>
        <div className="flex items-center gap-4 border h-12 p-2">
          <FaLinkedinIn className="text-2xl" />
          <input spellCheck={true} type="url" placeholder="Enter your Linkedin profile link" className="outline-none w-full" value={socialLinks.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)}/>
        </div>
        <div className="flex items-center gap-4 border h-12 p-2">
          <FaSchool className="text-2xl" />
          <input spellCheck={true} type="url" placeholder="Enter your portfolio link" className="outline-none w-full" value={socialLinks.portfolio} onChange={(e) => handleChange('portfolio', e.target.value)}/>
        </div>
        <div className="flex items-center gap-4 border h-12 p-2">
          <FaGithub className="text-2xl" />
          <input  spellCheck={true} type="url" placeholder="Enter your Github link" className="outline-none w-full" value={socialLinks.github} onChange={(e) => handleChange('github', e.target.value)}/>
        </div>
        <button onClick={handleSave} className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium py-3 rounded-md hover:from-blue-500 hover:to-green-500 transition-all duration-300 mt-6">save</button>
      </div>
    </main>
  );
};

export default SocialMediaSection;
