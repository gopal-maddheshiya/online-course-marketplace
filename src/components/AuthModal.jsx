import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login')

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        {mode === 'login' ? (
          <Login 
            onLoginSuccess={(user) => {
              onLoginSuccess(user)
              onClose()
            }}
            onSwitchToSignup={() => setMode('signup')}
          />
        ) : (
          <Signup 
            onSignupSuccess={(user) => {
              onLoginSuccess(user)
              onClose()
            }}
            onSwitchToLogin={() => setMode('login')}
          />
        )}
      </div>
    </div>
  )
}
