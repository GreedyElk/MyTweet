import { useEffect, useState, useContext, createContext} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import TweetingComponent from './Components/TweetingComponent'
import Profile from './Components/Profile'
import MessageIndicator from './Components/MessageIndicator';

import GlobalContext from './Components/GlobalContext'

function App() {

  function getUserName(userName){
    localStorage.setItem('userName', userName)
  }

  /*Proper page display*/

  let activePage = localStorage.getItem('activePage')

  function declareActive(pageName){
    if(pageName != activePage){localStorage.setItem('activePage', pageName);}
  }

  function isActive(pageName){
    let pageStat
    (pageName == activePage) ? (pageStat = 'active') : (pageStat = 'inactive')
    return(pageStat)
  }

  return (
    <>
      <GlobalContext>
        <BrowserRouter>
          <div id='navbar'>
            <a href='\' className = {isActive('Home')} onClick={() => declareActive('Home')}>Home</a>
            <a href='/Profile' className = {isActive('Profile')} onClick={() => declareActive('Profile')}>Profile</a>

            <MessageIndicator />
          </div>
          <Routes>
            <Route path='' element = {<TweetingComponent />}></Route>
            <Route path='/Profile' element = {<Profile getUserName = {getUserName}/>}></Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext>
    </>
  )
}

export default App
