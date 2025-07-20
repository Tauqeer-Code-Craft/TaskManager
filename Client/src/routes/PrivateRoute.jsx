import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRoute = ({allowedRoles}) => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}

export default PrivateRoute