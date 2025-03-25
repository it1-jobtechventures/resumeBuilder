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
        <div className="p-4">
            <h2 className="text-2xl font-semibold">User Profile</h2>
            {user ? (
                <div className="mt-4">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
            <button onClick={logout}>Logout</button>
        </div>
    </>
  )
}

export default ProfilePage