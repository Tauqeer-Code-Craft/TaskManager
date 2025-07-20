import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import AdminDashBoard from './pages/Admin/AdminDashBoard'
import PrivateRoute from './routes/PrivateRoute'
import ManageTasks from './pages/Admin/ManageTasks'
import CreateTask from './pages/Admin/CreateTask'
import UserDashBoard from './pages/User/UserDashBoard'
import MyTasks from './pages/User/MyTasks'
import ViewTaskdetails from './pages/User/ViewTaskdetails'
import UserProvider from './context/userContext'
const App = () => {
  
return (
  <UserProvider>
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        
        {/* //Admin Routes  */}
        <Route element={<PrivateRoute allowedRoles={["admin"]}/>} >
          <Route path='/admin/dashboard' element={<AdminDashBoard/>}></Route> 
          <Route path='/admin/tasks' element={<ManageTasks/>}></Route> 
          <Route path='/admin/create-task' element={<CreateTask/>}></Route> 
        </Route>

        {/* User Routes */}
        <Route element={<PrivateRoute allowedRoles={["user"]}/>}>
          <Route path='/user/dashboard' element={<UserDashBoard/>} />
          <Route path='/user/tasks' element={<MyTasks/>} />
          <Route path='/user/task-details/:id' element={<ViewTaskdetails/>} />
        </Route>
      </Routes>
    </div>
  </UserProvider>

  )
  
}

export default App