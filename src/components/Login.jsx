import { useState } from 'react'

export default function Login({ onLoginSuccess, onSwitchToSignup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    // Store user data
    const user = { email, name: email.split('@')[0] }
    localStorage.setItem('user', JSON.stringify(user))
    
    onLoginSuccess(user)
  }

  return (
    <div className="auth-modal">
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              placeholder="your@email.com"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="Enter your password"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn primary full-width">
            Login
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account?{' '}
          <button 
            type="button" 
            onClick={onSwitchToSignup}
            className="link-btn"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
