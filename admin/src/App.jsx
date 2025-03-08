import { Route, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Template from './components/Template'

function App() {

  return (
    <>
      <div  div className="flex">
        <Navbar/>
        <Sidebar/>
        <div className="flex-1 p-6">
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/template' element={<Template/>}/>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
