import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserProtectedWrapper from './components/UserProtectedWrapper';

function App() {

  const { authUser } = useContext(AuthContext)

  return (
    <div className='bg-[url("./src/assets/bgImage.svg")] backdrop-brightness-10 bg-cover bg-center '>
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
        <Route path='/profile' element={authUser ? <Profile /> : <Navigate to='/login' />} />
      </Routes>
      {/* <Routes>
        <Route path='/' element={<UserProtectedWrapper>
          <Home />
        </UserProtectedWrapper>} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={
          <UserProtectedWrapper>
            <Profile />
          </UserProtectedWrapper>} />
      </Routes> */}
    </div>
  );
}

export default App;

