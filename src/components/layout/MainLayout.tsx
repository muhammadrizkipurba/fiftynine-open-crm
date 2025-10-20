import React, { ReactNode, useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer';

type Props = {
  children: ReactNode
};

const MainLayout = ({
  children
}: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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