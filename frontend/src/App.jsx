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
import FeedbackForm from './components/FeedbackForm'

function App() {
  const url = import.meta.env.VITE_BACKEND_URL;

  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<HomePage url={url}/>}/>
        <Route path='/login' element={<Login url={url}/>}/>
        <Route path='/reset-password' element={<ResetPassword url={url}/>} />
        <Route path='/createResume' element={<ResumePage url={url}/>}/>
        <Route path='/templates' element={<TemplatePage url={url}/>}/>
        <Route path='/resume-review' element={<ResumeReview url={url}/>}/>
        <Route path='/profile' element={<ProfilePage url={url}/>}/>
        <Route path='/feedback' element={<FeedbackForm/>}/>
      </Routes>
    </>
  )
}

export default App
