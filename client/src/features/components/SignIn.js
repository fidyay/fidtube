import { useState } from "react"
import { Link } from 'react-router-dom'

const SignIn = ({createAccount}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [avatarDataUrl, setAvatarDataUrl] = useState(null) 
    let canSubmit
    submitted ? canSubmit = false : login === '' ? canSubmit = false : password === '' ? canSubmit = false : canSubmit = true 
    
    return (
        <form className="sign-in">
            <h1 className="sign-in__title">{createAccount ? 'Create account' : 'Sign in'}</h1>
            {createAccount && 
                <div className="sign-in__choose-avatar">
                  <label htmlFor="photo" style={ avatarDataUrl ? {backgroundImage: `url(${avatarDataUrl})`,  backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'} : {background: '#1a1a1b', color: '#fff'}}>
                    {avatarDataUrl ? null : 'Add avatar'}  
                  </label>
                  <input multiple={false} id="photo" type="file" accept="image/*" onChange={(event) => {
                    if(event.target.files[0]) {
                      const reader = new FileReader()
                      reader.readAsDataURL(event.target.files[0])
                      setAvatar(event.target.files[0])
                      reader.onload = () => {
                        setAvatarDataUrl(reader.result)
                      }
                    }    
                }}/>
            </div>
            }
            <input placeholder="Type your login" required className="sign-in__login" value={login} onChange={e => setLogin(e.target.value.trim())}/>
            <input placeholder="Type your password" required className="sign-in__password" type="password" value={password} onChange={e => setPassword(e.target.value.trim())}/>
            <button onClick={
                () => {
                    setSubmitted(true)
                }
            } type="submit" className={`sign-in__submit${submitted ? '_submitted' : canSubmit ? '' : '_disabled'}`} disabled={!canSubmit}>Submit</button>
            <Link className="sign-in__link" to={createAccount ? '/sign-in' : '/create-account'}>{createAccount ? 'Sign in' : 'Create account'}</Link>
        </form>
    )
}

export default SignIn