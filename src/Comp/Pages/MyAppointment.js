import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom'
import Layout from "../Common/Layout"
import { jsPDF } from "jspdf";
const config = require("../../config.json")
export default function MyAppointment() {
//State Area
    const [myAppointments, setMyAppointments] = useState({
        data:[],
        meta:{
            pageCount:""
        }
    })
    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const Navgate = useNavigate()
    //useEffcet calling for appointments
    useEffect(()=>{
        if(!window.localStorage.getItem("jwt-normal-user")){
          Navgate("/")
        }
        else{
            
          myAppointApi()

        }
    },[Navgate])

//Function Area
    const myAppointApi= async(page)=>{
        const id = JSON.parse(window.localStorage.getItem("jwt-normal-user"))
        try {
            const result = await axios.get(`${config.URL_HOST}/appointment/${id.user._id}?page=${page}&size=5`,{
                headers:{
                    'authorization':`Bearer ${id.token}`
                }
            })
      setMyAppointments(result.data)
        } catch (error) {
            console.log(error.response)
        }
    }
    const handlePageClick = (data)=>{
         myAppointApi(data.selected+1)
    }
 //pdf save handler
    const pdfSaveHandler = ()=>{
        const doc = new jsPDF();
        doc.setTextColor('#96C93D') ;
        doc.text("Giri", 90, 20);
        doc.setTextColor('#000');
        doc.text("-Health", 99, 20);
        doc.setTextColor('#354517');
        doc.text(`${JSON.parse(window.localStorage.getItem("jwt-normal-user")).user.fname}`, 99, 40);
        doc.save("a4.pdf");
    }
  return (
    <>
      <Layout>
          <div className="container my-md-5 my-4">
              <div className="row">
              
                <div className="col-12 ">
                <h2 className='bg-white p-2 px-3 '>My Appointment List</h2>
          <div className="table-box">
            <table className="table">
              <thead>
                <tr>
                  <th>Appointment _id</th>
                  <th>Category</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                  <th>Appointment Day</th>
                  <th> Status</th>
                  <th>Download</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              <tbody>
                   {
                       myAppointments.length===0? null :(
                           myAppointments.data.map(myAppoint=>{
                               const {_id, query_category, time,date} = myAppoint
                            
                               var day = new Date(date).getDay()
                                
                               return(
                                   <tr key={_id}>
                                       <td>{_id}</td>
                                       <td>{query_category}</td>
                                       <td>{date.slice(0,10)}</td>
                                       <td>{time}</td>
                                       <td>{daysInWeek[day]}</td>
                                       <td >Pending</td>
                                       <td className='text-center '> 
                                       <div className="warning-res text-white rounded  w-75 p-1 px-3 d-flex text-center align-items-center justify-content-center" onClick={pdfSaveHandler} style={{fontSize:"10px", cursor:"pointer"}}>
                                       <span class="material-icons-sharp me-1" style={{fontSize:"10px"}}>description</span><span>PDF</span>
                                       </div>
                                      </td>
                                       <td className='text-center '> 
                                       <div className="bg-danger rounded text-white w-75 p-1 px-3 d-flex text-center align-items-center justify-content-center" style={{fontSize:"10px", cursor:"pointer"}}>
                                       <span class="material-icons-sharp me-1" style={{fontSize:"15px"}}>close</span>
                                       </div>
                                      </td>
                                      
                                   </tr>
                               )
                           })
                       )
                   }
              </tbody>
            </table>
            <ReactPaginate 
                 previousLabel="< previous"
                 nextLabel="next >"
                 breakLabel="..."
                 pageCount={myAppointments.meta.pageCount}  
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
          </div>
      </Layout>
    </>
  )
}
