import { useState } from 'react'

export default function Header({ user, onThemeToggle, cartCount, onLogout, onLoginClick, onToggleDummyStudentData }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    onLogout()
    setMenuOpen(false)
  }

  return (
    <header className="site-header glass">
      <a className="brand" href="#home" aria-label="Online Course Marketplace Home">
        <img src="assets/logo.svg" alt="" width="38" height="38" />
        <span>CourseMarket</span>
      </a>
      <button 
        className="icon-btn menu-toggle" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open menu"
      >
        <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
      <nav className="main-nav" id="mainNav" aria-label="Primary navigation">
        <a href="#home">Home</a>
        <a href="#courses">Courses</a>
        <a href="#categories">Categories</a>
        <a href="#instructors">Instructors</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="header-actions">
        <button 
          className="icon-btn" 
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          <svg viewBox="0 0 24 24"><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/><circle cx="12" cy="12" r="4"/></svg>
        </button>
        <button className="icon-btn cart-btn" aria-label="Open cart">
          <svg viewBox="0 0 24 24"><path d="M6 6h15l-2 8H8L6 3H3"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
          <span id="cartCount">{cartCount}</span>
        </button>
        <button 
          className="btn ghost" 
          onClick={onToggleDummyStudentData}
          aria-label="Toggle Dummy Data"
        >
          Dummy Data
        </button>
        {!user ? (
          <>
            <button className="btn ghost auth-only signed-out" onClick={onLoginClick}>Login</button>
            <button className="btn primary auth-only signed-out" onClick={onLoginClick}>Signup</button>
          </>
        ) : (
          <>
            <button className="btn ghost auth-only signed-in">{user.name}</button>
            <button className="btn danger auth-only signed-in" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  )
}
