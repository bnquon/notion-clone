import React from 'react'

export const SideNav = () => {
  return (
    <div className='w-[15%] h-screen bg-[#f3f5f6]'>
        <div className='px-4 pt-8'>
            <p className='text-2xl font-bold'>MindSpace</p>
        </div>
        <div className='px-4 mt-8'>
            <button className='w-full text-lg px-2 py-2 rounded-lg bg-[#8A2BE2] text-white'>+ New Project</button>
        </div>
    </div>
  )
}
