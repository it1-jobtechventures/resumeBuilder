import  axios  from "axios";
import React, { useEffect, useState , useContext} from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from "../context/AppContext";

const ProfilePage = () => {
    const [user , setUser] = useState(null)
    const navigate = useNavigate();
    const {isLoggedIn, backendUrl, setIsLoggedIn} = useContext(AppContext);
  
    const getUserProfile = async() => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/profile' ,{ withCredentials: true,})
            setUser(res.data.user)
        } catch (error) {
            toast.error('Profile not fetch')
            console.log(error.message)
        }
    }

    useEffect(() => {
        getUserProfile()
    },[])

    const logout = async() => {
        try {
            axios.defaults.withCredentials = true;
            console.log("hello");
            const { data } = await axios.post(backendUrl + '/api/auth/logout');
            data.success && setIsLoggedIn(false);
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
    </>
  )
}

export default ProfilePage