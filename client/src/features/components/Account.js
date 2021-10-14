import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import Error from "./Error.js"
import UserAvatar from '../../assets/images/user-avatar.svg'
import Videos from "./Videos.js"
import { useSelector } from "react-redux"

const UserPage = ({name, description, avatar, subscribed, self}) => {
    const userAvatar = avatar ? avatar : UserAvatar

    const buttonText = self ? 'Add video' : subscribed ? 'Subscribed' : 'Subscribe'
    const buttonClass = (subscribed) ? 'account__avatar-and-subscribe__subscribed' : 'account__avatar-and-subscribe__subscribe'
    return (
        <div className="account">
            <div className="account__avatar-and-subscribe">
                <img src={userAvatar} alt="user avatar"/>
                {self ? 
                <Link to="/add-video" className="account__avatar-and-subscribe__add-video">
                    {buttonText}
                </Link> :
                <button className={buttonClass}>
                    {buttonText}
                </button>
                }
                
            </div>
            <div className="account__name-and-description">
                <h1>{name}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}

const Account = ({searchInfo, self}) => {
    const {id} = useParams()
    const selfAccount = useSelector(state => {
        const accounts = state.accounts.ids.map(id => state.accounts.entities[id])
        return accounts.find(account => !!account.self)
    })
    const account = useSelector(state => state.accounts.entities[id])
    const {name, description, avatar, subscribed} = self ? selfAccount : account
    const [loading, setLoaded] = useState(true)
    return (
        <>
        <UserPage name={name} description={description} avatar={avatar} subscribed={subscribed} self={self}/>
        <Videos searchInfo={searchInfo} author={self ? selfAccount.id : id} accountPage self={self}/>
        </>
    )
}

export default Account