import React, {useEffect} from 'react';
import './App.css';
import AppLayoutContainer from "./main/AppLayoutContainer";
import { Switch, Route, withRouter } from 'react-router-dom'
import AuthContainer from "./main/Auth/AuthContainer";
import ProfileContainer from "./main/Profile/ProfileContainer";

function App() {
    useEffect(() => {
        document.body.className = 'background'
    }, []);
  return (
      <Switch>
        <Route exact path='/' render={() => <AppLayoutContainer/>}/>
        <Route exact path='/:isRegister' render={() => (<AuthContainer />)}/>
        <Route exact path='/profile/:userId/:currentTab' render={() => <ProfileContainer />}/>
      </Switch>
  );
}

export default withRouter(App);
