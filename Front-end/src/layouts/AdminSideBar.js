import React from 'react'
import classNames from 'classnames'
import { FcBullish } from 'react-icons/fc'
import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'

const linkClass = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/Admin',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'products',
        label: 'Products',
        path: '/Admin/products',
        icon: <HiOutlineCube />
    },
    {
        key: 'orders',
        label: 'Orders',
        path: '/Admin/orders',
        icon: <HiOutlineShoppingCart />
    },
    {
        key: 'customers',
        label: 'Customers',
        path: '/Admin/customers',
        icon: <HiOutlineUsers />
    },
    {
        key: 'transactions',
        label: 'Transactions',
        path: '/Admin/transactions',
        icon: <HiOutlineDocumentText />
    },
    {
        key: 'messages',
        label: 'Messages',
        path: '/Admin/messages',
        icon: <HiOutlineAnnotation />
    }
]

const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle />
    }
]

const AdminSideBar = () => {

    return (
        <div className='bg-neutral-900 w-60 p-3 flex flex-col'>
            <div className='flex items-center gap-2 px-1 py-3'>
                <FcBullish fontSize={24} />
                <span className='text-neutral-100 text-lg'>GameHub</span>
            </div>
            <div className='flex-1 py-8 flex flex-col gap-0.5'>
                {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                   <SidebarLink key={item.key} item={item} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                   <SidebarLink key={item.key} item={item} />
                ))}
            </div>
        </div>
    )
}

function SidebarLink({ item }) {
    const { pathname } = useLocation();

    return (
        <Link to={item.path} 
        className={classNames(pathname === item.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
        >
            <span className='text-xl'>{item.icon}</span>
            {item.label}
        </Link>
    )
}

export default AdminSideBar;
