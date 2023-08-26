import { useParams, Link, Redirect } from "react-router-dom"
import UserAvatar from '../../assets/images/user-avatar.svg'
import Videos from "./Videos.js"
import { useSelector, useDispatch } from "react-redux"
import { subscribe, unsubscribe } from '../../app/slices/accountsSlice.js'

const UserPage = ({id, name, description, avatar, subscribed, self}) => {
    const userAvatar = avatar ? `/avatar/${avatar}` : UserAvatar
    const authorized = useSelector(state => state.accounts.ids.find(id => state.accounts.entities[id].self))
    const dispatch = useDispatch()
    const buttonText = self ? 'Add video' : subscribed ? 'Subscribed' : 'Subscribe'
    const buttonClass = (subscribed) ? 'account__avatar-and-subscribe__subscribed' : 'account__avatar-and-subscribe__subscribe'
    return (
        <div className="account">
            <div className="account__avatar-and-subscribe">
            <div className='account__avatar-and-subscribe__avatar' style={{
                background: `url(${userAvatar})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}/>
                {!authorized ? null : self ? 
                <Link to="/add-video" className="account__avatar-and-subscribe__add-video">
                    {buttonText}
                </Link> :
                <button onClick={() => {
                    dispatch(subscribed ? unsubscribe({ subscribtionAccountId: id }) :
                    subscribe({ subscribtionAccountId: id }))
                }}
                className={buttonClass}>
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

const Account = ({searchInfo}) => {
    const {id} = useParams()
    const account = useSelector(state => state.accounts.entities[id])
    const status = useSelector(state => state.accounts.status)

    if (!account && status === 'succeeded') {
        return <Redirect to="/"/>
    }

    if (!account) {
        return null
    }
    

    const {name, description, avatar, subscribed, self} = account
    return (
        <>
        <UserPage id={id} name={name} description={description} avatar={avatar} subscribed={subscribed} self={self}/>
        <Videos searchInfo={searchInfo} author={id} accountPage self={self}/>
        </>
    )

    
}

export default Account