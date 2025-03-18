import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Login from './components/Login'
import ResumePage from './pages/ResumePage'
import TemplatePage from './pages/TemplatePage'
import ResumeReview from './components/ResumeReview'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
 
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/createResume' element={<ResumePage/>}/>
        <Route path='/templates' element={<TemplatePage/>}/>
        <Route path='/resume-review' element={<ResumeReview/>}/>
      </Routes>
    </>
  )
}

export default App
