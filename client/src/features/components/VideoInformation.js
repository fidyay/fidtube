import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserAvatar from '../../assets/images/user-avatar.svg'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setVideo } from '../../app/slices/videosSlice.js'
import { subscribe, unsubscribe } from '../../app/slices/accountsSlice.js'

const token = localStorage.getItem('token')

const voteVideo = (videoId, liked, disliked, likePressed, dislikePressed) => {
    if (!token) return
    axios.post(`/vote-video/${videoId}`, {
        liked,
        disliked, 
        likePressed, 
        dislikePressed
    }, {headers: {'Authorization': `Bearer ${token}`}})
}


const VideoInformation = ({videoEntity}) => {
    const {title, description, author, likes, dislikes, liked, disliked, id} = videoEntity
    const dispatch = useDispatch()

    const authorEntity = useSelector(state => state.accounts.entities[author])

    const currentUserId = useSelector(state => state.accounts.ids.find(id => state.accounts.entities[id].self)) 
    
    const [descriptionOpened, setDescriptionOpened] = useState(false)
    
 

    return (
        <div className="video__information">
            <div className="video__information__title-and-description">
                <h1 className="video__information__title-and-description__title">{title}</h1>
                {description && 
                <div className="video__information__title-and-description__description">
                    <div onClick={() => setDescriptionOpened(!descriptionOpened)} className="video__information__title-and-description__description__close-description">
                        <h3>Description</h3>
                        <div className={`arrow${descriptionOpened ? '_opened' : ''}`}/>
                    </div>
                    <p className={`video__information__title-and-description__description__info${descriptionOpened ? '' : '_closed'}`}>{description}</p>
                </div>}
                
            </div>
            {currentUserId && <div className="video__information__like-and-dislike">
                <div onClick={() => {
                    if (liked) {
                        voteVideo(id, liked, disliked, false, false)
                        dispatch(setVideo({...videoEntity, liked: false, likes: likes - 1}))
                        return
                    }
                    voteVideo(id, liked, disliked, true, false)
                    dispatch(setVideo({...videoEntity, liked: true, disliked: false, likes: likes + 1, dislikes: disliked ? dislikes - 1 : dislikes}))
                    
                    }} className="video__information__like-and-dislike__item">
                    <div className={`video__information__like-and-dislike__item__like${liked ? '_pressed' : ''}`}/>
                    {likes}
                </div>
                <div onClick={() => {
                    if (disliked) {
                        voteVideo(id, liked, disliked, false, false)
                        dispatch(setVideo({...videoEntity, disliked: false, dislikes: dislikes - 1}))
                        return
                    }
                    voteVideo(id, liked, disliked, false, true)
                    dispatch(setVideo({...videoEntity, disliked: true, liked: false, dislikes: dislikes + 1, likes: liked ? likes - 1 : likes}))
                    
                }} className="video__information__like-and-dislike__item">
                    <div className={`video__information__like-and-dislike__item__dislike${disliked ? '_pressed' : ''}`}/>
                    {dislikes}
                </div>
            </div>}
            
            <div className="video__information__author">
                <Link className="video__information__author__avatar-and-name" to={`/account/${author}`}>
                    <div className='video__information__author__avatar-and-name__avatar' style={{
                        backgroundImage: `url(${authorEntity && authorEntity.avatar ? `/avatar/${authorEntity.avatar}` : UserAvatar})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}/>
                    <div className="video__information__author__avatar-and-name__name">{authorEntity ? authorEntity.name : 'Username'}</div>
                </Link>
                {currentUserId && authorEntity && !authorEntity.self && 
                    <button onClick={() => {
                        dispatch(authorEntity.subscribed ? unsubscribe({ subscribtionAccountId: author }) :
                        subscribe({ subscribtionAccountId: author }))
                    }} 
                    className={`video__information__author__${authorEntity.subscribed ? 'subscribed' : 'subscribe'}`}>{authorEntity.subscribed ? 'Subscribed' : 'Subscribe'}</button>
                }
          </div>
        </div>
    )
}

export default VideoInformation