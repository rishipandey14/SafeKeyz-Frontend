import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Components/Body';
import Feed from './Components/Feed';
import Login from './Components/Login';
import Profile from './Components/Profile';
import HomePage from './Components/HomePage';
import Signup from './Components/Signup';

const App = () => {
  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route index element={<HomePage />} />
            <Route path='/feed' element={<Feed />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;