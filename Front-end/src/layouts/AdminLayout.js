import React from 'react'
import Header from './AdminHeader'
import SideBar from './AdminSideBar'
import { Outlet } from 'react-router'

export const AdminLayout = () => {
    return (
        <div className='flex flex-row bg-site bg-no-repeat bg-cover overflow-hidden w-screen'>
            <SideBar />
            <div className='flex-1'>
                <Header />
                <div className='p-4'>
                    <Outlet />
                </div>
            </div>
            <div className='h-[800px]'></div>
        </div>
    )
}
