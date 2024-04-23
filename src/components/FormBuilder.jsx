"use client"
import React, { useState,useEffect } from 'react'

import Panel from './form-components/Panel';
import Canvas from './form-components/Canvas';
import PanelRight from './form-components/PanelRight';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'
import AttributePanel from './form-components/AttributePanel'


const FormBuilder = () => {

  const isDarkMode = useSelector((state) => state.theme.value);
  const { activeElementId, isOpened } = useSelector((state) => state.drawer)
  const [previewMode, setPreviewMode] = useState(false);

  const toggleEdit = () => {
    setPreviewMode(false)
  };
  const togglePreview = () => {
    setPreviewMode(true);
  };


  useEffect(() => {
    if (isDarkMode) {
        document.body.classList.add('bg-[#191919]'); // Add dark mode background color
    } else {
        document.body.classList.remove('bg-[#191919]'); // Remove dark mode background color
    }
}, [isDarkMode]);



  return (
    <>
    <div className={`${isDarkMode ?'bg-[#191919] text-white' : 'bg-white text-black'}`}>
    <DndProvider backend={HTML5Backend}>
    <div className='flex w-full border border-gray-800 justify-between'>
    
    <Panel toggleEdit={toggleEdit} togglePreview={togglePreview} />
    <Canvas previewMode={previewMode} />
    {isOpened && <AttributePanel activeElementId={activeElementId} />}
    <PanelRight/>
    </div>
    </DndProvider>
    </div>
    </>
  )
}

export default FormBuilder;