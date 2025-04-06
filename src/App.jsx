import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Landing, Home } from './pages'
import { MantineProvider } from '@mantine/core'
import { Navbar } from './components'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/" />
}

function App() {
  return (
    <AuthProvider>
      <MantineProvider>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </AuthProvider>
  )
}

export default App
