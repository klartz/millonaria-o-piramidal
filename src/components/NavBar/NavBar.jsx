import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts'
import { Button } from '../../components'
import './NavBar.css'
import AuthPopup from '../../features/AuthPopup/AuthPopup'
import { useState } from 'react'
import GiftPopup from '../../features/GiftPopup/GiftPopup'

function Navbar() {
  const { session, logout, accountTier } = useAuth()
  const [authPopupOpen, setAuthPopupOpen] = useState(false)
  const [proPoupOpen, setProPopupOpen] = useState(false)

  const navigate = useNavigate()

  return (
    <>
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/')}>
          🚀 MillonariaPiramidal
        </div>

        {/* Right-side actions */}
        <div className="navbar--buttons">
          {session ? (
            <>
              {accountTier === 'free' && (
                <Button onClick={() => setProPopupOpen(true)}>
                  Versión PRO
                </Button>
              )}
              <Button onClick={logout} style='outlined'>
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => setAuthPopupOpen(true)} style='outlined'>
              Iniciar sesión
            </Button>
          )}
        </div>
      </nav>
      <GiftPopup isOpen={proPoupOpen} setIsOpen={setProPopupOpen} />
      <AuthPopup isOpen={authPopupOpen} setIsOpen={setAuthPopupOpen} />
    </>
  )
}

export default Navbar
