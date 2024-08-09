import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
<link rel="stylesheet" href="./src/assets/css/bg-color.css" />

      {/* Footer Start */}
<div className="container-fluid pt-4 px-4">
    <div className="rounded-top p-4">
        <div className="row">
            <div className="col-12 col-sm-6 text-center text-sm-start">
                &copy; <Link to="/">Event Management System</Link>, All Right Reserved. 
            </div>
         
        </div>
    </div>
</div>
{/* Footer End */}
{/* Back to Top */}
<a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    </>
  )
}

export default Footer
