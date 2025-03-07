import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <div  div className="flex">
        <Sidebar/>
        <div className="flex-1 p-6">
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
