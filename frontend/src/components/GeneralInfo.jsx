import React, { useContext, useEffect, useState , useRef ,useMemo } from 'react'
import countryCode from '../assets/countryCode';
import DatePicker from 'react-datepicker'; 
import Select from 'react-select'
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios'
import JoditEditor from 'jodit-react';

const GeneralInfo = ({nextStep , url}) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [pincode, setPincode] = useState("");
  const { updateResumeData  } = useResume();
  const {activeResumeId} = useContext(AppContext)
  const resumeId = activeResumeId;
  const editor = useRef(null);

  console.log('generalInfo',activeResumeId)
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
    photo:''
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('generalInfo'));
    if (storedData) {
      setFormData(storedData);
      setSelectedCountry(storedData.country || '');
      setSelectedCity(storedData.city || '');
    }
  },[])

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

  if (!formData.phone1 || !formData.phone1.match(/^\d{10}$/)) {
    toast.error('Phone number must be 10 digits');
    isValid = false;
  }

  if (formData.dob) {
    const selectedDate = new Date(formData.dob);
    const today = new Date();
  
    // Set both dates to midnight to ignore time differences
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
  
    if (selectedDate > today) {
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

  //using json 
  useEffect(() => {
    if (!countryCode || countryCode.length === 0) return;
    setCountries(countryCode.map((country) => country.country_name));
  }, [countryCode]); // Added dependency for re-fetching if countryCode changes
  
  const handleCountryChange = async (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setFormData(prev => ({ ...prev, country }));
  
    if (!country) return;
    try {
      const { data } = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', { country });
      setCities(data?.data || []);
      if (!data?.data.length) toast.error('No cities found');
    } catch (error) {
      console.error('Error fetching cities:', error);
      toast.error('Failed to load cities');
    }
  };
  
  const handleCityChange = async(e) => {
    const city = e.target.value
    setSelectedCity(city);
    setFormData(prev => ({ ...prev, city}));

    if (!selectedCountry || !city) {
      toast.error("Please select a country first.");
      return;
    }
    try {
      const countryCode = selectedCountry.toLowerCase(); // Convert to lowercase for API
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    localStorage.setItem('generalInfo', JSON.stringify(updatedData));
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
  
  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    if (!resumeId) {
      toast.error("Resume ID is missing");
      console.error("❌ Resume ID is undefined");
      return;
    }
    console.log("📤 Sending data to backend:", { resumeId, ...formData });
    try {
      const data = await axios.post(`${url}/api/generalInfo/add-generalInfo`, {
        userId: localStorage.getItem("temporaryUserId"),
        resumeId,
        ...formData,
      });
      console.log("✅ Response from backend:", data);
      toast.success(data.message || 'Saved successfully');
      nextStep();
    } catch (error) {
      console.error("❌ Error from backend:", error.response?.data || error);
      toast.error(error.response?.data?.error || 'Save failed');
    }
  };

  const countryOptions = () => {
    return countryCode.map((cc) =>({
      value:cc.tel_country_code,
      label:cc.tel_country_code
    }))
  }

  return (
    <>
    <div className='flex justify-center items-center min-h-screen p-4 bg-gray-100'>
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl text-center font-bold text-white p-3 rounded-t-xl bg-[linear-gradient(90deg,_#54DF71_0%,_#037CD5_100%)]">Basic Information</h2>
        <div className='flex  justify-center'>
        <form className='grid gap-4 '>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">Upload Photo</label>
              <input type="file"accept="image/*"onChange={handleImageChange}className="w-full p-2 border border-gray-300 rounded-lg"/>
              {formData.photo && (
                <div className="mt-2">
                  <img src={formData.photo}alt="Profile Preview"className="w-24 h-24 object-cover rounded-full border border-gray-400"/>
                </div>
              )}
            </div>
            <div className="">
              <label className="block text-[#4b164c] font-semibold">First Name<span className='text-red-700 pl-0.5'>*</span></label>
              <input type="text" style={{ textTransform: 'capitalize' }} value={formData.firstName} name='firstName' onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Rohit" required />
            </div>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">Last Name<span className='text-red-700 pl-0.5'>*</span></label>
              <input type="text" style={{ textTransform: 'capitalize' }} name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Sharma" required/>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">Email<span className='text-red-700 pl-0.5'>*</span></label>
              <input type="email"  name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="rohit@gmail.com" required/>
            </div>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">DOB</label>
                <DatePicker selected={formData.dob ? new Date(formData.dob.split('/').reverse().join('-')) : null} onChange={(date) => { const formattedDate = date ? `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}` : '';setFormData(prev => ({ ...prev, dob: formattedDate }));}}
                  dateFormat="dd/MM/yyyy"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholderText="Enter your DOB"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  maxDate={new Date()}
                />
            </div>
          </div>
          <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">Designation<span className='text-red-700 pl-0.5'>*</span></label>
              <input type="text" style={{ textTransform: 'capitalize' }} name="designation" value={formData.designation} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Designation" required/>
            </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">Primary Number<span className='text-red-700 pl-0.5'>*</span></label>
              <div className='flex border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'>
                <Select options={countryOptions()} isSearchable value={countryOptions().find((cc) => cc.value === formData.countryCode1 )} onChange={selectedOption => handleChange({ target: { name: 'countryCode1', value: selectedOption.value } })} className="w-15" placeholder="+91"/>
                <input type="number" name="phone1" value={formData.phone1} onChange={handleChange} className="w-full p-3 border-none focus:outline-none" placeholder="Enter your phone number" required/>
              </div>
            </div>
            <div className="">
              <label className="block text-[#4b164c] font-bold">Secondary Number</label>
              <div className='flex border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'>
                <Select options={countryOptions()} isSearchable value={countryOptions().find((cc) => cc.value === formData.countryCode2 )} onChange={selectedOption => handleChange({ target: { name: 'countryCode2', value: selectedOption.value } })} className="w-15" placeholder="+91"/>
                <input type="number" name="phone2" value={formData.phone2} onChange={handleChange} className="w-full p-3 border-none focus:outline-none" placeholder="Enter your optional phone number" />
              </div>
            </div>
          </div>
          <div className="mb-4">  
            <label className="block text-[#4b164c] font-bold">Country<span className='text-red-700 pl-0.5'>*</span></label>
            <select value={selectedCountry} onChange={handleCountryChange} style={{ textTransform: 'capitalize' }} className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'>
              <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                ))}
                </select>
              </div>
          <div className="">
            <label className="block text-[#4b164c] font-bold">City</label>
            {/* <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your City" /> */}
            <select value={selectedCity} onChange={handleCityChange} style={{ textTransform: 'capitalize' }} className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
                <label className="block text-[#4b164c] font-bold">Pincode</label>
                <input type="Number" name="pincode" min={0}  value={formData.pincode} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your Pincode" />
                {/* {pincode && <p>Pincode: {pincode}</p>} */}
              </div>
          <div className="">
            <label className="block text-[#4b164c] font-bold">Address</label>
            <textarea type="text" name="address" value={formData.address} style={{ textTransform: 'capitalize' }} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your full address" rows={4} />
          </div>
          <div className="mb-4">
            <label className="block text-[#4b164c] font-bold">Total Experience</label>
            <input type="number" min={0} name="experience" value={formData.experience} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your Total Experience"  />
          </div>
          <div className="mb-4">
            <label className="block text-[#4b164c] font-bold">Summary</label>
            {/* <textarea type="number"  name="summary" rows={4} value={formData.summary} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your Total Experience"  /> */}
            <JoditEditor
  ref={editor}
  config={editorConfig}
  defaultValue={formData.summary}
  onBlur={(newContent) => {
    const updatedData = { ...formData, summary: newContent };
    setFormData(updatedData);
    localStorage.setItem('generalInfo', JSON.stringify(updatedData));
  }}
/>
          </div>
          <div className="flex lg:justify-end ">
            <button type='submit' onClick={handleSave} className="w-full  lg:w-auto bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
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

  // //using api 
  // const fetchCountries = async () => {
  //   try {
  //     const res = await axios.get('https://countriesnow.space/api/v0.1/countries');
  //     setCountries(res.data.data.map(item => item.country));
  //   } catch (error) {
  //     console.error('Error fetching countries:', error);
  //     toast.error('Failed to load countries');
  //   }
  // };
  // const fetchCountry = () => {
  //   const countryNames = countryCode.map((country) => country.country_name);
  //   console.log(countryNames);
  //   setCountries(countryNames); // Assuming `setCountries` is managing an array
  // };
  
  // useEffect(() => {
  //   fetchCountry()
  // },[])

  // const handleCountryChange = async (e) => {
  //   const country = e.target.value;
  //   setSelectedCountry(country);
  //   setFormData(prev => ({ ...prev, country }));

  //   if (country) {
  //     try {
  //       const res = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', { country });
  //       setCities(res.data.data);
  //     } catch (error) {
  //       console.error('Error fetching cities:', error);
  //       toast.error('Failed to load cities');
  //     }
  //   }
  // };

  // const handleCityChange = (e) => {
  //   setSelectedCity(e.target.value);
  //   setFormData(prev => ({ ...prev, city: e.target.value }));
  // };


  // import React, { useContext, useEffect, useState } from 'react';
  // import axios from 'axios';
  // import Select from 'react-select';
  // import { toast } from 'react-toastify';
  // import {  useResume } from '../context/FormContext';
  
  // const GeneralInfoForm = ({ nextStep }) => {
  //   const [formData, setFormData] = useState({
  //     fullName: '',
  //     jobTitle: '',
  //     email: '',
  //     phoneNumber: '',
  //     countryCode: '+91',
  //     country: '',
  //     city: '',
  //     pinCode: '',
  //   });
  
  //   const [errors, setErrors] = useState({});
  //   const [countries, setCountries] = useState([]);
  //   const [cities, setCities] = useState([]);
  //   const [pincodeSuggestions, setPincodeSuggestions] = useState([]);
  //   const [loading, setLoading] = useState(false);
  
  //   const { updateResumeData } = useResume(); // ✅ Corrected context function
  
  //   // Load saved data and countries
  //   useEffect(() => {
  //     const saved = JSON.parse(localStorage.getItem('generalInfo'));
  //     if (saved) setFormData(saved);
  
  //     const fetchCountries = async () => {
  //       try {
  //         const { data } = await axios.get('https://restcountries.com/v3.1/all');
  //         const countryList = data.map(c => c.name.common).sort();
  //         setCountries(countryList);
  //       } catch (err) {
  //         toast.error('Failed to load countries');
  //       }
  //     };
  //     fetchCountries();
  //   }, []);
  
  //   // Load cities when country is selected
  //   useEffect(() => {
  //     if (!formData.country) return;
  
  //     const fetchCities = async () => {
  //       try {
  //         const { data } = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
  //           country: formData.country,
  //         });
  //         if (data.data) setCities(data.data.sort());
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     };
  //     fetchCities();
  //   }, [formData.country]);
  
  //   // Load pin codes for Indian cities
  //   useEffect(() => {
  //     const fetchPincode = async () => {
  //       try {
  //         if (formData.country === 'India' && formData.city) {
  //           const response = await axios.get(`https://api.zippopotam.us/IN/${formData.city}`);
  //           if (response.data?.places) {
  //             const pins = response.data.places.map(place => place['postcode']);
  //             setPincodeSuggestions([...new Set(pins)]);
  //           }
  //         }
  //       } catch (err) {
  //         setPincodeSuggestions([]);
  //       }
  //     };
  //     fetchPincode();
  //   }, [formData.city, formData.country]);
  
  //   const validateForm = () => {
  //     const errs = {};
  //     if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
  //     if (!formData.jobTitle.trim()) errs.jobTitle = 'Job Title is required';
  //     if (!formData.email.trim()) errs.email = 'Email is required';
  //     if (!formData.phoneNumber.trim()) errs.phoneNumber = 'Phone Number is required';
  //     if (!formData.countryCode) errs.countryCode = 'Country code required';
  //     if (!formData.country) errs.country = 'Country is required';
  //     if (!formData.city) errs.city = 'City is required';
  //     if (!formData.pinCode) errs.pinCode = 'Pincode is required';
  
  //     setErrors(errs);
  //     return Object.keys(errs).length === 0;
  //   };
  
  //   const handleChange = e => {
  //     const { name, value } = e.target;
  //     let newValue = value;
  
  //     if (name === 'phoneNumber') {
  //       newValue = value.replace(/\D/g, ''); // Only digits
  //     }
  
  //     setFormData(prev => ({ ...prev, [name]: newValue }));
  //     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  //   };
  
  //   const handleCountryCodeChange = selected => {
  //     setFormData(prev => ({ ...prev, countryCode: selected.value }));
  //   };
  
  //   const handleSave = async () => {
  //     if (!validateForm()) return;
  //     setLoading(true);
  
  //     try {
  //       const token = localStorage.getItem('token');
  //       const resumeId = localStorage.getItem('resumeId');
  
  //       const { data } = await axios.post(
  //         `${import.meta.env.VITE_API_URL}/general/add-generalInfo`,
  //         { ...formData, resumeId },
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );
  
  //       localStorage.setItem('generalInfo', JSON.stringify(formData));
  //       updateResumeData('generalInfo', formData); // ✅ Updated function
  //       toast.success(data.message || 'Saved successfully');
  //       nextStep();
  //     } catch (error) {
  //       console.error(error);
  //       toast.error(error.response?.data?.error || 'Save failed');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   return (
  //     <div className="p-6 bg-white rounded-xl shadow-md space-y-6">
  //       <h2 className="text-2xl font-semibold text-gray-800">General Information</h2>
  
  //       <div>
  //         <label className="block">Full Name</label>
  //         <input
  //           type="text"
  //           name="fullName"
  //           value={formData.fullName}
  //           onChange={handleChange}
  //           className="input"
  //         />
  //         {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
  //       </div>
  
  //       <div>
  //         <label className="block">Job Title</label>
  //         <input
  //           type="text"
  //           name="jobTitle"
  //           value={formData.jobTitle}
  //           onChange={handleChange}
  //           className="input"
  //         />
  //         {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle}</p>}
  //       </div>
  
  //       <div>
  //         <label className="block">Email</label>
  //         <input
  //           type="email"
  //           name="email"
  //           value={formData.email}
  //           onChange={handleChange}
  //           className="input"
  //         />
  //         {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
  //       </div>
  
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         <div>
  //           <label className="block">Country Code</label>
  //           <Select
  //             options={[
  //               { value: '+91', label: '+91' },
  //               { value: '+1', label: '+1' },
  //               { value: '+44', label: '+44' },
  //             ]}
  //             value={{ label: formData.countryCode, value: formData.countryCode }}
  //             onChange={handleCountryCodeChange}
  //           />
  //           {errors.countryCode && <p className="text-red-500 text-sm">{errors.countryCode}</p>}
  //         </div>
  //         <div>
  //           <label className="block">Phone Number</label>
  //           <input
  //             type="text"
  //             name="phoneNumber"
  //             value={formData.phoneNumber}
  //             onChange={handleChange}
  //             className="input"
  //             maxLength={15}
  //           />
  //           {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
  //         </div>
  //       </div>
  
  //       <div>
  //         <label className="block">Country</label>
  //         <select name="country" value={formData.country} onChange={handleChange} className="input">
  //           <option value="">-- Select Country --</option>
  //           {countries.map((c, i) => (
  //             <option key={i} value={c}>
  //               {c}
  //             </option>
  //           ))}
  //         </select>
  //         {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
  //       </div>
  
  //       <div>
  //         <label className="block">City</label>
  //         <select name="city" value={formData.city} onChange={handleChange} className="input">
  //           <option value="">-- Select City --</option>
  //           {cities.map((city, i) => (
  //             <option key={i} value={city}>
  //               {city}
  //             </option>
  //           ))}
  //         </select>
  //         {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
  //       </div>
  
  //       <div>
  //         <label className="block">Pincode</label>
  //         <input
  //           list="pincodeList"
  //           name="pinCode"
  //           value={formData.pinCode}
  //           onChange={handleChange}
  //           className="input"
  //         />
  //         <datalist id="pincodeList">
  //           {pincodeSuggestions.map((pin, i) => (
  //             <option key={i} value={pin} />
  //           ))}
  //         </datalist>
  //         {errors.pinCode && <p className="text-red-500 text-sm">{errors.pinCode}</p>}
  //       </div>
  
  //       <div className="flex justify-end">
  //         <button
  //           onClick={handleSave}
  //           disabled={loading}
  //           className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
  //         >
  //           {loading ? 'Saving...' : 'Next'}
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };
  
  // export default GeneralInfoForm;
  




