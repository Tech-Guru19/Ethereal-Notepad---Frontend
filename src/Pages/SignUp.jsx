import React, { use, useState } from 'react'
import "../Styles/SignPage.css"
import logo from "../images/logo.png"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [policy, setPolicy] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)
    const PasswordUppercase = /[A-Z]{1,}/
    const passwordLowercase = /[a-z]{3,}/
    const passwordNumerals = /[0-9]{2,}/
    const passwordSyntax = /[!@#\$%\^&*_\-+=;(){}'.<>]{1,}/
    const navigateToSignIn = () =>{
        navigate("/signin")
    }

    const navigateToConfirmOTP = () =>{
        navigate("/confirmOTP")
    }

    const signUpAccount = () =>{
        if(!firstName){
            alert("first name is required")
        }
        else if(firstName.length < 3){
            alert("Write your full first name")
        }
        else if(!lastName){
            alert("last name is required")
        }
        else if(lastName.length < 3){
            alert("Write your full last name")
        }
        else if(!email){
            alert("Email is required")
        }
        else if(!email.match(/^[A-Za-z0-9\-_]{2,}@[A-Za-z]{2,}(\.[A-Za-z]{2,})+$/)){
            alert("Invalid email")
        }
        else if(!country){
            alert("Country name is required")
        }
        else if(country.length < 3){
            alert("Write your full country name")
        }
        else if(!password){
            alert("Password is required")
        }
        else if(password != confirmPassword){
            alert("Password doesn't match")
        }
        else if(!(PasswordUppercase.test(password) && passwordLowercase.test(password) && passwordNumerals.test(password) && passwordSyntax.test(password) && password.length > 6)){
            alert("Weak password, ensure to use minimum of 7 characters, uppercase, lowercase, numbers and special chracters")
        }
        else if(!policy){
            alert("Accept policy to continue")
        }
        else{
            setBtnDisabled(true)
            axios.post("https://ethereal-notepad-backend.onrender.com/signup",{
                firstName,
                lastName,
                email,
                country,
                password
            })
            .then((output)=>{
                setBtnDisabled(false)
                alert("successful")
                localStorage.setItem("userCred", JSON.stringify({email, firstName}))
                navigate("/confrimOTP")
            })
            .catch((error)=>{
                setBtnDisabled(false)
                alert(error.response.data.message)
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
            <h3>Sign Up</h3>
            <h6>Create Your Account</h6>
            <div className="input-parent">
                <input type="text" placeholder='First Namae' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
            </div>
            <div className="input-parent">
                <input type="email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="text" name="" id="" placeholder='country' value={country} onChange={(e)=>{setCountry(e.target.value)}}/>
            </div>
            <div className="input-parent">
                <input type="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            </div>
            <div className="policy">
                <input type="checkbox" checked={policy} onChange={(e)=>{setPolicy(e.target.checked)}}/>
                <h6>I agree to the terms of use</h6>
            </div>
            {btnDisabled? <button>Loading...</button> :<button onClick={signUpAccount}>Sign Up</button>}
            <div className="options">
                <h6>Already have an Account <span onClick={navigateToSignIn}>Sign In</span> or <span onClick={navigateToConfirmOTP}>Verify OTP</span></h6>
            </div>
        </div>
    </div>
  )
}

export default SignUp