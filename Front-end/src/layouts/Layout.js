import React from 'react'
import { Outlet } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'

const override = {
	position: "absolute",
	top: "0",
	left: "0",
	textAlign: "center",
	right: "0",
	bottom: "0",
	backgroundColor: "rgb(0 0 0 / 30%)",
	zIndex: "9999",
}

export const Layout = () => {
    const statusLoading = useSelector(state => state.globalLoading.status)
  return (
    <div>
        <ScaleLoader loading={statusLoading} cssOverride={override} color='blue'/>
        <Outlet/>
        <ToastContainer/>
    </div>
  )
}
