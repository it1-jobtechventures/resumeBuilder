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

    useEffect(() => {
        getUserProfile()
    },[])

    useEffect(() => {
        const fetchDrafts = async () => {
          try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.get(`${url}/api/resume/draft` ,{ withCredentials: true,});
    
            if (data.success) {
              setDrafts(data.drafts);
            } else {
              console.log(data.message);
            }
          } catch (error) {
            console.error("Error fetching drafted resumes:", error.message);
          }
        };
    
        fetchDrafts();
      }, [backendUrl]);

    const logout = async() => {
        try {
            axios.defaults.withCredentials = true;
            console.log("hello");
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

        <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Drafted Resumes</h2>
      
      {drafts.length === 0 ? (
        <p className="text-gray-500">No drafted resumes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {drafts.map((resume) => (
            <div key={resume._id} className="p-4 bg-white shadow rounded">
              <p className="font-medium">Resume ID: {resume._id}</p>
              <p className="text-sm text-gray-500 mt-1">
                Created: {new Date(resume.createdAt).toLocaleDateString()}
              </p>
              <button 
                className="mt-4 bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => navigate(`/resume/edit/${resume._id}`)}
              >
                Continue Editing
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  )
}

export default ProfilePage