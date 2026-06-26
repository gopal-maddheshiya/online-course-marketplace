import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Courses from './components/Courses'
import Categories from './components/Categories'
import Instructors from './components/Instructors'
import AuthModal from './components/AuthModal'
import AdminDashboard from './components/AdminDashboard'

function App() {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')
  const [cartCount, setCartCount] = useState(0)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [showDummyStudentData, setShowDummyStudentData] = useState(false)

  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem('ocm_theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme === 'dark' ? 'dark' : 'light')

    // Load user if exists from the full state object
    const fullState = JSON.parse(localStorage.getItem('full_demo_state'));
    if (fullState && fullState.user) {
      setUser(fullState.user)
    } else {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('ocm_theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : 'light')
  }

  const handleLoginSuccess = (userData) => {
    // For demo purposes, hardcode the admin check
    if (userData.email === 'gopal@example.com' || userData.name === 'Admin') {
        userData.role = 'Admin';
    }
    setUser(userData)
    setAuthModalOpen(false)
    localStorage.setItem('user', JSON.stringify(userData));
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('full_demo_state')
    localStorage.removeItem('gopal_demo_data_loaded')
    window.location.reload(); // Refresh to clear everything
  }

  const handleDataLoad = (demoData) => {
    // Save the entire state to localStorage
    localStorage.setItem('full_demo_state', JSON.stringify(demoData));
    localStorage.setItem('gopal_demo_data_loaded', 'true');
    
    // Also update the individual user item for compatibility
    localStorage.setItem('user', JSON.stringify(demoData.user));

    // Update state and refresh
    setUser(demoData.user);
    // The prompt asks for a refresh, which is the simplest way to get all
    // components to re-read from localStorage.
    window.location.reload();
  };

  return (
    <div className="app">
      <Header 
        user={user}
        onThemeToggle={toggleTheme}
        cartCount={cartCount}
        onLogout={handleLogout}
        onLoginClick={() => setAuthModalOpen(true)}
        onToggleDummyStudentData={() => setShowDummyStudentData(!showDummyStudentData)}
      />
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      
      {user && user.role === 'Admin' && (
        <AdminDashboard onDataLoad={handleDataLoad} />
      )}

      {showDummyStudentData && (
        <section style={{ padding: '20px', backgroundColor: '#f0f0f0', margin: '20px', borderRadius: '8px', color: 'black' }}>
          <h2>Dummy Student Data</h2>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john.doe@example.com</p>
          <p><strong>Enrolled Courses:</strong> Web Development, Data Science</p>
          <p><strong>Progress:</strong> 75% completed in Web Development</p>
        </section>
      )}
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
