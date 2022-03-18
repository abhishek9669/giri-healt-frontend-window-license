import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader';
import DoctorWelcome from '../Common/DoctorWelcome';
const config = require("../../config.json")
export default function AdminAppointment() {
  //State Area 
    const [isLoading, setIsLoading] = useState(false)
    const [appointmentData, setAppointmentData] = useState({
      "data":[],
      "meta":{
        pageCount:""
      }
    });

    const Navigate = useNavigate()
    // const [page, setPage] = useState(1)
    useEffect(() => {
      if(!window.localStorage.getItem("doctor-login")){
        Navigate("/")
      }else{
        doctorPatient()
      }
    }, [ Navigate]);
    
 // Function Area
   
   //api Calling Appointment
   const doctorPatient = async (page=1)=>{
     var jwt = JSON.parse(localStorage.getItem("doctor-login"))
     try {
      setIsLoading(true)
       const result = await axios.get(`${config.URL_HOST}/appointment/find/${jwt.user.fname} ${jwt.user.lname}?page=${page}`,{
         headers:{
            'authorization':`Bearer ${jwt.token}` ,
               'Accept' : 'application/json',
               'Content-Type': 'application/json'
         }
       })
       setAppointmentData(result.data)
       setIsLoading(false)
      //  setUserInfo(jwt)
     } catch (error) { 
       console.log(error.response)
     }
   }

 //pagination
  const handlePageClick = (data)=>{
    doctorPatient(data.selected+1)
  }
// delete appointment
  const statusHandler = async (e)=>{
    var row = e.target.closest("tr")
    var id = e.target.closest("tr").querySelector("td:first-child span").innerHTML
    var statusCon = e.target.closest("tr").querySelector("td:nth-child(7) span")
        statusCon.innerHTML=e.target.value
        if(statusCon.innerHTML==="Success"){
          statusCon.setAttribute("class", "text-primary")
        }
        if(statusCon.innerHTML==="Pending"){
          statusCon.setAttribute("class", "text-danger")
        }
        if(statusCon.innerHTML==="Inprogress"){
          statusCon.setAttribute("class", "text-info")
        }
    try {
      var jwt = JSON.parse(localStorage.getItem("doctor-login"))
      await axios.put(`${config.URL_HOST}/appointment/${id}`,{status:e.target.value},{
        headers:{
          'authorization':`Bearer ${jwt.token}` ,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
        console.log(error.response)
    }
  }
  return (
    <>
    {isLoading && <Loader/>}
    <DoctorWelcome >
      <div className="row">
        <h2>Appointments</h2>
        <div className="col-12 ">
          <div className="table-box">
            <table className="table">
              <thead>
                <tr>
                  <th>Appointment _id</th>
                  <th>Patient</th>
                  <th>Query</th>
                  <th>Appointment</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointmentData.data.length === 0
                  ? null
                  : appointmentData.data.map((appointData) => {
                    const {_id, date, email, mobile, name, query_category,  time, status} = appointData
                    var date2 = date.slice(0,10).split("-")
                        date2 = new Date(date2).toString().split(" ").slice(1,4)
                        date2 = date2.toString().replace(/,/g, " ")
                      return (
                        <tr key={_id}>
                          <td>
                            <span className="user-select-all" >
                              {_id}
                            </span>
                
                          </td>
                          <td>
                            <div className="user-info">
                              <div className="user-info__img">
                                <h3 className="mb-0">{name}</h3>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h3 className="mb-0">
                              {query_category}
                            </h3>
                          </td>
                          <td>
                            <h3 className="mb-0">{date2}</h3>
                            <span className="mb-0 my-1 text-info">{time}</span>
                          </td>
                          <td>
                            <h3 className="mb-0">{mobile}</h3>
                          </td>
                          <td>
                            <h3 className="mb-0">{email}</h3>
                          </td>
                          <td>
                            <span className={status==="Pending"?"text-danger":status==="Inprogress"?"text-info":"text-primary"}>
                              {status}
                            </span>
                          </td>
                          <td>
                            <select onChange={statusHandler}  className='form-control update_status'>
                              <option value="">Update Status</option>
                              <option value="Pending">Pending</option>
                              <option value="Inprogress">Inprogress</option>
                              <option value="Success">Success</option>
                            </select>
                          </td>
                        </tr>
                      );
                    }
                ) }
              </tbody>
            </table>
                <ReactPaginate 
                 previousLabel="< previous"
                 nextLabel="next >"
                 breakLabel="..."
                 pageCount={appointmentData.meta.pageCount}
                 marginPageDisplayed={1}
                 pageRangeDisplayed={3}
                 onPageChange={handlePageClick}
                 containerClassName={'pagination d-flex justify-content-center'}
                 pageClassName={'page-item'}
                 pageLinkClassName={'page-link mx-1'}
                 previousClassName={'page-item'}
                 previousLinkClassName={'page-link mx-1'}
                 nextClassName={"page-item"}
                 nextLinkClassName={'page-link mx-1'}
                 activeClassName={"page-item active"}
                 activeLinkClassName={'page-link'}
                 breakClassName={'page-item'}
                 breakLinkClassName={'page-link mx-1'}
                 disabledClassName={'page-item cursor-disbled'}
                 disabledLinkClassName={'page-item'}
                />
          </div>
        </div>
      </div>
    </DoctorWelcome>
  </>
  )
}
