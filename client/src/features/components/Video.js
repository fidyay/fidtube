import {Link} from 'react-router-dom'
import UserAvatar from '../../assets/images/user-avatar.svg'
import Preview from '../../assets/images/preview.svg'
import { useSelector, useDispatch } from 'react-redux' 
import axios from 'axios'
import { removeVideo } from '../../app/slices/videosSlice.js'




const Video = ({accountPage, title, preview, author, self, id, videoWidth, previewHeight, margins, setRightMargin}) => {
    const dispatch = useDispatch()
    const videoAuthor = useSelector(state => state.accounts.entities[author])
    const videoMargins = `${margins}px`
    return (
        <Link onClick={e => {
            if (e.target.className === 'videos__video__delete') {
                e.preventDefault()
                return
            }
        }} 
        to={`/video/${id}`} className="videos__video" style={{width: `${videoWidth}px`, height: `${videoWidth}px`, marginLeft:  videoMargins, marginRight: setRightMargin ? videoMargins : '0px``'}}>
                    <div className="videos__video__preview" style={{
                        height: `${previewHeight}px`,
                        backgroundImage: `url(${preview ? `/preview/${preview}` : Preview})`,
                        backgroundRepeat: 'no-repeat', 
                        backgroundSize: preview ?  'cover' : 'contain', 
                        backgroundPosition: 'center'
                    }}/>
                    {accountPage ? (
                        <div className="videos__video__title-and-delete">
                            <h1 className="videos__video__title">{title}</h1>
                            {self && <button
                            onClick={e => {
                                const token = localStorage.getItem('token')
                                axios.delete(`/video/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
                                .then(() => {
                                    dispatch(removeVideo(id))
                                })
                            }}
                            className="videos__video__delete"/>}
                        </div>
                    ) : <h1 className="videos__video__title">{title}</h1>}
                    {!accountPage && <div className="videos__video__author">
                        <div className='videos__video__author__avatar' style={{
                                    background: `url(${videoAuthor && videoAuthor.avatar ? `/avatar/${videoAuthor.avatar}` : UserAvatar})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}/>
                        <div className="videos__video__author">{videoAuthor ? videoAuthor.name : 'Video author'}</div>
                    </div>}
        </Link>
    )
}

export default Video