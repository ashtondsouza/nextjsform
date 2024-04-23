"use client"
import React from 'react';
import { FaCopy } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { ElementTypesText } from '@/constants/elementTypes';
import { openDrawer } from '@/app/globaleRedux/features/drawerSlice';
import { cloneEditorElement } from '@/app/globaleRedux/features/globalSlice';
import Delete from './Delete';

const TextInput = ({ label, placeHolder, prefix, suffix, readOnly ,disabled}) => (
  <div className="px-4 py-2 flex flex-col gap-1 h-[100px]">
    <label htmlFor="textInput">{label}</label>
    <div className="h-[40px] flex flex-row input-group rounded-lg border border-slate-300 hover:border-slate-600">

        {prefix && <span className="input-prefix p-1 whitespace-nowrap">{prefix}</span>}
      <input
        id="textInput"
        type="text"
        placeholder={placeHolder}
        label={label}
        readOnly={readOnly}
        disabled={disabled}
        className="bg-white p-1 w-full "
      />
    
      {suffix && <span className="input-suffix p-1  whitespace-nowrap">{suffix}</span>}

    </div>
    </div>

);

const TextArea = ({ label, placeHolder, prefix, suffix, readOnly, disabled }) => (
  <div className="px-4 py-2 flex flex-col gap-1">
    <label htmlFor="textArea">{label}</label>
    <div className="flex flex-row input-group rounded-lg border border-slate-300 hover:border-slate-600">
      {prefix && <span className="input-prefix p-1 whitespace-nowrap">{prefix}</span>}
    <textarea
      id="textArea"
      rows={3}
      placeholder={placeHolder}
      label={label}
      readOnly={readOnly}
      disabled={disabled}
      className="bg-white p-1 w-full "
      />
      {suffix && <span className="input-suffix p-1  whitespace-nowrap">{suffix}</span>}
    </div>
  </div>
);

const Email = ({ label, placeHolder, prefix, suffix, readOnly, disabled }) => (
  <div className="px-4 py-2 flex flex-col gap-1">
    <label htmlFor="emailInput">{label}</label>
    <div className="flex flex-row input-group rounded-lg border border-slate-300 hover:border-slate-600">
      {prefix && <span className="input-prefix p-1 whitespace-nowrap">{prefix}</span>}
    <input
      id="emailInput"
      type="email"
      placeholder={placeHolder}
      label={label}
      readOnly={readOnly}
      disabled={disabled}
      className="bg-white p-1 w-full "
      />
      {suffix && <span className="input-suffix p-1  whitespace-nowrap">{suffix}</span>}
    </div>
  </div>
);

const Password = ({ label, placeHolder, prefix, suffix, readOnly, disabled={disabled} }) => (
  <div className="px-4 py-2 flex flex-col gap-1">
    <label htmlFor="passwordInput">{label}</label>
    <div className="flex flex-row input-group rounded-lg border border-slate-300 hover:border-slate-600">
      {prefix && <span className="input-prefix p-1 whitespace-nowrap">{prefix}</span>}
    <input
      id="passwordInput"
      type="password"
      placeholder={placeHolder}
      label={label}
      readOnly={readOnly}
      disabled={disabled}
      className="bg-white p-1 w-full "
      />
      {suffix && <span className="input-suffix p-1  whitespace-nowrap">{suffix}</span>}
    </div>
  </div>
);

const Phone = ({ label, placeHolder, prefix, suffix, readOnly, disabled}) => (
  <div className="px-4 py-2 flex flex-col gap-1">
    <label htmlFor="phoneInput">{label}</label>
    <div className="flex flex-row input-group rounded-lg border border-slate-300 hover:border-slate-600">
      {prefix && <span className="input-prefix p-1 whitespace-nowrap">{prefix}</span>}
    <input
      id="phoneInput"
      type="tel"
      placeholder={placeHolder}
      label={label}
      readOnly={readOnly}
      disabled={disabled}
      className="bg-white p-1 w-full "
      />
      {suffix && <span className="input-suffix p-1  whitespace-nowrap">{suffix}</span>}
    </div>
  </div>
);

const DateInput = ({ label, placeHolder, prefix, suffix, readOnly, disabled}) => (
  <div className="px-4 py-2 flex flex-col gap-1">
    <label htmlFor="dateInput">{label}</label>
    <div className="flex flex-row input-group rounded-lg border border-slate-300 hover:border-slate-600">
      {prefix && <span className="input-prefix p-1 whitespace-nowrap">{prefix}</span>}
    <input
      id="dateInput"
      type="date"
      placeholder={placeHolder}
      label={label}
      readOnly={readOnly}
      disabled={disabled}
      className="bg-white p-1 w-full "
      />
      {suffix && <span className="input-suffix p-1  whitespace-nowrap">{suffix}</span>}
    </div>
  </div>
);

const ElementTypes = {
  'text-input': TextInput,
  'text-area': TextArea,
  'email': Email,
  'date': DateInput,
  'phone': Phone,
  'password': Password,
};

const FormElement = ({ withToolkit, setActiveElementId,description, prefix, suffix,readOnly, disabled, ...props }) => {
  const { type, id,  label = ElementTypesText[type], placeHolder } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    setActiveElementId(id);
    dispatch(openDrawer({ id }));
  };

  const cloneClick = () => {
    dispatch(cloneEditorElement({ id }));
  };

  return (
    <div onClick={handleClick}>
      {ElementTypes[type]({ label, placeHolder, prefix, suffix, readOnly, disabled})}
      {description}
      {withToolkit && (
        <div className="group absolute inset-0 bg-transparent opacity-0 hover:opacity-100 flex p-2 px-10">
          <div className="flex gap-4 p-1 items-center text-lg h-max ml-auto">
            <div className="h-max p-1 px-2 rounded text-xs font-bold text-white bg-slate-900">
              {ElementTypesText[type]}
            </div>
            <div className="flex gap-[10px] relative top-[-36px]">
              <div className="h-[22px] w-[22px] bg-[#17c495] rounded text-[15px] text-center" onClick={cloneClick}>
                <button className="text-white">
                  <FaCopy />
                </button>
              </div>
              <div className="h-[22px] w-[22px] bg-[#17c495] rounded text-center">
                <Delete id={id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormElement;
