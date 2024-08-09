import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom'; // Import useNavigate
import { jwtDecode } from 'jwt-decode';

const isUserLoggedIn = () => {
  const token = localStorage.getItem('Exhibitortoken');
  // console.log(token);

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decodedToken.exp < currentTime) {
      // Token has expired, remove it from localStorage
      localStorage.removeItem('Exhibitortoken');
      return false;
    }

    return true;
  } catch (error) {
    // In case of an error (e.g., invalid token), remove it from localStorage
    localStorage.removeItem('Exhibitortoken');
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

const Profile = () => {
//     //  handle fetch user
const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
const [user, setUser] = useState(null);
const [data, setData] = useState({ 
    "compname": "",
    "address": "",
    "webaddress": "",
    "compnumber": "",
    "city": "",
    "nature": "",
    "ntn": "",
    "details": "",
    "logo": "",
    "name": "",
    "useremail": "",
    "usernumber": "",
    "designation": "",
    "ceoname": "",
    "ceoemail": "",
    "ceonumber": "",
    "products": ""})
const [message, setMessage] = useState(''); // State for error or success message
const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
      setIsLoggedIn(isUserLoggedIn())
      if (isLoggedIn) {
        const token = localStorage.getItem('Exhibitortoken');
        fetchUserDetails(token).then(userData => {
          if (userData) {
            setData(userData);
          }
        });
      }
      else{
          navigate('/login');
      }
  }, []);


    // updata data
  

  const handleInput = (e) => {
      setData({...data , [e.target.name]: e.target.value})
  }

  const handleFile = (e) => {
    setData({...data, 'logo': e.target.files[0]})
  }

  const handleSave = (e) => {
      e.preventDefault()
  
      const formData = new FormData
     // Append each field to the FormData object
formData.append('compname', data.compname);
formData.append('address', data.address);
formData.append('webaddress', data.webaddress);
formData.append('compnumber', data.compnumber);
formData.append('city', data.city);
formData.append('nature', data.nature);
formData.append('ntn', data.ntn);
formData.append('details', data.details);
formData.append('logo', data.logo);
formData.append('name', data.name);
formData.append('useremail', data.useremail);
formData.append('usernumber', data.usernumber);
formData.append('designation', data.designation);
formData.append('ceoname', data.ceoname);
formData.append('ceoemail', data.ceoemail);
formData.append('ceonumber', data.ceonumber);
formData.append('products', data.products);

      axios.put(`http://localhost:3500/update/exhibitor/${data._id}`, formData)
      .then(response => {
        console.log(response);
       
            setMessage('Updated successfully!'); // Set success message
            setTimeout(() => {
                navigate('/'); // Navigate to the homepage after a short delay
            }, 1000); // Adjust delay as needed
        

      })
      .catch(error => 
        console.error(error)
        );
    }

console.log(data);
    
    ///////////jquery

jQuery(document).ready(function( $ ) {

    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
      $('.sidebar, .content').toggleClass("open");
      return false;
  });
})


  return (
   <>
   <link rel="stylesheet" href="/src/assets/css/bootstrap.min.css" />
    <div className="container-fluid position-relative d-flex p-0">
            {/* Spinner Start */}
            <div id="spinner" className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            {/* Spinner End */}

            {/* Sign Up Start */}
            <div className="container-fluid">
                <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  bg-white">
                        <div className="rounded p-4 p-sm-5 my-4 mx-3" style={{ background: 'rgba(6, 12, 34, 0.98)' }}>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                
                                <h1 style={{ color: '#f82249' }}>Update Profile</h1>
                            </div>
                            <form action="" onSubmit={handleSave} encType='multipart/form-data'>
                           
                            <div className="row">

                            <div className="col-md-6">
                                <h3>Company Details</h3>
                                <div className="form-floating mb-3">
                                <input required name='compname' defaultValue={data.compname} onChange={handleInput} type="text" className="form-control bg-white  bg-white" id="floatingText" placeholder="jhondoe" />
                                <label className="text-dark"htmlFor="floatingText">Company Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required name='address' defaultValue={data.address} onChange={handleInput} type="text" className="form-control bg-white" id="floatingInput" placeholder="name@example.com" />
                                <label className="text-dark"htmlFor="floatingInput">Address</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input required name='webaddress' defaultValue={data.webaddress} onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">Web Address</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input required name='compnumber' defaultValue={data.ceonumber} onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">Phone Number</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input required name='ntn' defaultValue={data.ntn} onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">NTN Number</label>
                            </div>
                            <div class="form-floating mb-3">
                                <select name='city' defaultValue={data.city} onChange={handleInput} class="form-select bg-white" id="floatingSelect"
                                    aria-label="Floating label select example">
                                    <option selected disabled>Select</option>
                                    <option value="Karachi, Sindh">Karachi, Sindh</option>
                                    <option value="Lahore, Punjab">Lahore, Punjab</option>
                                    <option value="Peshawar, Khyber Pakhtunkhwa">Peshawar, Khyber Pakhtunkhwa</option>
                                    <option value="Quetta, Balochistan">Quetta, Balochistan</option>
                                    <option value="Hyderabad, Sindh">Hyderabad, Sindh</option>
                                    <option value="Faisalabad, Punjab">Faisalabad, Punjab</option>
                                    <option value="Mardan, Khyber Pakhtunkhwa">Mardan, Khyber Pakhtunkhwa</option>
                                    <option value="Gwadar, Balochistan">Gwadar, Balochistan</option>
                                    <option value="Sukkur, Sindh">Sukkur, Sindh</option>
                                    <option value="Rawalpindi, Punjab">Rawalpindi, Punjab</option>
                                    <option value="Abbottabad, Khyber Pakhtunkhwa">Abbottabad, Khyber Pakhtunkhwa</option>
                                    <option value="Turbat, Balochistan">Turbat, Balochistan</option>
                                    <option value="Mirpurkhas, Sindh">Mirpurkhas, Sindh</option>
                                    <option value="Multan, Punjab">Multan, Punjab</option>
                                    <option value="Islamabad, Islamabad Capital Territory">Islamabad, Islamabad Capital Territory</option>
                                </select>
                                <label className="text-dark"for="floatingSelect">Select City</label>
                            </div>
                            <div class="form-floating mb-3">
                                <select name='nature' defaultValue={data.nature} onChange={handleInput} class="form-select bg-white" id="floatingSelect"
                                    aria-label="Floating label select example">
                                    <option selected disabled>Select</option>
                                    <option value="Proprietor">Proprietor</option>
                                    <option value="Private Limited">Private Limited</option>
                                    <option value="Partnership">Partnership</option>
                                    <option value="Women Entrepreneurs">Women Entrepreneurs</option>
                                    <option value="Other">Other</option>
                                </select>
                                <label className="text-dark"for="floatingSelect">Nature of Business</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input required name='logo' onChange={handleFile} type="file" className="form-control bg-white" id="floatingText" placeholder="jhondoe" />
                                <label className="text-dark"htmlFor="floatingText">Company logo</label>
                            </div>
                                </div>


                                <div className="col-md-6">
                                <h3>User Details</h3>
                                <div className="form-floating mb-3">
                                <input required name='name' defaultValue={data.name} onChange={handleInput} type="text" className="form-control bg-white" id="floatingText" placeholder="jhondoe" />
                                <label className="text-dark"htmlFor="floatingText">Username</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input required name='usernumber' defaultValue={data.usernumber} onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">Your Number</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required name='useremail' defaultValue={data.useremail} onChange={handleInput} type="email" className="form-control bg-white" id="floatingInput" placeholder="name@example.com" />
                                <label className="text-dark"htmlFor="floatingInput">Email address</label>
                            </div>
                            
                            
                            <div className="form-floating mb-4">
                                <input required name='designation' defaultValue={data.designation} onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">Designation</label>
                            </div>
                                </div>
                            </div>

                            <h3>Company Head / CEO Details</h3>

                            <div className="form-floating mb-3">
                                <input required name='ceoname' defaultValue={data.ceoname} onChange={handleInput} type="text" className="form-control bg-white" id="floatingText" placeholder="jhondoe" />
                                <label className="text-dark"htmlFor="floatingText">CEO Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required name='ceoemail' defaultValue={data.ceoemail} onChange={handleInput} type="email" className="form-control bg-white" id="floatingInput" placeholder="name@example.com" />
                                <label className="text-dark"htmlFor="floatingInput">CEO Email</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input required name='ceonumber' defaultValue={data.ceonumber} onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">CEO Number</label>
                            </div>


                            <h3>Exhibiting Products</h3>

                            <div className="row">
                                <div className="col-md-6">
                                <input required type="radio" name="products" onChange={handleInput} id="Accessories" value='Accessories'/> &nbsp;
                                <label className="text-white"htmlFor="Accessories">Accessories (Tulle lace embroidery)</label><br />

                                <input required type="radio" name="products" onChange={handleInput} id="Apparels" value='Apparels'/> &nbsp;
                                <label className="text-white"htmlFor="Apparels">Apparels</label><br />

                                <input required type="radio" name="products" onChange={handleInput} id="Art Silk and Synthetic Textile" value='Art Silk and Synthetic Textile'/> &nbsp;
                                <label className="text-white"htmlFor="Art Silk and Synthetic Textile">Art Silk and Synthetic Textile</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="Carpets" value='Carpets'/> &nbsp;
                                <label className="text-white"htmlFor="Carpets">Carpets</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="Denim" value='Denim'/> &nbsp;
                                <label className="text-white"htmlFor="Denim">Denim</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="Fabric and Yarn" value='Fabric and Yarn'/> &nbsp;
                                <label className="text-white"htmlFor="Fabric and Yarn">Fabric and Yarn</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="Footwear" value='Footwear'/> &nbsp;
                                <label className="text-white"htmlFor="Footwear">Footwear</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="Gloves" value='Gloves'/> &nbsp;
                                <label className="text-white"htmlFor="Gloves">Gloves</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="High-End-Fashion Garments" value='High-End-Fashion Garments'/> &nbsp;
                                <label className="text-white"htmlFor="High-End-Fashion Garments">High-End-Fashion Garments</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="Home Textiles" value='Home Textiles'/> &nbsp;
                                <label className="text-white"htmlFor="Home Textiles">Home Textiles</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="Hosiery" value='Hosiery'/> &nbsp;
                                <label className="text-white"htmlFor="Hosiery">Hosiery</label><br />
                                </div>

                                <div className="col-md-6">
                                
                                <input required type="radio" name="products" onChange={handleInput} id="Knitwear" value='Knitwear'/> &nbsp;
                                <label className="text-white"htmlFor="Knitwear">Knitwear</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="Leather" value='Leather (Garments, Articles & Accessories)'/> &nbsp;
                                <label className="text-white"htmlFor="Leather">Leather (Garments, Articles & Accessories)</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="Personal Protective Garments (PPG)" value='Personal Protective Garments (PPG)'/> &nbsp;
                                <label className="text-white"htmlFor="Personal Protective Garments (PPG)">Personal Protective Garments (PPG)</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="Readymade Garments" value='Readymade Garments'/> &nbsp;
                                <label className="text-white"htmlFor="Readymade Garments">Readymade Garments</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="Sportswear" value='Sportswear'/> &nbsp;
                                <label className="text-white"htmlFor="Sportswear">Sportswear</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="Tech. Solutions(Textile & Leather)" value='Tech. Solutions(Textile & Leather)'/> &nbsp;
                                <label className="text-white"htmlFor="Tech. Solutions(Textile & Leather)">Tech. Solutions(Textile & Leather)</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="Tents and Canvas" value='Tents and Canvas'/> &nbsp;
                                <label className="text-white"htmlFor="Tents and Canvas">Tents and Canvas</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="Textile Machinery" value='Textile Machinery'/> &nbsp;
                                <label className="text-white"htmlFor="Textile Machinery">Textile Machinery</label><br />
                                <input required type="radio" name="products" onChange={handleInput} id="Towels" value='Towels'/> &nbsp;
                                <label className="text-white"htmlFor="Towels">Towels</label><br />
                                </div>

                            </div>
                            
                            
                            
                            
                            <button type="submit" className="btn btn-primary py-3 w-100 mb-4" style={{ background: '#f82249' }}>Save</button>
                            {message && <p className="text-center text-danger">{message}</p>} {/* Display the message */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Sign Up End */}
        </div>

</>
  )
}

export default Profile
