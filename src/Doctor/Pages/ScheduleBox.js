import { addMonths } from 'date-fns';
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function ScheduleBox() {
  //state area
  const [startDate, setStartDate] = useState(new Date());
     var minDate = JSON.stringify(new Date())
         minDate = minDate.slice(1,11)
  return (
     <>
       <div className="schedule_box">
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
               <div>
                <span>Schedule Date</span>
                <div className="input-group flex-nowrap my-2">
                    <span className="input-group-text" id="addon-wrapping"><span className="material-icons-sharp">date_range</span></span>
                   
                    <DatePicker
                    className="form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date()}
                        maxDate={addMonths(new Date(),1)}
                        showDisabledMonthNavigation
                        />
                </div>
               </div>
               <div>
                <span>Start Time</span>
                <div className="input-group flex-nowrap my-2">
                    <span className="input-group-text" id="addon-wrapping"><span className="material-icons-sharp">schedule</span></span>
                    <input type="time" className="form-control" min={minDate}  placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
                </div>
               </div>
               <div>
                <span>End Time</span>
                <div className="input-group flex-nowrap my-2">
                    <span className="input-group-text" id="addon-wrapping"><span className="material-icons-sharp">schedule</span></span>
                    <input type="time" className="form-control" min={minDate}  placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
                </div>
               </div>
               <div>
                <span> Average Counslting Time</span>
                <div className="input-group flex-nowrap my-2">
                <span className="input-group-text" id="addon-wrapping"><span className="material-icons-sharp">schedule</span></span>
                    <select  name="" id="" className='form-control'>
                       <option selected value="">Select Average Counslting</option>
                       <option  value="10">10 Minutes</option>
                       <option  value="20">20 Minutes</option>
                       <option  value="30">30 Minutes</option>
                       <option  value="45">45 Minutes</option>
                       <option  value="1hr">1 Hour</option>
                    </select>
                </div>
               </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
       </div>
     </>
  )
}
