import {Link} from 'react-router-dom'
import UserAvatar from '../../assets/images/user-avatar.svg'
import Preview from '../../assets/images/preview.svg'
import useWindowWidth from '../hooks/useWindowWidth.js'
import { useSelector } from 'react-redux'




const Video = ({accountPage, title, preview, author, self, id, src}) => {
    const userAvatar = useSelector(state => state.accounts.entities[author].avatar)
    const previewPhoto = preview ? preview : Preview
    const userPhoto = userAvatar ? userAvatar : UserAvatar
    const windowWidth = useWindowWidth()
    const minScreenSize = 320
    const widthProportion = 3.5
    const heightProportion = 2

    const numberOfVideos = Math.floor(windowWidth/minScreenSize)
    let videoWidth = windowWidth/numberOfVideos
    if (videoWidth < minScreenSize) videoWidth = minScreenSize
    const previewHeight = (videoWidth/widthProportion)*heightProportion

    

    return (
        <Link to={`/video/${id}`} className="videos__video" style={{width: `${videoWidth}px`, height: `${videoWidth}px`}}>
                    <div className="videos__video__preview" style={{
                        height: `${previewHeight}px`,
                        backgroundImage: `url(${previewPhoto})`,
                        backgroundRepeat: 'no-repeat', 
                        backgroundSize: 'contain', 
                        backgroundPosition: 'center'
                    }}/>
                    {accountPage ? (
                        <div className="videos__video__title-and-settings">
                            <h1 className="videos__video__title">{title}</h1>
                            {self && <Link to="/edit-video/a" className="videos__video__settings"/>}
                        </div>
                    ) : <h1 className="videos__video__title">{title}</h1>}
                    {!accountPage && <div>
                        <img alt="user avatar" src={userPhoto}/>
                        <div className="videos__video__author">{author}</div>
                    </div>}
                    
        </Link>
    )
}

export default Video