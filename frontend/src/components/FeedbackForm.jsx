import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';

const FeedbackForm = () => {
    const [formData , setFormData] = useState({
        name:'',
        email:'',
        location:'',
        phoneNo:'',
        image:'',
        message:''
    })

    const handleChange = (e) => {
        const {name , value} =e.target;
        setFormData({...formData , [name] : value})
    }

    const sentEmail = (data) => {
        const templateParams = {
            from_name: data.name,
            email:data.email,
            location:data.location,
            phoneNo:data.phoneNo,
            message:data.message,
            image:data.image
        };
        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).then(() => {
            const autoReplyParams = {
                to_name: data.name,
                to_email: data.email,  // Send the auto-reply to the user's email
                message: `Hi ${data.name},\n\nThank you for sharing issue /suggestion, we will work on this and revert back to you shortly.`,
            };
            emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
                autoReplyParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            ).then(() => {

            }).catch((error) => {
                console.log(error)
            })
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        sentEmail(formData)
        setFormData({
            name:'',
            email:'',
            image:'',
            message:'',
            location:'',
            phoneNo:'',
        })
    }
  return (
    <>
        <div className="min-h-screen flex flex-col items-center justify-center  p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
                <div className="flex justify-center mb-4">
                    <img src="/gif.gif" alt="Animation" className="h-20" />
                </div>
                <h2 className="text-2xl font-bold text-center ">Feedback Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter email' className="w-full p-3 border-2 border-[#037cd5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#54df71]"/>
                    </div>
                    <div>
                        <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Enter name' className="w-full p-3 border-2 border-[#037cd5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#54df71]"/>
                    </div>
                    <div>
                        <input type='text' name='location' value={formData.location} onChange={handleChange} placeholder='Enter location' className="w-full p-3 border-2 border-[#037cd5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#54df71]"/>
                    </div>
                    <div>
                        <input type='tel' name='phoneNo' value={formData.phoneNo} onChange={handleChange} placeholder='Enter phone' className="w-full p-3 border-2 border-[#037cd5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#54df71]"/>
                    </div>
                    <div>
                        <input type='file' name='image' value={formData.image} onChange={handleChange} className="w-full p-3 border-2 border-[#037cd5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#54df71]"/>
                    </div>
                    <div>
                        <textarea name='message' value={formData.message} onChange={handleChange} placeholder='Your message' className="w-full p-3 border-2 border-[#037cd5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#54df71]"/>
                    </div>
                    <div className="flex justify-center">
                        <button type='submit' className="w-full bg-[#037cd5] text-white py-3 rounded-md hover:bg-[#54df71] transition">
                            Submit
                        </button>
                    </div>
                </form>
                <section className="mt-6 flex flex-col lg:flex-row gap-3 justify-center space-x-6">
                    <Link to={'/'} className=" text-center bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">Go to Home</Link>
                    <Link to={'/createResume'} className=" text-center bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">Return to Form</Link>
                </section>
            </div>
        </div>
    </>
  )
}

export default FeedbackForm