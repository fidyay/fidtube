import { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../assets/images/user-avatar.svg'
import { useSelector } from 'react-redux'

const VideoInformation = ({id}) => {
    const videoEntity = useSelector(state => state.videos.entities[id]) 
    const {title, description, author, likes, dislikes, liked, disliked} = videoEntity

    const authorEntity = useSelector(state => state.accounts.entities[author])  



    const [descriptionOpened, setDescriptionOpened] = useState(false)
    const [likePressed, setLikePressed] = useState(false)
    const [dislikePressed, setDislikePressed] = useState(false)

    


    return (
        <div className="video__information">
            <div className="video__information__title-and-description">
                <h1 className="video__information__title-and-description__title">{title}</h1>
                {description !== '' && 
                <div className="video__information__title-and-description__description">
                    <div onClick={() => setDescriptionOpened(!descriptionOpened)} className="video__information__title-and-description__description__close-description">
                        <h3>Description</h3>
                        <div className={`arrow${descriptionOpened ? '_opened' : ''}`}/>
                    </div>
                    <p className={`video__information__title-and-description__description__info${descriptionOpened ? '' : '_closed'}`}>{description}</p>
                </div>}
                
            </div>
            <div className="video__information__like-and-dislike">
                <div onClick={() => {
                    setLikePressed(!likePressed)
                    if (dislikePressed) setDislikePressed(false)
                    }} className="video__information__like-and-dislike__item">
                    <div className={`video__information__like-and-dislike__item__like${liked ? '_pressed' : ''}`}/>
                    {likes}
                </div>
                <div onClick={() => {
                    setDislikePressed(!dislikePressed)
                    if (likePressed) setLikePressed(false)
                }} className="video__information__like-and-dislike__item">
                    <div className={`video__information__like-and-dislike__item__dislike${disliked ? '_pressed' : ''}`}/>
                    {dislikes}
                </div>
            </div>
            <div className="video__information__author">
                <img alt="author's avatar" src={Avatar} className="video__information__author__avatar"/>
                <div className="video__information__author__name-and-subscribed">
                    <Link to={authorEntity.self ? '/my-account' : `/account/${author}`} className="video__information__author__name-and-subscribed__name">{authorEntity.name}</Link>
                    {!authorEntity.self && 
                        <button  className={`video__information__author__name-and-subscribed__${authorEntity.subscribed ? 'subscribed' : 'subscribe'}`}>{authorEntity.subscribed ? 'Subscribed' : 'Subscribe'}</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default VideoInformation