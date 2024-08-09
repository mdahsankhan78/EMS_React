import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './Index';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';



const isUserLoggedIn = () => {
    const token = localStorage.getItem('Admintoken');
    // console.log(token);
  
    if (!token) {
      return false;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
  
      if (decodedToken.exp < currentTime) {
        // Token has expired, remove it from localStorage
        localStorage.removeItem('Admintoken');
        return false;
      }
  
      return true;
    } catch (error) {
      // In case of an error (e.g., invalid token), remove it from localStorage
      localStorage.removeItem('Admintoken');
      return false;
    }
  };

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get('http://localhost:3500/getadmin', {
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





const Sidebar = () => {

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
    
       // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    
    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });
    
    
    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });
    
    
    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#000000";
    
    
    // Worldwide Sales Chart
    var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "USA",
                    data: [15, 30, 55, 65, 60, 80, 95],
                    backgroundColor: "rgba(235, 22, 22, .7)"
                },
                {
                    label: "UK",
                    data: [8, 35, 40, 60, 70, 55, 75],
                    backgroundColor: "rgba(235, 22, 22, .5)"
                },
                {
                    label: "AU",
                    data: [12, 25, 45, 55, 65, 70, 60],
                    backgroundColor: "rgba(235, 22, 22, .3)"
                }
            ]
            },
        options: {
            responsive: true
        }
    });
    
    
    // Salse & Revenue Chart
    var ctx2 = $("#salse-revenue").get(0).getContext("2d");
    var myChart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "Salse",
                    data: [15, 30, 55, 45, 70, 65, 85],
                    backgroundColor: "rgba(235, 22, 22, .7)",
                    fill: true
                },
                {
                    label: "Revenue",
                    data: [99, 135, 170, 130, 190, 180, 270],
                    backgroundColor: "rgba(235, 22, 22, .5)",
                    fill: true
                }
            ]
            },
        options: {
            responsive: true
        }
    });
    
    
    
    // Single Line Chart
    var ctx3 = $("#line-chart").get(0).getContext("2d");
    var myChart3 = new Chart(ctx3, {
        type: "line",
        data: {
            labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
            datasets: [{
                label: "Salse",
                fill: false,
                backgroundColor: "rgba(235, 22, 22, .7)",
                data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]
            }]
        },
        options: {
            responsive: true
        }
    });
    
    
    // Single Bar Chart
    var ctx4 = $("#bar-chart").get(0).getContext("2d");
    var myChart4 = new Chart(ctx4, {
        type: "bar",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });
    
    
    // Pie Chart
    var ctx5 = $("#pie-chart").get(0).getContext("2d");
    var myChart5 = new Chart(ctx5, {
        type: "pie",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });
    
    
    // Doughnut Chart
    var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
    var myChart6 = new Chart(ctx6, {
        type: "doughnut",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });
    })

    const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
    const [user, setUser] = useState(null);
  
      useEffect(() => {
          setIsLoggedIn(isUserLoggedIn())
          if (isLoggedIn) {
            const token = localStorage.getItem('Admintoken');
            fetchUserDetails(token).then(userData => {
              if (userData) {
                setUser(userData);
              }
            });
          };
      }, []);
      
  return (
    <>
<link rel="stylesheet" href="./src/assets/css/bg-color.css" />
    
 <div className="container-fluid position-relative d-flex p-0">
    {/* Spinner Start */}
    <div id="spinner" className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
    {/* Spinner End */}

    {/* Sidebar Start */}
    <div className="sidebar pe-4 pb-3" style={{ background: 'rgba(6, 12, 34, 0.98)' }}>
        <nav className="navbar navbar-dark">
            <Link to="/" className="navbar-brand mb-3">
            <img src="/src/assets/img/logo.png" style={{height:'40px'}} alt="" title=""/>
            </Link>
            <div className="d-flex align-items-center ms-4 mb-4">
                <div className="position-relative">
                    <img className="rounded-circle" src="./src/assets/img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />
                    <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                </div>
                <div className="ms-3">
                {isLoggedIn ? (
                       <h6 className="mb-0">{user ? user.name : 'Profile'}</h6>
                    ) : (
                        <h6 className="mb-0">Register</h6>
                    )}

                    <span>Admin</span>
                </div>
            </div>
            <div className="navbar-nav w-100">
                <Link to="/" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2"></i>Dashboard</Link>
                <div className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Expo</a>
                    <div className="dropdown-menu bg-transparent border-0">
                        <Link to="/events" className="dropdown-item">Events</Link>
                        <Link to="/create/expo" className="dropdown-item">Create</Link>
                    </div>
                </div>
                <Link to="/exhibitors" className="nav-item nav-link"><i className="fa fa-keyboard me-2"></i>Exhibitors</Link>
                <Link to="/attendees" className="nav-item nav-link"><i className="fa fa-table me-2"></i>Attendees</Link>
                <Link to="/contacts" className="nav-item nav-link"><i className="fa fa-table me-2"></i>Contacts</Link>
             
            </div>
        </nav>
    </div>
    {/* Sidebar End */}

    {/* Content Start */}
</div>
  
</>
  )
}

export default Sidebar
