import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Login from './components/Login'
import ResumePage from './pages/ResumePAge'


function App() {
 
  return (
    <>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/createResume' element={<ResumePage/>}/>
      </Routes>
    </>
  )
}

export default App
