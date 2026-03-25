import React, { useEffect, useState } from 'react'
import logo from "../images/logo.png"
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'


const ConfirmOTP = () => {
  const [userCred, setUserCred] = useState()
  const [OTP, setOTP] = useState("")
  const navigate = useNavigate()
  
  useEffect(() => {
    const getCred = localStorage.getItem("userCred")
    setUserCred(JSON.parse(getCred))
  }, [])
  
  const navigateToSignIn = () =>{
      navigate("/signin")
  }
  const ConfirmOTP = () =>{
    if (userCred) {
      axios.post("https://new-ethereal-bk.onrender.com/confirmOTP",{
        mail: userCred.email,
        OTP
      })
      .then((output)=>{
        navigate("/dashboard")
        alert("successful")
      })
      .catch((error)=>{
        if (error?.response?.data?.message) { 
          alert(error?.response?.data?.message)
          setOTP("")
        }
      })
    }
    else{
      alert("session logged out, please sign in to reconfirm OTP")
    }
  }

  const resendOTP = () =>{
    axios.post("https://new-ethereal-bk.onrender.com/resendOTP", {
      firstName: userCred.firstName,
      email: userCred.email
    })
    .then((output)=>{
      alert("OTP resent successfuly")
    })
    .catch((error)=>{
      if (error.response.data.message) {
        alert(error.response.data.message)
      }
    })
  }
  return (
    <div>
      <div className='sign-overall'>
          <div className="sign-dialogue">
              <div className="start">
                  <img src={logo} alt="" />
                  <h3>Ethereal NotePad</h3>
              </div>
              <h3>OTP</h3>
              <h6>Check your mail and input your OTP</h6>
              <input type="text" className='otpInput' placeholder='Your OTP Here' value={OTP} onChange={(e)=>{setOTP(e.target.value)}}/>
              <button onClick={ConfirmOTP}>Confirm</button>
              <div className="optionsParent">
                  <div className="options">
                    <h6>Go to <span onClick={navigateToSignIn}>Sign In</span></h6>
                  </div>
                  <p onClick={resendOTP}>Resend OTP</p>
              </div>
          </div>
      </div>
    </div>
  )
}

export default ConfirmOTP
