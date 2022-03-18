import React,{useState, useEffect} from 'react'
import axios from "axios"
import Swal from 'sweetalert2'
import Loader from '../../Loader';
import { specialist as specialistCat } from '../../jsonData/specialist'
const config = require("../../config.json")
export default function DoctorProfile() {
//state area
  const [profileData, setProfileData] = useState({})
  const [ratio, setRatio] = useState({data:[]})
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState({data:[]})
    var userInf = {token:"", user:""}
    if(localStorage.getItem("doctor-login")){
        var data = JSON.parse(localStorage.getItem("doctor-login")) 
        userInf = {token:data.token,user:data.user}
    }
useEffect(()=>{
  doctorAppointRecord()
  doctorInfo()
},[])
//data destructuring 
  const {fname, lname, email, mobile, specialist} = userData.data
  //doctor get info
  const  doctorInfo = async ()=>{
    try {
       const result = await axios.get(`${config.URL_HOST}/doctor/${userInf.user._id}`,{
         headers:{
           'authorization':`Bearer ${userInf.token}`,
           'Accept':'application/json',
           'Content-Type':'application/json'
         }
       })
     setUserData({data:result.data})
    } catch (error) {
      console.log(error.response);
    }
  }
//profileHandler
const profileHandler = (e)=>{
   var name = e.target.name
   var value = e.target.value
   setProfileData({...profileData, [name]:value})
}
//toatl apoointmets Record
const doctorAppointRecord = async ()=>{
  try {
    const result = await axios.get(`${config.URL_HOST}/appointmentratio?fname=${userData.data.fname || userInf.user.fname}&lname=${userData.data.lname || userInf.user.lname}`,{
      headers:{
        'authorization':`Bearer ${userInf.token}`,
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    setRatio({data:result.data})
  } catch (error) {
    console.log(error.response)
  }
}
//filter for getting reacords
  const ratioReacord = (status) =>{
    var data = ratio.data.filter((ele)=>{
      if(ele.status===status){
        return ele 
      }
    })
    return data.length
  }
//update profile Handler
 const updateProfileHandler = async (e)=>{
   e.preventDefault()
   var data = {fname:profileData.fname || fname, lname:profileData.lname || lname, email:profileData.email || email, mobile:profileData.mobile || mobile , specialist:profileData.specialist || specialist}
  try {
    setIsLoading(true)
    const result = await axios.put(`${config.URL_HOST}/doctor/${userInf.user._id}`, data,{
      headers:{
        'authorization':`Bearer ${userInf.token}` ,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      }
    })
    if(result.status===200){
      setIsLoading(false)
      Swal.fire(
        'Good job!',
        result.data,
        'success'
      )
    }
  } catch (error) {
    setIsLoading(false)
    console.log(error.response);
  }
 }
  return (
 <>
  {isLoading && <Loader/>}
  <div className="modal fade" id="profile" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header border-0">
        <h3 className="modal-title" id="exampleModalLabel">Doctor Prifle</h3>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body">
         <form action="" onSubmit={updateProfileHandler}>
         <div className="row">
              <div className="col-md-4 col-12 d-flex flex-column align-items-center ">
                  <div className="profile-photo">
                      <div className="img">
                       <span className="material-icons-sharp">account_circle</span>
                       <input type="file" />
                       <span className="material-icons-sharp camera">photo_camera</span>
                      </div>
                  </div>
                  <div className="activity w-100 my-3">
                  <ul className="list-group">
                    <li className="list-group-item bg-light">Activity</li>
                    <li className="list-group-item fw-bold d-flex justify-content-between"><span>Appointments Success</span> <span className='fw-normal'>{ratioReacord("Success")}</span></li>
                    <li className="list-group-item fw-bold d-flex justify-content-between"><span>Appointments Pending</span> <span className='fw-normal'>{ratioReacord("Pending")}</span></li>
                    <li className="list-group-item fw-bold d-flex justify-content-between"><span>Appointments Inprogress</span> <span className='fw-normal'>{ratioReacord("Inprogress")}</span></li>
                  </ul>
                  </div>
              </div>
              <div className="col-md-8 ">
                 <div className="row">
                     <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="fname" className="form-label"><h3>First Name</h3></label>
                            <input type="text" name='fname' value={profileData.fname ||  fname} onChange={profileHandler} className="form-control" />
                        </div>
                     </div>
                     <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="lname" className="form-label"><h3>Last Name</h3></label>
                            <input type="text"  name='lname' value={profileData.lname || lname} onChange={profileHandler} className="form-control"   />
                        </div>
                     </div>
                     <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="mobile" className="form-label"><h3>Mobile</h3></label>
                            <input  name='mobile' value={profileData.mobile || mobile} onChange={profileHandler} type="number" className="form-control"  />
                        </div>
                     </div>
                     <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"><h3>Email</h3></label>
                            <input type="email"  name='email' value={profileData.email || email} onChange={profileHandler} className="form-control"  />
                        </div>
                     </div>
                     <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"><h3>Specialist</h3></label>
                            <select name="specialist"  value={profileData.specialist || specialist} onChange={profileHandler}  className='form-control'>
                                {specialistCat.map((data, index) =>{
                                     return(
                                        <option key={index} value={data}>{data}</option>
                                     )
                                })}
                               
                            </select>
                        </div>
                     </div>
                     <div className="col-12 col-md-7">
                     <button className='btn btn-sm btn-primary' type='submit'>Save</button>
                     </div>
                 </div>
              </div>
          </div>
         </form>
      </div>
    
    </div>
  </div>
</div>
   </>
  )
}
