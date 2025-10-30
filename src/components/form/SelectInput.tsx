import { IoIosShirt } from "react-icons/io";
import { FaMedal } from "react-icons/fa";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  value: string | undefined;
  placeholder: string;
  options: SelectOption[];
  disabled: boolean;
  inputClassName?: string;
  error?: string;
  showError?: boolean;
  onChange: (value: string) => void;
  defaultValue?: string;
};

const SelectInput = ({
  name,
  defaultValue,
  value,
  placeholder,
  options,
  inputClassName,
  disabled,
  error,
  onChange,
  showError = true
}: Props) => {
  return (
    <>
      <div className={`relative w-full flex-1 border ${error ? "border-red-400" : "border-main-blue/50"} rounded-xl text-black ${disabled ? 'bg-neutral-300 border-transparent' : 'text-black bg-transparent'}`}>
        <div className='flex items-center gap-3'>
          {name === "jerseySize" ? <IoIosShirt size={20} className='absolute ml-3' />
            : name === "level_category" ? <FaMedal size={18} className='absolute ml-3 mt-0.5' />
              : null}
          <Select
            onValueChange={value => onChange(value)} 
            value={value}
            defaultValue={defaultValue}
          >
            <SelectTrigger
              name={name}
              className={`text-sm ${name === "jerseySize" || name === "level_category" ? "pl-10" : "pl-3"} pr-3 py-6.5 border-0 w-full ${inputClassName} ${error && "border border-red-600"} rounded-xl`}
              disabled={disabled}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position='popper' className="border-0!">
              {options.length > 0 &&
                options.map((opt: SelectOption, idx: number) => {
                  return (
                    <SelectItem key={`select-${name}-option-${idx}`} className='text-sm text-white hover:bg-neutral-500 rounded-md transition-all ease-in-out duration-300' value={opt.value}>{opt.label}</SelectItem>
                  )
                })
              }
            </SelectContent>
          </Select>
        </div>
      </div>
      {error && showError && <small className='text-red-400 mt-2 ml-2'>{error}</small>}
    </>
  )
}

export default SelectInput