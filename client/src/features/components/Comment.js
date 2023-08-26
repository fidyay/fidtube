import { Link } from "react-router-dom"
import UserAvatar from '../../assets/images/user-avatar.svg'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setVideo } from "../../app/slices/videosSlice.js"



const Comment = ({comment, commentIndex, videoEntity}) => {
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const { self, text, author, liked, disliked, likes, dislikes} = comment
    const currentUserId = useSelector(state => state.accounts.ids.find(id => state.accounts.entities[id].self))
    const commentAuthor = useSelector(state => {
        const commentAuthorId = state.accounts.ids.find(id => state.accounts.entities[id].name === author)
        return state.accounts.entities[commentAuthorId]
    })

    const userAvatar = commentAuthor && commentAuthor.avatar ? `/avatar/${commentAuthor.avatar}` : UserAvatar

    const voteComment = (liked, disliked, likePressed, dislikePressed) => {
        if (!token) return
        axios.post(`/vote-comment/${videoEntity.id}/${commentIndex}`, {
            liked,
            disliked, 
            likePressed, 
            dislikePressed
        }, {headers: {'Authorization': `Bearer ${token}`}})
        .then(res => console.log(res.data))

    }

    const deleteComment = () => {
        const comments = []
        for (let i = 0; i < videoEntity.comments.length; i++) {
            if (i === commentIndex) {
                continue
            }
            comments.push(videoEntity.comments[i])
        }
        dispatch(setVideo({...videoEntity, comments}))
        axios.delete('/comment', {
            data: {
                videoId: videoEntity.id, commentIndex
            },
            headers: {'Authorization': `Bearer ${token}`}
        })
    }
    
    return (
    <div className="video__comments__comment">
        <div className="video__comments__comment__comment-author-and-delete-comment">
            <Link className="video__comments__comment__comment-author-and-delete-comment__author" to={`/account/${commentAuthor?.id}`}>
            <div className='video__comments__comment__comment-author-and-delete-comment__author__avatar' style={{
                        background: `url(${userAvatar})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
            }}/>
            <div className='video__comments__comment__comment-author-and-delete-comment__author__name'>{commentAuthor?.name}</div>
            </Link>
            {self && 
            <button onClick={deleteComment}
            className="video__comments__comment__comment-author-and-delete-comment__delete">Delete</button>
            }            
        </div>
        <p className="video__comments__comment__text">{text}</p>
        {
            currentUserId && <div className="video__comments__comment__like-and-dislike">
            <div onClick={() => {
                    if (liked) {
                        voteComment(liked, disliked, false, false)
                        const updatedComment = {
                            ...comment,
                            liked: false,
                            likes: likes - 1
                        }
                        const comments = [...videoEntity.comments]
                        comments[commentIndex] = updatedComment
                        dispatch(setVideo({...videoEntity, comments}))
                        return
                    }
                    voteComment(liked, disliked, true, false)
                    const updatedComment = {
                        ...comment,
                        liked: true,
                        likes: likes + 1,
                        disliked: false,
                        dislikes: disliked ? dislikes - 1 : dislikes 
                    }
                    const comments = [...videoEntity.comments]
                    comments[commentIndex] = updatedComment
                    dispatch(setVideo({...videoEntity, comments}))
                    return
                    }} className="video__comments__comment__like-and-dislike__item">
                <div className={`video__comments__comment__like-and-dislike__item__like${liked ? '_pressed' : ''}`}/>
                {likes}
            </div>
            <div onClick={() => {
                    if (disliked) {
                        voteComment(liked, disliked, false, false)
                        const updatedComment = {
                            ...comment,
                            disliked: false,
                            dislikes: dislikes - 1
                        }
                        const comments = [...videoEntity.comments]
                        comments[commentIndex] = updatedComment
                        dispatch(setVideo({...videoEntity, comments}))
                        return
                    }
                    voteComment(liked, disliked, false, true)
                    const updatedComment = {
                        ...comment,
                        liked: false,
                        likes: liked ? likes - 1 : likes,
                        disliked: true,
                        dislikes: dislikes + 1 
                    }
                    const comments = [...videoEntity.comments]
                    comments[commentIndex] = updatedComment
                    dispatch(setVideo({...videoEntity, comments}))
                    return
                }} className="video__comments__comment__like-and-dislike__item">
                <div className={`video__comments__comment__like-and-dislike__item__dislike${disliked ? '_pressed' : ''}`}/>
                {dislikes}
            </div>
        </div>
        }

    </div>
)
}

export default Comment