import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import './Popup.css'

const Popup = ({ children, onClose, isOpen }) => {
  if (!isOpen) return null

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return createPortal(
    <div className="popup-backdrop">
      <div className="popup-content">
        <button
          onClick={onClose}
          className="button--close"
        >
          x
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Popup
