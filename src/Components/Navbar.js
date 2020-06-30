import React from "react";
import {NavLink,Link } from "react-router-dom";
import './Navbar.css'


const Navbar =()=>(
<div className="nav-class">

<div className="nav-left">
<NavLink to="/shop/" className="nav-link"> <i class="fas fa-circle"></i> Shop <i class="fas fa-circle"></i></NavLink>
</div>
<div className="nav-right">
<NavLink to="/about/" className="nav-link"> <i class="fas fa-circle"></i> About <i class="fas fa-circle"></i></NavLink>
</div>
<Link to="/" className="navbar-brand logo-top" > <img className="logo-img" src="https://scontent.fcai20-2.fna.fbcdn.net/v/t1.0-9/41338998_321602361923394_2020919229598924800_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_eui2=AeH277J73WLGTuf7CVR3c_t3nYZl65maD6OdhmXrmZoPo2cCd3ZxJs0M--CzkZZvfmYJeGFHrcCd1kZahxHCZJsi&_nc_ohc=xN_PtqHAQvsAX-iIGky&_nc_ht=scontent.fcai20-2.fna&oh=fd540c30446972329a89eb38b11f162c&oe=5F186C6D"/></Link>


</div>
)

export default Navbar;