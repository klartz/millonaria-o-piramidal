import { Button, Popup } from "../../components";
import { useAuth } from "../../contexts";
import { updateAccountTier } from "../../services";
import "./GiftPopup.css"

function GiftPopup({isOpen, setIsOpen}) {
  const { userId } = useAuth()

  const onClose = () => {setIsOpen(false)}
  const handleAccept = async () => {
    await updateAccountTier(userId, "pro")
    onClose()
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="gift-popup">
        <h2>¡Felicitaciones!</h2>
        <div>
          <p>Te hemos regalado una cuenta PRO gratis por ser de nuestros primeros 100 usuarios.</p>
          <p>¡Con ella podés evaluar una cantidad ilimitada de ideas!</p>
        </div>
        <Button fullWidth onClick={() => handleAccept()}>Aceptar</Button>
      </div>
    </Popup>
  )
}

export default GiftPopup