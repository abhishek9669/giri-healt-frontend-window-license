import React from 'react'
import DoctorWelcome from '../Common/DoctorWelcome'
import {doctorSchedule} from "../../jsonData/Schedule"
import ScheduleBox from './ScheduleBox'
export default function DoctorSchedule() {
  return (
    <>
      <DoctorWelcome>
           <ScheduleBox />
           <div className="row">
            <h2>Doctor Schedule Management</h2>
            <div className="row bg-white">
                <div className="header d-flex align-items-center justify-content-between pt-4">
                    <h3>Doctor Schedule List</h3>
                    <div className="add pointer" data-bs-toggle="modal" data-bs-target="#exampleModal">
                     <span className="material-icons-sharp text-success"> add_circle</span>
                    </div>
                </div>
                <div className="table-box mt-2">
                <table className="table">
                    <thead>
                        <tr>
                            {
                            doctorSchedule.map((sche, index)=>{
                                    return(
                                    <th key={index}>{sche}</th>
                                    )
                            })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
            </div>
           </div>
      </DoctorWelcome>
    </>
  )
}
