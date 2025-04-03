import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import countryCode from '../assets/countryCode';
import DatePicker from 'react-datepicker'; 

const GeneralInfo = ({nextStep}) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [pincode, setPincode] = useState("");

  const [formData, setFormData] = useState({
    firstName: '',
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
    designation:''
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
    if (!formData.firstName.trim()) {
      toast.error('First name is required');
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      toast.error('Last name is required');
      isValid = false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Invalid email format');
      isValid = false;
    }
    if (!formData.phone1.match(/^\d{10}$/)) {
      toast.error('Phone number must be 10 digits');
      isValid = false;
    }

    if (formData.dob) {
      const today = new Date().toISOString().split('T')[0];
      if (formData.dob > today) {
        toast.error('Date of birth cannot be in the future');
        isValid = false;
      }
    }

    if (formData.experience && formData.experience < 0) {
      toast.error('Experience cannot be negative');
      isValid = false;
    }
    if (!formData.country.trim()) {
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

  // useEffect(() => {
  //   fetchCountries()
  // },[])

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
              {/* <input type="date" style={{ textTransform: 'capitalize' }} name="dob" 
                value={(() => {
                  // Convert dd/mm/yyyy back to yyyy-mm-dd format for the input field
                  if (formData.dob) {
                    const [day, month, year] = formData.dob.split('/');
                    return `${year}-${month}-${day}`;
                  }
                  return ''; // Default if no date is selected
                })()} 
              onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your DOB" /> */}
                            <DatePicker
                  selected={formData.dob ? new Date(formData.dob.split('/').reverse().join('-')) : null}
                  onChange={(date) => {
                    const formattedDate = date ? `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}` : '';
                    setFormData(prev => ({ ...prev, dob: formattedDate }));
                  }}
                  dateFormat="dd/MM/yyyy" // Set the format to dd/mm/yyyy
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholderText="Enter your DOB"
                />
            </div>
          </div>
          <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">Designation<span className='text-red-700 pl-0.5'>*</span></label>
              <input type="text" style={{ textTransform: 'capitalize' }} name="designation" value={formData.designation} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Designation" required/>
            </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="mb-4">
              <label className="block text-[#4b164c] font-bold">Phone Number<span className='text-red-700 pl-0.5'>*</span></label>
              <div className='flex border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'>
              <select name='countryCode1' value={formData.countryCode1} onChange={handleChange} className=' w-15'>
              <option disabled>Select country Code</option>
                {countryCode.map(country => (
                  <option key={country.id}>+{country.tel_country_code}</option>
                ))}
              </select>
              <input type="tel" name="phone1" value={formData.phone1} onChange={handleChange} className="w-full p-3 border-none focus:outline-none" placeholder="Enter your phone number" required/>
              </div>

            </div>
            <div className="">
              <label className="block text-[#4b164c] font-bold">Phone Number</label>
              <div className='flex border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'>
              <select name='countryCode2' value={formData.countryCode2} onChange={handleChange} className=' w-15'>
                <option disabled>Select country Code</option>
                {countryCode.map(country => (
                  <option key={country.id}>+{country.tel_country_code}</option>
                ))}
              </select>
              <input type="tel" name="phone2" value={formData.phone2} onChange={handleChange} className="w-full p-3 border-none focus:outline-none" placeholder="Enter your optional phone number" />
              </div>

            </div>
          </div>
          <div className="mb-4">  
                <label className="block text-[#4b164c] font-bold">Country<span className='text-red-700 pl-0.5'>*</span></label>
                {/* <input type="text"name="country" value={formData.country} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your Country" required/> */}
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
            <textarea type="number"  name="summary" rows={4} value={formData.summary} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter your Total Experience"  />
          </div>
          <div className="flex lg:justify-end ">
            <button type="button" onClick={handleNext} className="w-full  lg:w-auto bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">
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
