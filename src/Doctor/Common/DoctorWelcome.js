
import React, {  useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
var CryptoJS = require("crypto-js");
const confing = require("../../config.json")
export default function DoctorWelcome(props) {
  //State Area
  const [profileActive, setProfileActive] = useState(false);
  const [asideActive, setAsideActive] = useState(false)

  const Navigate = useNavigate()
  useEffect(()=>{
    if(!window.localStorage.getItem("doctor-login")){
      Navigate("/doctor-login")
    }
  },[Navigate])



  //function area
  const porfileCont = () => {
    if (profileActive === true) {
      setProfileActive(false);
    } else {
      setProfileActive(true);
    }
  };
  //setting auth
  
  //Logout
    const logoutHandler = ()=>{
      window.localStorage.removeItem("doctor-login")
      Navigate("/")
    }
  //aside Handler
    const asideHandler = ()=>{
       setAsideActive(true)
    }
    const closAsideHandler = ()=>{
       setAsideActive(false)
    }
  return (
    <div className="my_container">
      <div className="row">
        <div className="col-12 col-md-2 ">
          <div className={`my_aside bg-white ${asideActive && "active"}`}>
            {/* Top Start  */}
            <div className="top ps-4 shadow-sm py-2">
              <div className="logo d-flex align-items-center ">
                <Link className="navbar-brand " to="/admin">
                  <span className="text-primary">Giri</span>
                  <span className="text-dark">-Health</span>
                </Link>
                <div className="close m-1" onClick={closAsideHandler}>
                  <span className="material-icons-sharp">close</span>
                </div>
              </div>
            </div>
            {/* Sidebar Start  */}
            <div className="sidebar my-4">
              <NavLink to="/doctor/dashboard" >
                <span className="material-icons-sharp">grid_view</span>
                <h3>Dashboard</h3>
              </NavLink>
              <NavLink to="/doctor/appointments">
                <span className="material-icons-sharp">book_online</span>
                <h3>Appointments</h3>
              </NavLink>
              <NavLink to="/doctor/schedule">
                <span className="material-icons-sharp">event_note</span>
                <h3>Doctor Schedule</h3>
              </NavLink>
              <NavLink to="/admin/users">
                <span className="material-icons-sharp">person</span>
                <h3>Patient</h3>
              </NavLink>
              <Link to="/" onClick={logoutHandler}>
                <span className="material-icons-sharp">logout</span>
                <h3 >Logout</h3>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-10 p-0">
          {/* Header start  */}
          <header className="sticky-top">
            <nav className="admin_nav  navbar-light bg-white shadow-sm py-2 ">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-12 col-md-6 my-2">
                    <div className="search-box  d-flex align-items-center">
                      <input
                        type="text"
                        className="form-control px-3 h-100 rounded-pill"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 my-2">
                    <div className="profile position-relative  ">
                    
                      <div className="d-flex align-items-center ms-auto ">
                      <span className="material-icons-sharp menu-icon" onClick={asideHandler}>menu</span>
                        <div
                          className="profile_photo shadow-sm bg-primary ms-auto"   style={{ cursor: "pointer" }}
                          onClick={porfileCont}
                        >
                          <img
                            src="../../../assets/img/person/person_1.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <h4 className="mx-1" style={{ cursor: "pointer" }} onClick={porfileCont} >
                        {localStorage.getItem("doctor-login") && `${JSON.parse(localStorage.getItem("doctor-login")).user.fname} ${JSON.parse(localStorage.getItem("doctor-login")).user.lname}` }
                        </h4>
                      </div>
                      <div
                        className={`profile_content bg-white rounded-bottom shadow-sm ${
                          profileActive ? "active" : ""
                        }`}
                      >
                        <NavLink to="#">
                          <span className="material-icons-sharp">settings</span>
                          <h3>Settings</h3>
                        </NavLink>
                        <NavLink to="#">
                          <span className="material-icons-sharp">person</span>
                          <h3>Profile</h3>
                        </NavLink>
                        <NavLink to="#">
                          <span className="material-icons-sharp">
                            inventory
                          </span>
                          <h3>My Messages</h3>
                        </NavLink>
                        <NavLink onClick={logoutHandler} to="/">
                          <span className="material-icons-sharp">logout</span>
                          <h3>Logout</h3>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          {/* Main start  */}
          <main className="my-md-5 my-3">
            <div className="container">
              {props.children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
