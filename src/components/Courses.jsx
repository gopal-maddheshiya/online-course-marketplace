import { useState } from 'react'

const courseTitles = [
  ["Modern HTML, CSS and JavaScript Masterclass", "Web Development"],
  ["Frontend Performance and Accessibility", "Web Development"],
  ["Full Stack Web Apps Without Framework Lock-in", "Web Development"],
  ["Java Spring Foundations", "Java Development"],
  ["Advanced Java Design Patterns", "Java Development"],
  ["Enterprise APIs with Java", "Java Development"],
  ["Python for Data Automation", "Python"],
  ["Python Web Services Bootcamp", "Python"],
  ["Applied Python for Analysts", "Python"],
  ["Data Structures Interview Lab", "Data Structures"],
  ["Algorithms Visualized", "Data Structures"],
  ["System Design with Strong Fundamentals", "Data Structures"],
]

export default function Courses({ setCartCount }) {
  const [courses, setCourses] = useState(courseTitles.map((title, i) => ({
    id: i,
    title: title[0],
    category: title[1],
    instructor: 'Expert Instructor',
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(Math.random() * 500) + 100,
    price: Math.floor(Math.random() * 100) + 29.99,
    inCart: false
  })))

  const addToCart = (id) => {
    setCourses(courses.map(c => 
      c.id === id ? { ...c, inCart: !c.inCart } : c
    ))
    setCartCount(prev => prev + 1)
  }

  return (
    <section id="courses" className="courses container">
      <h2>Featured Courses</h2>
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-image">
              <img src="assets/course-pattern.svg" alt={course.title} />
            </div>
            <div className="course-content">
              <span className="course-category">{course.category}</span>
              <h3>{course.title}</h3>
              <p className="course-instructor">{course.instructor}</p>
              <div className="course-rating">
                <span className="stars">★★★★★</span>
                <span>{course.rating}</span>
                <span className="reviews">({course.reviews})</span>
              </div>
              <div className="course-footer">
                <span className="price">${course.price}</span>
                <button 
                  className={`btn small ${course.inCart ? 'danger' : 'primary'}`}
                  onClick={() => addToCart(course.id)}
                >
                  {course.inCart ? 'Remove' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
