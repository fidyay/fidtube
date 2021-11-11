import { useState } from "react"
import { useHistory } from "react-router-dom"
import ResizableTextarea from "./ResizableTextArea.js"
import useWindowWidth from "../hooks/useWindowWidth.js"
import axios from 'axios'
import { setVideo } from "../../app/slices/videosSlice.js"
import { useDispatch } from "react-redux"

const setVideoEntity = setVideo

const AddVideo = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [preview, setPreview] = useState(null)
    const [previewDataUrl, setPreviewDataUrl] = useState(null) 
    const [video, setVideo] = useState(null) 
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
    if (video && videoTitle) canSubmit = true
    return (
        <form onSubmit={e => {
          e.preventDefault()
          setSubmitted(true)
          const formData = new FormData()
          formData.append('video', video)
          formData.append('title', videoTitle)
          if (preview) {
            formData.append('preview', preview)
          }
          if (description) {
            formData.append('description', description)
          }
          const token = localStorage.getItem('token')
          axios.post('/add-video', formData, {headers: {'Authorization': `Bearer ${token}`}})
          .then(res => {
            dispatch(setVideoEntity(res.data))
            history.push('/')
          })
        }}
        className="add-video">
            <h1 className="add-video__title">Add video</h1>
            <div className="add-video__choose-preview" style={{
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
            <div className="add-video__choose-video">
                  <label htmlFor="video">
                    {video ? video.name : 'Add video (MP4 only)'}  
                  </label>
                  <input required multiple={false} id="video" type="file" accept="video/MP4" onChange={(event) => {
                    if(event.target.files[0]) {
                      const vidFile = (event.target.files[0])
                      setVideo(vidFile)
                    }    
                }}/>
            </div>
            <input required placeholder="Enter your video's title" className="add-video__set-title" type="text" value={videoTitle} onChange={e => setVideoTitle(e.target.value)}/>
            <ResizableTextarea placeholder="Type your video's decription" onChange={e => setDescription(e.target.value)} className="add-video__set-description" value={description}/>
            <button type="submit" className={`add-video__submit${submitted ? '_submitted' : canSubmit ? '' : '_disabled'}`} disabled={!canSubmit}>Submit</button>
        </form>
    )
}

export default AddVideo