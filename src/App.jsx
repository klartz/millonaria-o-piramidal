import './App.css'
import { AuthProvider } from './contexts'
import Landing from './pages/Landing/Landing'

function App() {
  return (
    <AuthProvider>
      <Landing />
    </AuthProvider>
  )
}

export default App
