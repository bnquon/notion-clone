import React from 'react'

type SideNavProps = {
  showNewDocument: (page: String) => void;
}

export const SideNav = ({ showNewDocument }: SideNavProps) => {
  return (
    <div className='w-[15%] h-screen bg-[#f3f5f6] flex flex-col flex-shrink-0 py-8 px-8'>
        <div className=''>
            <p className='text-2xl font-bold'>MindSpace</p>
        </div>
        <div className='mt-auto'>
            <button onClick={() => showNewDocument('createDocument')} className='w-full text-lg px-2 py-2 rounded-lg bg-[#8A2BE2] text-white'>+&nbsp; New Project</button>
        </div>
    </div>
  )
}
