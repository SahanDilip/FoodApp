import React from 'react'
import {assets} from '../../assets/frontend_assets/assets'
import './Footer.css'

export default function Footer() {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur beatae iure nobis cupiditate accusamus cumque eligendi nulla? Odit eligendi incidunt rerum, doloremque necessitatibus reiciendis ut ducimus. Blanditiis quaerat non nostrum perferendis eligendi vero soluta quisquam iste consequuntur explicabo dignissimos maxime sunt eaque ducimus suscipit hic ut repellendus quod repellat fugit, quas sequi ipsa! Distinctio aperiam nobis voluptatibus ab quae molestias placeat odio fuga. Possimus sapiente suscipit quas, ipsa deleniti tempora debitis molestiae, quisquam explicabo reprehenderit blanditiis earum. Illum, aspernatur iste id blanditiis esse laboriosam, maiores tenetur tempora provident sequi temporibus neque sint consectetur voluptas culpa vitae. Sint enim eius incidunt!
            </p>
            <div className='footer-social-icons'>
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
                </div>
        </div>
        <div className='footer-content-center'>
            <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivary</li>
                    <li>Privacy policy</li>
                </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 9956515444</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
        </div>
        <hr />
      <p className='footer-copyrights'>copyrights 2024 c tomato.com - All Rights Reserved.</p>
    </div>
  )
}
