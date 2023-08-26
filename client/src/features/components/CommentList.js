import { useState } from "react"
import ResizableTextArea from './ResizableTextArea.js'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setVideo } from "../../app/slices/videosSlice.js"
import Comment from "./Comment.js"



const CommentsList = ({videoEntity}) => {
    const dispatch = useDispatch()
    const comments = videoEntity.comments
    const [submitted, setSubmitted] = useState(false)
    const [commentText, setCommentText] = useState('')
    const disabled = commentText.trim() === ''
    const token = localStorage.getItem('token')
    const postComment = (text) => {
        setSubmitted(true)
        axios.post(`/add-comment/${videoEntity.id}`, {
            text
        }, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res => {
            setSubmitted(false)
            dispatch(setVideo({...videoEntity, comments: [...videoEntity.comments, res.data]}))
        })
    }
    const currentUserId = useSelector(state => state.accounts.ids.find(id => state.accounts.entities[id].self))
    return (
        <div className="video__comments">
            {
                currentUserId && <div className="video__comments__leave-comment">                   
                <ResizableTextArea placeholder="Type your comment" className="video__comments__leave-comment__textarea" value={commentText} onChange={e => setCommentText(e.target.value)}/>              
                <button className={`video__comments__leave-comment__send${submitted ? '_submitted' : disabled ? '_disabled' : ''}`} disabled={submitted || disabled}
                onClick={() => {
                    postComment(commentText)
                    setCommentText('')
                }}
                >Leave comment</button>
            </div>
            }
            
            {comments && comments.length > 0 && <>
                    <h1 className="video__comments__title">Comments</h1>
                    {comments.map((comment, index) => <Comment commentIndex={index} videoEntity={videoEntity} key={index} comment={comment}/>).reverse()}
                </>
             }

        </div>
    ) 
}

export default CommentsList