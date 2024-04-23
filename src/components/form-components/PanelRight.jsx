"use client"
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LuArrowLeftToLine } from "react-icons/lu";
import { LuArrowRightToLine } from "react-icons/lu";
import { FaCopy } from "react-icons/fa";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { CiTextAlignRight } from "react-icons/ci";
import { MdLockPerson } from "react-icons/md";
import { MdAttachEmail } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa6";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { FaWpforms } from "react-icons/fa";
import { moveEditorElement,cloneEditorElement } from '@/app/globaleRedux/features/globalSlice';
import DraggableTool from './DraggableTool';
import Delete from './Delete';

const PanelRight = () => {
  const isDarkMode = useSelector((state) => state.theme.value);

  const dispatch = useDispatch();
  const [activeIcon, setActiveIcon] = useState('left');
  const [isOpen, setIsOpen] = useState(true);
  const editorElements = useSelector((state) => state.global.editorElements);
  const changeIcon = () => {
    setActiveIcon(activeIcon === 'left' ? 'right' : 'left');
    setIsOpen(!isOpen);
  };

  const onDragStart = (e, index) => {
    e.dataTransfer.setData('index', index.toString());
    e.target.style.opacity = ''; 
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData('index');
    const fromIndex = parseInt(dragIndex, 10);
    const toIndex = dropIndex;
    
    if (fromIndex === toIndex) {
      return;
    }

    dispatch(moveEditorElement({ from: fromIndex, to: toIndex }));
  };

  const cloneClick = (id) => {
    dispatch(cloneEditorElement({ id }));
  };
  const elementTypeIconMap = {
    "text-input": <RxLetterCaseCapitalize />,
    "text-area": <CiTextAlignRight />,
    "password": <MdLockPerson />,
    "email": <MdAttachEmail />,
    "date": <FaRegCalendar />,
    "phone": <FaPhoneSquareAlt />,

  };

  const renderTree = (elements) => {
    return (
      <ul className="pt-2 pl-4">
        {elements.map((element, index) => (
          <DraggableTool
          key={element.id}
          index={index}
          type={element.type}
          moveElement={(from, to) => dispatch(moveEditorElement({ from, to }))}
          icon={elementTypeIconMap[element.type]}
        >
          <li key={element.id} className="" draggable="true" onDragStart={(e) => onDragStart(e, index)} onDragOver={onDragOver} onDrop={(e) => onDrop(e, index)}>
          <div className={`flex items-center ml-[16px] hover:bg-[#393939] hover:shadow-md rounded p-[2px] ${isDarkMode ? ' text-white' : 'bg-white text-black'}`}>
            <div className="absolute right-[210px] top-[10px] w-[10%] h-6 bg-[#393939] rounded-md mr-2 flex items-center justify-center">
            <h1>{elementTypeIconMap[element.type]}</h1></div>
            <div className='flex flex-col'>
              <strong className='text-[16px]'>{element.type}</strong>
              <span className="text-[12px]">{element.label}</span>
            </div>
            <div className='absolute right-[30px] h-[24px] w-[24px] bg-[#17c495] rounded text-center'>
          <button className='text-white' onClick={() => cloneClick(element.id)} >
              <FaCopy />
            </button>
          </div>
          <div className='absolute right-[0px] h-[24px] w-[24px] bg-[#17c495] rounded text-center' >
          <Delete id={element.id} />
           </div>
          </div>
          {element.options && element.options.length > 0 && renderTree(element.options)}
        </li>
        </DraggableTool>
          
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className={` right-0 top-[100px] h-screen overflow-auto bottom-0 bg-[#262626] shadow-md transition-all duration-300 ${isOpen ? 'w-[310px] visible' : 'w-0 invisible'} ${isDarkMode ? 'bg-[#191919] text-white' : 'bg-white text-black'}`}>
        <div className="h-screen w-[310px] p-8 overflow-auto">

          <div className="relative top[1px] pl-6 font-bold text-[18px]"> Form
            <div className="w-6 h-6 absolute left-[-5px] top-[2px] bg-[#393939] rounded-md flex items-center justify-center"><FaWpforms /></div>
          </div>
          {renderTree(editorElements)}
        </div>
      </div>

      <div className={`bg-[#262626] text-[15px] pt-[9px] pl-[11px] absolute transition-all duration-300 top-[602px] h-[35px] w-[35px] ${
        isOpen ? "right-[310px]" : "right-[15px]"} ${isOpen ? 'right-[328px]' : 'right-[15px]'} rounded-md `} onClick={() => changeIcon('left')}>
        <button className="group transition-all duration-300">
          {activeIcon === 'left' ? <LuArrowRightToLine /> : <LuArrowLeftToLine />}
          <span className="hidden w-[80px] absolute right-[42px] top-[5px] bg-black p-1 text-[13px] text-white group-hover:inline rounded">
            {isOpen ? 'Close Panel' : 'Open Panel'}
          </span>
        </button>
      </div>
      <div className={`bg-[#262626] text-[15px] pt-[9px] pl-[11px] absolute transition-all duration-300 top-[645px] h-[35px] w-[35px] ${isOpen ? 'right-[328px]' : 'right-[15px]'} rounded-md `} >
        <button className="group transition-all duration-300">
          <GoShieldCheck />
          <span className="hidden absolute w-[50px] right-[42px] top-[5px] bg-black p-1 text-[13px] text-white group-hover:inline rounded">
            Saved
          </span>
        </button>
      </div>
    </>
  );
};

export default PanelRight;
