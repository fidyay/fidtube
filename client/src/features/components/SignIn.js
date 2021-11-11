import { useState } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setAccounts } from '../../app/slices/accountsSlice.js'
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { fetchVideos } from "../../app/slices/videosSlice.js"
import ResizableTextArea from "./ResizableTextArea.js"


const SignIn = ({createAccount}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [description, setDescription] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [avatarDataUrl, setAvatarDataUrl] = useState(null) 
    const [isUnique, setUnique] = useState(true)
    const [wrongPasswordOrLogin, setWrongPasswordOrLogin] = useState(false)
    let canSubmit
    submitted ? canSubmit = false : login === '' ? canSubmit = false : login.length < 4 ? canSubmit = false : login.length > 25 ? canSubmit = false : !isUnique ? canSubmit = false : password === ''  ? canSubmit = false : password.length < 4 ? canSubmit = false : password.length > 25 ? canSubmit = false : canSubmit = true 

    const setAccountsToState = (response) => {
      const { data } = response
        dispatch(setAccounts(data.map(doc => {
          const { name, avatar, description, id, self, subscribed, token } = doc
          if (token) {
            localStorage.setItem('token', token)
          }
          return { name, avatar, description, id, self, subscribed }
        })))
    }



    const registration = (formData) => {
      axios.post('/create-account', formData, {headers: {type: 'x-www-form-urlencoded'}})
      .then(res => {
        setAccountsToState(res)
        history.push('/')
        dispatch(fetchVideos())
      })
      .catch(function (error) {
        console.log(error);
      });
    } 

    const loginUser = () => {
      axios.post('/login-user', {login, password})
      .then(res => {
        setAccountsToState(res)
        history.push('/')
        dispatch(fetchVideos())
      })
      .catch(function (error) {
        if (error.response.status === 405) {
          canSubmit = true
          setSubmitted(false)
          setWrongPasswordOrLogin(true)
          return
        }
        console.log(error.toJSON());
      });
    }

    
    return (
        <form className="sign-in" onSubmit={
          e => {
              e.preventDefault()
              setSubmitted(true)
              if (createAccount) {
                const formData = new FormData()
                formData.append('login', login)
                formData.append('password', password)
                if (description.trim() !== '') formData.append('description', description.trim())
                if (avatar) formData.append('avatar', avatar)
                registration(formData)
                return
              }
              loginUser()
          }}
      >
            <h1 className="sign-in__title">{createAccount ? 'Create account' : 'Sign in'}</h1>
            {createAccount && 
                <div className="sign-in__choose-avatar">
                  <label htmlFor="photo" style={ avatarDataUrl ? {backgroundImage: `url(${avatarDataUrl})`,  backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'} : {background: '#1a1a1b', color: '#fff'}}>
                    {avatarDataUrl ? null : 'Add avatar'}  
                  </label>
                  <input name="avatar" multiple={false} id="photo" type="file" accept="image/*" onChange={(event) => {
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
            {createAccount && <p className="sign-in__info">Login and password fields should contain from 4 to 25 characters</p>}
            <input name="login" required placeholder="Type your login" className="sign-in__login" value={login} onChange={e => {
              setWrongPasswordOrLogin(false)
              setLogin(e.target.value.trim())
              if (e.target.value.trim() === '') {
                setUnique(true)
                return
              }
              if (createAccount && e.target.value.trim() !== '') {
                  axios.get(`/is-login-unique/${e.target.value.trim()}`).then(response => {
                  setUnique(response.data)
                })
              }
            }}/>
            {createAccount && !isUnique && <p className="sign-in__error">{login} is already taken</p>}
            {createAccount && <ResizableTextArea placeholder={'Type your account description'} value={description} onChange={e => setDescription(e.target.value)}/>}
            <input name="password" required placeholder="Type your password" className="sign-in__password" type="password" value={password} onChange={e => {
              setWrongPasswordOrLogin(false)
              setPassword(e.target.value.trim())
            }}/>
            {wrongPasswordOrLogin && <p className="sign-in__error">Wrong password or login</p>}
            <button type="submit" className={`sign-in__submit${submitted ? '_submitted' : canSubmit ? '' : '_disabled'}`} disabled={!canSubmit}>Submit</button>
            <Link className="sign-in__link" to={createAccount ? '/sign-in' : '/create-account'}>{createAccount ? 'Sign in' : 'Create account'}</Link>
        </form>
    )
}

export default SignIn