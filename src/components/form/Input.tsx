
import React, { useState } from 'react'
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoLogoInstagram,
  IoPerson
} from 'react-icons/io5';
import { BsEnvelopeAt } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbLockPassword } from 'react-icons/tb';

type Props = {
  name: string;
  label?: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  required?: boolean;
  error?: string;
  showError?: boolean;
}

const TextInput = ({
  name,
  label,
  value,
  type = "text",
  placeholder = "",
  onChange,
  disabled
}: Props) => {
  return (
    <div className='flex flex-col md:flex-row gap-1 md:gap-5 text-xl items-start md:items-center font-bold'>
      <label htmlFor='email' className='tracking-tight w-[90px] capitalize'>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className='tracking-tight py-2 px-2.5 flex-1 rounded-xl bg-neutral-50 text-black disabled:bg-neutral-300 disabled:text-neutral-700 focus:outline-0 w-full'
      />
    </div>
  )
}

const PasswordInput = ({
  name,
  label,
  value,
  placeholder = "",
  disabled,
  onChange,
}: Props) => {

  const [seePassword, setSeePassword] = useState<boolean>(false);

  return (
    <div className='flex flex-col md:flex-row gap-1 md:gap-5 text-xl items-start md:items-center font-bold'>
      {label && <label htmlFor='password' className='tracking-tight w-[90px]'>{label}</label>}
      <div className='relative py-2 px-2.5 flex-1 border rounded-xl bg-neutral-50 text-black disabled:bg-neutral-300 disabled:text-neutral-700 w-full'>
        <input
          id={name}
          type={seePassword ? "text" : "password"}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          className='tracking-tight focus:outline-0 w-full'
        />
        <button className='absolute right-0 -translate-x-1 px-3 py-1 cursor-pointer' onClick={() => setSeePassword(!seePassword)}>
          {!seePassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
      </div>
    </div>
  )
}

const TextInputIcon = ({
  type,
  label,
  name,
  value,
  placeholder = "",
  disabled,
  required = false,
  error,
  showError = true,
  onChange,
}: Props) => {
  return (
    <div>
      {label && <div className='mb-1.5'>
        <label>{label}</label>
      </div>}
      <div className={`relative w-full py-4 px-3 flex-1 border ${error ? "border-red-400" : "border-blue-900"} rounded-xl text-main-blue ${disabled ? 'bg-neutral-400/50 border-transparent' : 'bg-transparent'}`}>
        <div className='flex items-center gap-3'>
          {name === "email" ? <BsEnvelopeAt size={20} className='' />
            : name === "fullName" ? <IoPerson size={20} className='' />
              : name === "password" || name === "confirmPassword" ? <TbLockPassword size={20} className='' />
                : name === "instagram" ? <IoLogoInstagram size={20} className='' />
                  : name === "hometown" ? <FaMapMarkerAlt size={20} className='' />
                    : null}
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            placeholder={`${placeholder}${required ? " *" : ""}`}
            onChange={onChange}
            disabled={disabled}
            className='tracking-tight focus:outline-0 w-full leading-none text-lg bg-transparent text-black'
          />
        </div>
      </div>
      {error && showError && <small className='text-red-400 mt-2 ml-2'>{error}</small>}
    </div>
  )
}

const PasswordInputIcon = ({
  label = "",
  name,
  value,
  placeholder = "",
  disabled,
  required = false,
  error,
  onChange,
}: Props) => {

  const [seePassword, setSeePassword] = useState<boolean>(false);

  return (
    <>
      {label && <label className='mb-2 tracking-tight font-semibold'>{label}</label>}
      <div className={`relative w-full py-4 px-3 flex-1 border ${error ? "border-red-400" : "border-blue-900"} rounded-xl text-main-blue ${disabled ? 'bg-neutral-400/50 border-transparent' : 'bg-transparent'} ${label && "mt-2"}`}>
        <div className='flex items-center gap-3'>
          <TbLockPassword size={20} className='' />
          <input
            id={name}
            type={seePassword ? "text" : "password"}
            name={name}
            value={value}
            placeholder={`${placeholder}${required ? " *" : ""}`}
            onChange={onChange}
            disabled={disabled}
            className='tracking-tight focus:outline-0 w-full leading-none text-lg bg-transparent text-black'
          />
          <button type='button' className='absolute right-0 -translate-x-1 px-3 py-1 cursor-pointer' onClick={() => setSeePassword(!seePassword)}>
            {!seePassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
          </button>
        </div>
      </div>
      {error && <small className='text-red-400 mt-2 ml-2'>{error}</small>}
    </>
  )
}

const RadioButtonInput = ({
  value,
  options,
  error,
  onChange
}: {
  value: string;
  options: string[];
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <div className="flex gap-10">
        {options.map((item: string, idx: number) => {
          return (
            <div key={`option-${idx}`} className="inline-flex items-center">
              <label className="relative flex items-center cursor-pointer" htmlFor={item}>
                <input
                  id={item}
                  name="gender"
                  type="radio"
                  checked={value === item}
                  className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border ${error ? "border-dashed border-red-400" : "border-white/50"} checked:border-white/70 transition-all`}
                  onChange={onChange}
                />
                <span className="absolute bg-[#A4F018] w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                </span>
              </label>
              <label className="ml-2 text-neutral-50 cursor-pointer text-lg capitalize" htmlFor={item}>{item}</label>
            </div>
          )
        })}
      </div>
      {error && <small className='text-red-400 mt-2'>{error}</small>}
    </div>
  )
}

export {
  TextInput,
  PasswordInput,
  TextInputIcon,
  PasswordInputIcon,
  RadioButtonInput
}