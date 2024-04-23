"use client"
import { toggle } from '@/app/globaleRedux/features/theme/theme';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsMoonFill } from "react-icons/bs";
import { LuSun } from "react-icons/lu";


function ThemeToggle() {
    const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.value); // Assuming your boolean state is nested under 'boolean'


    useEffect(() => {

        if (isDarkMode) {
            document.body.classList.add('bg-[#191919]'); // Add dark mode background color
        } else {
            document.body.classList.remove('bg-[#191919]'); // Remove dark mode background color
        }
    }, [isDarkMode]);
    
const toggleTheme = () => {
    dispatch(toggle())
}


  return (
    <div className={`w-[50px] h-[24px] rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-[#262626]' : 'bg-[#e1e7ef]'} `} onClick={toggleTheme}>
    {isDarkMode ? 
    <div className='h-[22px] w-[22px] bg-black transition-all duration-300 relative top-[1px] left-[26px] rounded-xl'>
      <BsMoonFill className='text-[15px] font-bold text-gray-400 relative top-[3px] left-[4px]'/>
    </div>: 
    <div className='h-[22px] w-[22px] bg-white transition-all duration-300 relative top-[1px] left-[2px] rounded-xl'>
      <LuSun className='text-[18px] font-bold relative top-[2px] left-[2px]' />
    </div> }
    </div>
  )
}

export default ThemeToggle