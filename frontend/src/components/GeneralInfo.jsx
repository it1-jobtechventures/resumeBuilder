import React, { useContext, useEffect, useState , useRef ,useMemo } from 'react'
import countryCode from '../assets/countryCode';
import DatePicker from 'react-datepicker'; 
import Select from 'react-select'
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios'
import designationData from '../assets/designationData';
import CreatableSelect from 'react-select/creatable'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const GeneralInfo = ({nextStep , url}) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [pincode, setPincode] = useState("");
  const { updateResumeData  } = useResume();
  const editor = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName:'',
    lastName: '',
    email: '',
    dob: '',
    countryCode1:'+91',
    phone1: '',
    countryCode2:'+91',
    phone2: '',
    city:'' ,
    country: '',
    pincode: '',
    address: '',
    experience: '',
    summary:'',
    designation:'',
    photo:'',
    noticePeriod:''
  });
  const [activeResumeId, setActiveResumeId] = useState(() => localStorage.getItem("activeResumeId") || null);
  const resumeId = activeResumeId;
  const [editorData, setEditorData] = useState(formData.summary || "");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('generalInfo'));
    if (storedData) {
      setFormData(storedData);
      setSelectedCountry(storedData.country || '');
      setSelectedCity(storedData.city || '');
      setEditorData(storedData.summary || '');
    }
  },[])

  useEffect(() => {
    if (!countryCode || countryCode.length === 0) return;
    const countryList = countryCode.map((country) => ({
      label: country.country_name,
      value: country.country_name
    }));
    setCountries(countryList);
  }, []);

  const countryOptions = () => {
    return countryCode.map((cc) =>({
      value:cc.tel_country_code,
      label:cc.tel_country_code
    }))
  }

  const designationOption = () => {
    return designationData.map((des) => ({
      value :des.role,
      label:des.role
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Limit phone1 and phone2 to digits only and max 14 characters
    if ((name === "phone1" || name === "phone2")) {
      // Only digits allowed, and max length 14
      if (!/^\d*$/.test(value) || value.length > 14) return;
    }
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    localStorage.setItem('generalInfo', JSON.stringify(updatedData));
    // Check if the updated field is either designation or experience
    if (name === 'designation' || name === 'experience') {
    }
  };

  const handleCountryChange = async (selectedOption) => {
    const country = selectedOption?.value || '';
    setSelectedCountry(country);
    setFormData(prev => ({ ...prev, country }));

    if (!country) return;
    try {
      const { data } = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', { country });
      const cityOptions = data?.data?.map(city => ({ label: city, value: city })) || [];
      setCities(cityOptions);
      if (!cityOptions.length) toast.error('No cities found');
    } catch (error) {
      console.error('Error fetching cities:', error);
      toast.error('Failed to load cities');
    }
  };

  const handleCityChange = async (selectedOption) => {
    const city = selectedOption?.value || '';
    setSelectedCity(city);
    setFormData(prev => ({ ...prev, city }));

    if (!selectedCountry || !city) {
      toast.error("Please select a country first.");
      return;
    }

    try {
      const countryCode = selectedCountry.toLowerCase();
      const response = await axios.get(`https://api.zippopotam.us/${countryCode}/${city}`);
      if (response.data && response.data.places.length > 0) {
        const fetchedPincode = response.data.places[0]["post code"];
        setPincode(fetchedPincode);
        setFormData(prev => ({ ...prev, pincode: fetchedPincode }));
      } else {
        toast.error("No pincode found for this city.");
      }
    } catch (error) {
      console.error("Error fetching pincode:", error);
      toast.error("Failed to fetch pincode. Try another city.");
    }
  };

  const editorConfig = useMemo(() => ({
    readonly: false,
    height: 400,
    toolbarSticky: false,
    buttons: [
      'bold', 'italic', 'underline', 'ul', 'ol', 'font', 'fontsize',
      'paragraph', 'align', 'undo', 'redo', 'link', 'image', 'video'
    ],
    uploader: {
      insertImageAsBase64URI: true,
    }
  }), []);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result, // base64 image string
        }));
        localStorage.setItem(
          "generalInfo",
          JSON.stringify({ ...formData, photo: reader.result })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!formData.firstName?.trim()) {
      toast.error('First name is required');
      isValid = false;
    }

    if (!formData.lastName?.trim()) {
      toast.error('Last name is required');
      isValid = false;
    }

    if (!formData.email || !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Invalid email format');
      isValid = false;
    }

    if (!formData.phone1 || !/^\d{7,14}$/.test(formData.phone1)) {
      toast.error('Primary number must be between 7 and 14 digits');
      isValid = false;
    }

    if (formData.phone2 && !/^\d{7,14}$/.test(formData.phone2)) {
      toast.error('Secondary number must be between 7 and 14 digits');
      isValid = false;
    }

    if (formData.dob) {
      const [day, month, year] = formData.dob.split('/').map(Number);
      const selectedDate = new Date(year, month - 1, day); // month is 0-based
      const today = new Date();
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (isNaN(selectedDate.getTime())) {
        toast.error('Invalid date format for DOB');
        isValid = false;
      }else if (selectedDate > today) {
        toast.error('Date of birth cannot be in the future');
        isValid = false;
      }
    }

    if (formData.experience && formData.experience < 0) {
      toast.error('Experience cannot be negative');
      isValid = false;
    }

    if (!formData.country?.trim()) {
      toast.error('Country is required');
      isValid = false;
  }

    if (formData.pincode && !formData.pincode.match(/^\d{5,6}$/)) {
      toast.error('Pincode must be 5-6 digits');
      isValid = false;
    }
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!resumeId) {
      toast.error("Resume ID is missing");
      console.error("❌ Resume ID is undefined");
      return;
    }
    try {
      const data = await axios.post(`${url}/api/generalInfo/add-generalInfo`, {
        userId: localStorage.getItem("temporaryUserId"),
        resumeId,
        ...formData,
      });
      toast.success(data.message || 'Saved successfully');
      nextStep();
    } catch (error) {
      console.error("❌ Error from backend:", error.response?.data || error);
      toast.error(error.response?.data?.error || 'Save failed');
    }
  };

  const generateSummary = async () => {
    if (!formData.designation || !formData.experience) {
      return; // Avoid generating summary if designation or experience is missing
    }
  
    try {
      // Send designation and experience to your backend AI API
      const response = await axios.post(`${url}/api/ai/generate-summary`, {
        designation: formData.designation,
        experience: formData.experience,
      });
  
      if (response.data && response.data.summary) {
        // Update the formData with the generated summary
        setFormData((prevData) => ({
          ...prevData,
          summary: response.data.summary,
        }));
      } else {
        toast.error('Failed to generate summary.');
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      toast.error('Error generating summary. Please try again.');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white text-center bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-t-xl">
            Basic Information
          </h2>
          <form className="space-y-8 mt-6">
            {/* 🖼️ Upload Photo */}
            <section>
              <label className="block font-semibold text-purple-800 mb-2">Upload Photo</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded-lg" />
              {formData.photo && (
                <div className="mt-4 flex justify-center">
                  <img src={formData.photo} alt="Preview" className="w-28 h-28 object-cover rounded-full border" />
                </div>
              )}
            </section>
            {/* 👤 Name Fields */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { label: 'First Name', name: 'firstName', placeholder: 'Rohit' },
                  { label: 'Middle Name', name: 'middleName', placeholder: 'Name' },
                  { label: 'Last Name', name: 'lastName', placeholder: 'Sharma' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block font-medium text-purple-800 mb-1">
                      {field.label} <span className="text-red-600">*</span>
                    </label>
                    <input type="text" name={field.name} value={formData[field.name]} onChange={handleChange} style={{ textTransform: 'capitalize' }} className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400" placeholder={field.placeholder} required/>
                  </div>
                ))}
              </div>
            </section>
            {/* 📧 Email + DOB + Designation */}
            <section>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="block font-semibold text-purple-800 mb-1">Email <span className="text-red-600">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400" placeholder="rohit@gmail.com" required/>
                </div>
                <div>
                  <label className="block font-semibold text-purple-800 mb-1">Date of Birth</label>
                  <DatePicker selected={formData.dob? new Date(formData.dob.split('/').reverse().join('-')) : null }
                    onChange={(date) => {
                      const formattedDate = date
                        ? `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
                        : '';
                      setFormData((prev) => ({ ...prev, dob: formattedDate }));
                    }}
                    dateFormat="dd/MM/yyyy"
                    className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
                    placeholderText="Enter your DOB"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    maxDate={new Date()}
                  />
                </div>
                <div>
                  <label className="block font-semibold text-purple-800 mb-1">Designation <span className="text-red-600">*</span></label>
                  <CreatableSelect name="designation" isSearchable isClearable options={designationOption()} value={designationOption().find((des) => des.value === formData.designation) || {label: formData.designation, value: formData.designation, }}
                    onChange={(e) => handleChange({ target: { name: 'designation', value: e?.value } }) } className="w-full" placeholder="Enter your Designation"
                  />
                </div>
              </div>
            </section>
            {/* 📱 Phone Numbers */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Contact Numbers</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { name: 'phone1', label: 'Primary Number', codeKey: 'countryCode1', required: true ,pattern:"\d{7,14}" , maxLength:14},
                  { name: 'phone2', label: 'Secondary Number', codeKey: 'countryCode2', required: false , pattern:"\d{7,14}"},
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block font-semibold text-purple-800 mb-1">
                      {field.label} {field.required && <span className="text-red-600">*</span>}
                    </label>
                    <div className="flex items-center border rounded-lg">
                      <Select options={countryOptions()} isSearchable className="w-28" placeholder="+91" value={countryOptions().find((cc) => cc.value === formData[field.codeKey])}
                        onChange={(selectedOption) => handleChange({ target: { name: field.codeKey, value: selectedOption.value } })}
                      />
                      <input type="text" name={field.name} value={formData[field.name]} onChange={handleChange} className="w-full p-3 border-none focus:outline-none" placeholder={field.required ? "Enter your number" : "Optional number"} required={field.required}/>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {/* 🌍 Location */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Location</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="block font-semibold text-purple-800 mb-1">Country <span className="text-red-600">*</span></label>
                  <Select isSearchable className="w-full" options={countries} value={countries.find((c) => c.value === selectedCountry)} onChange={handleCountryChange} placeholder="Select Country"/>
                </div>
                <div>
                  <label className="block font-semibold text-purple-800 mb-1">City</label>
                  <Select isSearchable className="w-full" options={cities} value={cities.find((c) => c.value === selectedCity)} onChange={handleCityChange} placeholder="Select City" />
                </div>
                <div>
                  <label className="block font-semibold text-purple-800 mb-1">Pincode</label>
                  <input type="number" name="pincode" min={0} value={formData.pincode} onChange={handleChange} className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400" placeholder="Enter Pincode"/>
                </div>
              </div>
            </section>
            {/* 💼 Experience & Notice */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Professional Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block font-semibold text-purple-800 mb-1">Total Experience</label>
                  <input type="number" name="experience" min={0} value={formData.experience} onChange={handleChange} className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400" placeholder="Enter total experience"/>
                </div>
                <div>
                  <label className="block font-semibold text-purple-800 mb-1">Notice Period</label>
                  <select name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"     >
                    <option value="">Choose your notice period</option>
                    <option value="Immediately Join">Immediately Join</option>
                    <option value="Less Than 15 Days">Less than 15 days</option>
                    <option value="One Month">1 month</option>
                    <option value="3 Months">3 Months</option>
                    <option value="More Than 3 Months">More than 3 months</option>
                  </select>
                </div>
              </div>
            </section>
            {/* 🏠 Address */}
            <section>
              <label className="block font-semibold text-purple-800 mb-1">Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} style={{ textTransform: 'capitalize' }} rows={3} className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400" placeholder="Enter your full address"/>
            </section>
            {/* 📝 Summary */}
            <section>
              <label className="block font-semibold text-purple-800 mb-1">Summary</label>
              {/* <JoditEditor spellCheck={true} ref={editor} config={editorConfig} value={formData.summary}
                onBlur={(newContent) => {
                  const updatedData = { ...formData, summary: newContent };
                  setFormData(updatedData);
                  localStorage.setItem('generalInfo', JSON.stringify(updatedData));
                }}
              /> */}
              <CKEditor editor={ ClassicEditor }
              data={editorData}  
                config={ {
                  licenseKey:'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDkxNjc5OTksImp0aSI6ImQ0MTAzODkwLThlNjAtNDAzNi04MDgyLThhNDUyYjFlYTcxYyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjAyZGExM2I1In0.O80gcsNxnnBbi9Xpz7MW-MGD8WmuvT6q5xAayzBuYLHXvOOFPpiqZhoYE-o2UfmMkPDdusZFrE8GU5LGMKlPlA',
                  // plugins: [ Essentials, Paragraph, Bold, Italic, FormatPainter ],
                  toolbar: ['undo','redo','|','bold','italic','underline','|','heading','formatPainter','|','link','imageUpload','|','bulletedList','numberedList','blockQuote',],
                }}
                onChange={(event, editor) => { const data = editor.getData(); setEditorData(data); setFormData(prev => ({ ...prev, summary: data })); localStorage.setItem('generalInfo', JSON.stringify({ ...formData, summary: data }));}}
              />
            </section>
            {/* 🔘 Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <button type="button" onClick={generateSummary} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-200">
                Generate Summary using AI
              </button>
              <button type="submit" onClick={handleSave} className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-200">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default GeneralInfo
            // <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            //   <div>
            //     <label className="block text-[#4b164c] font-bold">Country<span className='text-red-700 pl-0.5'>*</span></label>
            //     <select value={selectedCountry} onChange={handleCountryChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none capitalize">
            //       <option value="">Select Country</option>
            //       {countries.map((country, index) => (
            //         <option key={index} value={country}>
            //           {country}
            //         </option>
            //       ))}
            //     </select>
            //   </div>
            //   <div>
            //     <label className="block text-[#4b164c] font-bold">City</label>
            //     <select value={selectedCity} onChange={handleCityChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none capitalize">
            //       <option value="">Select City</option>
            //       {cities.map((city, index) => (
            //         <option key={index} value={city}>
            //           {city}
            //         </option>
            //       ))}
            //     </select>
            //   </div>
            // </div>


                // <div className='flex justify-center items-center min-h-screen p-4 bg-gray-100'>
    //   <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
    //     <h2 className="text-2xl text-center font-bold text-white p-3 rounded-t-xl bg-[linear-gradient(90deg,_#54DF71_0%,_#037CD5_100%)]">Basic Information</h2>
    //     <div className='flex  justify-center'>
    //       <form className="grid gap-6 sm:gap-8">
    //         {/* 📸 Upload Photo + Name Fields */}
    //                       <div>
    //             <label className="block text-[#4b164c] font-bold">Upload Photo</label>
    //             <input  spellCheck={true} type="file"accept="image/*" onChange={handleImageChange}className="w-full p-2 border border-gray-300 rounded-lg" />
    //             {formData.photo && (
    //               <div className="mt-4 flex justify-center">
    //                 <img src={formData.photo} alt="Profile Preview" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full border border-gray-400"/>
    //               </div>
    //             )}
    //           </div>
    //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

    //           <div className="grid grid-cols-3 gap-4">
    //             <div>
    //               <label className="block text-[#4b164c] font-semibold">First Name<span className="text-red-700 pl-0.5">*</span></label>
    //               <input spellCheck={true} type="text" name="firstName" style={{ textTransform: 'capitalize' }} value={formData.firstName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Rohit" required/>
    //             </div>
    //             <div>
    //               <label className="block text-[#4b164c] font-bold">Middle Name<span className="text-red-700 pl-0.5">*</span></label>
    //               <input spellCheck={true} type="text" name="middleName" style={{ textTransform: 'capitalize' }} value={formData.middleName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Name" required />
    //             </div>
    //             <div>
    //               <label className="block text-[#4b164c] font-bold">Last Name<span className="text-red-700 pl-0.5">*</span></label>
    //               <input spellCheck={true} type="text" name="lastName" style={{ textTransform: 'capitalize' }} value={formData.lastName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Sharma" required />
    //             </div>
    //           </div>
    //         </div>
    //                       <div>
    //             <label className="block text-[#4b164c] font-bold">Email<span className="text-red-700 pl-0.5">*</span></label>
    //             <input spellCheck={true} type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="rohit@gmail.com" required/>
    //           </div>
    //         {/* 📧 Email + DOB */}
    //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

    //           <div>
    //             <label className="block text-[#4b164c] font-bold">DOB</label>
    //             <DatePicker selected={formData.dob ? new Date(formData.dob.split('/').reverse().join('-')) : null }
    //               onChange={(date) => { const formattedDate = date
    //                 ? `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
    //                 : '';
    //                 setFormData((prev) => ({ ...prev, dob: formattedDate }));
    //               }}
    //               dateFormat="dd/MM/yyyy"
    //               className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    //               placeholderText="Enter your DOB"
    //               showMonthDropdown
    //               showYearDropdown
    //               dropdownMode="select"
    //               maxDate={new Date()}
    //             />
    //           </div>
    //                      {/* 🎯 Designation */}
    //         <div>
    //           <label className="block text-[#4b164c] font-bold">Designation<span className='text-red-700 pl-0.5'>*</span></label>
    //           <CreatableSelect name="designation" options={designationOption()} isSearchable value={designationOption().find((des) => des.value === formData.designation) || {label: formData.designation,value: formData.designation, }}onChange={(e) =>handleChange({ target: { name: 'designation', value: e?.value } })} className="w-full" placeholder="Enter your Designation" isClearable/>
    //         </div>
    //         </div>
 
    //          {/* 📞 Phone Inputs */}
    //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    //           <div>
    //             <label className="block text-[#4b164c] font-bold">Primary Number<span className="text-red-700 pl-0.5">*</span></label>
    //             <div className="flex items-center border border-gray-300 rounded-lg">
    //               <Select options={countryOptions()}isSearchable value={countryOptions().find((cc) => cc.value === formData.countryCode1)} onChange={(selectedOption) =>handleChange({ target: { name: 'countryCode1', value: selectedOption.value }, }) } className="w-28" placeholder="+91"/>
    //               <input spellCheck={true} type="number" min={0} name="phone1" value={formData.phone1} onChange={handleChange} className="w-full p-3 border-none focus:outline-none" placeholder="Enter your phone number" required/>
    //             </div>
    //           </div>
    //           <div>
    //             <label className="block text-[#4b164c] font-bold">Secondary Number</label>
    //             <div className="flex items-center border border-gray-300 rounded-lg">
    //               <Select options={countryOptions()} isSearchable value={countryOptions().find((cc) => cc.value === formData.countryCode2)} onChange={(selectedOption) => handleChange({target: { name: 'countryCode2', value: selectedOption.value }, }) }className="w-28" placeholder="+91"/>
    //               <input spellCheck={true} type="number" name="phone2" value={formData.phone2} onChange={handleChange} className="w-full p-3 border-none focus:outline-none" placeholder="Optional number"/>
    //             </div>
    //           </div>
    //         </div>
    //         {/* 🌍 Location */}
    //         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    //           <div>
    //             <label className="block text-[#4b164c] font-bold">Country<span className='text-red-700 pl-0.5'>*</span></label>
    //             <Select  isSearchable options={countries} value={countries.find((c) => c.value === selectedCountry)} onChange={handleCountryChange} className="w-full" placeholder="Select Country"/>
    //           </div>
    //           <div>
    //             <label className="block text-[#4b164c] font-bold">City</label>
    //             <Select isSearchable options={cities} value={cities.find((c) => c.value === selectedCity)} onChange={handleCityChange} className="w-full" placeholder="Select City"/>
    //           </div>
    //                         <div>
    //             <label className="block text-[#4b164c] font-bold">Pincode</label>
    //             <input spellCheck={true} type="number" name="pincode" min={0} value={formData.pincode} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your Pincode"/>
    //           </div>
    //         </div>

    //         {/* 🧳 Experience + Notice Period */}
    //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    //           <div>
    //             <label className="block text-[#4b164c] font-bold">Total Experience</label>
    //             <input spellCheck={true} type="number" min={0} name="experience" value={formData.experience} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your Total Experience"/>
    //           </div>
    //           <div>
    //             <label className="block text-[#4b164c] font-bold">Notice Period</label>
    //             <select name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" >
    //               <option disabled value=""> Choose your notice period </option>
    //               <option value="Immediately Join">Immediately Join</option>
    //               <option value="Less Than 15 Days">Less than 15 days</option>
    //               <option value="One Month">1 month</option>
    //               <option value="3 Months">3 Months</option>
    //               <option value="More Than 3 Months">More than 3 months</option>
    //             </select>
    //           </div>
    //         </div>
    //                     {/* 📫 Address + Pincode */}
    //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

    //           <div>
    //             <label className="block text-[#4b164c] font-bold">Address</label>
    //             <textarea spellCheck={true} name="address" value={formData.address} style={{ textTransform: 'capitalize' }} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your full address" rows={4}/>
    //           </div>
    //         </div>
    //         {/* ✍️ Summary Editor */}
    //         <div>
    //           <label className="block text-[#4b164c] font-bold">Summary</label>
    //           <JoditEditor spellCheck={true} ref={editor} config={editorConfig} Value={formData.summary} onBlur={(newContent) => {const updatedData = { ...formData, summary: newContent };setFormData(updatedData);localStorage.setItem('generalInfo', JSON.stringify(updatedData));}}/>
    //         </div>
    //         <button type="button" onClick={generateSummary} className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-200">
    //           Generate summary using ai
    //         </button>
    //         {/* 🟢 Next Button */}
    //         <div className="flex justify-center sm:justify-end">
    //           <button type="submit" onClick={handleSave} className="w-full sm:w-auto bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-200">
    //             Next
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>