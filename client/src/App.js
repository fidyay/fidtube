import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './features/components/Header.js'
import Menu from './features/components/Menu.js';
import Videos from './features/components/Videos.js';
import WrapperWithScrollbar from './features/components/Wrapper.js';
import Account from './features/components/Account.js';
import VideoPage from './features/components/VideoPage.js';
import SignIn from './features/components/SignIn.js';
import AddVideo from './features/components/AddVideo.js';
import GoToMainPage from './features/components/GoToMainPage.js';
import { fetchAccounts } from './app/slices/accountsSlice.js';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchVideos } from './app/slices/videosSlice.js'
import Loader from './features/components/Loader.js';
import Error from './features/components/Error.js';




function App() {
  const accountsStatus = useSelector(state => state.accounts.status)
  const videosStatus = useSelector(state => state.videos.status)

  const dispatch = useDispatch()
  useEffect(() => {
    if (accountsStatus === 'idle' || videosStatus === 'idle') {
      dispatch(fetchAccounts())
      dispatch(fetchVideos())
    }
  }, [dispatch, accountsStatus, videosStatus])
  const [searchInfo, setSearchInfo] = useState('')
  const [menuOpened, setMenuState] = useState(false)

  if (accountsStatus === 'loading' || videosStatus === 'loading') return <Loader/>

  if (accountsStatus === 'error' || videosStatus === 'error') return <Error/>

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
      <Route path="/add-video" exact>
        <GoToMainPage/>
        <AddVideo/>
      </Route>
      <Redirect to="/"/>
    </Switch>
    </WrapperWithScrollbar>
  </>;
}

export default App;
