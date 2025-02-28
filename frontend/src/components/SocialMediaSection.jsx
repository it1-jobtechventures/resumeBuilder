import React from 'react'
import { BsInstagram } from "react-icons/bs";
import { RiFacebookBoxFill } from "react-icons/ri";

const SocialMediaSection = () => {
  return (
    <>
        <main className='border  m-1.5'>
            <div className='flex flex-col gap-6 p-10'>
            <div className='flex items-center gap-4 border h-12 p-2'>
                <BsInstagram className='text-2xl'/>
                <input type='url' placeholder='Enter your Instagram profile link' className='outline-none w-full'/>
            </div>
            <div className='flex items-center gap-4 border h-12 p-2'>
                <RiFacebookBoxFill className='text-2xl'/>
                <input type='url' placeholder='Enter your facebook profile link' className='outline-none w-full'/>
            </div>
            </div>

        </main>
    </>
  )
}

export default SocialMediaSection