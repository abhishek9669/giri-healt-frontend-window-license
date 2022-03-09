import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../Loader';
import Welcome from '../Common/Welcome';
import Swal from 'sweetalert2'
const config = require("../../../config.json")

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
    const [page, setPage] = useState(1)
    useEffect(() => {
      if(!window.localStorage.getItem("jwt-token")){
        Navigate("/admin")
      }else{
        AppointmentApi();
      }
    }, [ Navigate]);
    
 // Function Area
    const AppointmentApi = async (pageno=1) => {
       setIsLoading(true)
        try {
          const result = await axios.get(`${config.URL_HOST}/appointment?page=${pageno}&size=5`, {
            headers: {
              'authorization':"Bearer"+ " " + JSON.parse(window.localStorage.getItem("jwt-token")).token ,
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
            }
          });
          setAppointmentData(result.data);
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
        }
      };
    
    //appointment Delete
    const appointmentDelete =  (id, row)=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete appointment!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#96C93D',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
       
        if (result.isConfirmed) {
          setIsLoading(true)
          try {
              await axios.delete(`${config.URL_HOST}/appointment/${id}`,{
              headers:{
               'authorization':"Bearer"+ " " + JSON.parse(window.localStorage.getItem("jwt-token")).token ,
               'Accept' : 'application/json',
               'Content-Type': 'application/json'
              }
            })
            console.log(result)
            row.remove()
            setIsLoading(false)
         } catch (error) {
           console.log(error.response)
           setIsLoading(false)
         }
          Swal.fire(
            'Deleted!',
            'Appointment has been deleted.',
            'success'
          )
        }
      })
    }
 //pagination
  const handlePageClick = (data)=>{
    AppointmentApi(data.selected+1)
  }
// delete appointment
  const clearHandler = (e)=>{
    var row = e.target.closest("tr")
    var id = e.target.closest("tr").querySelector("td:first-child span").innerHTML
    appointmentDelete(id, row)
  }
  return (
    <>
    {isLoading && <Loader/>}
    <Welcome >
      <div className="row">
        <h2>Appointments</h2>
        <div className="col-12 ">
          <div className="table-box">
            <table className="table">
              <thead>
                <tr>
                  <th>Appointment _id</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Query</th>
                  <th>Appointment</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointmentData.data.length === 0
                  ? null
                  : appointmentData.data.map((appointData) => {
                    const {_id, date, email, mobile, name, query_category, status, time, doctor_name} = appointData
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
                            <div className="user-info">
                              <div className="user-info__img">
                                <h3 className="mb-0">{doctor_name}</h3>
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
                          <td className={status==="Success"?"text-primary":status==="Pending"?"text-danger":"text-info"}>{status}</td>
                        </tr>
                      );
                    }
                ) }
              </tbody>
            </table>
                {/* <ul className="pagination  d-flex justify-content-center">
                  <li className="page-item" onClick={firstHandler}><a className="page-link mx-1" href="#">First</a></li>
                  <li className="page-item" onClick={prevHandler}><a className="page-link mx-1" href="#">Previous</a></li>
                  <li className="page-item"><a className="page-link mx-1" href="#">1</a></li>
                  <li className="page-item"><a className="page-link mx-1" href="#">2</a></li>
                  <li className="page-item"><a className="page-link mx-1" href="#">3</a></li>
                  <li className="page-item" onClick={nextHandler}><a className="page-link mx-1" href="#">Next</a></li>
                  <li className="page-item" onClick={lastHandler}><a className="page-link mx-1" href="#">Last</a></li>
                </ul> */}
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
    </Welcome>
  </>
  )
}
