"use client"
import React from 'react'
import { useSelector } from 'react-redux';
import { TbDragDrop } from "react-icons/tb";
import "./globals.css"

import Link from 'next/link';

const Home = () => {
  const isDarkMode = useSelector((state) => state.theme.value); // Assuming your boolean state is nested under 'boolean'


  return (
    <>

    <div className={`${isDarkMode ? 'text-white' : 'text-black'} w-[620px] h-[420px] text-center flex flex-col justify-between items-center  relative left-[35%] top-[170px]`}>
      <h1 className='text-[60px] font-bold'>Choose Demo Version</h1>
    <Link href='./formbuilder'><div className={`group flex flex-col border-solid border-2 w-[250px] h-[250px] p-[6px] gap-[2px] justify-center items-center hover:bg-[#17c49622] hover:border-[#17c495] ${isDarkMode ? '' : 'bg-white'}`}>
     <TbDragDrop className='text-[69px] group-hover:text-[#17c495]' />
      <h1 className='text-[28px] font-[600]'>Simple Version</h1>
      <p className='text-2 p-2 text-center'>Better for <b>non-tech users</b> fields and configration options are simplefied
      </p>
     </div></Link>
    </div>
    </>
  )
}

export default Home