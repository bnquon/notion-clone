import React from 'react'
import { SideNav } from '@/components/SideNav'
import { Document } from '@/components/Document'

export default function page() {

    return (
        <div className='w-screen h-screen flex flex-row relative'>
            <SideNav />
            <Document />
        </div>
    )
}