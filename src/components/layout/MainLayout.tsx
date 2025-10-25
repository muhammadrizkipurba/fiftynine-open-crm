import { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer';
import { useLocation } from 'react-router';

type Props = {
  children: any
};

const MainLayout = ({
  children
}: Props) => {
  const { pathname } = useLocation();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (pathname === '/login') return children;

  return (
    <div className="flex bg-neutral-100">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Navbar Component */}
        <div className='flex-grow-0'>
          <Navbar toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content Area */}
        <div className='p-5 flex-1 overflow-y-scroll max-h-[85vh]'>
          {children}
        </div>

      </div>
      <div className='absolute z-50 bg-neutral-100 bottom-0 px-5 py-3 border-t w-full'>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout