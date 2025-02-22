import React from 'react'
import footerbg from '../assets/footerBg.png'

const Footer = () => {
  return (
    <>
      <footer style={{ backgroundImage: `url(${footerbg})` }}className="bg-no-repeat w-full bg-cover bg-top h-[28rem] ">
        <div className="pt-44">
          <div className='flex justify-around pb-4'>
            {/* <section>
              <img src='/resumeRingerLogo.png'  alt='logo' className='h-10'/>
            </section> */}
            <ul className='space-y-1 text-[16px] cursor-pointer'>
              <li className='font-bold'>Build Your Resume</li>
              <li>AI Resume Builder</li>
              <li>Basic Resume Examples</li>
              <li>How To Write a Resume</li>
              <li>Resume Builder App</li>
              <li>Cover Letter Builder</li>
              <li>Resume Examples</li>
              <li>Resume Templates</li>
            </ul>
            <ul className='space-y-1 text-[16px]'>
              <li className='font-bold'>Career Resources</li>
              <li>How To Make a Resume</li>
              <li>Professional Resume Summary</li>
              <li>Best Resume Formats</li>
              <li>Best Fonts for Your Resume</li>
              <li>How To List References on a Resume</li>
            </ul>
            <ul className='space-y-1 text-[16px]'>
              <li className='font-bold'>About Resume Builder</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Press</li>
              <li>Accessibility</li>
              <li>Do Not Sell or Share</li>
            </ul>
          </div>
          <div className='border-t w-full p-1 text-pink-950'></div>
          <p className='text-center font-bold '>© 2025, Achal Sawant. All rights reserved.</p>
      </div>
      </footer>
    </>
  )
}

export default Footer
