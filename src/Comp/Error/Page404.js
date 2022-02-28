import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
  return (
    <div className="container-fluid p-0">
      <header className='bg-white text-center shadow-sm '>
        <Link className="navbar-brand " to="/"><span className="text-primary">One</span><span className='text-dark'>-Health</span></Link>
      </header>
      <div className="container text-center">
            <div className="page_error mx-auto wow fadeInRight">
                <img src='../assets/img/error/404Page not found one-health.com.svg' className='img-fluid' alt="" />
            </div>
            <span className='wow  zoomIn d-block'>Unfortunately the page you are looking for has been moved or deleted</span>
            <Link to="/" className='btn btn-primary my-3 wow fadeInUp d-inline-block shadow-sm'>GO TO HOMEPAGE</Link>
      </div>
    </div>
  
  )
}
