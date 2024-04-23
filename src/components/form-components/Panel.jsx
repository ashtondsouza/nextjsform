"use client"
import React, { useState } from 'react';
import DraggableTool from './DraggableTool'
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { CiTextAlignRight } from "react-icons/ci";
import { MdLockPerson } from "react-icons/md";
import { MdAttachEmail } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa6";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { LuArrowLeftToLine } from "react-icons/lu";
import { LuArrowRightToLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { clearCanvas } from '@/app/globaleRedux/features/globalSlice';

const Panel = ({toggleEdit, togglePreview}) => {
  const isDarkMode = useSelector((state) => state.theme.value);

    const [searchTerm, setSearchTerm] = useState('');
    const [activeDiv, setActiveDiv] = useState('edit');
    const [activeIcon, setActiveIcon] = useState('left');
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch()
  
  const changeIcon = () => {
      setActiveIcon(activeIcon === 'left' ? 'right' : 'left');
    setIsOpen(!isOpen);
  };  
    const toggleDiv = (divName) => {
      setActiveDiv(divName);
    };


    const handleClearCanvas = () => {
        if (window.confirm("Are you sure you want to clear the canvas?")) {
            dispatch(clearCanvas());
        }
    };

    const filteredElementTypes = [
        { type: "text-input", label: "Text Input", icon: <RxLetterCaseCapitalize className="text-xl" />, info: "Single line input" },
        { type: "text-area", label: "Text Area", icon: <CiTextAlignRight className="text-xl" />, info:"Muilti-line input" },
        { type: "password", label: "Password", icon: <MdLockPerson className="text-xl" />, info: "Select input" },
        { type: "email", label: "Email", icon: <MdAttachEmail className="text-xl" />, info: "Input field that expects an email" },
        { type: "date", label: "Date", icon: <FaRegCalendar className="text-xl" />, info: "Datepicker input" },
        { type: "phone", label: "Phone", icon: <FaPhoneSquareAlt className="text-xl" />, info: "Input field that expects a phone number" },
      
    ].filter(elementType => elementType.label.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
      <>
      <div
        className={`text-[15px] pt-[8px] pl-[11px] absolute transition-all duration-300 top-[150px] h-[35px] w-[35px] ${
          isOpen ? "left-[310px]" : "left-[15px]"}  rounded-t-md ${activeDiv === 'edit' ? 'bg-[#17c495]' : 'bg-[#262626]' }`}
        onClick={() => {toggleDiv('edit');toggleEdit()}}
      >
        <button className="group transition-all duration-300">
          <FaRegEdit />
          <span className="hidden absolute w-[50px] left-[40px] top-[0px] bg-black p-1 text-[13px] text-white group-hover:inline rounded">
            Editor
          </span>
        </button>
      </div>
      <div
        className={`text-[15px] pt-[8px] pl-[11px] absolute transition-all duration-300 top-[180px] h-[35px] w-[35px] ${
          isOpen ? "left-[310px]" : "left-[15px]"
        } rounded-b-md ${activeDiv === 'view' ? 'bg-[#17c495]' : 'bg-[#262626]'}`}
        onClick={() => {toggleDiv('view');togglePreview()}}
      >
        <button className="group transition-all duration-300">
          <FaRegEye />
          <span className="hidden absolute w-[55px] left-[40px] top-[4px] bg-black p-1 text-[13px] text-white group-hover:inline rounded">
            Preview
          </span>
        </button>
      </div>
        <div className={` left-0 top-[100px] h-screen overflow-auto bottom-0 bg-[#262626] shadow-md transition-all duration-300 ${isOpen ? 'w-[290px] visible' : 'w-0 invisible'} ${isDarkMode ? 'bg-[#191919] text-white' : 'bg-white text-black'}`}>
           
            <div className="flex flex-col items-center flex-1 gap-[1px] w-full max-w-xs">
                <input
                    type="text"
                    placeholder="  Search Elements"
                    className="m-[20px] p-1.5 pl-[40px] w-[250px] border-2 border-solid bg-[#323232] border-[#323232] rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className='text-3xl absolute top-[105px] left-[30px] text-gray-400'><IoMdSearch /></span>
                {filteredElementTypes.map(elementType => (
                    <DraggableTool key={elementType.type} type={elementType.type}  >
                        <div className="cursor-pointer m-[10px] w-[245px] ml-[10px] h-[45px] border-2 border-solid border-[#262626] flex gap-[10px] items-center">
                           <div className='h-[35px] w-[35px] bg-[#393939] rounded-md'>
                             <div className='absolute top-[22px] left-[19px]'>{elementType.icon}</div> </div>
                            <div className='flex flex-col'>
                            <h1 className='text-[16px] font-bold '>{elementType.label}</h1>
                            <p className='mt-[-2px] text-[12px]'>{elementType.info}</p>
                              </div>
                    
                        </div>
                    </DraggableTool>
                ))}
            </div>
        </div>
       <div className={`bg-[#262626] text-[15px] pt-[9px] pl-[11px] absolute transition-all duration-300 top-[600px] h-[35px] w-[35px] ${
          isOpen ? "left-[310px]" : "left-[15px]"} ${isOpen ? 'left-[310px]' : 'left-[15px]'} rounded-md ` }  onClick={() => changeIcon('left')}>
        <button className="group transition-all duration-300">
        {activeIcon === 'left' ? <LuArrowLeftToLine /> : <LuArrowRightToLine /> }

          <span className="hidden absolute w-[80px] left-[42px] top-[5px] bg-black p-1 text-[13px] text-white group-hover:inline rounded">
          {isOpen ? 'Close Panel' : 'Open Panel'}
          </span>

        </button>
      </div>
      <div className={`bg-[#262626] text-[15px] pt-[9px] pl-[11px] absolute transition-all duration-300 top-[645px] h-[35px] w-[35px] ${isOpen ? 'left-[310px]' : 'left-[15px]'} rounded-md ` } onClick={handleClearCanvas} >
        <button className="group transition-all duration-300">
        <RiDeleteBin6Line />
          <span className="hidden absolute w-[90px] left-[42px] top-[5px] bg-black p-1 text-[13px] text-white group-hover:inline rounded">
          Clear Canvas
          </span>
        </button>
      </div>
    
      </>
    );
};

export default Panel;
