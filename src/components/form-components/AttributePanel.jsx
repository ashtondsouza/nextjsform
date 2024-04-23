"use client"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ElementTypesText } from '@/constants/elementTypes';
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { WiMoonAltFull } from "react-icons/wi";
import { updateEditorElement } from '@/app/globaleRedux/features/globalSlice';

const AttributePanel = ({ activeElementId, closeDrawer, toggleReadOnly, toggleDisabled }) => {
  const isDarkMode = useSelector((state) => state.theme.value);

  const { editorElements } = useSelector((state) => state.global);
  const element = editorElements.find(
    (element) => element.id === activeElementId
  );

  const [label, setLabel] = useState(element ? element.label : '');
  const [description, setDescription] = useState(element ? element.description : '');
  const [placeHolder, setPlaceHolder] = useState(element ? element.placeHolder : '');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  
  const [isOpen, setIsOpen] = useState(true);
  const [isRead, setIsRead] = useState(true);
  const [activeIcon, setActiveIcon] = useState('minus');
  const [readBtn, setReadBtn] = useState('left');
  const [isDisable, setIsDisable] = useState(true);
  const [disableBtn, setDisableBtn] = useState('left');

  const toggleRead = () => {
    setReadBtn(readBtn === 'left' ? 'right' : 'left');
    toggleReadOnly()
    setIsRead(!isRead)
};

const toggleDisable = () => {
  setDisableBtn(disableBtn === 'left' ? 'right' : 'left');
  toggleDisabled()
  setIsDisable(!isDisable)
};

const activeDiv2 = (div) => {
  setDisableBtn(div)

 }

 const activeDiv = (div) => {
  setReadBtn(div)

 }

  const changeIcon = () => {
    setActiveIcon(activeIcon === 'minus' ? 'plus' : 'minus');
  setIsOpen(!isOpen);
};  
  

  const dispatch = useDispatch();
 

  const applyChanges = () => {
    if (!element) return;

    const payload = {
      ...element,
      label,
      description,
      placeHolder,
      prefix,
      suffix,
    };

    dispatch(
      updateEditorElement({
        id: element.id,
        element: payload,
      })
    );

    closeDrawer();
  };
  // ${ isOpen ? 'right-[0px] transition-all' : 'right-[-400px] '}
  return (
    <div
      className={`absolute h-screen overflow-auto bottom-0 top-[80px] shadow-lg z-10 w-[350px] flex flex-col gap-3 
      right-[0px]
          ${isDarkMode ? 'bg-white text-black':'bg-[#262626] text-white'}`}
    >
      <div className="flex items-center justify-between w-[400px]">
        <h2 className="text-2xl font-semibold p-[14px] pl-[26px]">
          {element && ElementTypesText[element.type]}
        </h2>
        
      </div>

     <div className='flex flex-col w-[400px]'>
      <div className='w-full h-[55px] bg-[#323232] flex items-center' onClick={() => changeIcon('minus')}>
        <h1 className='text-[17px] pl-[30px] font-semibold' >Properties</h1>
        {activeIcon === 'minus' ? <FaPlus className='absolute right-[40px] text-xl' /> : <FaMinus className='absolute right-[40px] text-xl'/> }</div>
     <div className={`${isOpen ? 'w-[400px]  h-[170px] visible ': 'h-[0px] invisible' } `}>
     <div className="flex items-center gap-2 font-semibold h-[55px]">
        <label className='pl-[30px] text-[14px] font-[400]' htmlFor="label">Label</label>
        <input
          type="text"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-[190px] h-[30px] absolute right-[20px] bg-[#323232] border outline-none rounded p-2 focus:border-slate-700"
        />
      </div>

      <div className="flex items-center gap-2 font-semibold h-[55px]">
        <label className='pl-[30px] text-[14px] font-[400]' htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-[190px] h-[30px] absolute right-[20px] bg-[#323232] border outline-none rounded p-2 focus:border-slate-700"
        ></textarea>
      </div>

      <div className="flex items-center gap-2 font-semibold h-[55px]">
        <label className='pl-[30px] text-[14px] font-[400]'  htmlFor="placeholder">Placeholder</label>
        <input
          type="text"
          id="placeholder"
          value={placeHolder}
          onChange={(e) => setPlaceHolder(e.target.value)}
          className="w-[190px] h-[30px] absolute right-[20px] bg-[#323232] border outline-none rounded p-2 focus:border-slate-700"
        />
      </div>
     </div>
     </div>

     <div className='flex flex-col w-[400px] border-t-[1px] border-b-[1px] border-gray-500'>

     <div className={`${isOpen ? 'w-[400px]  h-[120px] visible ': 'h-[0px] invisible' } `}>
     <div className="flex items-center gap-2 font-semibold h-[55px]">
        <label className='pl-[30px] text-[14px] font-[400]' htmlFor="label">Prefix</label>
        <input
          type="text"
          id="label"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          className="w-[190px] h-[30px] absolute right-[20px] bg-[#323232] border outline-none rounded p-2 focus:border-slate-700"
        />
      </div>

      <div className="flex items-center gap-2 font-semibold h-[55px]">
        <label className='pl-[30px] text-[14px] font-[400]' htmlFor="description">Suffix</label>
        <input
          id="description"
          value={suffix}
          onChange={(e) => setSuffix(e.target.value)}
          className="w-[190px] h-[30px] absolute right-[20px] bg-[#323232] border outline-none rounded p-2 focus:border-slate-700"
        ></input>
      </div>      
     </div>


     </div>

    <div className='flex flex-col' >
    <div className="flex items-center gap-2  font-semibold h-[35px]">
        <label className='pl-[30px] text-[14px] font-[400]' htmlFor="description">Read-Only</label>
        <div className={`w-[54px] h-[23px] absolute right-[40px] border border-[#17c495] rounded-xl transition-all duration-300 ${isRead ? 'bg-[#262626]' : 'bg-[#17c495]'} `} onClick={() => {activeDiv('left');toggleRead()}}>
            {readBtn === 'left' ?
              <div className='h-[19px] w-[19px] bg-white transition-all duration-300 relative top-[1px] left-[2px] rounded-xl'>
              <WiMoonAltFull className='text-[23px] font-bold text-gray-400 relative top-[-2px] left-[-2px]' />
            </div>
            : 
              <div className='h-[19px] w-[19px] bg-white transition-all duration-300 relative top-[1px] left-[32px] rounded-xl'>
              <WiMoonAltFull className='text-[23px] font-bold text-gray-400 relative top-[-2px] left-[-2px]'/>
            </div>  }
            </div>
      </div>

      <div className="flex items-center gap-2  font-semibold h-[55px]">
        <label className='pl-[30px] text-[14px] font-[400]' htmlFor="description">Disabled</label>
        <div className={`w-[54px] h-[23px] absolute right-[40px] border border-[#17c495] rounded-xl transition-all duration-300 ${isDisable ? 'bg-[#262626]' : 'bg-[#17c495]'} `} onClick={() => {activeDiv2('left');toggleDisable()}}>
            {disableBtn === 'left' ?
              <div className='h-[19px] w-[19px] bg-white transition-all duration-300 relative top-[1px] left-[2px] rounded-xl'>
              <WiMoonAltFull className='text-[23px] font-bold text-gray-400 relative top-[-2px] left-[-2px]' />
            </div>
            : 
              <div className='h-[19px] w-[19px] bg-white transition-all duration-300 relative top-[1px] left-[32px] rounded-xl'>
              <WiMoonAltFull className='text-[23px] font-bold text-gray-400 relative top-[-2px] left-[-2px]'/>
            </div>  }
            </div>
      </div>
    </div>

      <div className="mt-auto flex justify-end absolute top-[20px] right-[50px]">
        <button
          onClick={applyChanges}
          className="px-2 py-1 bg-green-600 rounded font-semibold hover:ring-4 hover:ring-green-200 hover:bg-green-500 transition-all text-white"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default AttributePanel;
