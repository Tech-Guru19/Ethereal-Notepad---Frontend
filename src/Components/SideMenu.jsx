import React, { useEffect, useState } from 'react'
import "../ComponentsStyles/SideMenu.css"
import logo from "../images/logo.png"
import profile07 from "../images/07.jpg"
import search from "../images/search-interface-symbol.png"
import addIcon from "../images/add.png"
import noteIcon from "../images/notes.png"
import collectionIcon from "../images/folder.png"
import alarmIcon from "../images/alarm.png"
import tagIcon from "../images/tag.png"
import binIcon from "../images/recycle-bin.png"
import archiveIcon from "../images/archive.png"
import closeIcon from "../images/icon-close.svg"


const SideMenu = ({userCred, setUserCred, currentSection, setCurrentSection, setEditNote, allCollection, setCurrentCollection, setTagActive}) => {
  const [collectionOption, setCollectionOption] = useState(false)
  const showCollections = () =>{
    setCollectionOption(!collectionOption)
  }
  
  const removeCollections = () =>{
    setCollectionOption(false)
  }
  const closeMenu = () =>{
    document.querySelector(".sidemenu-overall").style.display = "none"
  }

  return (
    <div className='sidemenu-overall'>
      <div className="start">
        <img src={logo} alt="" />
        <h3>Ethereal NotePad</h3>
        <img className='menu-close-icon' src={closeIcon} alt="" onClick={closeMenu} />
      </div>
      <div className="profile">
        <img src={profile07} alt="" />
        <p>{userCred?.firstName + " " + userCred?.lastName}</p>
        <h5>{">"}</h5>
      </div>
      <div className="scroll-parent">
        <div className="search-parent">
          <img src={search} alt="" />
          <input type="text" placeholder='Search'/>
        </div>
        <div className="new-note" onClick={()=>{setEditNote(true),closeMenu()}}>
          <img src={addIcon} alt="" />
          <p>Add New</p>
          <h6>{">"}</h6>
        </div>
        <div className="list-parent">
          <div onClick={()=>{setCurrentSection("allNote"), setEditNote(false), removeCollections(),closeMenu()}} className={currentSection == "allNote" ? 'selected' : null}>
              <img src={noteIcon} alt="" />
              <p>Your Notes</p>
          </div>
          <div id='collection-overall' onClick={()=>{setEditNote(false)}} className={currentSection == "reminder"? 'selected' : null}>
              <div onClick={showCollections}>
                <img src={collectionIcon} alt="" />
                <p>Collections</p>
                <h6>{">"}</h6>
              </div>
              {
                collectionOption?
                <div className="collections">
                  {
                    allCollection.map((collection)=>(
                      <p onClick={()=>{setCurrentSection("collections"), setEditNote(false), setCurrentCollection(collection), closeMenu()}}>{collection}</p>
                    ))
                  }
                </div>:
                null
              }
          </div>
          <div onClick={()=>{setCurrentSection("reminder"), setEditNote(false), removeCollections(), closeMenu()}} className={currentSection == "reminder"? 'selected' : null}>
              <img src={alarmIcon} alt="" />
              <p>Reminder</p>
          </div>
          <div onClick={()=>{setTagActive(true), setEditNote(false), removeCollections(), closeMenu()}} className={currentSection == "tags"? 'selected' : null}>
              <img src={tagIcon} alt="" />
              <p>Tags</p>
          </div>
          <div onClick={()=>{setCurrentSection("archived"), setEditNote(false), removeCollections(), closeMenu()}} className={currentSection == "archived"? 'selected' : null}>
              <img src={archiveIcon} alt="" />
              <p>Archive</p>
          </div>
          <div onClick={()=>{setCurrentSection("bin"), setEditNote(false), removeCollections(), closeMenu()}} className={currentSection == "bin"? 'selected' : null}>
              <img src={binIcon} alt="" />
              <p>Bin</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideMenu
