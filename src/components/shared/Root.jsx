import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
// import PrivateRoute from '../../utils/PrivateRoute';
const Root = () => {
  return (
    <div className='flex gap-5 pt-12'>
      <div className='hidden sm:flex'>
          <Sidebar />
      </div>
        <Outlet />
    </div>
  )
}

export default Root