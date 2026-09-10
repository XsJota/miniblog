// imports
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

// hooks
import { useEffect, useState } from 'react'
import { useAuthentication } from './hooks/useAuthentication'

// import css
import './App.css'

// imports components
import Footer from './components/Footer'
import Navbar from './components/Navbar'

// context
import { AuthContextProvider } from './context/AuthContext'

// imports pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'
import Search from './pages/Search/Search'
import Post from './pages/Post/Post'
import EditPost from './pages/EditPost/EditPost'


function App() {
  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  const loadingUser = user === undefined;

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <AuthContextProvider value={{user}}>
        <BrowserRouter>
        <Navbar />
          <div className="conteiner">
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/about' element={<About />}/>
              <Route path='/search' element={<Search />}/>
              <Route path='/post/:id' element={<Post />}/>
              <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />}/>
              <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />}/>
              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to='/login' />}/>
              <Route path='/post/edit/:id' element={user ? <EditPost /> : <Navigate to='/login' />}/>
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/login' />}/>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </>
  )
}

export default App
