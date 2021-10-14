import VideoPlayer from './VideoPlayer.js'
import VideoInformation from './VideoInformation.js'
import { useParams } from 'react-router-dom'
import CommentsList from './CommentList.js'








const VideoPage = () => {
    const {id} = useParams()


    return (
        <div className="video">
            <VideoPlayer id={id}/>
            <VideoInformation id={id}/>
            <CommentsList id={id}/>
        </div>
    )


}

export default VideoPage