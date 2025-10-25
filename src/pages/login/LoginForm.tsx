import React, { useState } from 'react'

import Loading from "../../components/ui/loading";
import Alert, { AlertPropsType } from '../../components/ui/alert';
import { PasswordInputIcon, TextInputIcon } from '../../components/form/Input';

import { LoginFormErrors, LoginPayload, loginUser, validateLoginFormValues } from './loginServices';
import { setCredentials } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

const LoginForm = ({
  locale
}: {
  locale?: string
}) => {
  const navigate = useNavigate();
	const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertPropsType | null>(null);
  const [errors, setErrors] = useState<LoginFormErrors | null>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const deleteErrorHandler = (event: React.ChangeEvent<HTMLInputElement> | string) => {
    if (errors) {
      const newErrors = errors;
      const removedProperty = typeof event === "string" ? event : event.target.name;
      delete newErrors[removedProperty];
      setErrors(newErrors);
    };
  };

  const handleLoginUser = async () => {
    const payload: LoginPayload = {
      email,
      password
    };

    const successRequest = await loginUser(payload);
    if (!successRequest) {
      setIsLoading(false);
      setAlert({
        variant: "error",
        message: "Something went wrong. Internal server error!"
      });
      return;
    }

    const { status, message, data } = successRequest;

    if (status === 200) {
      const { user, authToken } = data;

			dispatch(setCredentials({ user, token: authToken.key }));
			setIsLoading(false);
			navigate('/dashboard');
    } else {
      setIsLoading(false);
      setAlert({
        variant: "error",
        message
      });
    };
  };

  const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert(null);

    const payload = {
      email,
      password
    };

    const { isValid, formErrors } = validateLoginFormValues({ ...payload, locale });

    if (isValid) {
      handleLoginUser();
    } else {
      setIsLoading(false);
      setErrors(formErrors);
      setAlert({
        variant: "error",
        message: locale === "en" ? "Please complete the form correctly" : "Lengkapi formulir dengan benar"
      });
    };
  };

  return (
    <form className='relative z-10' onSubmit={submitHandler}>
      <div>
        <TextInputIcon
          required
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          disabled={isLoading}
          error={errors?.email}
          onChange={(e: any) => {
            deleteErrorHandler(e.target.name);
            setEmail(e.target.value.toLowerCase().trim())
          }}
        />
      </div>
      <div className='mt-5'>
        <PasswordInputIcon
          type="password"
          name="password"
          value={password}
          placeholder="Kata Sandi"
          disabled={isLoading}
          error={errors?.password}
          onChange={(e: any) => {
            deleteErrorHandler(e.target.name);
            setPassword(e.target.value.toLowerCase().trim())
          }}
        />
      </div>
      {alert && <Alert options={alert} />}
      <div className='flex items-center justify-between mt-8'>
        {isLoading ?
          <div className='py-1 mx-auto'>
            <Loading show={isLoading} labelClassName='text-main-blue' spinnerClassName='text-main-blue' />
          </div>
          : <button
            type='submit'
            disabled={isLoading}
            className='py-4 text-sm font-bold uppercase font-racing rounded-xl cursor-pointer bg-main-green text-main-blue transition-all ease-in-out duration-300 hover:scale-105 w-full mb-8'
          >
            Login
          </button>
        }
      </div>
    </form>
  )
}

export default LoginForm