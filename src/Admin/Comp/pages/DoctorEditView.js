import axios from 'axios'
import React, { useState , useEffect} from 'react'
import { specialist as specCat } from '../../../jsonData/specialist'

const config = require("../../../config.json")
export default function DoctorEditView({Data}) {
//state area ,
const [readOnly, setReadOnly] = useState(true)
const [update, setUpadte] = useState({})
const updateHandler = (e)=>{
  var name = e.target.name
  var value = e.target.value
  setUpadte({...update,[name]:value})
}
 //destructure to the data
 const {_id,fname, lname, active, country, email, gender, specialist, state, user_type, username, mobile} = Data.data;

//function Area
const doctorUpdateSubmit = async ()=>{

  //  try {
  //     const result = await axios.put(`${config.URL_HOST}/doctor/${_id}`, )
  //  } catch (error) {
  //    console.log(error.response)
  //  }
}
  return (
   <div className="modal  fade" id="view_doctor" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                      <span className={`btn btn-sm btn-dark ${!readOnly && "disabled"}`} onClick={()=>setReadOnly(readOnly?false:true)} >Edit Profile</span>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6"><input name="fname"  onChange={updateHandler} required  readOnly={readOnly} type="text" className="form-control" placeholder="first name" defaultValue={fname} /></div>
                      <div className="col-md-6"><input name="lname" onChange={updateHandler} required readOnly={readOnly} type="text" className="form-control" defaultValue={lname} placeholder="last name" /></div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6"><input required readOnly={readOnly} type="text" className="form-control" placeholder="Email" defaultValue={mobile} /></div>
                      <div className="col-md-6"><input required readOnly={readOnly} type="text" className="form-control" defaultValue={gender}  /></div>
                    </div>
                    <div className="row mt-3 align-items-center">
                      <div className="col-md-6">
                       <select name="" value={specialist} readOnly={readOnly} className='form-control'>
                          {
                            specCat.map((spec, index)=>{
                              return(
                                <option key={index} value={spec}>{spec}</option>
                              )
                            })
                          }
                       </select>  
                      </div>
                      <div className="col-md-6">
                        <div className="form-check form-switch my-2">
                          <input className="form-check-input ms-0 bg-success border-0" type="checkbox" id="flexSwitchCheckChecked" defaultChecked />
                          <label className="form-check-label ms-5" htmlFor="flexSwitchCheckChecked">Active</label>
                        </div>  
                      </div>

                    </div>
                    {!readOnly && <div className="mt-5 text-right"><button className="btn btn-primary profile-button"type="submit">Save Profile</button></div>}
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
