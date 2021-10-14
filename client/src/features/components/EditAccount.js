import { useState } from "react"

const EditAccount = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [avatarDataUrl, setAvatarDataUrl] = useState(null) 
    const [accountDeleted, setDeleted] = useState(false)
    let canSubmit
    accountDeleted ? canSubmit = false : submitted ? canSubmit = false : login === '' ? canSubmit = false : password === '' ? canSubmit = false : canSubmit = true 
    
    return (
        <form className="edit-account">
            <h1 className="edit-account__title">Edit account</h1>

                <div className="edit-account__choose-avatar">
                  <label htmlFor="photo" style={ avatarDataUrl ? {backgroundImage: `url(${avatarDataUrl})`,  backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'} : {background: '#1a1a1b', color: '#fff'}}>
                    {avatarDataUrl ? null : 'Add avatar'}  
                  </label>
                  <input disabled={accountDeleted || submitted} multiple={false} id="photo" type="file" accept="image/*" onChange={(event) => {
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
            
            <input disabled={accountDeleted || submitted} placeholder="Type your login" required className="edit-account__login" value={login} onChange={e => setLogin(e.target.value.trim())}/>
            <input disabled={accountDeleted || submitted} placeholder="Type your password" required className="edit-account__password" type="password" value={password} onChange={e => setPassword(e.target.value.trim())}/>
            <button onClick={
                e => {
                    e.preventDefault()
                    setSubmitted(true)
                }
            } type="submit" className={`edit-account__submit${submitted ? '_submitted' : canSubmit ? '' : '_disabled'}`} disabled={!canSubmit}>Submit</button>

            <button disabled={accountDeleted || submitted}
            onClick={
                e => {
                    e.preventDefault()
                    setDeleted(true)
                }
            }
            className={`edit-account__delete-account${accountDeleted ? '_deleted' : ''}`}>
                Delete account
            </button>
        </form>
    )
}

export default EditAccount