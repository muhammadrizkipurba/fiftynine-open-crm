"use client";

export type AlertPropsType = {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  message: string;
}

const Alert = ({options}: {options: AlertPropsType}) => {

  const {
    variant,
    title,
    message
  } = options;
  
  let color_theme_classname = "bg-blue-200 border-blue-500 text-blue-700";
  if(variant === "success") color_theme_classname = "bg-green-200 border-green-500 text-green-700";
  if(variant === "warning") color_theme_classname = "bg-yellow-200 border-yellow-500 text-yellow-700";
  if(variant === "error") color_theme_classname = "bg-red-200 border-red-500 text-red-700";

  return (
    <div className={`border-2 rounded-xl p-4 ${color_theme_classname} mt-8`}>
      <label className="font-black uppercase">{title}</label>
      <p className={`tracking-tight leading-6 ${!title && "font-semibold"}`}>{message}</p>
    </div>
  )
}

export default Alert