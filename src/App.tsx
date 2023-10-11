import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Provider from './context/Provider'
import Events from './pages/Events/Events'
import Home from './pages/Home/Home'

function App() {

  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" Component={Login} />
        <Route path="/eventos/:albumname" element={<Events />} />
      </Routes>
    </Provider>
  )
}

export default App
