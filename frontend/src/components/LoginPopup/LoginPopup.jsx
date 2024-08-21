import React from 'react'
import './LoginPopup.css'
import { useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets';

export default function LoginPopup({setShowLogin}) {
    const [currentState, setCurrentState] = useState('Login');
  return (
    <div className='login-popup'>
      <form className='login-popup-container'>
        <div className='login-popup-title'>
            <h2>{currentState}</h2>
            <img src={assets.cross_icon} alt='cross' onClick={()=>setShowLogin(false)}/>
        </div>
        <div className='login-popup-input'>
            {currentState === "Login" ? <></> : <input type='text' placeholder='your name' required/>}
            <input type='email' placeholder='your email' required/>
            <input type='password' placeholder='Password' required/>
        </div>
        <button >{currentState === "Sign Up" ? "create account" : "Login"}</button>
        <div className='login-popup-conditions'>
            <input type = 'checkbox' required/>
            <p>By creating an account, you agree to the Terms of Service and Privacy Policy</p>
        </div>
        {currentState === "Login" ? 
          <p>Create New Account ? <span onClick={()=> setCurrentState("Sign Up")}>Click here</span></p>  
         :<p>Already Have an account <span onClick={()=> setCurrentState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}
