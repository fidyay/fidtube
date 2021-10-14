import UserAvatar from '../../assets/images/user-avatar.svg'
import {Link} from 'react-router-dom'
import Scrollbars from './Scrollbars.js'
import { useState } from 'react'


const Menu = ({opened, setMenuState}) => {
    const left = opened ? 0 : -300
    const display = opened ? 'block' : 'none' 
    const [quest, setQuest] = useState(false)



    return (
        <>
            <div className="modal-background" style={{display}}/>
            <div className="menu" style={{left: `${left}px`}}>
            <button className="menu__close-menu" onClick={() => {
                setMenuState(false)
            }}/>
            
            {quest ? 
                <Link className="menu__account" to="/sign-in">Sign in</Link> :
                (
                    <>
                        <Link to="/my-account" className="menu__current-user-info">
                            <img src={UserAvatar} alt="User avatar"/>
                            <h1>Name Surname</h1>
                        </Link>
                        <Link to="/edit-account" className="menu__account">Settings</Link>
                        <button className="menu__account">Sign out</button>
                    </>
                    
                )
                
            }

            <Scrollbars>
            <div className="menu__subscriptions">
                <h1>Subscriptions</h1>
                <Link to="/account/a" className="menu__user-info">
                    <img src={UserAvatar} alt="User avatar"/>
                    <div>Name Surname</div>
                </Link>
                <Link to="/account/a"  className="menu__user-info">
                    <img src={UserAvatar} alt="User avatar"/>
                    <div>Name Surname</div>
                </Link>

            </div>

            </Scrollbars>

                


        </div>
        </>

    )
}

export default Menu