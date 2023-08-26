import Video from './Video.js'
import { useSelector } from 'react-redux'
import useWindowWidth from '../hooks/useWindowWidth.js'


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



        const windowWidth = useWindowWidth()
        const minScreenSize = 320
        const widthProportion = 3.5
        const heightProportion = 2
        const numberOfVideos = Math.floor(windowWidth/minScreenSize)
        let margins = windowWidth > 640 ? (windowWidth - minScreenSize * numberOfVideos) / (numberOfVideos+1) : 0
        if (margins > 10) margins = 10
        let videoWidth = windowWidth/numberOfVideos - 2 * margins
        if (videoWidth < minScreenSize) videoWidth = minScreenSize
        if (numberOfVideos === 1 && videoWidth > 500) videoWidth = 500
        const previewHeight = (videoWidth/widthProportion)*heightProportion


    return (
            <div className="videos">
                {videos.map((video, index) => {
                    const setRightMargin = ++index % numberOfVideos === 0
                    return <Video margins={margins} key={video.id} title={video.title} accountPage={accountPage} self={self} id={video.id} preview={video.preview} author={video.author} videoWidth={videoWidth} previewHeight={previewHeight} setRightMargin={setRightMargin}/>
                })}
            </div>

    )
}

export default Videos