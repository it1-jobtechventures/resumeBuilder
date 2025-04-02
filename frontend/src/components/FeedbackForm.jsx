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
    <div>
        <form onSubmit={handleSubmit}>
            <input type='email' name='email' value={formData.email} placeholder='enter email' onChange={handleChange}/>
            <input type='text' name='name' value={formData.name} placeholder='enter name' onChange={handleChange}/>
            <input type='text' name='location' value={formData.location} placeholder='enter location' onChange={handleChange}/>
            <input type='tel' name='phoneNo' value={formData.phoneNo} placeholder='Enter phone' onChange={handleChange}/>
            <input type='file' name='image' value={formData.image}  onChange={handleChange} placeholder='enter image '/>
            <textarea placeholder='message' name='message' value={formData.message} onChange={handleChange}/>
            <button type='submit'>Submit</button>
        </form>
        <section>
            <Link to={'/'}>Go to home</Link>
            <Link to={'/createResume'}>Return to form</Link>
        </section>
    </div>
  )
}

export default FeedbackForm