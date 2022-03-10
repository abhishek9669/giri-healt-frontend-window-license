import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../../../Loader';
import Welcome from '../Common/Welcome'
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';
import DoctorEditView from './DoctorEditView';
const config = require("../../../config.json")

export default function Doctors() {
//State Area
 const [users, setUsers] = useState({
    "data":[],
    "meta":{
      pageCount:""
    }
  });
 const [isLoading, setIsLoading] = useState(false)
 const [docSingle,setDocSingle] = useState({
  data:[]
})
 const Navigate = useNavigate()
  //useeffect calling
    useEffect(() => {
        if(!window.localStorage.getItem("jwt-token")){
        Navigate("/admin")
        }else{
            doctorsApi()
        }
    }, [ Navigate]);
//Function Area
const doctorsApi = async (pageno=1) => {
    setIsLoading(true)
     try {
       const result = await axios.get(`${config.URL_HOST}/doctor?page=${pageno}&size=5`, {
         headers: {
           'authorization':"Bearer"+ " " + JSON.parse(window.localStorage.getItem("jwt-token")).token ,
           'Accept' : 'application/json',
           'Content-Type': 'application/json'
         }
       });
       setUsers(result.data);
       setIsLoading(false)
     } catch (error) {
       setIsLoading(false)
     }
   };
 const handlePageClick = (data)=>{
    doctorsApi(data.selected+1)
 }
//viewHandler
const viewHandler = async (e)=>{
  var id = e.target.closest("tr").querySelector("td:first-child span").innerHTML
    try {
      const result = await axios.get(`${config.URL_HOST}/doctor/${id}`,{
        headers:{
          'authorization':"Bearer"+ " " + JSON.parse(localStorage.getItem("jwt-token")).token
        }
      })
      setDocSingle(result)
    } catch (error) {
      console.log(error.response)
    }
}
  return (
   <>
    <DoctorEditView Data={docSingle}/>
    {isLoading&&<Loader/>}
     <Welcome>
        <div className="row">
          <h2>Customers</h2>
          <div className="col-12 ">
          <div className="table-box">
            <table className="table">
              <thead>
                <tr>
                  <th>_id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Specialist</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {users.data.length===0 ? null :(
                     users.data.map(userData=>{
                         //destructure to the users data
                          const {_id,  email, fname, lname, specialist } = userData;
                          return(
                              <tr key={_id}>
                                 <td> 
                                    <span className="user-select-all">{_id}</span>      
                                 </td>
                                 <td> 
                                    <h3 className="mb-0">{fname}</h3>
                                 </td>
                                 <td> 
                                     <h3 className="mb-0">{lname}</h3>
                                 </td>
                                 <td> 
                                     <h3 className="mb-0">{specialist}</h3>
                                 </td>
                                 <td> 
                                     <h3 className="mb-0">{email}</h3>
                                 </td>
                                 <td> 
                                     <Link to={"/doctor/edit-view"} className='btn btn-sm btn-info mx-1 my-1 my-md-0' data-bs-toggle="modal" data-bs-target="#view_doctor" onClick={viewHandler}>View</Link>
                                 </td>
                              </tr>
                          )
                     })
                 )}
              </tbody>
            </table>
                <ReactPaginate 
                 previousLabel="< previous"
                 nextLabel="next >"
                 breakLabel="..."
                 pageCount={users.meta.pageCount}
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
