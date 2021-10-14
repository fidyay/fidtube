import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './features/components/Header.js'
import Menu from './features/components/Menu.js';
import Videos from './features/components/Videos.js';
import WrapperWithScrollbar from './features/components/Wrapper.js';
import Account from './features/components/Account.js';
import VideoPage from './features/components/VideoPage.js';
import SignIn from './features/components/SignIn.js';
import AddVideo from './features/components/AddVideo.js';
import EditVideo from './features/components/EditVideo.js';
import EditAccount from './features/components/EditAccount.js';
import GoToMainPage from './features/components/GoToMainPage.js';



function App() {
  const [searchInfo, setSearchInfo] = useState('')
  const [menuOpened, setMenuState] = useState(false)
  return <>
    <Header setMenuState={setMenuState}
            searchInfo={searchInfo}
            onChangedSearchInfo={setSearchInfo}
    />
    <Menu opened={menuOpened} setMenuState={setMenuState}/>
    <WrapperWithScrollbar>
    <Switch>
      <Route path="/" exact>
        <Videos searchInfo={searchInfo}/>
      </Route>
      <Route path="/account/:id" exact>
        <GoToMainPage/>
        <Account searchInfo={searchInfo}/>
      </Route>
      <Route path="/my-account" exact>
        <GoToMainPage/>
        <Account self searchInfo={searchInfo}/>
      </Route>
      <Route path="/video/:id" exact>
        <GoToMainPage/>
        <VideoPage/>
      </Route>
      <Route path="/sign-in" exact>
        <GoToMainPage/>
        <SignIn/>
      </Route>
      <Route path="/create-account" exact>
        <GoToMainPage/>
        <SignIn createAccount/>
      </Route>
      <Route path="/edit-account" exact>
        <GoToMainPage/>
        <EditAccount/>
      </Route>
      <Route path="/add-video" exact>
        <GoToMainPage/>
        <AddVideo/>
      </Route>
      <Route path="/edit-video/:id">
        <GoToMainPage/>
        <EditVideo/>
      </Route>
    </Switch>
    </WrapperWithScrollbar>
  </>;
}

export default App;
