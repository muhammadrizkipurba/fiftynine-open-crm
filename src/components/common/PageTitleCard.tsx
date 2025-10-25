import React from 'react'

type PageProps = {
  title: string;
}

const PageTitleCard = ({
  title
}: PageProps) => {
  return (
    <div className='bg-white text-main-blue p-4 rounded-lg mb-0'>
      <h1 className='text-center font-bold text-xl uppercase'>{title}</h1>
    </div>
  )
}

export default PageTitleCard