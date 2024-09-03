import React from 'react'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Ngos from './pages/Ngos'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRouter from './components/PrivateRouter'
import CreatePost from './pages/CreatePost'
import OnlyAdminPrivateRouter from './components/OnlyAdminPrivateRouter copy'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'
import Donateform from './pages/Donateform'

export default function App() {
  return (
   <BrowserRouter>
   <ScrollToTop/>
<Header/>
   <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/about" element={<About/>}></Route>
    <Route path="/donate" element={<Donateform/>}></Route>
    <Route path="/sign-in" element={<Signin/>}></Route>
    <Route path="/sign-up" element={<Signup/>}></Route>
    <Route element={<PrivateRouter/>}>
    <Route path="/dashboard" element={<Dashboard/>}/>
</Route>
<Route element={<OnlyAdminPrivateRouter/>}>
    <Route path="/create-post" element={<CreatePost/>}/>
    <Route path="/update-post/:postId" element={<UpdatePost/>}/>
</Route>
    
    <Route path="/ngo" element={<Ngos/>}></Route>
    <Route path="/post/:postSlug" element={<PostPage/>}></Route>
   </Routes>
   <Footer/>
   </BrowserRouter>
  )
}
