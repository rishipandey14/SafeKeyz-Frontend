import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Components/Body';
import Feed from './Components/Feed';
import Login from './Components/Login';
import Profile from './Components/Profile';

const App = () => {
  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='/feed' element={<Feed />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;