import UserAvatar from '../../assets/images/user-avatar.svg'
import {Link} from 'react-router-dom'
import Scrollbars from './Scrollbars.js'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAccounts } from '../../app/slices/accountsSlice.js'
import { fetchVideos } from '../../app/slices/videosSlice.js'
import axios from 'axios'
import { useState } from 'react'
import { removeAccount } from '../../app/slices/accountsSlice.js'
import { removeAccountsVideos } from '../../app/slices/videosSlice.js'

const Subscription = ({account}) => {
    const {id, name, avatar} = account
    const avatarSrc = avatar ? `/avatar/${avatar}` : UserAvatar
    return (
        <Link to={`/account/${id}`} className="menu__user-info">
                <div className="subscribtion__avatar" style={{background: `url(${avatarSrc})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}/>
                <div>{name}</div>
        </Link>
    )
}


const Menu = ({opened, setMenuState}) => {
    const left = opened ? 0 : -300
    const display = opened ? 'block' : 'none' 
    const accounts = useSelector(state => state.accounts)
    let accountsArray = []
    let selfAccount = {}
    const token = localStorage.getItem('token')
    if (accounts) {
        selfAccount = accounts.entities[accounts.ids.find(id => !!accounts.entities[id].self)]
        accountsArray = accounts.ids.map(id => accounts.entities[id]).filter(account => !!account.subscribed)
    }

    const [deletePressed, setDeletePressed] = useState(false)

    const dispatch = useDispatch()
  
    return (
        <>
            <div className="modal-background" style={{display}}/>
            <div className="menu" style={{left: `${left}px`}}>
            <button className="menu__close-menu" onClick={() => {
                setMenuState(false)
            }}/>
            
            {!selfAccount ? (
                    <>
                        <Link className="menu__account" to="/sign-in">Sign in</Link>
                        <Link className="menu__account" to="/create-account">Create account</Link>
                    </>
                    ) 
                    :
                    (
                        <>
                            <Link to={`/account/${selfAccount ? selfAccount.id : ''}`} className="menu__current-user-info">
                                <div className='menu__current-user-info__avatar' style={{
                                    background: `url(${selfAccount.avatar ? `/avatar/${selfAccount.avatar}` : UserAvatar})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}/>
                                <h1>{selfAccount.name}</h1>
                            </Link>
                            <button className="menu__account"
                            onClick={() => {
                                localStorage.removeItem('token')
                                dispatch(fetchAccounts())
                                dispatch(fetchVideos())
                            }}
                            >Sign out</button>
                            <button disabled={deletePressed} className={`menu__account delete${deletePressed ? '_pressed' : ''}`}
                            onClick={() => {
                                if (!token) return
                                setDeletePressed(true)
                                axios.delete(`/account/${selfAccount.id}`, {headers: {'Authorization': `Bearer ${token}`}})
                                .then(() => {
                                    localStorage.removeItem('token')
                                    dispatch(removeAccount({ id: selfAccount.id }))
                                    dispatch(removeAccountsVideos({ id: selfAccount.id }))
                                })
                                localStorage.removeItem('token')
                            }}
                            >Delete</button>
                            {accountsArray.length > 0 && 
                                <Scrollbars>
                                    <div className="menu__subscriptions">
                                        <h1>Subscriptions</h1>
                                        {accountsArray.map(account => <Subscription key={account.id} account={account}/>)}
                                    </div>
                                </Scrollbars>
                            }
                            
                        </>    
                    )
                
            }
        </div>
        </>
    )
}

export default Menu