import React from 'react'
import { useUserAuth} from "../../hooks/useUserAuth"
import DasboardLayout from '../../components/layouts/DasboardLayout';

const Dashboard = () => {

  useUserAuth();

  return (
    <DasboardLayout activeMenu="Dashboard" >Dashboard</DasboardLayout>
  )
}

export default Dashboard