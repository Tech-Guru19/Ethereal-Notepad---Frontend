import React, { useEffect, useState } from 'react'
import "../ComponentsStyles/CreateNote.css"
import mailIcon from "../images/mail.png"
import notification from "../images/notification.png"
import optionIcon from "../images/option.png"
import photoIcon from "../images/photo.png"
import axios from 'axios'
import binIcon from "../images/recycle-bin.png"
import backArrow from "../images/left.png"
import dateIcon from "../images/calendar.png"
import reminderDateIcon from "../images/reminder.png"
import resetIcon from "../images/rewind-double-arrow-outline-multimedia-button-symbol.png"
import saveIcon from "../images/download.png"

const EditComponent = ({setEditNote, allCollection, mail, editObj, setCards}) => {
    const [optionActive, setOptionActive] = useState(false)
    const [noteTitle, setNoteTitle] = useState(editObj?.noteTitle)
    const [noteText, setNoteText] = useState(editObj?.noteText)
    const [imageUrl, setImageUrl] = useState(editObj?.imageUrl)
    const [imgFile, setImgFile] = useState()
    const [reminder, setReminder] = useState(editObj.reminder)
    const [reminderDate, setReminderDate] = useState(editObj?.reminderDate)
    const [category, setCategory] = useState(editObj?.category)
    const [background, setBackground] = useState(editObj?.background)
    const [dateCreated, setDateCreated] = useState(editObj?.dateCreated)
    const [collection, setCollection] = useState(editObj?.collection)
    const [availabeBg, setAvailableBg] = useState(["rgb(135,186,244)", "rgb(170,135,244)", "rgb(239,134,74)", "rgb(245,116,172)", "rgb(31,28,47)"])
    const today = new Date().toISOString().split('T')[0]
    
    const showBackground = (background) =>{
        document.querySelector(`.create-note-overall .card`).style.background = background
        document.querySelectorAll(`.create-note-overall .card .invert-icon`).forEach((icon)=>{
            icon.style.filter = "invert(1)"
        })
        document.querySelector(`.create-note-overall .card .category-icon`).style.border = "1px solid black"
    }

    const removeBg = (background) =>{
        document.querySelector(`.create-note-overall .card`).style.background = "white"
        document.querySelectorAll(`.create-note-overall .card .invert-icon`).forEach((icon)=>{
            icon.style.filter = "none"
        })
        document.querySelector(`.create-note-overall .card .category-icon`).style.border = `1px solid ${background}`
    }

    const showOption = () =>{
        if (!optionActive) { 
            document.querySelector(`.create-note-overall .card .card-options`).style.display = "flex"
            setOptionActive(true)
        }
        else{
            setOptionActive(false)
        }
    }
    const closeOption = (e) =>{
        if (optionActive) {
            document.querySelectorAll(`.card-options`).forEach((cardOption)=>{
                cardOption.style.display = "none"
            })
            setOptionActive(false)
        }
    }

    const handleImg = (e) =>{
        const file = e.target.files[0]
        setImgFile(file)
        const reader = new FileReader()
        const url = URL.createObjectURL(file)        
        setImageUrl(url)
    }

    const resetNote = ()=>{
        setNoteTitle("")
        setNoteText("")
        setImageUrl("")
        setImgFile("")
        setReminder(false)
        setReminderDate("")
        setCategory("1")
        setBackground("rgb(135,186,245)")
        setDateCreated("")
        setCollection("")
    }   

    const saveNote = () =>{
        if (!noteTitle) {
            alert("Note Title is required")
            return
        }
        else if(!noteText){
            alert("Note text is required")
            return
        }
        const form = new FormData()
        form.append("id", editObj?._id)
        form.append("mail", mail)
        form.append("noteTitle", noteTitle)
        form.append("noteText", noteText)
        form.append("image", imgFile)
        form.append("reminder", reminder)
        form.append("reminderDate", reminderDate)
        form.append("category", category)
        form.append("collection", collection)
        form.append("background", background)
        form.append("dateCreated", editObj?.dateCreated)
        axios.post("https://new-ethereal-bk.onrender.com/editNote", form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(()=>{
            alert("successful")
            setCards(items=>items.map((card)=>{
                if (card._id == editObj?._id) {
                    return {...card, 
                        noteTitle,
                        noteText,
                        imageUrl,
                        reminder,
                        reminderDate,
                        category,
                        background,
                        dateCreated,
                        collection,
                    }
                }
                return card
            }))
            resetNote()
            setEditNote(false)
        })
        .catch((error)=>{
            alert("error saving note")
            
        })
    }

  return (
    <div className='create-note-overall'>
        <header>
            <div className="write-note">
                   <h1>Edit Note</h1>
                   <div className="back" onClick={()=>{setEditNote(false)}}>
                        <img src={backArrow} alt="" />
                        <p>Back</p>
                   </div>
            </div>
            <div className="updates">
                <img src={mailIcon} alt="" />
                <img src={notification} alt="" />
            </div>
        </header>
        <section className="note-body">
            <div className="template">
                <p>Title</p>
                <input value={noteTitle} onChange={(e)=>{setNoteTitle(e.target.value)}} type="text" name="" id="" placeholder='Your TItle Here'/>
                <p>Description</p>
                <textarea value={noteText} onChange={(e)=>{setNoteText(e.target.value)}} name="" id="" placeholder='Your Text Here...'></textarea>
                <p>Reminder Date</p>
                <input value={reminderDate} onChange={(e)=>{setReminderDate(e.target.value), setReminder(true)}} type="date" name="" id="" min={today}/>
                <p>Collection</p>
                <div className="collection">
                    <input type="text" name="" id="" placeholder='Type Selection or Select Manually' value={collection} onChange={(e)=>{setCollection(e.target.value)}}/>
                    <select name="" id="" onChange={(e)=>{setCollection(e.target.value)}}>
                        <option value="" disabled selected>Select Collection</option>
                        {
                            allCollection.map((output)=>{
                                return(
                                    <option value={output}>{output}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <p>Icon</p>
                <div className="category-icon">
                    <img onClick={()=>{setCategory("1")}} className={category == "1"? "selected" : null} src="1.png" alt="" />
                    <img onClick={()=>{setCategory("2")}} className={category == "2"? "selected" : null} src="2.png" alt="" />
                    <img onClick={()=>{setCategory("3")}} className={category == "3"? "selected" : null} src="3.png" alt="" />
                    <img onClick={()=>{setCategory("4")}} className={category == "4"? "selected" : null} src="4.png" alt="" />
                    <img onClick={()=>{setCategory("5")}} className={category == "5"? "selected" : null} src="5.png" alt="" />
                    <img onClick={()=>{setCategory("6")}} className={category == "6"? "selected" : null} src="6.png" alt="" />
                    <img onClick={()=>{setCategory("7")}} className={category == "7"? "selected" : null} src="7.png" alt="" />
                    <img onClick={()=>{setCategory("8")}} className={category == "8"? "selected" : null} src="8.png" alt="" />
                </div>
                <div className="last-option">
                    <div>
                        <p>Upload Image</p>
                         <input type="file" onChange={(e)=>{handleImg(e)}} name="image" accept='image/*' id="image" />
                    </div>
                    <div>
                        <p>Select Background</p>
                        <div className="background-parent">
                            {
                                availabeBg.map((bg)=>(
                                    <div onClick={()=>{setBackground(bg)}} style={{background: bg}} className="bg"></div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="btn-parent">
                    <div className="back" onClick={resetNote}>
                        <img src={resetIcon} alt="" />
                        <p>Reset</p>
                    </div>
                    <div className="back save" onClick={saveNote}>
                        <img src={saveIcon} alt="" />
                        <p>Save</p>
                    </div>
                </div>
            </div>
            <div className="card" onMouseOver={()=>{showBackground(background)}} onMouseLeave={()=>{removeBg(background)}} onClick={closeOption}>
                <div className="card-options" onClick={(e)=>{closeOption(e)}}>                                       
                    <div onClick={resetNote}>
                        <img src={binIcon} alt="" />
                        <p>Delete</p>
                    </div>

                </div>
                <div className="head">
                    <img src={category + ".png"} className='invert-icon category-icon' style={{border:`1px solid ${background}`}} alt="" />
                    <div className="other-icon">
                        <img src={optionIcon} className='option-icon invert-icon' onClick={(e)=>{showOption()}} alt="" />
                    </div>
                </div>
                {noteTitle? <h1 className='invert-icon'>{noteTitle}</h1> : <h1 className='invert-icon'>Note Title Here</h1>}
                {noteText? <p className='invert-icon'>{noteText}</p> : <p className='invert-icon'>Your Note Text Here</p>}
                <div className="img-parent">
                    {imageUrl? <img src={imageUrl}/> : <img src={photoIcon}/>}
                </div>
                <div className="date-parent">
                    <div>
                        <img className='invert-icon' src={dateIcon} alt="" />
                        <p className='invert-icon'>{dateCreated}</p>
                    </div>
                    <div>
                        <img className='invert-icon' src={reminderDateIcon} alt="" />
                        <p className='invert-icon'>{reminderDate? reminderDate : "Not Set"}</p>
                    </div>
                </div>
                {background? <div style={{background:`${background}`}} className="line"></div>: <div style={{background:"rgb(41, 133, 214)"}} className="line"></div>}
            </div>
        </section>
    </div>
  )
}

export default EditComponent
