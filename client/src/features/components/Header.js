import { useHistory } from "react-router-dom"


const Header = ({searchInfo, onChangedSearchInfo,setMenuState}) => {
  const history = useHistory()

  return (
    <div className="header">
      <div className="header__open-menu-and-logo">
      <button className="header__open-menu" onClick={() => {
        setMenuState(true)
      }}/>
      <h1 className="header__logo" onClick={() => history.push('/')}>Fidtube</h1>
      </div>
      
      <div className="header__search-parent">
        <input className="header__search" 
          placeholder="Search"
          type="text"
          value={searchInfo}
          onChange={(e) => onChangedSearchInfo(e.target.value)}/>
      </div>
      
    </div>
  )
}

export default Header