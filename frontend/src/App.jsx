import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import ResumePage from './pages/ResumePage'
import TemplatePage from './pages/TemplatePage'
import ResumeReview from './components/ResumeReview'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './pages/ResetPassword'
import ProfilePage from './pages/ProfilePage'

function App() {
 
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reset-password' element={<ResetPassword/>} />
        <Route path='/createResume' element={<ResumePage/>}/>
        <Route path='/templates' element={<TemplatePage/>}/>
        <Route path='/resume-review' element={<ResumeReview/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </>
  )
}

export default App
