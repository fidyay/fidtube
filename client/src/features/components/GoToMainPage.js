import { useHistory } from "react-router-dom";

const GoToMainPage = () => {
    const history = useHistory()
    return (
        <div className="go-to-main-page">
            <button onClick={() => history.push('/')}
            className="go-to-main-page__button"/>
        </div>
    )
}

export default GoToMainPage