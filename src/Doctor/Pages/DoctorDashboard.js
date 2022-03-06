import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DoctorWelcome from '../Common/DoctorWelcome'

export default function DoctorDashboard() {
  //state area 
   const Navigate = useNavigate()

   //useEffect
    useEffect(()=>{
      if(!window.localStorage.getItem("doctor-login")){
        Navigate("/doctor-login")
      }
    },[Navigate])
  return (
   <>
     <DoctorWelcome>
         <h1>Welcome</h1>
     </DoctorWelcome>
   </>
  )
}
