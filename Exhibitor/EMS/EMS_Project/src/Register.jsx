import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom'; // Import useNavigate


const Register = () => {
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
    "password": "",
    "usernumber": "",
    "designation": "",
    "ceoname": "",
    "ceoemail": "",
    "ceonumber": "",
    "products": ""})
  const [message, setMessage] = useState(''); // State for error or success message
  const navigate = useNavigate(); // Initialize useNavigate

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
formData.append('password', data.password);
formData.append('usernumber', data.usernumber);
formData.append('designation', data.designation);
formData.append('ceoname', data.ceoname);
formData.append('ceoemail', data.ceoemail);
formData.append('ceonumber', data.ceonumber);
formData.append('products', data.products);

      axios.post('http://localhost:3500/exhibitorregister', formData)
      .then(response => {
        console.log(response);
        const { token } = response.data; // Destructure token from response


          if (token) {
            localStorage.setItem('Exhibitortoken', token); // Save token to local storage
            setMessage('Registered successfully!'); // Set success message
            setTimeout(() => {
                navigate('/'); // Navigate to the homepage after a short delay
            }, 1000); // Adjust delay as needed
        }

      })
      .catch(error => {
        console.log(error);
        // Check for specific error and set the appropriate message
        if (error.response && error.response.status === 400) {
          setMessage(error.response.data.message); // Show specific error message from the server
        } else {
          setMessage('Error registering user.'); // General error message
        }
      });
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
                                
                                <h1 style={{ color: '#f82249' }}>Sign Up</h1>
                            </div>
                            <form action="" onSubmit={handleSave} encType='multipart/form-data'>
                           
                            <div className="row">

                            <div className="col-md-6">
                                <h3>Company Details</h3>
                                <div className="form-floating mb-3">
                                <input required  name='compname' onChange={handleInput} type="text" className="form-control bg-white  bg-white" id="floatingText" placeholder="jhondoe" />
                                <label className="text-dark"htmlFor="floatingText">Company Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required  name='address' onChange={handleInput} type="text" className="form-control bg-white" id="floatingInput" placeholder="name@example.com" />
                                <label className="text-dark"htmlFor="floatingInput">Address</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input required  name='webaddress' onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">Web Address</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input required  name='compnumber' onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">Phone Number</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input required  name='ntn' onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">NTN Number</label>
                            </div>
                            <div class="form-floating mb-3">
                                <select name='city' onChange={handleInput} class="form-select bg-white" id="floatingSelect"
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
                                <select name='nature' onChange={handleInput} class="form-select bg-white" id="floatingSelect"
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
                                <input required  name='logo' onChange={handleFile} type="file" className="form-control bg-white" id="floatingText" placeholder="jhondoe" />
                                <label className="text-dark"htmlFor="floatingText">Company logo</label>
                            </div>
                                </div>


                                <div className="col-md-6">
                                <h3>User Details</h3>
                                <div className="form-floating mb-3">
                                <input required  name='name' onChange={handleInput} type="text" className="form-control bg-white" id="floatingText" placeholder="jhondoe" />
                                <label className="text-dark"htmlFor="floatingText">Username</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input required  name='usernumber' onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">Your Number</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required  name='useremail' onChange={handleInput} type="email" className="form-control bg-white" id="floatingInput" placeholder="name@example.com" />
                                <label className="text-dark"htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required  name='password' onChange={handleInput} type="password" className="form-control bg-white" id="floatingInput" placeholder="name@example.com" />
                                <label className="text-dark"htmlFor="floatingInput">Password</label>
                            </div>
                           
                            
                            <div className="form-floating mb-4">
                                <input required  name='designation' onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">Designation</label>
                            </div>
                                </div>
                            </div>

                            <h3>Company Head / CEO Details</h3>

                            <div className="form-floating mb-3">
                                <input required  name='ceoname' onChange={handleInput} type="text" className="form-control bg-white" id="floatingText" placeholder="jhondoe" />
                                <label className="text-dark"htmlFor="floatingText">CEO Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required  name='ceoemail' onChange={handleInput} type="email" className="form-control bg-white" id="floatingInput" placeholder="name@example.com" />
                                <label className="text-dark"htmlFor="floatingInput">CEO Email</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input required  name='ceonumber' onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">CEO Number</label>
                            </div>

                            <h3>Company Details</h3>
                            <div className="form-floating mb-4">
                                <textarea name='details' onChange={handleInput} class="form-control bg-white" placeholder="Leave a comment here"
                                    id="floatingTextarea"  style={{ height: '150px' }}></textarea>
                                <label for="floatingTextarea">Company Profile (Mission / Vision / How the Company was founded and About the Company)</label>
                            </div>

                            <h3>Exhibiting Products</h3>

                            <div className="row">
                                <div className="col-md-6">
                                <input required  type="radio" name="products" value="Accessories (Tulle lace embroidery)" onChange={handleInput} id="Accessories" /> &nbsp;
                                <label className="text-white"htmlFor="Accessories">Accessories (Tulle lace embroidery)</label><br />

                                <input required  type="radio" name="products" value="Apparels" onChange={handleInput} id="Apparels" /> &nbsp;
                                <label className="text-white"htmlFor="Apparels">Apparels</label><br />

                                <input required  type="radio" name="products" value="Art Silk and Synthetic Textile" onChange={handleInput} id="Art Silk and Synthetic Textile" /> &nbsp;
                                <label className="text-white"htmlFor="Art Silk and Synthetic Textile">Art Silk and Synthetic Textile</label><br />
                                <input required  type="radio" name="products" value="Carpets" onChange={handleInput} id="Carpets" /> &nbsp;
                                <label className="text-white"htmlFor="Carpets">Carpets</label><br />
                                <input required  type="radio" name="products" value="Denim" onChange={handleInput} id="Denim" /> &nbsp;
                                <label className="text-white"htmlFor="Denim">Denim</label><br />
                                <input required  type="radio" name="products" value="Fabric and Yarn" onChange={handleInput} id="Fabric and Yarn" /> &nbsp;
                                <label className="text-white"htmlFor="Fabric and Yarn">Fabric and Yarn</label><br />
                                <input required  type="radio" name="products" value="Footwear" onChange={handleInput} id="Footwear" /> &nbsp;
                                <label className="text-white"htmlFor="Footwear">Footwear</label><br />
                                <input required  type="radio" name="products" value="Gloves" onChange={handleInput} id="Gloves" /> &nbsp;
                                <label className="text-white"htmlFor="Gloves">Gloves</label><br />
                                <input required  type="radio" name="products" value="High-End-Fashion Garments" onChange={handleInput} id="High-End-Fashion Garments" /> &nbsp;
                                <label className="text-white"htmlFor="High-End-Fashion Garments">High-End-Fashion Garments</label><br />
                                <input required  type="radio" name="products" value="Home Textiles" onChange={handleInput} id="Home Textiles" /> &nbsp;
                                <label className="text-white"htmlFor="Home Textiles">Home Textiles</label><br />
                                <input required  type="radio" name="products" value="Hosiery" onChange={handleInput} id="Hosiery" /> &nbsp;
                                <label className="text-white"htmlFor="Hosiery">Hosiery</label><br />
                                </div>

                                <div className="col-md-6">
                                
                                <input required  type="radio" name="products" value="Knitwear" onChange={handleInput} id="Knitwear" /> &nbsp;
                                <label className="text-white"htmlFor="Knitwear">Knitwear</label><br />
                                <input required  type="radio" name="products" value="Leather (Garments, Articles & Accessories)" onChange={handleInput} id="Leather" /> &nbsp;
                                <label className="text-white"htmlFor="Leather">Leather (Garments, Articles & Accessories)</label><br />
                                <input required  type="radio" name="products" value="Personal Protective Garments (PPG)" onChange={handleInput} id="Personal Protective Garments (PPG)" /> &nbsp;
                                <label className="text-white"htmlFor="Personal Protective Garments (PPG)">Personal Protective Garments (PPG)</label><br />
                                <input required  type="radio" name="products" value="Readymade Garments" onChange={handleInput} id="Readymade Garments" /> &nbsp;
                                <label className="text-white"htmlFor="Readymade Garments">Readymade Garments</label><br />
                                <input required  type="radio" name="products" value="Sportswear" onChange={handleInput} id="Sportswear" /> &nbsp;
                                <label className="text-white"htmlFor="Sportswear">Sportswear</label><br />
                                <input required  type="radio" name="products" value="Tech. Solutions(Textile & Leather)" onChange={handleInput} id="Tech. Solutions(Textile & Leather)" /> &nbsp;
                                <label className="text-white"htmlFor="Tech. Solutions(Textile & Leather)">Tech. Solutions(Textile & Leather)</label><br />
                                <input required  type="radio" name="products" value="Tents and Canvas" onChange={handleInput} id="Tents and Canvas" /> &nbsp;
                                <label className="text-white"htmlFor="Tents and Canvas">Tents and Canvas</label><br />
                                <input required  type="radio" name="products" value="Textile Machinery" onChange={handleInput} id="Textile Machinery" /> &nbsp;
                                <label className="text-white"htmlFor="Textile Machinery">Textile Machinery</label><br />
                                <input required  type="radio" name="products" value="Towels" onChange={handleInput} id="Towels" /> &nbsp;
                                <label className="text-white"htmlFor="Towels">Towels</label><br />
                                </div>

                            </div>
                            
                            
                            
                            
                            <button type="submit" className="btn btn-primary py-3 w-100 mb-4" style={{ background: '#f82249' }}>Sign Up</button>
                            {message && <p className="text-center text-danger">{message}</p>} {/* Display the message */}
                            <p className="text-center mb-0">Already have an Account? <Link to="/login">Sign In</Link></p>
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

export default Register
