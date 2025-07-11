import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import AdminDashBoard from './pages/Admin/AdminDashBoard'

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        
        {/* //Admin Routes  */}
        <Route element={<PrivateRoute allowedRoles={["admin"]}/>} >
          <Route path='/admin/dashboard' element={<AdminDashBoard/>}></Route> 
        </Route>
      </Routes>
    </div>

  )
}

export default App