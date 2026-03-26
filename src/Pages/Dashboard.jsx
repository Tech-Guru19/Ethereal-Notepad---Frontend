import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Styles/Dashboard.css"
import SideMenu from '../Components/SideMenu'
import NoteComponent from '../Components/NoteComponent'
import loader from "../images/loader.gif"
import Preview from '../Components/Preview'
import CreateNote from '../Components/CreateNote'
import EditComponent from '../Components/EditComponent'
import Tag from '../Components/Tag'
import AddTag from '../Components/AddTag'
import EditTag from '../Components/EditTag'
import menu1 from "../images/text.png"
import menu2 from "../images/more.png"
import logo from "../images/logo.png"



const Dashboard = () => {
  const navigate = useNavigate()
  const [cards, setCards] = useState([])
  const [userCred, setUserCred] = useState()
  const [go, setGo] = useState(false)
  const [checked, setChecked] = useState(false)
  const [currentSection, setCurrentSection] = useState("allNote")
  const [loading, setLoading] = useState(true)
  const [preview, setPreview] = useState(false)
  const [previewValue, setPreviewValue] = useState({})
  const [EditNote, setEditNote] = useState(false)
  const [allCollection, setAllCollection] = useState([])
  const [editObj, setEditObj] = useState({})
  const [currentCollection, setCurrentCollection] = useState("")
  const [tagActive, setTagActive] = useState(false)
  const [addTagActive, setAddTagActive] = useState(false)
  const [editTagActive, setEditTagActive] = useState(false)
  const [tagObj, setTagObj] = useState({})
  const [tags, setTags] = useState([])

  useEffect(() => {
      const getCred = localStorage.getItem("userCred")
      setUserCred(JSON.parse(getCred))
      setGo(true)
    }, [])

    useEffect(() => {
      let holdCollection = []
      cards.map((output)=>{
        if (output?.collection && output?.collection != "undefined") {
          console.log(output?.collection);
          
          const filterCOllection = holdCollection.filter(col=> col != output?.collection)
          filterCOllection.push(output?.collection)
          holdCollection = filterCOllection
        }
      })
      setAllCollection(holdCollection)
    }, [cards])
    

    useEffect(() => {
      if (!go) {
        return
      }
      if (checked) {
        return
      }
      if (userCred) {
        setChecked(true)
        axios.post("https://new-ethereal-bk.onrender.com/fetchUserCred",{
          email: userCred.email
        })
        .then((userResult)=>{
          setUserCred(userResult?.data?.message)          
          if (userResult?.data?.message?.activated) { 
            axios.post("https://new-ethereal-bk.onrender.com/fetchAllNote", {
              mail: userCred.email
            })
            .then((output)=>{
              setCards(output?.data?.message || [])              
              setLoading(false)
              axios.post("https://new-ethereal-bk.onrender.com/fetchTags", {
                mail: userCred.email
              })
              .then((allTags)=>{
                console.log(allTags?.data?.message);
                
                setTags(allTags?.data?.message)
              })
              .catch((error)=>{
                alert("Error fetching Tags")
                console.log(error);
                
              })
            })
            .catch((error)=>{
              if (error?.response?.data?.message) {
                alert(error.response.data.message)
              }
            })
          }
          else{
            navigate("/confirmOTP")
          }
        })
        .catch((error)=>{
          if (error?.response?.data?.message) {
            alert(error?.response?.data?.message)
          }
          navigate("/signin")
        })

      }
      else{
        navigate("/signup")
      }
    }, [userCred])
    
  const openMenu = () =>{
    document.querySelector(".sidemenu-overall").style.display = "flex"
  }


  return (
    <div className='dashboard-overall'>
      <header className='dashboard-header'>
        <div>
          <img src={menu2} alt="" onClick={openMenu}/>
          <img src={logo} alt="" />
        </div>
          <img src={menu1} alt="" />
      </header>
      {preview? <Preview setPreview={setPreview} previewValue={previewValue} setPreviewValue={setPreviewValue}/> : null}
      {loading? (
        <div className="splash">
          <img src={loader} alt="" />
        </div>
      ) : null}
      <SideMenu setTagActive={setTagActive} setCurrentCollection={setCurrentCollection} allCollection={allCollection} setEditNote={setEditNote} userCred={userCred} setUserCred={setUserCred} currentSection={currentSection} setCurrentSection={setCurrentSection}/>
      {EditNote? EditNote == "edit"? <EditComponent setCards={setCards} editObj={editObj} mail={userCred?.email} allCollection={allCollection} setEditNote={setEditNote}/>: <CreateNote setCards={setCards} mail={userCred?.email} allCollection={allCollection} setEditNote={setEditNote}/> :<NoteComponent currentCollection={currentCollection} setEditObj={setEditObj} allCollection={allCollection} setEditNote={setEditNote} cards={cards} setCards={setCards} userCred={userCred} setUserCred={setUserCred} currentSection={currentSection} setPreview={setPreview} setPreviewValue={setPreviewValue}/>}
      {tagActive? <Tag setEditTagActive={setEditTagActive} setTagObj={setTagObj} tags={tags} setTags={setTags} setTagActive={setTagActive} setAddTagActive={setAddTagActive}/>: null}
      {addTagActive? <AddTag tagObj={tagObj} setTags={setTags} mail={userCred?.email} setAddTagActive={setAddTagActive}/>: null}
      {editTagActive? <EditTag setTags={setTags} setEditTagActive={setEditTagActive} setTagObj={setTagObj} tagObj={tagObj} mail={userCred?.email} /> : null}
    </div>
  )
}

export default Dashboard