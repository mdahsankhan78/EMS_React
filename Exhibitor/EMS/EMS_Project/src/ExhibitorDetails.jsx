import React from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { jwtDecode } from 'jwt-decode';

const isUserLoggedIn = () => {
  const token = localStorage.getItem('Attendeetoken');
  console.log(token);

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decodedToken.exp < currentTime) {
      // Token has expired, remove it from localStorage
      localStorage.removeItem('Attendeetoken');
      return false;
    }

    return true;
  } catch (error) {
    // In case of an error (e.g., invalid token), remove it from localStorage
    localStorage.removeItem('Attendeetoken');
    return false;
  }

  
};

const fetchUserDetails = async (token) => {
  try {
    const response = await axios.get('http://localhost:3500/getexhibitor', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;// Adjust based on your API response
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};



const ExhibitorDetails = () => {
    const [message, setMessage] = useState(''); 
   const { id } = useParams();
   const [exhibitor, setExhibitors] = useState({});
   


      
    useEffect(() => {
      axios.get(`http://localhost:3500/details/exhibitor/${id}`)
        .then(response => {console.log(response)
            setExhibitors(response.data)
        })
        .catch(error => console.log("Error fetching exhibitor data:", error));
    }, [id]);

    const formatDate = (isoString) => {
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit' };
    
      const date = new Date(isoString).toLocaleDateString(undefined, dateOptions);
      const time = new Date(isoString).toLocaleTimeString(undefined, timeOptions);
    
      return `${date} ${time}`;
    };

  
console.log(exhibitor);
  return (
    <>
   {/* <link rel="stylesheet" href="/src/assets/css/bootstrap.min.css" /> */}

    <Header/>

   {/* intro section */}
   <section id="intro">
  <div className="intro-container wow fadeIn">
            <div className="hotel-img" style={{marginTop: '300px'}}>
                
                <img
                    src={`http://localhost:3500/${exhibitor.logo}`}
                    className="img-fluid"
                    alt={exhibitor.compname}
                    style={{ height: '200px' , borderRadius : '20px'}}
                />
            </div><br />
    <h1 className="mb-4 pb-0">{exhibitor.compname}<br /><span>{exhibitor.address}</span> {exhibitor.city}</h1>
    <p className="mb-4 pb-0"><a onClick={() => window.location.href = `http://${exhibitor.webaddress}`}>{exhibitor.webaddress}</a></p>
    
   <div className="col-7">
      
      
   
    </div>
  </div>
</section>


{/* Other INfo */}
<section id="schedule" className="section-with-bg">
  <div className="container wow fadeInUp">
    <div className="section-header">
      <h2>Other Information</h2>
    </div>
    <div className="tab-content row justify-content-center">

        <div role="tabpanel" className="col-lg-9 tab-pane fade show active" id="day-1">
       
            <div className="row">
                <div className="col-md-4">
                        <div className="section-header">
                            <h3 className='text-center'>Company Info</h3>
                        </div>
                
                    
            
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Name</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{exhibitor.compname} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Number</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{exhibitor.compnumber} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Nature</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{exhibitor.nature} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Products</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{exhibitor.products} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Details</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{exhibitor.details} </h4>
                            </div>
                        </div>
                </div>


                <div className="col-md-4">
                        <div className="section-header">
                            <h3 className='text-center'>Exhibitor Info</h3>
                        </div>
                
                    
            
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Name</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{exhibitor.name} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Email</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{exhibitor.useremail} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Number</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{exhibitor.usernumber} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Designation</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{exhibitor.designation} </h4>
                            </div>
                        </div>
                </div>


                <div className="col-md-4">
                        <div className="section-header">
                            <h3 className='text-center'>CEO Info</h3>
                        </div>
                
                    
            
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Name</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{exhibitor.ceoname} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Email</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{exhibitor.ceoemail} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Number</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{exhibitor.ceonumber} </h4>
                            </div>
                        </div>
                        
                </div>

                
            </div>
               
            
             
        </div>

     
    </div>
  </div>
</section>


<Footer/>

    </>
  )
}

export default ExhibitorDetails