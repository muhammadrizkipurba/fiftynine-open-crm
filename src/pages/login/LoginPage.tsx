import LoginForm from './LoginForm';

const LoginPage = () => {
  const { REACT_APP_API_URL } = process.env;

  return (
    <div className='pt-20 pb-20 mb-12 bg-main-blue h-[100vh] flex items-center justify-center'>
      <div className='custom-container flex-1 min-w-full'>
        <div className='max-w-lg mx-auto border border-white/50 p-5 rounded-3xl pt-10 pb-5 bg-gray-100'>
          <img
            src={`${REACT_APP_API_URL}/images/logo/logo-blue.svg`}
            alt=''
            width={240}
            height={120}
            className='mx-auto'
          />
          <h1 className='font-racing capitalize text-center text-xl mt-10'><strong>Admin Dashboard</strong></h1>
          <div className='mt-16 z-10'>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage