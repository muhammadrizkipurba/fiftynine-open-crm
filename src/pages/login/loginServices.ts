import { isEmptyObject, isValidEmail } from "../../lib/utils";

export type LoginFormValues = {
  locale?: string;
  email: string;
  password: string;
}

interface LoginFormErrorsObjectKeys {
  [key: string]: string;
}

export interface LoginFormErrors extends LoginFormErrorsObjectKeys {
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

const validateLoginFormValues = (values: LoginFormValues) => {
  const { 
    locale,
    email,
    password
  } = values;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors: any = {};

  if(!email) {
    errors["email"] = locale === "en" ? "This field is required" : "Wajib diisi";
  } else {
    if(!isValidEmail(email)) errors["email"] = locale === "en" ? "Email is not valid" : "Email tidak valid";
  };

  if(!password) {
    errors["password"] = locale === "en" ? "This field is required" : "Wajib diisi";
  } else {
    if(password.length < 8) errors["password"] = locale === "en" ? "Min. 8 characters" : "Min. 8 karakter";
  };

  return {
    isValid: isEmptyObject(errors),
    formErrors: errors
  };
};

const loginUser = async(payload: LoginPayload) => {
  const apiURL = process.env.REACT_APP_API_URL+"/admin-auth/login";

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
  
    if(!response.ok) {
      console.log(`HTTP Error! Status : ${response.status}`);
      return;
    };
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export {
  validateLoginFormValues,
  loginUser
}