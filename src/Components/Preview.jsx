import React from 'react'
import "../ComponentsStyles/Preview.css"
import photoIcon from "../images/photo.png"
import pinIcon from "../images/thumbtacks.png"
import favIcon from "../images/heart.png"
import filledHeart from "../images/heart (1).png"
import closeIcon from "../images/icon-close.svg"
import unpinIcon from "../images/unpin.png"

const Preview = ({setPreview, previewValue, setPreviewValue}) => {
  
  const closePreview = () =>{
    setPreview(false)
    setPreviewValue({})
  }

  return (
    <div className='preview-overall'>
      <div className="preview-dialogue">
        <div className="head">
          <h1>{previewValue?.noteTitle}</h1>
          <img src={closeIcon} alt="" onClick={closePreview}/>
        </div>
        <p>{previewValue?.noteText}</p>
        <div className="flex-item">
          <img src={previewValue?.imageUrl? previewValue?.imageUrl : photoIcon} alt="" />
          <div className="others">
            {previewValue?.favourite? (<img src={filledHeart}/>) : (<img src={favIcon}/>)}
            <img src={previewValue?.pinned? pinIcon: unpinIcon} alt="" />
            <p className='collection'>{previewValue?.collection? previewValue?.collection: "No Collection"}</p>
            <p>DC: {previewValue?.dateCreated? previewValue?.dateCreated : "No Date"}</p>
            <p>RD: {previewValue?.reminder? previewValue?.reminderDate : "Not Set" }</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview

