"use client"
import React from 'react'
import "@/app/globals.css"
import ThemeToggle from '@/components/Button/ThemeToggle';
import { useSelector } from 'react-redux';

const Nav = () => {

  const isDarkMode = useSelector((state) => state.theme.value); // Assuming your boolean state is nested under 'boolean'


  return (
    <nav className={`flex justify-between p-[3px] h-[80px] border border-1 border-solid border-gray-500 ${isDarkMode ? 'bg-[#191919] text-white' : 'bg-white text-black'}`}>
    <div className='flex items-center'>
      <div><img className='h-[90px] mt-[-15px] pl-[70px]' src="/image/logo.png" alt="" /></div>
      <div className='mt-[-14px]'>
        <h1 className={`ml-[-26px] text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Reactform</h1>
        <p className={`mt-[-10px] ml-[34px] text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>BUILDER</p>
      </div>
    </div>
    <ul className='flex justify-end gap-[80px] items-center w-[550px]'>
      <li className={`text-[15px] font-semibold tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><a href="https://react.dev/learn/installation">How to install?</a></li>
      <li className='ml-[-40px] mr-[-40px] mt-[-8px] text-3xl text-gray-600 opacity-50'><a href="">|</a></li>
      <li>
        <ThemeToggle />
      </li>
      <li className={`w-[75px] h-[28px] text-center rounded font-semibold ${isDarkMode ? 'bg-[#17c495] text-white' : 'bg-[#17c495] text-black'}`}><a href="">Sign up</a></li>
    </ul>

  </nav>
  )
}

export default Nav