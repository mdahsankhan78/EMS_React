import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const Blank = () => {
  // State to manage which link is being hovered
  const [hoveredLink, setHoveredLink] = useState(null);

  // Event handlers for mouse enter and leave
  const handleMouseEnter = (linkName) => setHoveredLink(linkName);
  const handleMouseLeave = () => setHoveredLink(null);


   // Inline style for links, changing color based on hover state
   const linkStyle = (linkName) => ({
    color: hoveredLink === linkName ? '#f82249' : '#fff',
    textDecoration: 'none',
    marginRight: '10px'
  });

  return (
    <>

    <section id="speakers" className="wow fadeInUp">
    <div className="container">
      <div className="section-header">
        <h2>Register as Exhibitor or Attendee</h2>
        <p>Register as an exhibitor to showcase your products and services to a wide audience, or register as an attendee to gain valuable insights and network with industry leaders.</p>
      </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ul class="nav-menu">
          
          <li class="buy-tickets" >
            <Link  style={linkStyle('exhibitor')}  onMouseEnter={() => handleMouseEnter('exhibitor')}
            onMouseLeave={handleMouseLeave}
          // onClick={navigateToFooter} 
          onClick={() => window.location.href = 'http://localhost:5173/register'}>Register as Exhibitor</Link>
          
          <Link style={linkStyle('attendee')}  onMouseEnter={() => handleMouseEnter('attendee')}
            onMouseLeave={handleMouseLeave} to='/register'>
          Register as Attendee
          </Link></li>
        </ul>
        </div>
      </div>
    </section> 
    </>
  )
}

export default Blank