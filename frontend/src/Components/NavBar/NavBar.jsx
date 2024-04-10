import React, { useContext, useState } from 'react'
import './NavBar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { AllContext } from '../../Context/AllContext'

export const NavBar = () => {

  const [menu, setMenu] = useState("All");
  const {getTotalCartItems} = useContext(AllContext);

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
          <p>SHOPPER</p>
      </div>  
        
        {/* implement infinite scroll */}
      <ul>
        <div className="nav-menu">
            <li onClick={()=>{setMenu("all")}}><Link style={{textDecoration: 'none'}} to ='/'>All</Link>{menu==="all"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("painting")}}><Link style={{textDecoration: 'none'}} to='/painting'>Paintings</Link>{menu==="painting"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("paperart")}}><Link style={{textDecoration: 'none'}} to='/paperart'>Paper Work</Link>{menu==="paperart"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("knitting")}}><Link style={{textDecoration: 'none'}} to='/knitting'>Knitting</Link>{menu==="knitting"?<hr/>:<></>}</li>
            {/* <li onClick={()=>{setMenu("home-decor")}}><Link style={{textDecoration: 'none'}} to='/home-decor'>Home Decor</Link>{menu==="home-decor"?<h/>:<></>}</li> */}
            <li onClick={()=>{setMenu("embroidary")}}><Link style={{textDecoration: 'none'}} to='/embroidary'>Embroidery</Link>{menu==="embroidary"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("jwellery")}}><Link style={{textDecoration: 'none'}} to='/jwellery'>Jwellery</Link>{menu==="jwellery"?<hr/>:<></>}</li>
            {/* <li onClick={()=>{setMenu("origami")}}><Link style={{textDecoration: 'none'}} to='/origami'>Origami</Link>{menu==="origami"?<hr/>:<></>}</li> */}
            <li onClick={()=>{setMenu("beadwork")}}><Link style={{textDecoration: 'none'}} to='/beadwork'>BeadWork</Link>{menu==="beadwork"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("pottery")}}><Link style={{textDecoration: 'none'}} to='/pottery'>Pottery</Link>{menu==="pottery"?<hr/>:<></>}</li>
        </div>
      </ul>

            <div className="nav-login-cart">
              {localStorage.getItem('auth-token')?
              <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:
              <Link to ='/login'><button>Login</button></Link>}
                
                <Link to ='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
    </div>
  )
}
