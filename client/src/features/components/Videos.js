import Video from './Video.js'
import { useSelector } from 'react-redux'


const Videos = ({searchInfo, author, self, accountPage}) => {
        const videosState = useSelector(state => state.videos)
        const allVideos = videosState.ids.map(id => videosState.entities[id])
        let videos = []
        if (accountPage) {
            videos = allVideos.filter(video => video.author === author && (video.title.includes(searchInfo) || video.description.includes(searchInfo)))
        }
        else {
            videos = allVideos.filter(video => video.title.includes(searchInfo) || video.description.includes(searchInfo) || video.author.includes(searchInfo))
        }


    return (
            <div className="videos">
                {videos.map(video => {
                    return <Video key={video.id} title={video.title} accountPage={accountPage} self={self} id={video.id} preview={video.preview} author={video.author}/>
                })}
            </div>

    )
}

export default Videos