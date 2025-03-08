import { Route, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import TemplateUpload from './components/TemplateUpload'

function App() {

  return (
    <>
      <div  div className="flex">
        <Navbar/>
        <Sidebar/>
        <div className="flex-1 p-6">
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/templateUpload' element={<TemplateUpload/>}/>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
