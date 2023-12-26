import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import requestApi from '../../helpers/api';

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    requestApi('/users', 'GET', []).then(response => {
      console.log(response)
      setDashboardData({
        ...dashboardData, totalUser: response.data.total
      })
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className='flex flex-row gap-4 w-full'>
      <div className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        
        <h2 class="h3 text-accent mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Customers Management</h2>
        {dashboardData.totalUser && (<div className='absolute top-0 right-0'>
          <span className='bg-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300'>
            {dashboardData.totalUser}
          </span>
        </div>)}
             
        <Link to="/Admin/customers" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          View Details
          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>
      </div>

      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        
        <h2 class="h3 text-accent mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Products Management</h2>
     
        <Link to="/Admin/products" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          View Details
          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>
      </div>

      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        
        <h2 class="h3 text-accent mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Orders Management</h2>
     
        <Link to="/Admin/orders" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          View Details
          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard;