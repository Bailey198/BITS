import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'

export const Main = () => {

  return (
    <div className='bg-site bg-no-repeat bg-cover overflow-hidden'>
      <Header />
      <div  className='mt-28'>
        <Outlet />
      </div>
    </div>
  )
}
