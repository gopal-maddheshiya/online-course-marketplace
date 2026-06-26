const instructorsSeed = [
  ["Maya Chen", "Full-stack architect", "Web Development"],
  ["Arjun Mehta", "Java platform lead", "Java Development"],
  ["Sofia Rivera", "Python data mentor", "Python"],
  ["Noah Brooks", "Algorithms coach", "Data Structures"],
  ["Iris Walker", "Data engineer", "Machine Learning"],
  ["Lena Okafor", "Cloud product scientist", "Cloud Engineering"],
  ["Ethan Park", "Security analyst", "Cyber Security"],
  ["Nora Singh", "Cloud solutions architect", "Cloud Computing"],
  ["Ava Martin", "Product design lead", "UI/UX Design"],
  ["Mateo Gomez", "Mobile engineer", "Mobile Development"]
]

export default function Instructors() {
  return (
    <section id="instructors" className="instructors container">
      <h2>Expert Instructors</h2>
      <div className="instructors-grid">
        {instructorsSeed.map((instructor, i) => (
          <div key={i} className="instructor-card">
            <div className="instructor-avatar">
              <div className="avatar-placeholder">{instructor[0][0]}</div>
            </div>
            <h3>{instructor[0]}</h3>
            <p className="instructor-title">{instructor[1]}</p>
            <p className="instructor-category">{instructor[2]}</p>
            <button className="btn small ghost">Follow</button>
          </div>
        ))}
      </div>
    </section>
  )
}
