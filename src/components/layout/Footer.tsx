import React from 'react'

const Footer = () => {
  return (
    <div className='flex items-center justify-center'>
      <p className='text-xs'>
        Admin dashboard - Fifty nine hub &copy; {new Date().getFullYear()}. All right reserved
      </p>
    </div>
  )
}

export default Footer