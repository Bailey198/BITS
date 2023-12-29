import React from 'react'
import imgPageNotFound from '../assets/page-404.png'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
    <div className='"h-screen text-center'>
        <div>
            <img className="mx-auto" src={imgPageNotFound} />
        </div>

        <Link to="/" className='text-black'><b>Back to Homepage</b></Link>
    </div>
  )
}
