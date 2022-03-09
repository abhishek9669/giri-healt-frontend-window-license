import axios from "axios";
import Swal from 'sweetalert2'
import { addDays } from "date-fns/esm";
import React, {  useEffect, useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import Layout from "../Common/Layout";
import { specialist } from "../../jsonData/specialist";
const config = require("../../config.json")
export default function Appoint() {
//state area
  const [value, onChange] = useState(new Date());
  const [time, setTime] = useState(false)
  const [warning, setWarning] = useState(false)
  const [category, setCategory] = useState("general")
  const [isLoading, setIsLoading] =useState(false)
  const [doctors, setDoctors] = useState({
    data:[]
  })
  const [slectDoc, setSelectDoc] = useState({data:[]})
  const [getDocDetails, setGetDocDetails] = useState("")
  const Navgate = useNavigate()
    useEffect(()=>{
        if(!window.localStorage.getItem("jwt-normal-user")){
          Navgate("/")
        }
        else{
           doctorApi()
        }
       
    },[Navgate])

//function area
  function convert(str) {
      var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-")
    }
  
  //doctorApi 
   const doctorApi = async () =>{
     try {
       const result = await axios.get(`${config.URL_HOST}/doctors`,{
         headers:{
           'authorization':`Bearer ${JSON.parse(window.localStorage.getItem("jwt-normal-user")).token}`
         }
       })
       if(result.status===200){
         setDoctors(result)
       }
     } catch (error) {
       console.log(error.response)
     }
   }
  const doctorsFilter = (specialist)=>{
    const result2 = doctors.data.filter(doc=>{
      return doc.specialist===specialist
    })
    setSelectDoc({data:result2})
    setGetDocDetails(`${result2[0].fname} ${result2[0].lname}`)
  }

 //category handler
 const categoryHandler = (e)=>{
   setCategory(e.target.value)
   doctorsFilter(e.target.value)
 }
  //dateagte  
  function getFullDate(value){
       var fullDate = value.toString()
       return fullDate.split(" ").slice(1,4).toString().replace(/,/g," ")
  }
  var day = {status:false, date:value.toString().split(" ")[0]}
      if(day.date==="Sun" || day.date==="Sat"){
         day = {status:true, msg:"Weekend Off"}
      }
//timebtnoti
  var timeBtn = [
    {time:"08:00"},
    {time:"09:00"},
    {time:"10:00"},
    {time:"11:00"},
    {time:"12:00"},
    {time:"14:00"},
    {time:"15:00"},
    {time:"16:00"},
    {time:"17:00"}
    ]
//timehandler
    const timeHandler = (e)=>{
      var  timeSet = Number(e.target.innerHTML.slice(0,2))<10?"0"+Number(e.target.innerHTML.slice(0,2)):Number(e.target.innerHTML.slice(0,2))
        setTime(timeSet)
        setWarning(false)
    }
//book Appointment
    const appointmentHandler =  (e)=>{
      e.preventDefault()
      if(!time){
        setWarning({msg:"Please Select Time"})
      }else{
        var timeAppoint = (time+":00" )+ (Number(time)>=12?" PM":" AM")
        Swal.fire({
          title: 'Do you want to book Appointment?',
          text: ` ${getFullDate(value)} ${timeAppoint}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#96C93D',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then(async (result) => {
          if (result.isConfirmed) {
            //afetr confirm   
             setIsLoading(true)
            var userJwtData = JSON.parse(window.localStorage.getItem("jwt-normal-user"))
            const {_id, email, fname, lname, mobile} = userJwtData.user
          
            var userDetail= {
                    name:fname+ " "+lname, user_id:_id, mobile:mobile, email:email, time:timeAppoint, date:convert(value),  query_category:category
                  }
                //sending Api requet
                try {
                  const reslut = await axios.post(`${config.URL_HOST}/appointment`,{...userDetail,doctor_name:getDocDetails },{
                    headers:{
                      'authorization':`Bearer ${userJwtData.token}` 
                    }
                  })
                  setIsLoading(false)
                  if(reslut.status===200){
                    Swal.fire(
                      'Your Appointment has been Booked!',
                      `${getFullDate(value)} ${timeAppoint}`,
                      'success'
                    )
                    Navgate("/myappointments")
                  }
                } catch (error) {
                   setIsLoading(false)
                }
          }
        })
      }
    }

  return (
  <>
    {isLoading && <Loader/>}
    <Layout>
      <div className="container">
      
        <div className="row align-items-center my-4">
          <div className="col-12- col-md-6">
            {
              day.status===true ? (
              <div className="date-not-avail ">
                <img src="../assets/img/error/not-avial-date.svg" className="img-fluid" alt="" />
              </div>
              ):
              (
                <div className="time_box ">
                  <div className="mx-md-5 w-75 my-3">
                    <label  className="form-label">Select Category</label>
                    <select required className="custom-select " value={category} onChange={categoryHandler} >
                      {specialist.map((specialist, index)=>{
                         return(
                           <option selected key={index} value={specialist}>{specialist}</option>
                         )
                      })}
                    </select>
                  </div>
                  <div className="mx-md-5 w-75 my-3">
                       {
                         slectDoc.data.length>0?
                         (<>
                              <label  className="form-label">Select Doctor</label>
                              <select required className="custom-select" value={slectDoc.data.specialist || getDocDetails}  onChange={(e)=>setGetDocDetails(e.target.value)} >
                                { slectDoc.data.map((doc,index)=>{
                                  return(
                                    <option selected key={index} value={`${doc.fname} ${doc.lname}`}>{`${doc.fname} ${doc.lname}`}</option>
                                  )
                                })}
                             </select>
                             {/* time Start  */}
                            <div className="date-range px-md-5 d-flex align-items-center ">
                              <div className="d-flex align-items-center m-2">
                                <span className="material-icons-sharp me-1 icon">date_range</span>
                                <span> {getFullDate(value)}</span>
                              </div>
                              <div className="d-flex align-items-center ms-md-1">
                              {/* Time getting */}
                              {
                                time&&(
                                    <> 
                                      <span className="material-icons-sharp me-1 icon">schedule</span>
                                      <span> {time}:00 {Number(time)>=12?"PM":"AM"} </span> 
                                    </>)
                              }
                              </div>
                            </div>
                            {/* time buttons  */}
                            <div className="time-box  py-md-2 ">
                              {/* timebtn mapping */}
                              {timeBtn.map((timeData, index)=>{
                                return(
                                  <button onClick={timeHandler} className="btn btn-sm btn-primary m-2" key={index}>{timeData.time}</button>
                                )
                              })}
                            </div>
                              {/* Warning */}
                              {
                                (day.status || warning) &&  ( 
                                <div className="warning-res bg-primary text-white p-2 rounded ">
                                  <span>{day.msg || warning.msg}</span>
                                </div>
                              )
                              }
                         </>):
                         (
                          <div className="doctor-not-avail ">
                            <img src="../assets/img/error/doctor not found.gif" className="img-fluid" alt="" />
                          </div>
                         )
                        
                       }
                
                  </div>
              
            
             
               </div>
              )
            }
           
         
          </div>
          <div className="col-12- col-md-6">
            <div className="date-box p-md-5">
              <Calendar
              className="w-100"
               dateDisplayFormat={"yyyy.MM.dd"}
                onChange={onChange}
                minDate={new Date()}
                maxDate={addDays(
                  new Date(),
                  15
                )}
                color={"#96C93D"}
                showWeekNumbers={false}
                value={value}
              />
            </div>
          </div>
          <form action="" onSubmit={appointmentHandler} >
          <div className="book-btn mx-auto my-3">
            <button type="submit" disabled={day.status ||  slectDoc.data.length<1 } className="btn btn-primary btn-sm">Book Appointment</button>
          </div>
          </form>
        </div>
      </div>
    </Layout>
  </>
  );
}
