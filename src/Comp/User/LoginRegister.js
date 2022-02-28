import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Loader'
import Layout from '../Common/Layout'
const config = require("../../config.json")
export default function LoginRegister() {
  //state area
    const [switchForm, setSwitchForm] = useState(true)
    const [forgotSwitch, setForgotSwitch] = useState(false)
    const [register, setRegister] = useState({})
    const [userLogin, setUserLogin] = useState({})
    const [forgotPass, setForgotPass] = useState({})
    const [otpHandler, setOtpHandler]= useState({status:false})
    const [message, setMessage] = useState({status:false, msg:"", color:"text-danger"})
    const [isLoading, setIsLoading] = useState(false)
    const Navigate = useNavigate()

    useEffect(()=>{
        if(window.localStorage.getItem("jwt-normal-user")){
          Navigate("/")
        }
     },[Navigate])
  //Function Area
    const userRegisterHandler = (e)=>{
           var name = e.target.name
           var value = e.target.value
           setRegister((values)=>({...values,[name]:value}))
           setMessage({...message, status:false})
    }
    const userLoginHandler = (e)=>{
           var name = e.target.name
           var value = e.target.value
           setUserLogin((values)=>({...values,[name]:value}))
           setMessage({...message, status:false})
    }
    const forgotPassHandler = (e)=>{
           var name = e.target.name
           var value = e.target.value
           setForgotPass ((values)=>({...values,[name]:value}))
           setMessage({...message, status:false})
        
    }
    // console.log(forgotPass)
    const forgotHandler = ()=>{
             setForgotSwitch(true)
             setMessage({...message, status:false, color:"text-danger"})
             setForgotPass({})
    }
    const goBackHandler = ()=>{
        setForgotSwitch(false)
        setOtpHandler(false)
        setMessage({...message, status:false, color:"text-danger"})
        setForgotPass({})
    }
    //forgotformHandler
    //update Passwod Api
     const  changPasswordApi = async()=>{
         try {
             const result = await axios.put(`${config.URL_HOST}/users/fogot-pass`, forgotPass )
             if(result.status===200){
                setForgotSwitch(false)
                setIsLoading(false)
                setOtpHandler(false)
                setMessage({...message, status:false})
             }
         } catch (error) {
            console.log(error.response)
            setIsLoading(false)
            setMessage({...message, status:true, msg:error.response.data.msg, color:"text-danger"})
         }
     }
     const changePasswordHandler = ()=>{
        
       if((forgotPass.password.length<6)){
            setMessage({...message, status:true, msg:"password must be min 6 char!",color:"text-danger"})
        }
        else if(forgotPass.password !== forgotPass.cpassword){
            setMessage({...message, status:true, msg:"new password and confirm password aren't match!",color:"text-danger"})
        }
        else{
            setIsLoading(true)
            changPasswordApi()
        }
    }
    //sendMail Api
    const forgetPassApi = async ()=>{
        try {
            const result = await axios.post(`${config.URL_HOST}/users/email-send`,forgotPass)
            console.log(result)
            if(result.status===200){
                setIsLoading(false)
                setOtpHandler({...otpHandler, status:true})
                setMessage({...message, status:true, msg:result.data.msg, color:"text-success"})
            }
        } catch (error) {
            console.log(error.response)
            setIsLoading(false)
            setMessage({...message, status:true, msg:error.response.data.msg})
        }
    }
    const sendOtpHandler = (e)=>{
        setIsLoading(true)
        forgetPassApi()

    }

   
    const forgotFormHandler =(e)=>{
        e.preventDefault()
        setMessage({...message, status:true,  color:"text-danger"})
    }

    //LoginFormSubmit
    const loginBtn = async (e)=>{
        setIsLoading(true)
        e.preventDefault()
         try {
             const result = await axios.post(`${config.URL_HOST}/user/login`,userLogin)
             setIsLoading(false)
                   if(result.data.user.user_type==="Super_Admin"){
                    setMessage({...message, status:true, msg:"user doesn't exists!"})
                   }else{
                       window.localStorage.setItem("jwt-normal-user", JSON.stringify(result.data))
                    //    window.location.pathname("http://localhost:3000/contact")
                     Navigate("/")
                       
                   }
         } catch (error) {
            setIsLoading(false)
             console.log(error.response)
             setMessage({...message, status:true, msg:error.response.data.msg, color:"text-danger"})
         }
    }
    //registerFormSubmit
    const registerBtn = async (e)=>{
        e.preventDefault()
        if(register.password===register.cpassword){
              //user registration start
              delete register.cpassword
                  try {
                        const result = await axios.post(`${config.URL_HOST}/user/create`,register)
                        console.log(result)
                        if(result.status===200){
                            setSwitchForm(true)
                            setRegister({})
                        }
                    } catch (error) {
                         console.log(error.response)
                         setMessage({...message, status:true, msg:error.response.data.msg, color:"text-danger"})
                    }
        }else{
            setMessage({...message, status:true, msg:"confirm password and password doesn't match", color:"text-danger"})
        }
    
    }
    const signHandler = ()=>{
          setSwitchForm(true)
    }
    const registerHandler = ()=>{
          setSwitchForm(false)
    }
   
  return (
 <>
   {isLoading &&  <Loader />}
    <Layout >
     <div className='page-section'>
        <div className="container">
            <div className="w-50 mx-auto bg-white p-4 rounded shadow-sm wow zoomIn">
                <h5 className="text-center fs-5 fw-normal" id="exampleModalLabel">{forgotSwitch?"Forgot Password":switchForm?`Login User`:`Register User`}</h5>
                      {
                          //dynamic form handler
                           switchForm?(<>
                                        {forgotSwitch ? ( 
                                        // forgotpass form 
                                        <form action="" onSubmit={forgotFormHandler}>
                                         <div className="mb-3">
                                            <label  className="form-label">Email address <span className='text-danger'>*</span></label>
                                            <input required type="email" name='email' value={forgotPass.email || ""} onChange={forgotPassHandler}  className="form-control"  />  
                                         </div>

                                         {/* otp Handler logic */}
                                         {otpHandler.status && ( 
                                         <div className="mb-3">
                                            <label  className="form-label">OTP <span className='text-danger'>*</span></label>
                                            <label  className="form-label mx-2"> </label>
                                            <input required type="text"  maxLength="6" name='otp' value={forgotPass.otp || ""} onChange={forgotPassHandler} className="form-control"  />  
                                         </div>)}

                                         <div id="emailHelp" className={`form-text ${message.color} mb-3`}>{message.status===true && message.msg}</div>
                                            {
                                                otpHandler.status ?(
                                                <>
                                                <div className="mb-3">
                                                    <label  className="form-label">New Password <span className='text-danger'>*</span></label>
                                                    <input required type="password" name="password" value={forgotPass.password || ""} onChange={forgotPassHandler}  className="form-control"  />
                                                </div>
                                                <div className="mb-3">
                                                    <label  className="form-label">Confirm Password <span className='text-danger'>*</span></label>
                                                    <input required type="password" name="cpassword" value={forgotPass.cpassword || ""} onChange={forgotPassHandler}  className="form-control"  />
                                                </div>
                                                 <button type="submit" className="btn btn-primary btn-sm m-2 fs-5" onClick={changePasswordHandler} >Submit</button>
                                                 <button type="submit" className="btn btn-primary btn-sm m-2 fs-5" onClick={changePasswordHandler} >Resend OTP</button>

                                                </>)
                                                :(<button type="submit" className="btn btn-primary btn-sm fs-5" onClick={sendOtpHandler} >Send Otp</button>)
                                            } 
                                         
                                            <button type="submit" className="btn btn-danger btn-sm m-2 fs-5"  onClick={goBackHandler}>Go Back</button>
                                         </form>): (    
                                         <form onSubmit={loginBtn}>
                                            {/* Login FOrm  */}
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address <span className='text-danger'>*</span></label>
                                                    <input type="email" name='email' value={userLogin.email || ""} onChange={userLoginHandler}   className="form-control"  />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputPassword1" className="form-label">Password <span className='text-danger'>*</span></label>
                                                    <input type="password" name="password" value={userLogin.password || ""} onChange={userLoginHandler}  className="form-control"  />
                                                </div>
                                                <div id="emailHelp" className="form-text text-danger mb-3">{message.status===true && message.msg}</div>
                                                <button type="submit" className="btn btn-primary w-100 fs-5">LOGIN</button>
                                                <div className="my-3 form-check d-flex justify-content-between">
                                                    <div>
                                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                        <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
                                                    </div>
                                                    <strong className='fw-normal text-success user_switch_btn' onClick={forgotHandler}>Forgot Password?</strong>
                                                </div>
                                                <div className="register-switch my-3 text-center border-1  border-top pt-3">
                                                    <span className='fw-normal'>Not a member yet? <strong className='fw-normal text-success user_switch_btn' onClick={registerHandler}>Register Now</strong> </span>
                                                </div>
                                            </form>)}
                                            </>
                                        )
                                      :(<form onSubmit={registerBtn}>
                                          {/* Register Form  */}
                                          <div className="mb-3">
                                              <label htmlFor="fname" className="form-label">First Name <span className='text-danger'>*</span></label>
                                              <input name='fname' value={register.fname || ""} onChange={userRegisterHandler} type="text" className="form-control"  />
                                          </div>
                                          <div className="mb-3">
                                              <label htmlFor="lname" className="form-label">Last Name <span className='text-danger'>*</span></label>
                                              <input name='lname' value={register.lname || ""} onChange={userRegisterHandler} type="text" className="form-control"  />
                                          </div>
                                          <div className="mb-3">
                                              <label htmlFor="exampleInputEmail1" className="form-label">Email address <span className='text-danger'>*</span></label>
                                              <input name='email' value={register.email || ""} onChange={userRegisterHandler} type="email" className="form-control"  />
                                          </div>
                                          <div className="mb-3">
                                              <label htmlFor="mobile" className="form-label"> Mobile <span className='text-danger'>*</span></label>
                                              <input name='mobile' value={register.mobile || ""} onChange={userRegisterHandler} type="number" className="form-control"  />
                                          </div>
                                          <div className="mb-3">
                                              <label htmlFor="exampleInputPassword1" className="form-label">Password <span className='text-danger'>*</span></label>
                                              <input name='password' value={register.password || "" } onChange={userRegisterHandler} type="password" className="form-control"  />
                                          </div>
                                          <div className="mb-3">
                                              <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password <span className='text-danger'>*</span></label>
                                              <input name='cpassword' value={register.cpassword || ""} onChange={userRegisterHandler} type="password" className="form-control"  />
                                          </div>
                                          <div id="emailHelp" className="form-text text-danger mb-3">{message.status===true && message.msg}</div>
                                          <button type="submit" className="btn btn-primary w-100 fs-5">REGISTER</button>
                                          <div className="register-switch my-3 text-center">
                                              <span className='fw-normal'>Already a member?<strong className='fw-normal text-success user_switch_btn' onClick={signHandler}>Sign In</strong> </span>
                                          </div>
                                      </form>)
                      }
            </div>
        </div>
    </div>
    </Layout >
</>
   
  )
}
