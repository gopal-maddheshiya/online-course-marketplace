import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Courses from './components/Courses'
import Categories from './components/Categories'
import Instructors from './components/Instructors'
import AuthModal from './components/AuthModal'

function App() {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')
  const [cartCount, setCartCount] = useState(0)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem('ocm_theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme === 'dark' ? 'dark' : 'light')

    // Load user if exists
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('ocm_theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : 'light')
  }

  const handleLoginSuccess = (userData) => {
    setUser(userData)
    setAuthModalOpen(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <div className="app">
      <Header 
        user={user}
        onThemeToggle={toggleTheme}
        cartCount={cartCount}
        onLogout={handleLogout}
        onLoginClick={() => setAuthModalOpen(true)}
      />
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <main id="app" tabindex="-1">
        <Hero />
        <Courses setCartCount={setCartCount} />
        <Categories />
        <Instructors />
      </main>
      <button className="back-top icon-btn" aria-label="Back to top">
        <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
      </button>
    </div>
  )
}

export default App
