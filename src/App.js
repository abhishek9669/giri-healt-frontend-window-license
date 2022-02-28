import React, { createContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Page404 from './Comp/Error/Page404'
import Homepage from "./Comp/Homepage"
import AdminLogin from "./Admin/Comp/User/AdminLogin"
import Welcome from './Admin/Comp/Common/Welcome'
import AdminAppointment from './Admin/Comp/pages/AdminAppointment'
import LoginRegister from "./Comp/User/LoginRegister"
import Appoint from './Comp/Pages/Appoint'
import Users from './Admin/Comp/pages/Users'
import Dashboard from './Admin/Comp/pages/Dashboard'
import MyAppointment from './Comp/Pages/MyAppointment'
export const GlobalContext = createContext()
export default function App() {
   const [userAuth,setUserAuth] = useState(window.localStorage.length)
   function  authCall (){
        if(userAuth!==0){
          setUserAuth(JSON.parse(window.localStorage.getItem("jwt-normal-user")))
      }else{
          setUserAuth(false)
      }
    }
    useEffect(()=>{
       authCall()
    },[])
  return (
    <GlobalContext.Provider value={{user:userAuth, name:"Balram"}}>
           <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/contact' element={<Appoint />} />
            <Route path='/myappointments' element={<MyAppointment />} />
            <Route path='/admin' element={<AdminLogin/>} />
            <Route path='/admin/dashboard' element={<Dashboard/>} />
            <Route path='/admin/users' element={<Users/>} />
            <Route path='/login-register' element={<LoginRegister/>} />
            <Route path='/admin/appointments' element={<AdminAppointment/>} />
            <Route path='*' element={<Page404/>} />
          </Routes>    
    </GlobalContext.Provider>
   
  )
}
