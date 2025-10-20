import { AiOutlineLogout } from "react-icons/ai";

type Props = {
  toggleSidebar: () => void;
};

const Navbar = ({
  toggleSidebar
}: Props) => {
  return (
    <header className="flex items-center justify-between px-4 py-5 bg-main-blue border-b shadow-sm lg:px-6">
      <div className="flex items-center">
        {/* Sidebar Toggle Button (Visible only on small screens) */}
        <button
          onClick={toggleSidebar}
          className="text-gray-500 lg:hidden focus:outline-none hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
          </svg>
        </button>

        {/* Branding for mobile/lg screen spacing */}
        <span className="text-xl font-bold text-white hidden lg:block">Fifty Nine Hub</span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Profile Dropdown (Placeholder) */}
        <div className='flex items-center gap-2'>
          <div className='text-end leading-1 mb-0.5 text-white flex flex-col justify-center'>
            <p className='mb-0 font-bold cursor-default'>Mhd Rizki Purba</p>
            <small className='leading-3 cursor-default'>Admin</small>
          </div>
        </div>

        <button className="bg-red-600 p-4 rounded-xl cursor-pointer transition-all ease-in-out duration-300 hover:scale-105">
          <AiOutlineLogout color="white" className="cursor-pointer" />
        </button>
      </div>
    </header>
  )
}

export default Navbar