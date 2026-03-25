import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../Styles/SignPage.css"
import logo from "../images/logo.png"
import axios from 'axios';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)

    const navigateToSignUp = () =>{
        navigate("/signup")
    }

    const navigateToConfirmOTP = () =>{
        navigate("/confirmOTP")
    }

    const signIn = () =>{
      if (!email) {
        alert("Please input your Email")
      }
      else if(!email.match(/^[A-Za-z0-9\-_]{2,}@[A-Za-z]{2,}(\.[A-Za-z]{2,})+$/)){
        alert("Please input a valid Email")
      }
      else if(!password){
        alert("Please enter your password")
      }
      else{
        setBtnDisabled(true)
        axios.post("https://new-ethereal-bk.onrender.com/singin", {
          email,
          password
        })
        .then((output)=>{
          setBtnDisabled(false)
          const email = output.data.message.email
          const firstName = output.data.message.firstName
          localStorage.setItem("userCred", JSON.stringify({email, firstName}))
          alert("login successful")
          navigate("/dashboard")
        })
        .then((error)=>{
          setBtnDisabled(false)
          if (error?.response?.data?.message) {
            alert(error?.response?.data?.message)
          }
        })
      }
    }

  return (
    <div className='sign-overall'>
        <div className="sign-dialogue">
            <div className="start">
                <img src={logo} alt="" />
                <h3>Ethereal NotePad</h3>
            </div>
            <h3>Sign In</h3>
            <h6>Log In to stay connected.</h6>
            <div className="input-parent">
                <input type="email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="input-parent">
                <input type="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className="optionsParent">
              <div className="policy">
                  <input type="checkbox" checked={remember} onChange={(e)=>{setRemember(e.target.checked)}}/>
                  <h6>Remeber Me</h6>
              </div>
              <h5>Forgot Password?</h5>
            </div>
            {btnDisabled? <button>Loading...</button> : <button onClick={signIn}>Sign In</button>}
            
            <div className="options">
                <h6>Don't have an Account <span onClick={navigateToSignUp}>Sign Up</span> or <span onClick={navigateToConfirmOTP}>Verify OTP</span></h6>
            </div>
        </div>
    </div>
  )
}

export default SignIn
