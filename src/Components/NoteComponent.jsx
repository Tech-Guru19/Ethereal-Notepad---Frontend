import React, { useState } from 'react'
import "../ComponentsStyles/Note.css"
import pen from "../images/pen.png"
import mail from "../images/mail.png"
import notification from "../images/notification.png"
import noteIcon from "../images/notes.png"
import pinIcon from "../images/thumbtacks.png"
import favIcon from "../images/heart.png"
import optionIcon from "../images/option.png"
import filledHeart from "../images/heart (1).png"
import photoIcon from "../images/photo.png"
import axios from 'axios'
import eyeIcon from "../images/view.png"
import binIcon from "../images/recycle-bin.png"
import archiveIcon from "../images/archive.png"
import recoverIcon from "../images/upload.png"
import Preview from './Preview'
import dateIcon from "../images/calendar.png"
import reminderDateIcon from "../images/reminder.png"


const NoteComponent = ({cards, setCards, userCred, setUserCred, currentSection, setPreviewValue, setPreview, setEditNote, allCollection, setEditObj, currentCollection}) => {
    const [currentOption, setCurrentOption] = useState(false)
    const [optionActive, setOptionActive] = useState(false)

    const changeNoteCred = (id, valueToEdit, value) =>{
        setCards(prev=> prev.map((output)=>{
            console.log(output);
            
            if (output?._id == id) {
                return {...output, [valueToEdit]: value}
            }
            return output
        }))
        axios.post("https://new-ethereal-bk.onrender.com/editNoteValue",{
            id,
            valueToEdit,
            value
        })
        .then(()=>{
        })
        .catch(()=>{
            alert("Error removing favourite")
        })
    }

    const showOption = (index) =>{
        document.querySelectorAll(`.card-options`).forEach((cardOption)=>{
            cardOption.style.display = "none"
        })
        if (!optionActive) { 
            document.getElementById(`card-option${index}`).style.display = "flex"
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

    const showBackground = (index, background) =>{
        document.getElementById(`card${index}`).style.background = background
        document.querySelectorAll(`#card${index} .invert-icon`).forEach((icon)=>{
            icon.style.filter = "invert(1)"
        })
        document.querySelector(`#card${index} .category-icon`).style.border = "1px solid black"
    }

    const removeBg = (index, background) =>{
        document.getElementById(`card${index}`).style.background = "white"
        document.querySelectorAll(`#card${index} .invert-icon`).forEach((icon)=>{
            icon.style.filter = "none"
        })
        document.querySelector(`#card${index} .category-icon`).style.border = `1px solid ${background}`
    }

    const previewNote = (output) =>{
        setPreview(true)
        setPreviewValue(output)
    }

    const addNote = ()=>{
        setEditNote(true)
    }

    const editDialogue = (output) =>{
        setEditObj(output)
        setEditNote("edit")
    }

    const deleteNotePermanently = (output) =>{
        axios.post("https://new-ethereal-bk.onrender.com/deleteNote", {
            id: output?._id
        })
        setCards(cards=>cards.filter(card=> card?._id != output?._id))
    } 

    const closeMenu = () =>{
        if (window.innerWidth <= 1244) {
            document.querySelector(".sidemenu-overall").style.display = "none"
        }
    }

  return (
    <div className='note-overall' onClick={closeMenu}>
        <header>
            <div className="write-note">
                <div onClick={addNote}>
                    <img src={pen} alt="" />
                    <p>Write Your Note</p>
                </div>
            </div>
            <div className="updates">
                <img src={mail} alt="" />
                <img src={notification} alt="" />
            </div>
        </header>
        <section className="note-body">
            {currentSection == "allNote"? (<h1>Your Notes</h1>): currentSection == "collections"? <h1>{currentCollection + " Collection"}</h1>: <h1>{currentSection}</h1>}
            {currentSection == "allNote"? (
                <div className="options">
                    <p onClick={()=>{setCurrentOption(false)}} className={!currentOption? 'selected': null}>All</p>
                    <p onClick={()=>{setCurrentOption("favourite")}} className={currentOption == "favourite"? 'selected': null}>Favourite Notes</p>
                    <p onClick={()=>{setCurrentOption("pinned")}} className={currentOption == "pinned"? 'selected': null}>Pin Notes</p>
                </div>
            ) : null}
            <div className="card-parent">
                {
                    cards.slice().reverse().map((output,index)=>{

                        if (currentSection == "allNote") {
                            if (output?.section == "allNote") {
                                if (!currentOption) {
                                    return(
                                        <div className="card" id={`card${index}`} onMouseOver={()=>{showBackground(index, output?.background)}} onMouseLeave={()=>{removeBg(index, output?.background)}} onClick={closeOption}>
                                            <div className="card-options" id={`card-option${index}`} onClick={(e)=>{closeOption(e)}}>
                                                <div onClick={()=>{previewNote(output)}}>
                                                    <img src={eyeIcon} alt="" />
                                                    <p>View</p>
                                                </div>
                                                <div onClick={()=>{editDialogue(output)}}>
                                                    <img src={pen} alt="" />
                                                    <p>Edit</p>
                                                </div>
                                                <div onClick={output?.pinned? ()=>{changeNoteCred(output?._id, "pinned", false)} :()=>{changeNoteCred(output?._id, "pinned", true)} }>
                                                    <img src={pinIcon} alt="" />
                                                    {output?.pinned? <p>Unpin</p> : <p>Pin</p>}
                                                </div>
                                                <div onClick={()=>{changeNoteCred(output?._id, "section", "archived")}}>
                                                    <img src={archiveIcon} alt="" />
                                                    <p>Archive</p>
                                                </div>                                                                                 
                                                <div onClick={()=>{changeNoteCred(output?._id, "section", "bin")}}>
                                                    <img src={binIcon} alt="" />
                                                    <p>Delete</p>
                                                </div>

                                            </div>
                                            <div className="head">
                                                <img src={output?.category? output?.category+".png" : noteIcon} className='invert-icon category-icon' style={{border:`1px solid ${output?.background}`}} alt="" />
                                                <div className="other-icon">
                                                    {output?.pinned? <img src={pinIcon} className='invert-icon' alt="" /> : null}
                                                    {output?.favourite? <img src={filledHeart} onClick={()=>{changeNoteCred(output?._id, "favourite", false)}} alt="" />: <img onClick={()=>{changeNoteCred(output?._id, "favourite", true)}} src={favIcon} alt="" className='invert-icon'/>}
                                                    <img src={optionIcon} className='option-icon invert-icon' onClick={(e)=>{showOption(index)}} alt="" />
                                                </div>
                                            </div>
                                            {output?.noteTitle? <h1 className='invert-icon'>{output?.noteTitle}</h1> : null}
                                            {output?.noteText? <p className='invert-icon'>{output?.noteText}</p> : null}
                                            <div className="img-parent">
                                                {output?.imageUrl? <img src={output?.imageUrl}/> : <img src={photoIcon}/>}
                                            </div>
                                            {output?.background? <div style={{background:`${output?.background}`}} className="line"></div>: <div style={{background:"rgb(41, 133, 214)"}} className="line"></div>}
                                            <div className="date-parent">
                                                <div>
                                                    <img className='invert-icon' src={dateIcon} alt="" />
                                                    <p className='invert-icon'>{output?.dateCreated || "No Date"}</p>
                                                </div>
                                                <div>
                                                    <img className='invert-icon' src={reminderDateIcon} alt="" />
                                                    <p className='invert-icon'>{output?.reminderDate? output?.reminderDate : "Not Set"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                else if (currentOption == "favourite") {
                                    if (output?.favourite) {
                                        return(
                                            <div className="card" id={`card${index}`} onMouseOver={()=>{showBackground(index, output?.background)}} onMouseLeave={()=>{removeBg(index, output?.background)}} onClick={closeOption}>
                                                <div className="card-options" id={`card-option${index}`} onClick={(e)=>{closeOption(e)}}>
                                                    <div onClick={()=>{previewNote(output)}}>
                                                        <img src={eyeIcon} alt="" />
                                                        <p>View</p>
                                                    </div>
                                                    <div onClick={()=>{editDialogue(output)}}>
                                                        <img src={pen} alt="" />
                                                        <p>Edit</p>
                                                    </div>
                                                    <div onClick={output?.pinned? ()=>{changeNoteCred(output?._id, "pinned", false)} :()=>{changeNoteCred(output?._id, "pinned", true)} }>
                                                        <img src={pinIcon} alt="" />
                                                        {output?.pinned? <p>Unpin</p> : <p>Pin</p>}
                                                    </div>
                                                    <div onClick={()=>{changeNoteCred(output?._id, "section", "archived")}}>
                                                        <img src={archiveIcon} />
                                                        <p>Archive</p>
                                                    </div>                                           
                                                    <div>
                                                        <img src={binIcon} alt="" onClick={()=>{changeNoteCred(output?._id, "section", "bin")}}/>
                                                        <p>Delete</p>
                                                    </div>

                                                </div>
                                                <div className="head">
                                                    <img src={output?.category? output?.category+".png" : noteIcon} className='invert-icon category-icon' style={{border:`1px solid ${output?.background}`}} alt="" />
                                                    <div className="other-icon">
                                                        {output?.pinned? <img src={pinIcon} className='invert-icon' alt="" /> : null}
                                                        {output?.favourite? <img src={filledHeart} onClick={()=>{changeNoteCred(output?._id, "favourite", false)}} alt="" />: <img onClick={()=>{changeNoteCred(output?._id, "favourite", true)}} src={favIcon} alt="" className='invert-icon'/>}                                                        
                                                        <img src={optionIcon} className='option-icon invert-icon' onClick={(e)=>{showOption(index)}} alt="" />
                                                    </div>
                                                </div>
                                                {output?.noteTitle? <h1 className='invert-icon'>{output?.noteTitle}</h1> : null}
                                                {output?.noteText? <p className='invert-icon'>{output?.noteText}</p> : null}
                                                <div className="img-parent">
                                                    {output?.imageUrl? <img src={output?.imageUrl}/> : <img src={photoIcon}/>}
                                                </div>
                                                {output?.background? <div style={{background:`${output?.background}`}} className="line"></div>: <div style={{background:"rgb(41, 133, 214)"}} className="line"></div>}
                                                <div className="date-parent">
                                                    <div>
                                                        <img className='invert-icon' src={dateIcon} alt="" />
                                                        <p className='invert-icon'>{output?.dateCreated || "No Date"}</p>
                                                    </div>
                                                    <div>
                                                        <img className='invert-icon' src={reminderDateIcon} alt="" />
                                                        <p className='invert-icon'>{output?.reminderDate? output?.reminderDate : "Not Set"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                }
                                else if (currentOption == "pinned") {
                                    if (output?.pinned) {
                                        return(
                                            <div className="card" id={`card${index}`} onMouseOver={()=>{showBackground(index, output?.background)}} onMouseLeave={()=>{removeBg(index, output?.background)}} onClick={closeOption}>
                                                <div className="card-options" id={`card-option${index}`} onClick={(e)=>{closeOption(e)}}>
                                                    <div onClick={()=>{previewNote(output)}}>
                                                        <img src={eyeIcon} alt="" />
                                                        <p>View</p>
                                                    </div>
                                                    <div onClick={()=>{editDialogue(output)}}>
                                                        <img src={pen} alt="" />
                                                        <p>Edit</p>
                                                    </div>
                                                    <div onClick={output?.pinned? ()=>{changeNoteCred(output?._id, "pinned", false)} :()=>{changeNoteCred(output?._id, "pinned", true)} }>
                                                        <img src={pinIcon} alt="" />
                                                        {output?.pinned? <p>Unpin</p> : <p>Pin</p>}
                                                    </div>
                                                    <div onClick={()=>{changeNoteCred(output?._id, "section", "archived")}}>
                                                        <img src={archiveIcon} />
                                                        <p>Archive</p>
                                                    </div>                                           
                                                    <div>
                                                        <img src={binIcon} alt="" onClick={()=>{changeNoteCred(output?._id, "section", "bin")}}/>
                                                        <p>Delete</p>
                                                    </div>

                                                </div>
                                                <div className="head">
                                                    <img src={output?.category? output?.category+".png" : noteIcon} className='invert-icon category-icon' style={{border:`1px solid ${output?.background}`}} alt="" />
                                                    <div className="other-icon">
                                                        {output?.pinned? <img src={pinIcon} className='invert-icon' alt="" /> : null}
                                                        {output?.favourite? <img src={filledHeart} onClick={()=>{changeNoteCred(output?._id, "favourite", false)}} alt="" />: <img onClick={()=>{changeNoteCred(output?._id, "favourite", true)}} src={favIcon} alt="" className='invert-icon'/>}                                                        
                                                        <img src={optionIcon} className='option-icon invert-icon' onClick={(e)=>{showOption(index)}} alt="" />                                                        
                                                    </div>
                                                </div>
                                                {output?.noteTitle? <h1 className='invert-icon'>{output?.noteTitle}</h1> : null}
                                                {output?.noteText? <p className='invert-icon'>{output?.noteText}</p> : null}
                                                <div className="img-parent">
                                                    {output?.imageUrl? <img src={output?.imageUrl}/> : <img src={photoIcon}/>}
                                                </div>
                                                {output?.background? <div style={{background:`${output?.background}`}} className="line"></div>: <div style={{background:"rgb(41, 133, 214)"}} className="line"></div>}
                                                <div className="date-parent">
                                                    <div>
                                                        <img className='invert-icon' src={dateIcon} alt="" />
                                                        <p className='invert-icon'>{output?.dateCreated || "No Date"}</p>
                                                    </div>
                                                    <div>
                                                        <img className='invert-icon' src={reminderDateIcon} alt="" />
                                                        <p className='invert-icon'>{output?.reminderDate? output?.reminderDate : "Not Set"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                }
                            }
                        }
                        else if (currentSection == "reminder") {
                            if (output?.reminder) {
                                return(
                                    <div className="card" id={`card${index}`} onMouseOver={()=>{showBackground(index, output?.background)}} onMouseLeave={()=>{removeBg(index, output?.background)}} onClick={closeOption}>
                                        <div className="card-options" id={`card-option${index}`} onClick={(e)=>{closeOption(e)}}>
                                            <div onClick={()=>{previewNote(output)}}>
                                                <img src={eyeIcon} alt="" />
                                                <p>View</p>
                                            </div>
                                            <div onClick={()=>{editDialogue(output)}}>
                                                <img src={pen} alt="" />
                                                <p>Edit</p>
                                            </div>
                                            <div onClick={output?.pinned? ()=>{changeNoteCred(output?._id, "pinned", false)} :()=>{changeNoteCred(output?._id, "pinned", true)} }>
                                                <img src={pinIcon} alt="" />
                                                {output?.pinned? <p>Unpin</p> : <p>Pin</p>}
                                            </div>
                                            <div onClick={()=>{changeNoteCred(output?._id, "section", "archived")}}>
                                                <img src={archiveIcon} alt="" />
                                                <p>Archive</p>
                                            </div >                                                                                  
                                            <div onClick={()=>{changeNoteCred(output?._id, "section", "bin")}}>
                                                <img src={binIcon} alt="" />
                                                <p>Delete</p>
                                            </div>

                                        </div>
                                        <div className="head">
                                            <img src={output?.category? output?.category+".png" : noteIcon} className='invert-icon category-icon' style={{border:`1px solid ${output?.background}`}} alt="" />
                                            <div className="other-icon">
                                                {output?.pinned? <img src={pinIcon} className='invert-icon' alt="" /> : null}
                                                {output?.favourite? <img src={filledHeart} onClick={()=>{changeNoteCred(output?._id, "favourite", false)}} alt="" />: <img onClick={()=>{changeNoteCred(output?._id, "favourite", true)}} src={favIcon} alt="" className='invert-icon'/>}                  
                                                <img src={optionIcon} className='option-icon invert-icon' onClick={(e)=>{showOption(index)}} alt="" />
                                            </div>
                                        </div>
                                        {output?.noteTitle? <h1 className='invert-icon'>{output?.noteTitle}</h1> : null}
                                        {output?.noteText? <p className='invert-icon'>{output?.noteText}</p> : null}
                                        <div className="img-parent">
                                            {output?.imageUrl? <img src={output?.imageUrl}/> : <img src={photoIcon}/>}
                                        </div>
                                        {output?.background? <div style={{background:`${output?.background}`}} className="line"></div>: <div style={{background:"rgb(41, 133, 214)"}} className="line"></div>}
                                        <div className="date-parent">
                                            <div>
                                                <img className='invert-icon' src={dateIcon} alt="" />
                                                <p className='invert-icon'>{output?.dateCreated || "No Date"}</p>
                                            </div>
                                            <div>
                                                <img className='invert-icon' src={reminderDateIcon} alt="" />
                                                <p className='invert-icon'>{output?.reminderDate? output?.reminderDate : "Not Set"}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }
                        else if (currentSection == "collections") {
                            if (output?.collection == currentCollection) {
                                return(
                                    <div className="card" id={`card${index}`} onMouseOver={()=>{showBackground(index, output?.background)}} onMouseLeave={()=>{removeBg(index, output?.background)}} onClick={closeOption}>
                                        <div className="card-options" id={`card-option${index}`} onClick={(e)=>{closeOption(e)}}>
                                            <div onClick={()=>{previewNote(output)}}>
                                                <img src={eyeIcon} alt="" />
                                                <p>View</p>
                                            </div>
                                            <div onClick={()=>{editDialogue(output)}}>
                                                <img src={pen} alt="" />
                                                <p>Edit</p>
                                            </div>
                                            <div onClick={output?.pinned? ()=>{changeNoteCred(output?._id, "pinned", false)} :()=>{changeNoteCred(output?._id, "pinned", true)} }>
                                                <img src={pinIcon} alt="" />
                                                {output?.pinned? <p>Unpin</p> : <p>Pin</p>}
                                            </div>
                                            <div onClick={()=>{changeNoteCred(output?._id, "section", "archived")}}>
                                                <img src={archiveIcon} alt="" />
                                                <p>Archive</p>
                                            </div >                                                                                  
                                            <div onClick={()=>{changeNoteCred(output?._id, "section", "bin")}}>
                                                <img src={binIcon} alt="" />
                                                <p>Delete</p>
                                            </div>

                                        </div>
                                        <div className="head">
                                            <img src={output?.category? output?.category+".png" : noteIcon} className='invert-icon category-icon' style={{border:`1px solid ${output?.background}`}} alt="" />
                                            <div className="other-icon">
                                                {output?.pinned? <img src={pinIcon} className='invert-icon' alt="" /> : null}
                                                {output?.favourite? <img src={filledHeart} onClick={()=>{changeNoteCred(output?._id, "favourite", false)}} alt="" />: <img onClick={()=>{changeNoteCred(output?._id, "favourite", true)}} src={favIcon} alt="" className='invert-icon'/>}                  
                                                <img src={optionIcon} className='option-icon invert-icon' onClick={(e)=>{showOption(index)}} alt="" />
                                            </div>
                                        </div>
                                        {output?.noteTitle? <h1 className='invert-icon'>{output?.noteTitle}</h1> : null}
                                        {output?.noteText? <p className='invert-icon'>{output?.noteText}</p> : null}
                                        <div className="img-parent">
                                            {output?.imageUrl? <img src={output?.imageUrl}/> : <img src={photoIcon}/>}
                                        </div>
                                        {output?.background? <div style={{background:`${output?.background}`}} className="line"></div>: <div style={{background:"rgb(41, 133, 214)"}} className="line"></div>}
                                        <div className="date-parent">
                                            <div>
                                                <img className='invert-icon' src={dateIcon} alt="" />
                                                <p className='invert-icon'>{output?.dateCreated || "No Date"}</p>
                                            </div>
                                            <div>
                                                <img className='invert-icon' src={reminderDateIcon} alt="" />
                                                <p className='invert-icon'>{output?.reminderDate? output?.reminderDate : "Not Set"}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }
                        else if (currentSection == "archived") {
                            if (output?.section == "archived") {
                                return(
                                    <div className="card" id={`card${index}`} onMouseOver={()=>{showBackground(index, output?.background)}} onMouseLeave={()=>{removeBg(index, output?.background)}} onClick={closeOption}>
                                        <div className="card-options" id={`card-option${index}`} onClick={(e)=>{closeOption(e)}}>
                                            <div onClick={()=>{previewNote(output)}}>
                                                <img src={eyeIcon} alt="" />
                                                <p>View</p>
                                            </div>
                                            <div onClick={()=>{editDialogue(output)}}>
                                                <img src={pen} alt="" />
                                                <p>Edit</p>
                                            </div>
                                            <div onClick={output?.pinned? ()=>{changeNoteCred(output?._id, "pinned", false)} :()=>{changeNoteCred(output?._id, "pinned", true)} }>
                                                <img src={pinIcon} alt="" />
                                                {output?.pinned? <p>Unpin</p> : <p>Pin</p>}
                                            </div>
                                            <div onClick={()=>{changeNoteCred(output?._id, "section", "allNote")}}>
                                                <img src={archiveIcon} alt=""/>
                                                <p>Unarchive</p>
                                            </div >                                                                                  
                                            <div onClick={()=>{changeNoteCred(output?._id, "section", "bin")}}>
                                                <img src={binIcon} alt="" />
                                                <p>Delete</p>
                                            </div>

                                        </div>
                                        <div className="head">
                                            <img src={output?.category? output?.category+".png" : noteIcon} className='invert-icon category-icon' style={{border:`1px solid ${output?.background}`}} alt="" />
                                            <div className="other-icon">
                                                {output?.pinned? <img src={pinIcon} className='invert-icon' alt="" /> : null}
                                                {output?.favourite? <img src={filledHeart} onClick={()=>{changeNoteCred(output?._id, "favourite", false)}} alt="" />: <img onClick={()=>{changeNoteCred(output?._id, "favourite", true)}} src={favIcon} alt="" className='invert-icon'/>}
                                                <img src={optionIcon} className='option-icon invert-icon' onClick={(e)=>{showOption(index)}} alt="" />
                                            </div>
                                        </div>
                                        {output?.noteTitle? <h1 className='invert-icon'>{output?.noteTitle}</h1> : null}
                                        {output?.noteText? <p className='invert-icon'>{output?.noteText}</p> : null}
                                        <div className="img-parent">
                                            {output?.imageUrl? <img src={output?.imageUrl}/> : <img src={photoIcon}/>}
                                        </div>
                                        {output?.background? <div style={{background:`${output?.background}`}} className="line"></div>: <div style={{background:"rgb(41, 133, 214)"}} className="line"></div>}
                                        <div className="date-parent">
                                            <div>
                                                <img className='invert-icon' src={dateIcon} alt="" />
                                                <p className='invert-icon'>{output?.dateCreated || "No Date"}</p>
                                            </div>
                                            <div>
                                                <img className='invert-icon' src={reminderDateIcon} alt="" />
                                                <p className='invert-icon'>{output?.reminderDate? output?.reminderDate : "Not Set"}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }
                        else if (currentSection == "bin") {
                            if (output?.section == "bin") {
                                return(
                                    <div className="card" id={`card${index}`} onMouseOver={()=>{showBackground(index, output?.background)}} onMouseLeave={()=>{removeBg(index, output?.background)}} onClick={closeOption}>
                                        <div className="head">
                                            <img src={output?.category? output?.category+".png" : noteIcon} className='invert-icon category-icon' style={{border:`1px solid ${output?.background}`}} alt="" />
                                            <div className="other-icon" onClick={()=>{changeNoteCred(output?._id, "section", "allNote")}}>
                                                <img src={recoverIcon} alt="" className='invert-icon'/>
                                                <img src={binIcon} className='invert-icon' alt="" onClick={()=>{deleteNotePermanently(output)}}/>
                                            </div>
                                        </div>
                                        {output?.noteTitle? <h1 className='invert-icon'>{output?.noteTitle}</h1> : null}
                                        {output?.noteText? <p className='invert-icon'>{output?.noteText}</p> : null}
                                        <div className="img-parent">
                                            {output?.imageUrl? <img src={output?.imageUrl}/> : <img src={photoIcon}/>}
                                        </div>
                                        {output?.background? <div style={{background:`${output?.background}`}} className="line"></div>: <div style={{background:"rgb(41, 133, 214)"}} className="line"></div>}
                                        <div className="date-parent">
                                            <div>
                                                <img className='invert-icon' src={dateIcon} alt="" />
                                                <p className='invert-icon'>{output?.dateCreated || "No Date"}</p>
                                            </div>
                                            <div>
                                                <img className='invert-icon' src={reminderDateIcon} alt="" />
                                                <p className='invert-icon'>{output?.reminderDate? output?.reminderDate : "Not Set"}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })
                }
            </div>
        </section>
    </div>
  )
}

export default NoteComponent
