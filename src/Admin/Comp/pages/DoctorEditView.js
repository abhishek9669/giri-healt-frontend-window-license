import React from 'react'

export default function DoctorEditView({id}) {
  console.log(id)
  return (
   <div className="modal  fade" id="view_doctor" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header border-0">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body border-0">
           {/* view doctor modal start  */}
           <div className="row">
                <div className="col-12 col-md-5">
                     <div className="doctor_profile">
                         <div className="circle"></div>
                    </div>
                </div>
                <div className="col-12 col-md-7">
                     <h2>Hello2</h2>
                </div>
           </div>
      </div>
      <div className="modal-footer border-0">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

  )
}
