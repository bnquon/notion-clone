import React from 'react'
import { SideNav } from '@/components/SideNav'

export default function page() {

    return (
        <div className='w-screen h-screen flex flex-row relative'>
            <SideNav />
            <div className='w-full h-full pt-8 px-6'>
                <div className='w-full text-4xl font-semibold'>
                    <p>Welcome back, **NAME**!</p>
                </div>
            </div>
        </div>
    )
}