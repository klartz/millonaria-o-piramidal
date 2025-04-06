import { useEffect, useState } from 'react'
import { Button } from '../../components'
import { useAuth } from '../../contexts'
import AuthPopup from '../../features/AuthPopup/AuthPopup'
import './Landing.css'
import { useNavigate } from 'react-router-dom'

function Landing() {
  const { session, isAuthenticated } = useAuth()
  const [authPopupOpen, setAuthPopupOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated])

  return (
    <>
      <div className="landing">
        <section>
          <div>
            <div className='landing--main-text'>
              <h1>¿Tu idea es de una <span>startup millonaria</span> o una <span>estafa piramidal</span>? 🤔</h1>
              <p>¡Contanos tu idea y nuestra IA te dirá si tu startup es la próxima idea millonaria o simplemente estás estafando a tus clientes!</p>
            </div>
          </div>

          <div className='landing--demo'>
            <div>
              <h2>Escribí tu gran idea</h2>
              <p>Nuestra IA va a prenteder analizarla cuidadosamente</p>
            </div>
            <div>
              <div className='landing--prompt'>"Una aplicación que usa blockchain para repartir lomitos con palomas mensajeras..."</div>
              <div className='landing--response'>Probablemente sea una estafa: Las palomas no pueden llevar lomitos y una blockchain.</div>
            </div>
            <Button fullWidth disabled>Probar con otra idea</Button>
          </div>
        </section>

        <section>
          <div className='landing--main-text'>
            <h1>¿Estás listo para averiguar si se te ocurrió una idea millonaria? (Spoiler: Probablemente no)</h1>
            <p>¡Unite a miles* de usuarios (imaginarios) que ya averiguaron si sus ideas valían la pena!</p>
            <p className='landing--small-note'>(*Número posiblemente exagerado)</p>
          </div>
          <div className='landing--buttons'>
            <Button
              onClick={() => setAuthPopupOpen(!session)}>
              Iniciar sesión
            </Button>
            <Button
              onClick={() => setAuthPopupOpen(true)}
              style='outlined'>
              Crear una cuenta gratis
            </Button>
          </div>
        </section>
      </div>

      <AuthPopup isOpen={authPopupOpen} setIsOpen={setAuthPopupOpen}/>
    </>
  )
}

export default Landing
