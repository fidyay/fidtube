import VideoPlayer from './VideoPlayer.js'
import VideoInformation from './VideoInformation.js'
import { useParams, Redirect } from 'react-router-dom'
import CommentsList from './CommentList.js'
import { useSelector } from 'react-redux'







const VideoPage = () => {
    const {id} = useParams()
    const status = useSelector(state => state.videos.status)
    const videoEntity = useSelector(state => state.videos.entities[id])

    if (!videoEntity && status === 'succeeded') {
        return <Redirect to="/"/>
    }

    if (!videoEntity) {
        return null
    }

    return (
        <div className="video">
            <VideoPlayer src={videoEntity.source}/>
            <VideoInformation videoEntity={videoEntity}/>
            <CommentsList videoEntity={videoEntity}/>
        </div>
    )


}

export default VideoPage