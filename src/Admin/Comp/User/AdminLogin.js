import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const config = require("../../../config.json")
export default function AdminLogin() {
//state area 
    const [forgotPass, setForgotPass] = useState(false)
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState({status:false, msg:""})
    const Navigate = useNavigate()

    useEffect(()=>{
     if(window.localStorage.getItem("jwt-token")){
         Navigate("/admin/dashboard")
     }
    },[Navigate])
//function area
    const forgotPassHandler = ()=>{
        setForgotPass(true) 
    }
    const goBackHandler = ()=>{
        setForgotPass(false)
    }

    //Handling user data
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        setMessage({...message, status:false})
      }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //caling user
        console.log(inputs)
            try {
                const result = await axios.post(`${config.URL_HOST}/user/login`,{email:inputs.email, password:inputs.password})
                if(result.data.user.user_type!=="normal_user"){
                    window.localStorage.setItem("jwt-token", JSON.stringify(result.data))
                    //creating dynamic routes and secure to them
                    Navigate("/admin/dashboard")
                }else{
                    Navigate("/admin")
                    setMessage({...message, status:true,msg:"user doesn't exist!"})
                }

            } catch (error) {
                console.log(error.response.data)
                setMessage({...message, status:true,msg:error.response.data.msg})
            }
     }
    
  return (
       <div className="container">
           <div className="admin_form d-flex justify-content-center align-items-center ">
            {
                !forgotPass?(
                    <form className=' mx-auto text-center bg-white shadow p-4 rounded-3' onSubmit={handleSubmit}>
                        <Link className="navbar-brand " to="/admin"><span className="text-primary">Giri</span><span className='text-dark'>-Health</span></Link>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input required type="email" name='email' value={inputs.email || ""} onChange={handleChange} className="form-control"  />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input required type="password" name='password' value={inputs.password || ""} onChange={handleChange} className="form-control" />
                        </div>
                        <div id="emailHelp" className="form-text text-start mb-2 text-danger">{message.status===true&&message.msg}</div>
                        <button type="submit" className="btn btn-primary w-100">LOGIN</button>
                        <div className="my-3 text-center">
                            <span className='fw-normal'>Forgot Password? <strong className='fw-normal text-success user_switch_btn' onClick={forgotPassHandler}>Click here</strong> </span>
                        </div>
                    </form>
                ) :(  <form className=' mx-auto text-center bg-white shadow p-4 rounded-3'>
                                <Link className="navbar-brand " to="/admin"><span className="text-primary">Giri</span><span className='text-dark'>-Health</span></Link>
                                <div className="mb-3 text-start">
                                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                                    <input required type="email" className="form-control"  />
                                </div>
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                <button type="submit" className="btn btn-primary w-100">SUBMIT</button>
                                <div className="my-3 text-center">
                            <span className='fw-normal'>Go Back? <strong className='fw-normal text-success user_switch_btn' onClick={goBackHandler}>Signin</strong> </span>
                        </div>
                      </form>)
            }
           </div>
        </div>
  )
}
