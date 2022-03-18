import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { specialist as specCat } from '../../../jsonData/specialist'
import Loader from '../../../Loader';
const config = require("../../../config.json")
export default function DoctorEditView({Data}) {
//state area ,
const [readOnly, setReadOnly] = useState(true)
const [update, setUpadte] = useState({})
const [isLoading, setIsLoading] = useState(false)
const updateHandler = (e)=>{
  var name = e.target.name
  var value = e.target.value
  !readOnly && setUpadte({...update,[name]:value})
}

 //destructure to the data
 var {_id,fname, lname, active, country, email, gender, specialist, state,  mobile} = Data.data;

//function Area
 //activehandler
 const readHandler = ()=>{

  setReadOnly(readOnly?false:true)
 }
// doctor update handler 
const doctorUpdateSubmit = async (e)=>{
  e.preventDefault()
  setIsLoading(true)
  var jwt = JSON.parse(localStorage.getItem("jwt-token"))
  var data = {fname:update.fname || fname, lname:update.lname || lname, specialist:update.specialist || specialist, email: update.email || email,  mobile:update.mobile || mobile, active: active}
   try {
      const result = await axios.put(`${config.URL_HOST}/doctor/${_id}`, data, {
        headers:{
          'authorization':`Bearer ${jwt.token}` ,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        }
      } )
      console.log(result)
      if(result.status===200){
        setIsLoading(false)
        Swal.fire(
          'Good job!',
          result.data,
          'success'
        )
        setTimeout(()=>{
      window.location.reload()
        },2000)
      }
   } catch (error) {
     setIsLoading(false)
     console.log(error.response)
   }
}
  return (
  <div className="modal  fade" id="view_doctor" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    {isLoading&&<Loader/>}
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header border-0">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body border-0">
           {/* view doctor modal start  */}
          <div className="container rounded bg-white mt-5">
            <div className="row">
                <div className="col-md-4 border-right">
                  <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src="https://i.imgur.com/0eg0aG0.jpg" width={90} />
                    <span className="font-weight-bold">{fname} {lname}</span><span className="text-black-50">{email}</span>
                    <span><span className="material-icons-sharp text-primary" style={{fontSize:"12px"}}>location_on</span>{state},{country}</span>
                  </div>
                </div>
                <div className="col-md-8">
                 <form onSubmit={doctorUpdateSubmit}>
                 <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className='bg-info text-white shadow-sm p-1 px-2'>Id: {_id}</h3>
                      <span className={`btn btn-sm btn-dark ${!readOnly && "disabled"}`} onClick={readHandler} >Edit Profile</span>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6"><input name="fname"  onChange={updateHandler} required  readOnly={readOnly} type="text" className="form-control" placeholder="first name" defaultValue={fname} /></div>
                      <div className="col-md-6"><input name="lname" onChange={updateHandler} required readOnly={readOnly} type="text" className="form-control" defaultValue={lname} placeholder="last name" /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6"><input required name="mobile" onChange={updateHandler} readOnly={readOnly} type="text" className="form-control" placeholder="Mobile" defaultValue={mobile} /></div>
                      <div className="col-md-6"><input required  readOnly type="text" className="form-control" defaultValue={gender}  /></div>
                    </div>
                    <div className="row mt-3 align-items-center">
                    <div className="col-md-6"><input required name="email" onChange={updateHandler} readOnly={readOnly} type="email" className="form-control" placeholder="Email" defaultValue={email} /></div>
                      <div className="col-md-6">
                       <select name="specialist"  value={ update.specialist || specialist}  onChange={updateHandler} readOnly={readOnly} className='form-control'>
                          {
                            specCat.map((spec, index)=>{
                              return(
                                <option key={index} value={spec}>{spec}</option>
                              )
                            })
                          }
                       </select>  
                      </div>
                    </div>
                    {!readOnly && <div className="mt-5 text-right">
                      <span className='btn btn-warning m-1' onClick={()=>setReadOnly(true)}>Go Back</span>
                      <button className="btn btn-primary m-1 profile-button"type="submit">Save Profile</button>
                      </div>}
                  </div> 
                  </form>
                </div>
              </div>
            </div>

      </div>

    </div>
  </div>
</div>

  )
}
