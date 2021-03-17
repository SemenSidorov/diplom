import React from 'react';
import './App.css';
import AppLayoutContainer from "./main/AppLayoutContainer";
import { Switch, Route } from 'react-router-dom'
import AuthContainer from "./main/Auth/AuthContainer";
import ProfileContainer from "./main/Profile/ProfileContainer";

function App() {
    //todo логика для получения айди и статуса авторизации
    console.log(9)
  return (
      <Switch>
        <Route exact path='/' render={() => <AppLayoutContainer/>}/>
        <Route exact path='/:isRegister' render={() => (<AuthContainer />)}/>
        <Route exact path='/profile/:userId/:currentTab' render={() => <ProfileContainer />}/>
      </Switch>

  );
}

export default App;
