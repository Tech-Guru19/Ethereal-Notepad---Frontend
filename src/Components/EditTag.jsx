import React, { useEffect, useState } from 'react'
import "../ComponentsStyles/AddTag.css"
import axios from 'axios'

const EditTag = ({setTagObj, tagObj, mail, setEditTagActive, setTags}) => {
  const [availabeBg, setAvailableBg] = useState(["rgb(135,186,244)", "rgb(170,135,244)", "rgb(239,134,74)", "rgb(245,116,172)", "rgb(31,28,47)"])
    const [currentColorIndex, setCurrentColorIndex] = useState(0) 
    const [tagName, setTagName] = useState(tagObj?.tagName)
    const [color, setColor] = useState(tagObj?.color)
    const [_id, setId] = useState(tagObj?._id)

    useEffect(() => {
      setColor(availabeBg[currentColorIndex])
    }, [currentColorIndex])
    
    const saveTag = () =>{
        setTags(prev=> prev.map((tag)=>{
            if (tag._id == _id) {
                return{...tag, tagName, color}
            }
            return tag
        }))
        setEditTagActive(false)
        axios.post("https://new-ethereal-bk.onrender.com/editTag",{
            _id,
            tagName,
            color,
            mail
        })
        .then(()=>{
            
        })
        .catch((error)=>{
            console.log(error);
            alert("Error while adding tag")
            
        })
    }

  return (
    <div className='addTag-overall'>
      <div className="add-tag-container">
        <h1>Create New Tag</h1>
        <input type="text" name="" id="" placeholder='Enter Tag Name' value={tagName} onChange={(e)=>{setTagName(e.target.value)}}/>
        <div className="background-parent">
            {
                availabeBg.map((bg, i)=>{
                    return(
                        <div className={currentColorIndex == i? "selected bg" : "bg"} style={{background: bg}} onClick={()=>{setCurrentColorIndex(i)}}></div>
                    )
                })
            }
        </div>
        <div className="btn-parent">
            <button onClick={()=>{setEditTagActive(false)}}>Cancel</button>
            <button onClick={saveTag}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default EditTag
