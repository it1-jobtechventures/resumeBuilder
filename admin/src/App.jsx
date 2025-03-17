import { Route, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import TemplateUpload from './components/TemplateUpload'
import DisplayTemplate from './components/DisplayTemplate'

function App() {
  const backend_url = 'http://localhost:5000/api'

  return (
    <>
      <div  div className="flex">
        <Navbar/>
        <Sidebar/>
        <div className="flex-1 p-6">
          <Routes>
            <Route path='/' element={<Dashboard backend_url={backend_url}/>}/>
            <Route path='/template' element={<TemplateUpload backend_url={backend_url}/>}/>
            <Route path='/all-template' element={<DisplayTemplate backend_url={backend_url}/>}/>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
