import React, { useState, useEffect } from 'react'
import Layout from '../Common/Layout'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { specialist } from '../../jsonData/specialist';
import Swal from 'sweetalert2';
import Loader from '../../Loader';
const config = require("../../config.json")


export default function DocorLoginRegister() {
  //state area 
      const [country, setCountry] = useState({country:"",region:""})
      const [user, setUser] = useState({})
      const [doctorLogin, setDoctorLogin] = useState({})
      const [message, setMessage] = useState({status:false, msg:"", color:"text-danger"})
      const [switchForm, setSwitchForm] = useState(false)
      const [isLoading, setIsLoading] = useState(false)
    //useNavigate
    const Navigate = useNavigate()
    //useEffect 
     
    useEffect(()=>{
        if(window.localStorage.getItem("doctor-login")){
          Navigate("/doctor/dashboard")
        }
    },[Navigate])
  //function area
      const userDataHandler = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setUser(values=>({...values, [name]:value}))
        setMessage({...message,status:false,color:"text-danger"})
      }
      //doctor login
      const doctoLoginDataHandler = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setDoctorLogin(values=>({...values, [name]:value}))
        setMessage({...message,status:false,color:"text-danger"})
      }
      //doctor login api
       const doctorLoginApi = async ()=>{
         try {
          setIsLoading(true)
           const result = await axios.post(`${config.URL_HOST}/user/doctor-login`, doctorLogin)
           if(result.status===200){
            setIsLoading(false)
             window.localStorage.setItem("doctor-login", JSON.stringify(result.data))
             Navigate("/doctor/dashboard")
           }
         } catch (error) {
           setIsLoading(false)
           console.log(error.response)
           setMessage({...message, status:true, msg:error.response.data.msg, color:"text-danger"})
         }
       }
      //doctor Login btn
        const DoctorloginBtn = (e)=>{
          e.preventDefault()
          doctorLoginApi()
        }
    //doctor create api 
      const doctorCreateApi = async ()=>{
        try {
          setIsLoading(true)
          const result = await axios.post(`${config.URL_HOST}/user/doctor`,{...user, country:country.country,state:country.region })
          if(result.status===200){
            setIsLoading(false)
            Swal.fire(
              'Good job!',
              `${result.data.msg}`,
              'success'
            )
            setUser({})
            setSwitchForm(false)
          }
        } catch (error) {
          setIsLoading(false)
          console.log(error.response)
          setMessage({...message,status:true, msg: error.response.data.msg ,color:"text-danger"})
        }
      }
    //doctor registerForm Submit Handler
     const doctorRegisterHandler = (e)=>{
       e.preventDefault()
       doctorCreateApi()
     }
  
    //doctor Frogot handler
     const forgotHandler = ()=>{
          // setSwitchForm(true)
     }
    //doctor switchForm handler
     const registerHandler = ()=>{
            if(switchForm){
              setSwitchForm(false)
            }
            else{
              setSwitchForm(true)
            }
     }
  return (
     <>
        {isLoading &&  <Loader />}
       <Layout>
           <div className="container my-md-5 my-4">
             <div className={` p-4 wow fadeInUp ${switchForm&& "bg-white shadow"} `}>
               {!switchForm ? (

                  <div className='w-50 mx-auto shadow bg-white  p-4 my_form'>  
                   <h5 className="text-center fs-5 fw-normal">Login Doctor</h5>
                     {/* Doctor Login  */}
                      <form onSubmit={DoctorloginBtn}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address <span className='text-danger'>*</span></label>
                            <input type="email" name='email' value={doctorLogin.email || ""} onChange={doctoLoginDataHandler}   className="form-control"  />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password <span className='text-danger'>*</span></label>
                            <input type="password" name="password" value={doctorLogin.password || ""} onChange={doctoLoginDataHandler}  className="form-control"  />
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
                    </form>
                  </div>
                ):
                  <>
                    {/* doctor Registeration  */}
                    <form action="" onSubmit={doctorRegisterHandler}>
                      <div className="row mx-2 ">
                          <h2 className='bg-white p-2 px-3  fs-5 fw-normal'>Doctor Registration</h2>
                          <div className="col-12 col-md-6 my-2">
                              <label htmlFor="fname">First Name <span className='text-danger'>*</span></label>
                              <input required type="text" name='fname' value={user.fname || ""} onChange={userDataHandler} className='form-control' />
                          </div>
                          <div className="col-12 col-md-6 my-2">
                              <label htmlFor="lname">Last Name <span className='text-danger'>*</span></label>
                              <input required type="text" name='lname'  value={user.lname || ""} onChange={userDataHandler} className='form-control' />
                          </div>
                          <div className="col-12 col-md-6 my-2">
                              <label htmlFor="username">Username <span className='text-danger'>*</span></label>
                              <input required type="text" name='username'  value={user.username || ""} onChange={userDataHandler} className='form-control' />
                          </div>
                          <div className="col-12 col-md-6 my-2">
                              <label htmlFor="username">Password <span className='text-danger'>*</span></label>
                              <input required type="password" name='password'  value={user.password || ""} onChange={userDataHandler} className='form-control' />
                          </div>
                          <div className="col-12 col-md-6 my-2">
                              <label htmlFor="email">Email Id <span className='text-danger'>*</span></label>
                              <input required type="email" name='email'  value={user.email || ""} onChange={userDataHandler} className='form-control' />
                          </div>
                          <div className="col-12 col-md-6 my-2">
                              <label htmlFor="email">Mobile No <span className='text-danger'>*</span></label>
                              <input required type="number" name='mobile'  value={user.mobile || ""} onChange={userDataHandler} className='form-control' />
                          </div>
                          <div className="col-12 col-md-6 my-2">
                              <label htmlFor="specialist">Specialist in <span className='text-danger'>*</span></label>
                              <select required name="specialist"  value={user.specialist || ""} onChange={userDataHandler} className='form-control' >
                              <option value="">Please Select a Specialist:</option>
                                {
                                  specialist.map((data,index)=>{
                                    return(
                                      <option value={data} key={index}>{data}</option>
                                    )
                                  })
                                }
                              </select>
                          </div>
                          <div className="col-12 col-md-6 my-2">
                              <label htmlFor="gender">Gender <span className='text-danger'>*</span></label>
                              <select required name="gender"  value={user.gender || ""} onChange={userDataHandler} className='form-control' >
                              <option value="">Please a Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                          </div>
                          <div className="col-12 col-md-6 my-2">
                          <label htmlFor="gender">Country <span className='text-danger'>*</span></label>
                              <CountryDropdown
                                className="form-control"
                                value={country.country}
                                required
                                onChange={(val) => setCountry({...country, country:val})} />
                          </div>
                          <div className="col-12 col-md-6 my-2">
                          <label htmlFor="gender">State <span className='text-danger'>*</span></label>
                          <RegionDropdown
                            required
                            className="form-control"
                              country={country.country}
                              value={country.region}
                              onChange={(val) => setCountry({...country, region:val})}  />
                          </div>
                          <div id="emailHelp" className="form-text text-danger text-center">{message.status===true && message.msg}</div>
                          <button className='btn  w-50 mx-auto my-3  btn-primary' type='submit'>Register</button>
                          <div className="register-switch my-3 text-center border-1  border-top pt-3">
                              <span className='fw-normal'>Already a member?<strong className='fw-normal text-success user_switch_btn' onClick={registerHandler}>Sign In</strong> </span>
                          </div>
                      </div>
                    </form>
                  </>
               }
             </div>
           </div>
       </Layout>
     </>
  )
}
