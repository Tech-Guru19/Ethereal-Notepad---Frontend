import React, { useRef, useState } from 'react'
import "../ComponentsStyles/Tag.css"
import addIcon from "../images/plus.png"
import optionIcon from "../images/option.png"
import closeIcon from "../images/close.png"
import pen from "../images/pen.png"
import binIcon from "../images/recycle-bin.png"
import axios from 'axios'


const Tag = ({setTagActive, setAddTagActive, tags, setTags, setTagObj, setEditTagActive}) => {
  const [availabeBg, setAvailableBg] = useState(["rgb(135,186,244)", "rgb(170,135,244)", "rgb(239,134,74)", "rgb(245,116,172)", "rgb(31,28,47)"])
  const colorIndex = useRef(1)
  const [optionActive, setOptionActive] = useState(false)

  const showOption = (i) =>{
    if (!optionActive) {
      document.querySelectorAll(".tag-overall .option").forEach((opt)=>{
        opt.style.display = "none"
      })
      document.getElementById(`option${i}`).style.display = "flex"
      setOptionActive(true)
    }
    else{
      closeOption()
    }
  }

  const closeOption = () =>{
    if (optionActive) {
      document.querySelectorAll(".tag-overall .option").forEach((opt)=>{
        opt.style.display = "none"
      })
      setOptionActive(false)
    }
  }

  const editTag = (output) =>{
    setTagObj(output)
    setEditTagActive(true)
  }

  const deleteTag = (id) =>{
    setTags(tags=> tags.filter(tag=> tag?._id != id))
    axios.post("https://ethereal-notepad-backend.onrender.com/deleteTag", {id})
    .then(()=>{

    })
    .catch((error)=>{
      alert("Error occured while deleting Tag")
      console.log(error);
      
    })
  }

  return (
    <div className='tag-overall'>
        <img src={closeIcon} onClick={()=>{setTagActive(false)}} alt="" className="close-icon" />
      <div className="container">
        <div className="head" onClick={()=>{setAddTagActive(true)}}>
            <h1>Tag List</h1>
            <img src={addIcon} alt="" />
        </div>
        <div className="tag-parent">
            {
                tags.map((output, i)=>{
                    return(
                    <div onClick={closeOption}>
                        <h2 style={{border: `1px solid ${output?.color}`}}>{output?.tagName[0]}</h2>
                        <p>{output?.tagName}</p>
                        <img src={optionIcon} alt="" onClick={()=>{showOption(i)}}/>
                        <div className="option" id={`option${i}`}>
                          <div onClick={()=>{editTag(output)}}>
                            <img src={pen} alt="" />
                            <p>Edit</p>
                          </div>
                          <div onClick={()=>{deleteTag(output?._id)}}>
                            <img src={binIcon} alt="" />
                            <p>Delete</p>
                          </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
      </div>
    </div>
  )
}

export default Tag
