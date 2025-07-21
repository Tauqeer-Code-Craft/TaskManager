import React from 'react'
import { useUserAuth} from "../../hooks/useUserAuth"

const Dashboard = () => {

  useUserAuth();

  return (
    <div></div>
  )
}

export default Dashboard