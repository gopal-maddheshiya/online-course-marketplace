export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-content">
        <h1>Learn New Skills Online</h1>
        <p>Discover thousands of courses from expert instructors. Master web development, cloud computing, data science, and more.</p>
        <div className="hero-actions">
          <button className="btn primary large">Explore Courses</button>
          <button className="btn ghost large">Learn More</button>
        </div>
      </div>
      <div className="hero-visual">
        <svg className="hero-image" viewBox="0 0 400 300">
          <rect width="400" height="300" fill="var(--bg-soft)" />
          <text x="200" y="150" textAnchor="middle" fontSize="20" fill="var(--muted)">Hero Illustration</text>
        </svg>
      </div>
    </section>
  )
}
