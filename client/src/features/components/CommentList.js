import { useState } from "react"
import { Link } from "react-router-dom"
import UserAvatar from '../../assets/images/user-avatar.svg'
import ResizableTextArea from './ResizableTextArea.js'
import { useSelector } from 'react-redux'

const Comment = ({comment}) => {
    const [likePressed, setLikePressed] = useState(false)
    const [dislikePressed, setDislikePressed] = useState(false)

    const {id, self, text, author, liked, disliked, likes, dislikes} = comment

    const commentAuthor = useSelector(state => state.accounts.entities[author])

    const userAvatar = commentAuthor.avatar ? commentAuthor.avatar : UserAvatar
    



    
    return (
    <div key={id} className="video__comments__comment">
        <div className="video__comments__comment__comment-author-and-delete-comment">
            <Link to={commentAuthor.self ? '/my-account' : `/account/${author}`} className="video__comments__comment__comment-author-and-delete-comment__author">
                <img alt="comment author's avatar" src={userAvatar}/>
                <div>{author}</div>
            </Link>
            {self && 
            <button className="video__comments__comment__comment-author-and-delete-comment__delete">Delete</button>
            }            
        </div>
        <p className="video__comments__comment__text">{text}</p>
        <div className="video__comments__comment__like-and-dislike">
            <div onClick={() => {
                    setLikePressed(!likePressed)
                    if (dislikePressed) setDislikePressed(false)
                    }} className="video__comments__comment__like-and-dislike__item">
                <div className={`video__comments__comment__like-and-dislike__item__like${liked ? '_pressed' : ''}`}/>
                {likes}
            </div>
            <div onClick={() => {
                    setDislikePressed(!dislikePressed)
                    if (likePressed) setLikePressed(false)
                }} className="video__comments__comment__like-and-dislike__item">
                <div className={`video__comments__comment__like-and-dislike__item__dislike${disliked ? '_pressed' : ''}`}/>
                {dislikes}
            </div>
        </div>
    </div>
)
}

const CommentsList = ({id}) => {
    const comments = useSelector(state => state.videos.entities[id].comments)

    let commentsEntities
    if (comments.ids && comments.entities) {
        commentsEntities = comments.ids.map(id => comments.entities[id])
    } 



    const [commentText, setCommentText] = useState('')
    const disabled = commentText.trim() === ''

    return (
        <div className="video__comments">
            <div className="video__comments__leave-comment">                   
                <ResizableTextArea placeholder="Type your comment" className="video__comments__leave-comment__textarea" value={commentText} onChange={e => setCommentText(e.target.value)}/>              
                <button className={`video__comments__leave-comment__send${disabled ? '_disabled' : ''}`} disabled={disabled}>Leave comment</button>
            </div>
            {commentsEntities ? commentsEntities.map(commentEntity => <Comment comment={commentEntity}/>) : null}

        </div>
    )
}

export default CommentsList