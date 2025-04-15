import  axios  from "axios";
import React, { useEffect, useState , useContext} from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from "../context/AppContext";

const ProfilePage = ({url}) => {
  const [user , setUser] = useState(null)
  const navigate = useNavigate();
  const {isLoggedIn, backendUrl, setIsLoggedIn} = useContext(AppContext);
  const [drafts, setDrafts] = useState([]);

  const getUserProfile = async() => {
    try {
      const res = await axios.get(`${url}/api/auth/profile` ,{ withCredentials: true,})
        setUser(res.data.user)
    } catch (error) {
      toast.error('Profile not fetch')
      toast.error(error.message)
    }
  }

  const fetchDarfts = async () => {
    try {
      axios.defaults.withCredentials = true;
      const {data } = await axios.post(`${url}/api/resume/draft` ,{ withCredentials: true,});
      if (data.success) {
        setDrafts(data.drafts);
      }
    } catch (error) {
      console.error("Error fetching drafted resumes:", error.message);
    }
  }

  useEffect(() => {
    getUserProfile()
    fetchDarfts()
  },[backendUrl])

  const logout = async() => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      data.success && setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      toast.success("Successfully logout")
      navigate('/')
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">User Profile</h2>
        {user ? (
          <div className="mt-4">
            <p className="text-lg"><strong lassName="font-medium text-gray-700">Name:</strong> {user.name}</p>
            <p className="text-lg"><strong lassName="font-medium text-gray-700">Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p ame="text-gray-500">Loading user profile...</p>
        )}
        <button onClick={logout}  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200">Logout</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {drafts.map((resume) => (
          <div key={resume._id} onClick={() => navigate(`/resume/edit/${resume._id}`)} className="cursor-pointer bg-white/30 backdrop-blur-md border border-gray-200 shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Resume Draft</h3>
            <p className="text-sm text-gray-600">ID: {resume._id}</p>
            <p className="text-sm text-gray-600">
              Created: {new Date(resume.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-4 text-blue-600 font-medium underline">
              Click to continue editing
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProfilePage