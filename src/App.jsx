import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import CheckIn from './Pages/CheckIn'
import BottomNavigation from './Components/BottomNav/BottomNavigation'
import CheckInSuccess from './Pages/CheckInSuccess'
import Protected from './Components/ProtecteRoute/Protected'
import Activity from './Pages/Activity'

function App() {

  const pathname = useLocation().pathname

  return (
    <div className='max-w-lg mx-auto '>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={
          <Protected>
            <Dashboard />
          </Protected>
        } />
        <Route path='/check-in' element={
          <Protected>
            <CheckIn />
          </Protected>
        } />
        <Route path='/activity' element={
          <Protected>
            <Activity />
          </Protected>
        } />
        <Route path='/check-in-success' element={<CheckInSuccess />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
      {pathname === '/login' || pathname === '/check-in-success' ? <></> : <BottomNavigation />}

    </div>
  )
}

export default App
