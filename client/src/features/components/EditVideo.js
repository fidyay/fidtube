import { useParams } from "react-router-dom"
import { useState } from "react"
import useWindowWidth from "../hooks/useWindowWidth.js"
import ResizableTextarea from "./ResizableTextArea.js"
const EditVideo = () => {
    const { id } = useParams()
    const [preview, setPreview] = useState(null)
    const [previewDataUrl, setPreviewDataUrl] = useState(null) 
    const [videoTitle, setVideoTitle] = useState('')
    const [description, setDescription] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const windowWidth = useWindowWidth()
    const widthProportion = 3.5
    const heightProportion = 2

    let previewWidth = windowWidth*.9
    if (previewWidth > 700) previewWidth = 700
    const previewHeight = (previewWidth/widthProportion)*heightProportion


    let canSubmit = false

    if (videoTitle) canSubmit = true

    return (
        <form className="add-or-edit-video">
            <h1 className="add-or-edit-video__title">Edit video</h1>
            <div className="add-or-edit-video__choose-preview" style={{
              width: `${previewWidth}px`,
              height: `${previewHeight}px`
            }}>
                  <label htmlFor="photo" style={ previewDataUrl ? {backgroundImage: `url(${previewDataUrl})`,  backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'} : {background: '#1a1a1b', color: '#fff'}}>
                    {previewDataUrl ? null : 'Add preview'}  
                  </label>
                  <input multiple={false} id="photo" type="file" accept="image/*" onChange={(event) => {
                    if(event.target.files[0]) {
                      const reader = new FileReader()
                      reader.readAsDataURL(event.target.files[0])
                      setPreview(event.target.files[0])
                      reader.onload = () => {
                        setPreviewDataUrl(reader.result)
                      }
                    }    
                }}/>
            </div>
            <input required placeholder="Enter your video's title" className="add-or-edit-video__set-title" type="text" value={videoTitle} onChange={e => setVideoTitle(e.target.value)}/>
            <ResizableTextarea placeholder="Type your video's decription" onChange={e => setDescription(e.target.value)} className="add-or-edit-video__set-description" value={description}/>
            <button onClick={
                () => {
                    setSubmitted(true)
                }
            } type="submit" className={`add-or-edit-video__submit${submitted ? '_submitted' : canSubmit ? '' : '_disabled'}`} disabled={!canSubmit}>Submit</button>
        </form>
    )
}

export default EditVideo