import React, { useContext } from 'react'
import {useUserAuth} from '../../hooks/useUserAuth'
import DasboardLayout from '../../components/layouts/DasboardLayout'
import { UserContext } from '../../context/UserContext'

const UserDashBoard = () => {
  useUserAuth()

  const {user} = useContext(UserContext)

  return (
    <DasboardLayout>Dashboard</DasboardLayout>
  )
}

export default UserDashBoard