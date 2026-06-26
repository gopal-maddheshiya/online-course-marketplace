const categories = [
  "Web Development",
  "Java Development",
  "Python",
  "Data Structures",
  "Machine Learning",
  "Cloud Engineering",
  "Cyber Security",
  "Cloud Computing",
  "UI/UX Design",
  "Mobile Development"
]

export default function Categories() {
  return (
    <section id="categories" className="categories container">
      <h2>Popular Categories</h2>
      <div className="categories-grid">
        {categories.map((cat, i) => (
          <div key={i} className="category-card">
            <div className="category-icon">
              <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <h3>{cat}</h3>
            <p>{Math.floor(Math.random() * 500) + 50} courses</p>
          </div>
        ))}
      </div>
    </section>
  )
}
