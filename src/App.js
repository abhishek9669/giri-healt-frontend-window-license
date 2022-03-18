import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Page404 from './Comp/Error/Page404'
import Homepage from "./Comp/Homepage"
import AdminLogin from "./Admin/Comp/User/AdminLogin"
import AdminAppointment from './Admin/Comp/pages/AdminAppointment'
import LoginRegister from "./Comp/User/LoginRegister"
import Appoint from './Comp/Pages/Appoint'
import Users from './Admin/Comp/pages/Users'
import Dashboard from './Admin/Comp/pages/Dashboard'
import MyAppointment from './Comp/Pages/MyAppointment'
import DoctorLoginRegister from './Comp/User/DoctorLoginRegister'
import DoctorAppoint from './Doctor/Pages/DoctorAppoint'
import DoctorDashboard from './Doctor/Pages/DoctorDashboard'
import DoctorSchedule from './Doctor/Pages/DoctorSchedule'
import Doctors from './Admin/Comp/pages/Doctors'
export default function App() {

  return (
           
           <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/contact' element={<Appoint />} />
            <Route path='/myappointments' element={<MyAppointment />} />
            <Route path='/admin' element={<AdminLogin/>} />
            <Route path='/admin/dashboard' element={<Dashboard/>} />
            <Route path='/admin/users' element={<Users/>} />
            <Route path='/admin/doctors' element={<Doctors/>} />
            <Route path='/doctor/appointments' element={<DoctorAppoint/>}/>
            <Route path='/doctor/schedule' element={<DoctorSchedule/>}/>
            <Route path='/doctor/dashboard' element={<DoctorDashboard/>}/>
            <Route path='/login-register' element={<LoginRegister/>} />
            <Route path='/doctor-login' element={<DoctorLoginRegister/>} />
            <Route path='/admin/appointments' element={<AdminAppointment/>} />
            <Route path='*' element={<Page404/>} />
          </Routes>    

   
  )
}
