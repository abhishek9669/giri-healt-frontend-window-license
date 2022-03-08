import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom'
import Layout from "../Common/Layout"
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import Loader from '../../Loader'
const config = require("../../config.json")
export default function MyAppointment() {
//State Area
    const [isLoading, setIsLoading] =useState(false)
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
 //myappointment data show
    const myAppointApi= async(page=1)=>{
      setIsLoading(true)
        const id = JSON.parse(window.localStorage.getItem("jwt-normal-user"))
        try {
            const result = await axios.get(`${config.URL_HOST}/appointment/${id.user._id}?page=${page}&size=5`,{
                headers:{
                    'authorization':`Bearer ${id.token}`
                }
            })
          setMyAppointments(result.data)
          setIsLoading(false)
        } catch (error) {
            console.log(error.response)
            setIsLoading(false)
        }
    }

 //page Handler
    const handlePageClick = (data)=>{
         myAppointApi(data.selected+1)
    }
 //pdf save handler
    const pdfSaveHandler = (e)=>{
      function getTrInfo(child){
       return e.target.closest("tr").querySelector(`td:nth-child(${child})`).innerHTML
      }
      var {fname, mobile, lname, email} = JSON.parse(window.localStorage.getItem("jwt-normal-user")).user
      const doc = new jsPDF()
      doc.setTextColor('#96C93D');
      doc.text("Giri", 90, 10);

      doc.setTextColor(100);
      doc.text("-Health", 100, 10);

      doc.setFont("helvetica", "bold");
      doc.text("Name:", 20, 20);

      doc.setFont("times", "normal");
      doc.text(`${fname} ${lname}`, 40, 20);

      doc.setFont("helvetica", "bold");
      doc.text("Email:", 20, 30);

      doc.setFont("times", "normal");
      doc.text(`${email}`, 40, 30);

      doc.setFont("helvetica", "bold");
      doc.text("Mobile:", 20, 40);

      doc.setFont("times", "normal");
      doc.text(`${mobile}`, 40, 40);

        doc.autoTable({
          margin: { top: 50 },
        head: [['Appointment _id', "Doctor Name", "Category", 'Time','Date','Day',"Status"]],
        body: [
          [getTrInfo(1),getTrInfo(2), getTrInfo(3),getTrInfo(4), getTrInfo(5),getTrInfo(6),getTrInfo(7)]
          // ...
        ],
      })
      doc.save('table.pdf')
    }
  return (
    <>  
     {isLoading && <Loader/>}
      <Layout>
          <div className="container my-md-5 my-4">
            <div className="row">
              <div className="col-12 ">
                <h2 className='bg-white p-2 px-3 '>My Appointment List</h2>
                <div className="table-box">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th>Appointment _id</th>
                        <th>Doctor Name</th>
                        <th>Category</th>
                        <th> Date</th>
                        <th> Time</th>
                        <th> Day</th>
                        <th> Status</th>
                        <th>Download</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            myAppointments.length===0? null :(
                                myAppointments.data.map(myAppoint=>{
                                    const {_id, query_category, time,date, doctor_name} = myAppoint
                                    var day = new Date(date).getDay()
                                    return(
                                        <tr key={_id} id="row_delete">
                                            <td>{_id}</td>
                                            <td>{doctor_name}</td>
                                            <td>{query_category}</td>
                                            <td>{date.slice(0,10)}</td>
                                            <td>{time}</td>
                                            <td>{daysInWeek[day]}</td>
                                            <td >Pending</td>
                                            <td className='text-center '> 
                                            <div className="warning-res text-white rounded  w-75 p-1 px-3 d-flex text-center align-items-center justify-content-center" onClick={pdfSaveHandler} style={{fontSize:"10px", cursor:"pointer"}}>
                                            <span className="material-icons-sharp me-1" style={{fontSize:"10px"}}>description</span><span>PDF</span>
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
