import React from 'react'

export default function HeroBanner() {
  return (
      <>
        <div className="page-hero bg-image overlay-dark" style={{backgroundImage: 'url(../assets/img/bg_image_1.jpg)'}}>
            <div className="hero-section">
                <div className="container text-center wow zoomIn">
                    <span className="subhead">Let's make your life happier</span>
                    <h1 className="display-4">Healthy Living</h1>
                    <a href="#" className="btn btn-primary">Let's Consult</a>
                </div>
            </div>
        </div>
        <div className="bg-light">
            <div className="page-section py-3 mt-md-n5 custom-index">
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-md-4 py-3 py-md-0">
                        <div className="card-service wow fadeInUp">
                        <div className="circle-shape bg-secondary text-white">
                            <span className="mai-chatbubbles-outline" />
                        </div>
                        <p><span>Chat</span> with a doctors</p>
                        </div>
                    </div>
                    <div className="col-md-4 py-3 py-md-0">
                        <div className="card-service wow fadeInUp">
                        <div className="circle-shape bg-primary text-white">
                            <span className="mai-shield-checkmark" />
                        </div>
                        <p><span>One</span>-Health Protection</p>
                        </div>
                    </div>
                    <div className="col-md-4 py-3 py-md-0">
                        <div className="card-service wow fadeInUp">
                        <div className="circle-shape bg-accent text-white">
                            <span className="mai-basket" />
                        </div>
                        <p><span>One</span>-Health Pharmacy</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        
      </div>
     </>
  )
}
