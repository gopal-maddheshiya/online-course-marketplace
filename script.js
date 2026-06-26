"use strict";

const STORAGE_KEY = "ocm_state_v1";
const THEME_KEY = "ocm_theme";
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
];

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
];

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
  ["Machine Learning from Scratch", "Machine Learning"],
  ["Practical Data Science Projects", "Machine Learning"],
  ["MLOps Deployment Essentials", "Machine Learning"],
  ["Cloud Product Studio", "Cloud Engineering"],
  ["Systems Thinking for Builders", "Cloud Engineering"],
  ["Workflow Automation with Cloud Tools", "Cloud Engineering"],
  ["Ethical Hacking Essentials", "Cyber Security"],
  ["SOC Analyst Career Path", "Cyber Security"],
  ["Cloud Security and Compliance", "Cyber Security"],
  ["AWS Cloud Practitioner to Architect", "Cloud Computing"],
  ["Azure DevOps Delivery Pipeline", "Cloud Computing"],
  ["Kubernetes for Production Teams", "Cloud Computing"],
  ["UX Research and Product Strategy", "UI/UX Design"],
  ["Figma Design Systems", "UI/UX Design"],
  ["Interaction Design Portfolio Lab", "UI/UX Design"],
  ["Android Kotlin Career Track", "Mobile Development"],
  ["iOS Apps with Swift", "Mobile Development"],
  ["Cross-platform Mobile UI Patterns", "Mobile Development"],
  ["JavaScript Projects for Beginners", "Web Development"],
  ["Data Science Career Accelerator", "Python"]
];

const app = document.getElementById("app");
const modal = document.getElementById("modal");
let state = loadState();
let currentDashboardTab = "overview";
let currentLessonIndex = 0;
let activeQuiz = null;
let quizTimer = null;

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function currency(value) {
  return `$${Number(value).toFixed(0)}`;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function loadState() {
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) return JSON.parse(cached);
  const seeded = seedState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  syncHeader();
}

function seedState() {
  const instructors = instructorsSeed.map((item, index) => ({
    id: `inst_${index + 1}`,
    name: item[0],
    headline: item[1],
    specialty: item[2],
    bio: `${item[0]} helps learners turn practical projects into durable career skills.`,
    rating: Number((4.6 + (index % 4) * 0.08).toFixed(1)),
    students: 12000 + index * 1850,
    earnings: 36000 + index * 7400
  }));

  const users = [
    { id: "admin_1", name: "Platform Admin", email: "admin@coursemarket.test", password: "Admin123!", role: "Admin", notifications: [] },
    ...instructors.map((i, index) => ({ id: i.id, name: i.name, email: `instructor${index + 1}@coursemarket.test`, password: "Teach123!", role: "Instructor", notifications: [] }))
  ];

  for (let i = 1; i <= 22; i += 1) {
    users.push({ id: `student_${i}`, name: `Student ${i}`, email: `student${i}@coursemarket.test`, password: "Learn123!", role: "Student", notifications: [] });
  }

  const palette = ["#176BFF", "#19C7D4", "#7C5CFF", "#FFB84D", "#0E9F6E", "#E5484D"];
  const courses = courseTitles.map((item, index) => {
    const category = item[1];
    const instructor = instructors.find((i) => i.specialty === category) || instructors[index % instructors.length];
    const price = 79 + (index % 7) * 20;
    const discount = price - 20 - (index % 3) * 5;
    return {
      id: `course_${index + 1}`,
      title: item[0],
      instructorId: instructor.id,
      instructor: instructor.name,
      price,
      discountPrice: discount,
      rating: Number((4.3 + (index % 7) * 0.08).toFixed(1)),
      students: 900 + index * 417,
      duration: `${8 + (index % 9) * 2}h ${(index % 5) * 10}m`,
      durationHours: 8 + (index % 9) * 2,
      level: ["Beginner", "Intermediate", "Advanced"][index % 3],
      category,
      color: palette[index % palette.length],
      description: `A polished, project-based ${category.toLowerCase()} course focused on practical workflows, portfolio-ready outcomes, and confident problem solving.`,
      outcomes: [
        "Build production-style projects with guided practice",
        "Explain core concepts in interviews and team reviews",
        "Apply modern tools, patterns, and quality checks",
        "Create a portfolio artifact that demonstrates real skill"
      ],
      requirements: [
        "A laptop with a modern browser",
        "Comfortable using basic web tools",
        "A willingness to practice between lessons"
      ],
      chapters: Array.from({ length: 5 }, (_, chapter) => ({
        title: `Chapter ${chapter + 1}: ${["Foundations", "Core Skills", "Project Build", "Optimization", "Career Practice"][chapter]}`,
        lessons: Array.from({ length: 3 }, (_, lesson) => ({
          id: `course_${index + 1}_l_${chapter + 1}_${lesson + 1}`,
          title: `${["Setup", "Concept", "Workshop"][lesson]} ${chapter + 1}`,
          duration: `${8 + lesson * 5} min`,
          video: "Simulated video lesson"
        }))
      })),
      reviews: [
        { id: uid("rev"), userId: "student_1", name: "Student 1", rating: 5, text: "Clear structure, practical exercises, and a useful final project.", date: "2026-05-08" },
        { id: uid("rev"), userId: "student_2", name: "Student 2", rating: 4, text: "Excellent pacing and helpful instructor explanations.", date: "2026-05-19" }
      ],
      discussions: [
        { id: uid("thread"), user: "Student 4", question: "How should I prepare for the final project?", likes: 4, replies: [{ user: instructor.name, text: "Start from the checklist in Chapter 4 and share your draft notes." }] }
      ],
      assignments: [
        { id: uid("assign"), title: "Portfolio checkpoint", due: "2026-07-10", grade: "Pending" },
        { id: uid("assign"), title: "Final project brief", due: "2026-07-22", grade: "Pending" }
      ],
      quiz: {
        pass: 70,
        questions: [
          { q: `What is the best way to learn ${category}?`, options: ["Only read theory", "Build projects and review feedback", "Skip fundamentals", "Memorize tool names"], answer: 1 },
          { q: "Which habit improves long-term retention?", options: ["Spaced practice", "Random guessing", "Avoiding review", "Ignoring mistakes"], answer: 0 },
          { q: "What should a production-quality project include?", options: ["Clear UX and error states", "Unlabeled controls", "No validation", "Broken layout"], answer: 0 },
          { q: "When stuck, what should you inspect first?", options: ["Requirements and recent changes", "Only colors", "Nothing", "Delete the project"], answer: 0 },
          { q: "What makes a course outcome useful?", options: ["It is observable and practical", "It is vague", "It cannot be tested", "It has no example"], answer: 0 }
        ]
      },
      createdAt: "2026-06-01"
    };
  });

  const enrollments = [
    { userId: "student_1", courseId: "course_1", progress: 66, completedLessons: ["course_1_l_1_1", "course_1_l_1_2", "course_1_l_2_1"], certificate: false },
    { userId: "student_1", courseId: "course_13", progress: 100, completedLessons: ["done"], certificate: true },
    { userId: "student_2", courseId: "course_7", progress: 44, completedLessons: [], certificate: false }
  ];

  return {
    users,
    instructors,
    courses,
    enrollments,
    wishlist: { student_1: ["course_2", "course_16"] },
    cart: [],
    currentUserId: null,
    orders: [],
    notes: {},
    bookmarks: {},
    quizResults: [],
    assignments: [],
    categories: [...categories],
    reports: [
      { id: uid("report"), title: "Monthly platform quality review", status: "Open", date: "2026-06-20" }
    ],
    newsletter: []
  };
}

function currentUser() {
  return state.users.find((u) => u.id === state.currentUserId) || null;
}

function isSignedIn() {
  return Boolean(currentUser());
}

function syncHeader() {
  document.body.classList.toggle("is-signed-in", isSignedIn());
  document.getElementById("cartCount").textContent = state.cart.length;
}

function toast(message, type = "info") {
  const stack = document.getElementById("toast");
  const item = document.createElement("div");
  item.className = `toast ${type}`;
  item.textContent = message;
  stack.appendChild(item);
  setTimeout(() => item.remove(), 3200);
}

function routeTo(route) {
  window.location.hash = route;
}

function getRoute() {
  return window.location.hash.replace(/^#/, "") || "home";
}

function setView(html) {
  app.innerHTML = html;
  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
  bindCommon();
  observeReveals();
}

function showLoader() {
  document.getElementById("loader").classList.add("show");
  setTimeout(() => document.getElementById("loader").classList.remove("show"), 260);
}

function initials(name) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function courseById(id) {
  return state.courses.find((c) => c.id === id);
}

function userEnrollments(userId = state.currentUserId) {
  return state.enrollments.filter((e) => e.userId === userId);
}

function courseCard(course) {
  const wished = isWished(course.id);
  return `
    <article class="card course-card reveal">
      <div class="thumb" style="background-color:${course.color}">
        <span class="badge">${course.category}</span>
      </div>
      <div class="course-body">
        <div class="meta-row"><span>Rating ${course.rating}</span><span>${course.students.toLocaleString()} students</span></div>
        <h3>${course.title}</h3>
        <p class="muted">${course.description}</p>
        <div class="meta-row"><span>${course.instructor}</span><span>${course.duration}</span><span>${course.level}</span></div>
        <div class="price"><span>${currency(course.discountPrice)}</span><del>${currency(course.price)}</del></div>
        <div class="actions">
          <button class="btn primary small" data-course-detail="${course.id}">View course</button>
          <button class="btn ghost small" data-cart="${course.id}">Add to cart</button>
          <button class="btn ghost small" data-wish="${course.id}">${wished ? "Saved" : "Wishlist"}</button>
        </div>
      </div>
    </article>
  `;
}

function renderHome() {
  const featured = [...state.courses].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const popular = [...state.courses].sort((a, b) => b.students - a.students).slice(0, 6);
  const stats = {
    courses: state.courses.length,
    students: state.users.filter((u) => u.role === "Student").length + 56000,
    instructors: state.instructors.length,
    ratings: "4.8"
  };
  setView(`
    <section class="page hero">
      <div class="hero-copy">
        <span class="eyebrow">Online Course Marketplace</span>
        <h1>Career-ready learning for ambitious builders.</h1>
        <p>Discover expert-led courses in development, AI, design, cloud, and security. Track progress, earn certificates, join discussions, and learn at your own pace.</p>
        <div class="search-card glass">
          <input id="heroSearch" class="field" type="search" placeholder="Search courses, instructors, or skills">
          <select id="heroCategory" class="select">${optionList(["All Categories", ...state.categories])}</select>
          <button class="btn primary" id="heroSearchBtn">Search Courses</button>
        </div>
      </div>
      <div class="hero-visual">
        <img src="assets/hero-learning.svg" alt="Online learners watching a course" loading="eager">
        <div class="hero-panel glass">
          <div><strong>${stats.courses}+</strong><span>Courses</span></div>
          <div><strong>${Math.round(stats.students / 1000)}k</strong><span>Learners</span></div>
          <div><strong>${stats.ratings}</strong><span>Avg rating</span></div>
        </div>
      </div>
    </section>
    <div class="page">
      ${section("Categories", "Explore by skill path", categoryGrid())}
      ${section("Featured Courses", "Editor picks for high-impact learning", `<div class="grid cards-3">${featured.map(courseCard).join("")}</div>`)}
      ${section("Popular Courses", "Most enrolled this month", `<div class="grid cards-3">${popular.map(courseCard).join("")}</div>`)}
      ${section("Top Instructors", "Learn from practitioners with real production experience", instructorGrid(state.instructors.slice(0, 6)))}
      ${section("Student Testimonials", "Results from active learners", testimonials())}
      ${section("Platform Statistics", "A marketplace designed for outcomes", `
        <div class="grid cards-4">
          ${statCard(stats.courses, "Active courses")}
          ${statCard(stats.students.toLocaleString(), "Student community")}
          ${statCard(stats.instructors, "Expert instructors")}
          ${statCard("98%", "Learner satisfaction")}
        </div>`)}
      ${section("Newsletter", "Get fresh courses and deadline reminders", newsletterForm())}
      ${faqAndFooter()}
    </div>
  `);
}

function section(title, subtitle, body) {
  return `<section class="section reveal"><div class="section-head"><div><span class="eyebrow">${title}</span><h2>${subtitle}</h2></div></div>${body}</section>`;
}

function statCard(value, label) {
  return `<div class="card card-pad stat-card reveal"><strong>${value}</strong><span>${label}</span></div>`;
}

function optionList(items, selected = "") {
  return items.map((item) => `<option ${item === selected ? "selected" : ""}>${item}</option>`).join("");
}

function categoryGrid() {
  return `<div class="grid cards-4">${state.categories.map((cat) => `
    <button class="category-pill reveal" data-filter-category="${cat}">
      <strong>${cat}</strong>
      <span class="muted">${state.courses.filter((c) => c.category === cat).length} courses</span>
    </button>`).join("")}</div>`;
}

function instructorGrid(items) {
  return `<div class="grid cards-3">${items.map((i) => `
    <article class="card card-pad instructor-card reveal">
      <div class="avatar">${initials(i.name)}</div>
      <div>
        <h3>${i.name}</h3>
        <p class="muted">${i.headline}</p>
        <div class="meta-row"><span>Rating ${i.rating}</span><span>${i.students.toLocaleString()} learners</span></div>
      </div>
    </article>`).join("")}</div>`;
}

function testimonials() {
  const items = [
    ["Priya Raman", "The player, notes, and quizzes helped me finish consistently after work."],
    ["Marcus Lee", "I used two portfolio projects from CourseMarket to land interviews."],
    ["Hannah Cole", "The discussions feel alive and the certificates look polished enough to share."]
  ];
  return `<div class="grid cards-3">${items.map((t) => `<blockquote class="card card-pad reveal"><p>${t[1]}</p><strong>${t[0]}</strong></blockquote>`).join("")}</div>`;
}

function newsletterForm() {
  return `<form class="card card-pad form-grid" id="newsletterForm">
    <input class="field" name="email" type="email" placeholder="Email address" required>
    <select class="select" name="interest">${optionList(state.categories)}</select>
    <button class="btn primary">Subscribe</button>
  </form>`;
}

function faqAndFooter() {
  return `
    ${section("FAQ", "Common questions", `
      <div class="grid cards-2">
        ${["Are payments real?", "No. Checkout is a frontend simulation with success and failure states."].map((text, i) => i % 2 === 0 ? `<div class="card card-pad"><h3>${text}</h3><p class="muted">${["Progress, notes, reviews, carts, orders, and dashboards persist in LocalStorage.", "Certificates can be printed or saved using your browser print dialog."][i / 2] || ""}</p></div>` : "").join("")}
        <div class="card card-pad"><h3>Where is data stored?</h3><p class="muted">All dynamic data is saved in your browser LocalStorage.</p></div>
        <div class="card card-pad"><h3>Can instructors create courses?</h3><p class="muted">Yes. Instructor accounts can create, edit, delete, and analyze courses.</p></div>
      </div>`)}
    <footer class="footer grid cards-4">
      <div><h3>CourseMarket</h3><p class="muted">A frontend-only course marketplace built with HTML, CSS, and vanilla JavaScript.</p></div>
      <div><h3>Company</h3><p><a href="#about">About</a></p><p><a href="#contact">Contact</a></p></div>
      <div><h3>Legal</h3><p><a href="#terms">Terms</a></p><p><a href="#privacy">Privacy Policy</a></p></div>
      <div><h3>Learn</h3><p><a href="#courses">Courses</a></p><p><a href="#instructors">Instructors</a></p></div>
    </footer>
  `;
}

function renderCourses(initialCategory = "") {
  setView(`
    <div class="page">
      <section class="section">
        <span class="eyebrow">Courses</span>
        <h2>Find your next skill sprint</h2>
        <div class="filters card card-pad glass">
          <input class="field" id="searchInput" type="search" placeholder="Search title, instructor, category">
          <select class="select" id="categoryFilter">${optionList(["All Categories", ...state.categories], initialCategory || "All Categories")}</select>
          <select class="select" id="priceFilter">${optionList(["Any Price", "Under $75", "$75 to $120", "Over $120"])}</select>
          <select class="select" id="ratingFilter">${optionList(["Any Rating", "4.5+", "4.7+", "4.9"])}</select>
          <select class="select" id="durationFilter">${optionList(["Any Duration", "Under 10h", "10h to 18h", "Over 18h"])}</select>
          <select class="select" id="levelFilter">${optionList(["Any Level", "Beginner", "Intermediate", "Advanced"])}</select>
        </div>
        <div id="courseResults" class="grid cards-3"></div>
      </section>
    </div>
  `);
  bindFilters();
}

function bindFilters() {
  const inputs = ["searchInput", "categoryFilter", "priceFilter", "ratingFilter", "durationFilter", "levelFilter"].map((id) => document.getElementById(id));
  const render = () => {
    const [search, category, price, rating, duration, level] = inputs.map((el) => el.value);
    let results = state.courses.filter((c) => {
      const term = search.trim().toLowerCase();
      const textMatch = !term || [c.title, c.instructor, c.category].join(" ").toLowerCase().includes(term);
      const categoryMatch = category === "All Categories" || c.category === category;
      const priceMatch = price === "Any Price" || (price === "Under $75" && c.discountPrice < 75) || (price === "$75 to $120" && c.discountPrice >= 75 && c.discountPrice <= 120) || (price === "Over $120" && c.discountPrice > 120);
      const ratingMatch = rating === "Any Rating" || c.rating >= Number(rating.replace("+", ""));
      const durationMatch = duration === "Any Duration" || (duration === "Under 10h" && c.durationHours < 10) || (duration === "10h to 18h" && c.durationHours >= 10 && c.durationHours <= 18) || (duration === "Over 18h" && c.durationHours > 18);
      const levelMatch = level === "Any Level" || c.level === level;
      return textMatch && categoryMatch && priceMatch && ratingMatch && durationMatch && levelMatch;
    });
    document.getElementById("courseResults").innerHTML = results.length ? results.map(courseCard).join("") : `<div class="card card-pad"><h3>No matching courses</h3><p class="muted">Try adjusting your filters.</p></div>`;
    bindCommon();
    observeReveals();
  };
  inputs.forEach((el) => el.addEventListener("input", render));
  render();
}

function renderCourseDetail(id) {
  const course = courseById(id);
  if (!course) return routeTo("courses");
  const instructor = state.instructors.find((i) => i.id === course.instructorId);
  const enrolled = isEnrolled(course.id);
  setView(`
    <div class="page">
      <section class="section hero" style="min-height:auto">
        <div class="hero-copy">
          <span class="eyebrow">${course.category}</span>
          <h1>${course.title}</h1>
          <p>${course.description}</p>
          <div class="meta-row"><span>Rating ${course.rating}</span><span>${course.students.toLocaleString()} students</span><span>${course.level}</span><span>${course.duration}</span></div>
          <div class="price"><span>${currency(course.discountPrice)}</span><del>${currency(course.price)}</del></div>
          <div class="actions">
            <button class="btn primary" data-enroll="${course.id}">${enrolled ? "Go to Player" : "Enroll Now"}</button>
            <button class="btn ghost" data-cart="${course.id}">Add to Cart</button>
            <button class="btn ghost" data-wish="${course.id}">${isWished(course.id) ? "Remove Wishlist" : "Wishlist"}</button>
          </div>
        </div>
        <div class="video-box">
          <button class="play" aria-label="Preview video">▶</button>
          <p>Preview video simulation</p>
        </div>
      </section>
      ${section("What You Will Learn", "Practical outcomes", listCards(course.outcomes))}
      ${section("Requirements", "Before you begin", listCards(course.requirements))}
      ${section("Instructor", "Meet your guide", instructorGrid([instructor]))}
      ${section("Curriculum", "Chapters and lessons", curriculum(course))}
      ${section("Reviews", "Learner feedback", reviewsBlock(course))}
      ${section("Discussion Forum", "Ask, reply, and like", discussionBlock(course))}
      ${section("Lecture Q&A", "Searchable course questions", qaBlock(course))}
    </div>
  `);
}

function listCards(items) {
  return `<div class="grid cards-2">${items.map((item) => `<div class="card card-pad">${item}</div>`).join("")}</div>`;
}

function curriculum(course) {
  return `<div class="grid">${course.chapters.map((chapter) => `
    <details class="card card-pad" open>
      <summary><strong>${chapter.title}</strong></summary>
      <div class="lesson-list">${chapter.lessons.map((l) => `<div class="lesson-item"><span class="badge">${l.duration}</span><span>${l.title}</span><span class="muted">Video</span></div>`).join("")}</div>
    </details>`).join("")}</div>`;
}

function reviewsBlock(course) {
  const current = currentUser();
  const own = current ? course.reviews.find((r) => r.userId === current.id) : null;
  return `
    <div class="grid cards-2">
      <form class="card card-pad form-grid" data-review-form="${course.id}">
        <h3>${own ? "Edit your review" : "Write a review"}</h3>
        <select class="select" name="rating">${optionList(["5", "4", "3", "2", "1"], own ? String(own.rating) : "5")}</select>
        <textarea class="textarea" name="text" required placeholder="Share your experience">${own ? own.text : ""}</textarea>
        <div class="actions">
          <button class="btn primary">Save Review</button>
          ${own ? `<button type="button" class="btn danger" data-delete-review="${course.id}">Delete</button>` : ""}
        </div>
      </form>
      <div class="grid">${course.reviews.map((r) => `<article class="card card-pad"><div class="meta-row"><strong>${r.name}</strong><span>Rating ${r.rating}</span><span>${r.date}</span></div><p>${r.text}</p></article>`).join("")}</div>
    </div>`;
}

function discussionBlock(course) {
  return `<div class="grid cards-2">
    <form class="card card-pad form-grid" data-thread-form="${course.id}">
      <input class="field" name="question" placeholder="Ask a course question" required>
      <button class="btn primary">Post Question</button>
    </form>
    <div class="grid">${course.discussions.map((t) => `
      <article class="forum-thread">
        <strong>${t.question}</strong><span class="muted">Asked by ${t.user}</span>
        ${t.replies.map((r) => `<p><strong>${r.user}:</strong> ${r.text}</p>`).join("")}
        <form class="actions" data-reply-form="${course.id}" data-thread-id="${t.id}">
          <input class="field" name="reply" placeholder="Reply" required>
          <button class="btn small">Reply</button>
          <button type="button" class="btn small ghost" data-like-thread="${course.id}" data-thread-id="${t.id}">Like ${t.likes}</button>
        </form>
      </article>`).join("")}</div>
  </div>`;
}

function qaBlock(course) {
  return `<div class="card card-pad form-grid">
    <input class="field" id="qaSearch" placeholder="Search lecture questions">
    <div id="qaResults">
      ${course.discussions.map((t) => `<p><strong>${t.question}</strong><br><span class="muted">Instructor reply: ${t.replies[0]?.text || "Reply coming soon."}</span></p>`).join("")}
    </div>
  </div>`;
}

function renderAuth(type) {
  const signup = type === "signup";
  setView(`
    <div class="page auth-page">
      <form class="card auth-card form-grid" id="${signup ? "signupForm" : "loginForm"}">
        <span class="eyebrow">${signup ? "Signup" : "Login"}</span>
        <h2>${signup ? "Create your account" : "Welcome back"}</h2>
        ${signup ? `<input class="field" name="name" placeholder="Full Name" required>` : ""}
        <input class="field" name="email" type="email" placeholder="Email" required>
        <input class="field" name="password" type="password" placeholder="Password" required>
        ${signup ? `<input class="field" name="confirm" type="password" placeholder="Confirm Password" required>
        <select class="select" name="role">${optionList(["Student", "Instructor", "Admin"])}</select>` : ""}
        <p class="error" id="authError"></p>
        <button class="btn primary">${signup ? "Create Account" : "Login"}</button>
        <p class="muted">${signup ? "Already registered?" : "New here?"} <a href="#${signup ? "login" : "signup"}">${signup ? "Login" : "Signup"}</a></p>
      </form>
    </div>
  `);
}

function renderDashboard() {
  const user = currentUser();
  if (!user) return routeTo("login");
  const tabs = user.role === "Admin"
    ? ["overview", "users", "courses", "reviews", "categories", "reports"]
    : user.role === "Instructor"
      ? ["overview", "profile", "courses", "students", "earnings", "analytics", "create"]
      : ["overview", "my courses", "completed", "certificates", "wishlist", "assignments", "notifications"];
  if (!tabs.includes(currentDashboardTab)) currentDashboardTab = "overview";
  setView(`
    <div class="page dashboard">
      <aside class="card sidebar">
        <div class="card-pad">
          <div class="avatar">${initials(user.name)}</div>
          <h3>${user.name}</h3>
          <p class="muted">${user.role}</p>
        </div>
        ${tabs.map((t) => `<button class="side-link ${t === currentDashboardTab ? "active" : ""}" data-dash-tab="${t}">${titleCase(t)}</button>`).join("")}
      </aside>
      <section class="card card-pad" id="dashboardContent">${dashboardContent(user, currentDashboardTab)}</section>
    </div>
  `);
  drawCharts();
}

function titleCase(text) {
  return text.replace(/\b\w/g, (m) => m.toUpperCase());
}

function dashboardContent(user, tab) {
  if (user.role === "Student") return studentDashboard(user, tab);
  if (user.role === "Instructor") return instructorDashboard(user, tab);
  return adminDashboard(user, tab);
}

function studentDashboard(user, tab) {
  const enrolls = userEnrollments(user.id);
  const courses = enrolls.map((e) => ({ ...courseById(e.courseId), enrollment: e })).filter(Boolean);
  if (tab === "overview") {
    return `<span class="eyebrow">Student Dashboard</span><h2>Your learning hub</h2><div class="grid cards-3">
      ${statCard(courses.length, "My Courses")}${statCard(courses.filter((c) => c.enrollment.progress === 100).length, "Completed")}${statCard((state.wishlist[user.id] || []).length, "Wishlist")}
      </div>${progressCourses(courses)}`;
  }
  if (tab === "my courses") return progressCourses(courses);
  if (tab === "completed") return progressCourses(courses.filter((c) => c.enrollment.progress === 100));
  if (tab === "certificates") return certificateList(courses.filter((c) => c.enrollment.progress === 100 || c.enrollment.certificate));
  if (tab === "wishlist") return `<h2>Wishlist</h2><div class="grid cards-3">${(state.wishlist[user.id] || []).map(courseById).filter(Boolean).map(courseCard).join("") || empty("No saved courses yet.")}</div>`;
  if (tab === "assignments") return assignmentList(courses);
  return notifications(user);
}

function progressCourses(courses) {
  return `<div class="grid">${courses.map((course) => `<article class="card card-pad">
    <div class="section-head"><div><h3>${course.title}</h3><p class="muted">${course.instructor}</p></div><button class="btn primary small" data-player="${course.id}">Open Player</button></div>
    <div class="progress-track"><div class="progress-fill" style="--progress:${course.enrollment.progress}%"></div></div>
    <p class="muted">${course.enrollment.progress}% complete</p>
  </article>`).join("") || empty("No enrolled courses yet.")}</div>`;
}

function certificateList(courses) {
  return `<h2>Certificates</h2><div class="grid cards-2">${courses.map((course) => `<div class="card card-pad"><h3>${course.title}</h3><p class="muted">Issued ${todayISO()}</p><button class="btn primary" data-certificate="${course.id}">Generate Certificate</button></div>`).join("") || empty("Complete a course to generate certificates.")}</div>`;
}

function assignmentList(courses) {
  return `<h2>Assignments</h2><div class="grid">${courses.flatMap((course) => course.assignments.map((a) => `
    <form class="card card-pad form-grid" data-assignment="${course.id}" data-assignment-id="${a.id}">
      <div class="section-head"><div><h3>${a.title}</h3><p class="muted">${course.title} - due ${a.due} - grade ${a.grade}</p></div><span class="badge">${submissionStatus(course.id, a.id)}</span></div>
      <input class="field" name="file" placeholder="Upload simulation: project-link.zip">
      <button class="btn primary small">Submit Assignment</button>
    </form>`)).join("") || empty("Assignments appear after enrollment.")}</div>`;
}

function submissionStatus(courseId, assignmentId) {
  const user = currentUser();
  return state.assignments.find((a) => a.userId === user.id && a.courseId === courseId && a.assignmentId === assignmentId)?.status || "Not submitted";
}

function notifications(user) {
  const notes = user.notifications.length ? user.notifications : [
    { text: "Welcome to CourseMarket. Enroll in a course to start tracking progress.", date: todayISO() }
  ];
  return `<h2>Notifications</h2><div class="grid">${notes.map((n) => `<div class="notification"><strong>${n.text}</strong><span class="muted">${n.date}</span></div>`).join("")}</div>`;
}

function instructorDashboard(user, tab) {
  const mine = state.courses.filter((c) => c.instructorId === user.id);
  if (tab === "overview") return `<span class="eyebrow">Instructor Dashboard</span><h2>Teaching command center</h2><div class="grid cards-4">${statCard(mine.length, "Courses")}${statCard(totalStudents(mine), "Students")}${statCard(currency(totalRevenue(mine)), "Revenue")}${statCard(avgRating(mine), "Avg rating")}</div><canvas class="chart" id="performanceChart"></canvas>`;
  if (tab === "profile") return profileForm(user);
  if (tab === "courses") return instructorCourseManager(mine);
  if (tab === "students") return table(["Course", "Students", "Completion"], mine.map((c) => [c.title, c.students.toLocaleString(), `${Math.min(96, 42 + c.rating * 10).toFixed(0)}%`]));
  if (tab === "earnings") return `<h2>Earnings</h2><div class="grid cards-3">${mine.map((c) => statCard(currency(c.discountPrice * Math.round(c.students * 0.08)), c.title)).join("")}</div>`;
  if (tab === "analytics") return `<h2>Course Analytics</h2><canvas class="chart" id="performanceChart"></canvas><canvas class="chart" id="revenueChart"></canvas>`;
  return courseForm();
}

function totalStudents(courses) {
  return courses.reduce((sum, c) => sum + c.students, 0).toLocaleString();
}

function totalRevenue(courses) {
  return courses.reduce((sum, c) => sum + c.discountPrice * Math.round(c.students * 0.08), 0);
}

function avgRating(courses) {
  if (!courses.length) return "0.0";
  return (courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1);
}

function profileForm(user) {
  return `<form class="form-grid" id="profileForm"><h2>Profile Management</h2><input class="field" name="name" value="${user.name}"><input class="field" name="email" value="${user.email}"><button class="btn primary">Save Profile</button></form>`;
}

function instructorCourseManager(courses) {
  return `<h2>Manage Courses</h2><div class="grid">${courses.map((c) => `<article class="card card-pad"><div class="section-head"><div><h3>${c.title}</h3><p class="muted">${c.category} - ${currency(c.discountPrice)}</p></div><div class="actions"><button class="btn small ghost" data-edit-course="${c.id}">Edit</button><button class="btn small danger" data-delete-course="${c.id}">Delete</button></div></div></article>`).join("") || empty("Create your first course.")}</div>`;
}

function courseForm(course = null) {
  return `<form class="form-grid" id="courseForm" data-course-id="${course?.id || ""}">
    <h2>${course ? "Edit Course" : "Create Course"}</h2>
    <input class="field" name="title" placeholder="Course Title" value="${course?.title || ""}" required>
    <input class="field" name="thumbnail" placeholder="Thumbnail URL or local asset path" value="assets/course-pattern.svg">
    <textarea class="textarea" name="description" placeholder="Description" required>${course?.description || ""}</textarea>
    <input class="field" name="price" type="number" placeholder="Price" value="${course?.price || 99}" required>
    <select class="select" name="category">${optionList(state.categories, course?.category || state.categories[0])}</select>
    <textarea class="textarea" name="chapters" placeholder="Chapters, one per line" required>${course ? course.chapters.map((c) => c.title).join("\n") : "Foundations\nGuided project\nFinal review"}</textarea>
    <textarea class="textarea" name="videos" placeholder="Videos, one per line" required>Intro video\nWorkshop video\nReview video</textarea>
    <textarea class="textarea" name="requirements" placeholder="Requirements">${course?.requirements.join("\n") || "A modern browser\nPractice time"}</textarea>
    <textarea class="textarea" name="outcomes" placeholder="Learning Outcomes">${course?.outcomes.join("\n") || "Build a complete project\nExplain core concepts"}</textarea>
    <button class="btn primary">Save Course</button>
  </form>`;
}

function adminDashboard(user, tab) {
  if (tab === "overview") return `<div class="section-head"><div><span class="eyebrow">Admin Dashboard</span><h2>Platform statistics</h2></div><button class="btn primary" onclick="loadGopalDemoData()"><svg viewBox="0 0 24 24" width="20" height="20" style="margin-right: 8px; vertical-align: middle;"><path fill="currentColor" d="M9 3v10.55c-.32-.05-.66-.08-1-.08C5.24 13.47 3 15.42 3 18s2.24 4.53 5 4.53s5-2.01 5-4.53V5h6V3H9zM8 21.47c-1.66 0-3-1.12-3-2.53s1.34-2.47 3-2.47s3 1.12 3 2.47s-1.34 2.53-3 2.53z"/></svg>Load Gopal Demo Data</button></div><div class="grid cards-4">${statCard(state.users.length, "Users")}${statCard(state.courses.length, "Courses")}${statCard(countReviews(), "Reviews")}${statCard(state.orders.length, "Orders")}</div><canvas class="chart" id="platformChart"></canvas>`;
  if (tab === "users") return table(["Name", "Email", "Role", "Action"], state.users.map((u) => [u.name, u.email, u.role, u.id === user.id ? "Current admin" : `<button class="btn danger small" data-delete-user="${u.id}">Delete</button>`]));
  if (tab === "courses") return table(["Title", "Instructor", "Category", "Action"], state.courses.map((c) => [c.title, c.instructor, c.category, `<button class="btn danger small" data-delete-course="${c.id}">Delete</button>`]));
  if (tab === "reviews") return table(["Course", "Student", "Rating", "Review"], state.courses.flatMap((c) => c.reviews.map((r) => [c.title, r.name, r.rating, r.text])));
  if (tab === "categories") return `<form class="actions" id="categoryForm"><input class="field" name="category" placeholder="New category"><button class="btn primary">Add</button></form><div class="grid cards-3">${state.categories.map((c) => `<div class="card card-pad"><strong>${c}</strong></div>`).join("")}</div>`;
  return table(["Report", "Status", "Date"], state.reports.map((r) => [r.title, r.status, r.date]));
}

function table(headers, rows) {
  return `<div class="table-wrap"><table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function countReviews() {
  return state.courses.reduce((sum, c) => sum + c.reviews.length, 0);
}

function renderPlayer(id) {
  const user = currentUser();
  if (!user) return routeTo("login");
  const course = courseById(id);
  if (!course || !isEnrolled(id)) return renderCourseDetail(id);
  const lessons = course.chapters.flatMap((c) => c.lessons);
  currentLessonIndex = Math.min(currentLessonIndex, lessons.length - 1);
  const lesson = lessons[currentLessonIndex];
  const enrollment = getEnrollment(id);
  setView(`
    <div class="page">
      <section class="section">
        <span class="eyebrow">Course Player</span>
        <h2>${course.title}</h2>
        <div class="progress-track"><div class="progress-fill" style="--progress:${enrollment.progress}%"></div></div>
        <p class="muted">${enrollment.progress}% complete</p>
      </section>
      <section class="player">
        <div class="grid">
          <div class="video-box" id="videoBox"><button class="play">▶</button><div><h3>${lesson.title}</h3><p>${lesson.video}</p></div></div>
          <div class="actions">
            <button class="btn ghost" id="prevLesson">Previous Lesson</button>
            <button class="btn success" data-complete-lesson="${id}" data-lesson-id="${lesson.id}">Mark Lesson Complete</button>
            <button class="btn ghost" id="nextLesson">Next Lesson</button>
            <button class="btn ghost" id="fullscreenBtn">Fullscreen</button>
            <button class="btn primary" data-quiz="${id}">Start Quiz</button>
          </div>
          <div class="grid cards-2">
            <form class="card card-pad form-grid" data-notes="${id}"><h3>Notes</h3><textarea class="textarea" name="notes">${state.notes[`${user.id}_${id}`] || ""}</textarea><button class="btn primary small">Save Notes</button></form>
            <div class="card card-pad"><h3>Bookmarks</h3><p class="muted">${(state.bookmarks[`${user.id}_${id}`] || []).join(", ") || "No bookmarks yet."}</p><button class="btn ghost small" data-bookmark="${id}" data-lesson-title="${lesson.title}">Bookmark Lesson</button></div>
          </div>
        </div>
        <aside class="card card-pad"><h3>Chapter Navigation</h3><div class="lesson-list">${lessons.map((l, i) => `<button class="lesson-item ${i === currentLessonIndex ? "active" : ""}" data-jump-lesson="${i}"><span class="badge">${i + 1}</span><span>${l.title}</span><span>${enrollment.completedLessons.includes(l.id) || enrollment.completedLessons.includes("done") ? "Done" : ""}</span></button>`).join("")}</div></aside>
      </section>
    </div>
  `);
}

function renderStaticPage(type) {
  const content = {
    about: ["About CourseMarket", "CourseMarket is a frontend-only learning marketplace that demonstrates real course discovery, dashboards, simulated payments, certificates, discussions, and analytics using browser storage."],
    contact: ["Contact", "Send a message and the simulated support team will store it as a notification."],
    terms: ["Terms", "This demo stores data locally in your browser and simulates marketplace workflows for educational use."],
    privacy: ["Privacy Policy", "No server receives your information. Accounts, progress, carts, and reviews live in LocalStorage on this device."],
    categories: ["Categories", categoryGrid()],
    instructors: ["Instructors", instructorGrid(state.instructors)]
  }[type];
  setView(`<div class="page"><section class="section"><span class="eyebrow">${content[0]}</span><h2>${content[0]}</h2>${type === "contact" ? contactForm() : type === "categories" || type === "instructors" ? content[1] : `<p class="muted">${content[1]}</p>`}</section>${faqAndFooter()}</div>`);
}

function contactForm() {
  return `<form class="card card-pad form-grid" id="contactForm"><input class="field" name="name" placeholder="Name" required><input class="field" name="email" type="email" placeholder="Email" required><textarea class="textarea" name="message" placeholder="Message" required></textarea><button class="btn primary">Send Message</button></form>`;
}

function empty(text) {
  return `<div class="card card-pad"><p class="muted">${text}</p></div>`;
}

function bindCommon() {
  document.querySelectorAll("[data-route]").forEach((el) => el.onclick = () => routeTo(el.dataset.route));
  document.querySelectorAll("[data-course-detail]").forEach((el) => el.onclick = () => routeTo(`course/${el.dataset.courseDetail}`));
  document.querySelectorAll("[data-filter-category]").forEach((el) => el.onclick = () => routeTo(`courses?category=${encodeURIComponent(el.dataset.filterCategory)}`));
  document.querySelectorAll("[data-cart]").forEach((el) => el.onclick = () => addToCart(el.dataset.cart));
  document.querySelectorAll("[data-wish]").forEach((el) => el.onclick = () => toggleWishlist(el.dataset.wish));
  document.querySelectorAll("[data-enroll]").forEach((el) => el.onclick = () => enrollOrOpen(el.dataset.enroll));
  document.querySelectorAll("[data-player]").forEach((el) => el.onclick = () => routeTo(`player/${el.dataset.player}`));
  document.querySelectorAll("[data-certificate]").forEach((el) => el.onclick = () => showCertificate(el.dataset.certificate));
  document.querySelectorAll("[data-quiz]").forEach((el) => el.onclick = () => startQuiz(el.dataset.quiz));
  document.querySelectorAll("[data-dash-tab]").forEach((el) => el.onclick = () => { currentDashboardTab = el.dataset.dashTab; renderDashboard(); });
  document.querySelectorAll("[data-delete-course]").forEach((el) => el.onclick = () => deleteCourse(el.dataset.deleteCourse));
  document.querySelectorAll("[data-delete-user]").forEach((el) => el.onclick = () => deleteUser(el.dataset.deleteUser));
  document.querySelectorAll("[data-edit-course]").forEach((el) => el.onclick = () => openModal("Edit Course", courseForm(courseById(el.dataset.editCourse))));
  bindForms();
}

function bindForms() {
  const login = document.getElementById("loginForm");
  if (login) login.addEventListener("submit", handleLogin);
  const signup = document.getElementById("signupForm");
  if (signup) signup.addEventListener("submit", handleSignup);
  const newsletter = document.getElementById("newsletterForm");
  if (newsletter) newsletter.addEventListener("submit", (e) => { e.preventDefault(); state.newsletter.push(Object.fromEntries(new FormData(e.target))); saveState(); toast("Newsletter subscription saved.", "success"); e.target.reset(); });
  const contact = document.getElementById("contactForm");
  if (contact) contact.addEventListener("submit", (e) => { e.preventDefault(); toast("Message sent. Support notification saved.", "success"); e.target.reset(); });
  const profile = document.getElementById("profileForm");
  if (profile) profile.addEventListener("submit", saveProfile);
  const courseFormEl = document.getElementById("courseForm");
  if (courseFormEl) courseFormEl.addEventListener("submit", saveCourse);
  const categoryForm = document.getElementById("categoryForm");
  if (categoryForm) categoryForm.addEventListener("submit", addCategory);
  document.querySelectorAll("[data-review-form]").forEach((form) => form.addEventListener("submit", saveReview));
  document.querySelectorAll("[data-delete-review]").forEach((btn) => btn.onclick = () => deleteReview(btn.dataset.deleteReview));
  document.querySelectorAll("[data-thread-form]").forEach((form) => form.addEventListener("submit", addThread));
  document.querySelectorAll("[data-reply-form]").forEach((form) => form.addEventListener("submit", addReply));
  document.querySelectorAll("[data-like-thread]").forEach((btn) => btn.onclick = () => likeThread(btn.dataset.likeThread, btn.dataset.threadId));
  document.querySelectorAll("[data-assignment]").forEach((form) => form.addEventListener("submit", submitAssignment));
  document.querySelectorAll("[data-notes]").forEach((form) => form.addEventListener("submit", saveNotes));
  document.querySelectorAll("[data-bookmark]").forEach((btn) => btn.onclick = () => saveBookmark(btn.dataset.bookmark, btn.dataset.lessonTitle));
  document.querySelectorAll("[data-complete-lesson]").forEach((btn) => btn.onclick = () => completeLesson(btn.dataset.completeLesson, btn.dataset.lessonId));
  document.querySelectorAll("[data-jump-lesson]").forEach((btn) => btn.onclick = () => { currentLessonIndex = Number(btn.dataset.jumpLesson); renderPlayer(getRoute().split("/")[1]); });
  const prev = document.getElementById("prevLesson");
  if (prev) prev.onclick = () => { currentLessonIndex = Math.max(0, currentLessonIndex - 1); renderPlayer(getRoute().split("/")[1]); };
  const next = document.getElementById("nextLesson");
  if (next) next.onclick = () => { currentLessonIndex += 1; renderPlayer(getRoute().split("/")[1]); };
  const full = document.getElementById("fullscreenBtn");
  if (full) full.onclick = () => document.getElementById("videoBox").classList.toggle("fullscreen");
  const heroSearchBtn = document.getElementById("heroSearchBtn");
  if (heroSearchBtn) heroSearchBtn.onclick = () => {
    const term = document.getElementById("heroSearch").value;
    const cat = document.getElementById("heroCategory").value;
    routeTo(`courses?search=${encodeURIComponent(term)}&category=${encodeURIComponent(cat)}`);
  };
}

function handleLogin(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  const user = state.users.find((u) => u.email.toLowerCase() === data.email.toLowerCase() && u.password === data.password);
  if (!user) return showAuthError("Invalid email or password.");
  state.currentUserId = user.id;
  saveState();
  toast(`Welcome back, ${user.name}.`, "success");
  routeTo("dashboard");
}

function handleSignup(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  const error = validateSignup(data);
  if (error) return showAuthError(error);
  const id = `${data.role.toLowerCase()}_${Date.now()}`;
  state.users.push({ id, name: data.name.trim(), email: data.email.trim(), password: data.password, role: data.role, notifications: [{ text: "Account created successfully.", date: todayISO() }] });
  if (data.role === "Instructor") state.instructors.push({ id, name: data.name.trim(), headline: "New instructor", specialty: "Web Development", bio: "New CourseMarket instructor.", rating: 4.5, students: 0, earnings: 0 });
  state.currentUserId = id;
  saveState();
  toast("Account created.", "success");
  routeTo("dashboard");
}

function validateSignup(data) {
  if (!data.name.trim() || !data.email.trim() || !data.password || !data.confirm) return "All fields are required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Enter a valid email address.";
  if (state.users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) return "An account with this email already exists.";
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(data.password)) return "Password needs 8+ characters, uppercase, lowercase, and a number.";
  if (data.password !== data.confirm) return "Passwords do not match.";
  return "";
}

function showAuthError(message) {
  const el = document.getElementById("authError");
  if (el) el.textContent = message;
  toast(message, "error");
}

function isWished(courseId) {
  const user = currentUser();
  return Boolean(user && (state.wishlist[user.id] || []).includes(courseId));
}

function toggleWishlist(courseId) {
  const user = currentUser();
  if (!user) return routeTo("login");
  state.wishlist[user.id] = state.wishlist[user.id] || [];
  const list = state.wishlist[user.id];
  const index = list.indexOf(courseId);
  if (index >= 0) list.splice(index, 1);
  else list.push(courseId);
  saveState();
  toast(index >= 0 ? "Removed from wishlist." : "Saved to wishlist.", "success");
  renderRoute();
}

function addToCart(courseId) {
  if (!state.cart.includes(courseId)) state.cart.push(courseId);
  saveState();
  toast("Course added to cart.", "success");
}

function openCart() {
  const items = state.cart.map(courseById).filter(Boolean);
  const total = items.reduce((sum, c) => sum + c.discountPrice, 0);
  openModal("Checkout", `
    <div class="grid">
      ${items.map((c) => `<div class="card card-pad"><div class="section-head"><div><h3>${c.title}</h3><p class="muted">${c.instructor}</p></div><strong>${currency(c.discountPrice)}</strong></div></div>`).join("") || empty("Your cart is empty.")}
      <div class="card card-pad"><h3>Order Summary</h3><p class="muted">${items.length} course(s)</p><h2>${currency(total)}</h2><div class="actions"><button class="btn success" id="paymentSuccess">Fake Payment Success</button><button class="btn danger" id="paymentFail">Fake Payment Failure</button></div></div>
    </div>`);
  document.getElementById("paymentSuccess")?.addEventListener("click", checkoutSuccess);
  document.getElementById("paymentFail")?.addEventListener("click", () => toast("Payment failed. Please try another simulated method.", "error"));
}

function checkoutSuccess() {
  const user = currentUser();
  if (!user) return routeTo("login");
  state.cart.forEach((id) => enrollCourse(id, false));
  state.orders.push({ id: uid("order"), userId: user.id, courseIds: [...state.cart], date: todayISO(), status: "Paid" });
  user.notifications.push({ text: "Payment successful and courses enrolled.", date: todayISO() });
  state.cart = [];
  saveState();
  closeModal();
  toast("Payment successful. Courses are in your dashboard.", "success");
  routeTo("dashboard");
}

function isEnrolled(courseId) {
  const user = currentUser();
  return Boolean(user && state.enrollments.some((e) => e.userId === user.id && e.courseId === courseId));
}

function getEnrollment(courseId) {
  const user = currentUser();
  return state.enrollments.find((e) => e.userId === user.id && e.courseId === courseId);
}

function enrollOrOpen(courseId) {
  if (!currentUser()) return routeTo("login");
  if (!isEnrolled(courseId)) enrollCourse(courseId);
  routeTo(`player/${courseId}`);
}

function enrollCourse(courseId, notify = true) {
  const user = currentUser();
  if (!user || isEnrolled(courseId)) return;
  state.enrollments.push({ userId: user.id, courseId, progress: 0, completedLessons: [], certificate: false });
  user.notifications.push({ text: `Enrollment confirmed: ${courseById(courseId).title}`, date: todayISO() });
  if (notify) toast("Enrollment saved.", "success");
  saveState();
}

function completeLesson(courseId, lessonId) {
  const enrollment = getEnrollment(courseId);
  const course = courseById(courseId);
  const total = course.chapters.flatMap((c) => c.lessons).length;
  if (!enrollment.completedLessons.includes(lessonId)) enrollment.completedLessons.push(lessonId);
  enrollment.progress = Math.min(100, Math.round((enrollment.completedLessons.length / total) * 100));
  if (enrollment.progress === 100) {
    enrollment.certificate = true;
    currentUser().notifications.push({ text: `Course completed: ${course.title}`, date: todayISO() });
  }
  saveState();
  toast("Lesson marked complete.", "success");
  renderPlayer(courseId);
}

function saveNotes(event) {
  event.preventDefault();
  const courseId = event.target.dataset.notes;
  state.notes[`${currentUser().id}_${courseId}`] = new FormData(event.target).get("notes");
  saveState();
  toast("Notes saved.", "success");
}

function saveBookmark(courseId, title) {
  const key = `${currentUser().id}_${courseId}`;
  state.bookmarks[key] = state.bookmarks[key] || [];
  if (!state.bookmarks[key].includes(title)) state.bookmarks[key].push(title);
  saveState();
  toast("Bookmark saved.", "success");
  renderPlayer(courseId);
}

function startQuiz(courseId) {
  const course = courseById(courseId);
  activeQuiz = { courseId, answers: {}, time: 120 };
  openModal("Course Quiz", renderQuiz(course, activeQuiz.time));
  quizTimer = setInterval(() => {
    activeQuiz.time -= 1;
    const timer = document.getElementById("quizTimer");
    if (timer) timer.textContent = `${activeQuiz.time}s`;
    if (activeQuiz.time <= 0) finishQuiz(courseId);
  }, 1000);
  document.getElementById("quizForm").addEventListener("submit", (e) => { e.preventDefault(); finishQuiz(courseId); });
}

function renderQuiz(course, time) {
  return `<form id="quizForm" class="form-grid"><div class="section-head"><h3>${course.title}</h3><span class="badge" id="quizTimer">${time}s</span></div>${course.quiz.questions.map((q, qi) => `<fieldset class="card card-pad"><legend><strong>${q.q}</strong></legend>${q.options.map((o, oi) => `<label class="lesson-item"><input type="radio" name="q${qi}" value="${oi}" required><span>${o}</span></label>`).join("")}</fieldset>`).join("")}<button class="btn primary">Submit Quiz</button></form>`;
}

function finishQuiz(courseId) {
  clearInterval(quizTimer);
  const course = courseById(courseId);
  const form = document.getElementById("quizForm");
  const data = form ? new FormData(form) : new FormData();
  let correct = 0;
  course.quiz.questions.forEach((q, index) => {
    if (Number(data.get(`q${index}`)) === q.answer) correct += 1;
  });
  const score = Math.round((correct / course.quiz.questions.length) * 100);
  const passed = score >= course.quiz.pass;
  state.quizResults.push({ userId: currentUser().id, courseId, score, passed, date: todayISO() });
  currentUser().notifications.push({ text: `Quiz result for ${course.title}: ${score}%`, date: todayISO() });
  saveState();
  openModal("Quiz Result", `<div class="card card-pad"><h2>${score}%</h2><p class="${passed ? "success-text" : "error"}">${passed ? "Passed" : "Try again"}</p><h3>Leaderboard</h3>${leaderboard(courseId)}</div>`);
}

function leaderboard(courseId) {
  const rows = state.quizResults.filter((r) => r.courseId === courseId).sort((a, b) => b.score - a.score).slice(0, 8).map((r) => [state.users.find((u) => u.id === r.userId)?.name || "Learner", `${r.score}%`, r.date]);
  return table(["Learner", "Score", "Date"], rows);
}

function showCertificate(courseId) {
  const course = courseById(courseId);
  const user = currentUser();
  const certId = `CM-${user.id.slice(-4).toUpperCase()}-${courseId.slice(-3).toUpperCase()}-${Date.now().toString().slice(-5)}`;
  openModal("Completion Certificate", `
    <div class="certificate" id="certificate">
      <span class="eyebrow">Certificate of Completion</span>
      <h2>${user.name}</h2>
      <p class="muted">has successfully completed</p>
      <h3>${course.title}</h3>
      <p>Completion Date: ${todayISO()}</p>
      <p>Certificate ID: ${certId}</p>
    </div>
    <div class="actions" style="margin-top:16px"><button class="btn primary" id="printCert">Print Certificate</button><button class="btn ghost" id="downloadCert">Download Certificate</button></div>
  `);
  document.getElementById("printCert").onclick = () => window.print();
  document.getElementById("downloadCert").onclick = () => {
    const html = document.getElementById("certificate").outerHTML;
    const blob = new Blob([`<!doctype html><html><head><title>Certificate</title><link rel="stylesheet" href="style.css"></head><body>${html}</body></html>`], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${certId}.html`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
}

function saveReview(event) {
  event.preventDefault();
  const user = currentUser();
  if (!user) return routeTo("login");
  const course = courseById(event.target.dataset.reviewForm);
  const data = Object.fromEntries(new FormData(event.target));
  const existing = course.reviews.find((r) => r.userId === user.id);
  if (existing) {
    existing.rating = Number(data.rating);
    existing.text = data.text;
    existing.date = todayISO();
  } else {
    course.reviews.push({ id: uid("rev"), userId: user.id, name: user.name, rating: Number(data.rating), text: data.text, date: todayISO() });
  }
  saveState();
  toast("Review saved.", "success");
  renderCourseDetail(course.id);
}

function deleteReview(courseId) {
  const course = courseById(courseId);
  course.reviews = course.reviews.filter((r) => r.userId !== currentUser().id);
  saveState();
  toast("Review deleted.", "success");
  renderCourseDetail(courseId);
}

function addThread(event) {
  event.preventDefault();
  const course = courseById(event.target.dataset.threadForm);
  course.discussions.unshift({ id: uid("thread"), user: currentUser()?.name || "Guest", question: new FormData(event.target).get("question"), likes: 0, replies: [] });
  saveState();
  renderCourseDetail(course.id);
}

function addReply(event) {
  event.preventDefault();
  const course = courseById(event.target.dataset.replyForm);
  const thread = course.discussions.find((t) => t.id === event.target.dataset.threadId);
  thread.replies.push({ user: currentUser()?.name || "Guest", text: new FormData(event.target).get("reply") });
  saveState();
  renderCourseDetail(course.id);
}

function likeThread(courseId, threadId) {
  const thread = courseById(courseId).discussions.find((t) => t.id === threadId);
  thread.likes += 1;
  saveState();
  renderCourseDetail(courseId);
}

function submitAssignment(event) {
  event.preventDefault();
  state.assignments.push({ userId: currentUser().id, courseId: event.target.dataset.assignment, assignmentId: event.target.dataset.assignmentId, status: "Submitted", file: new FormData(event.target).get("file"), date: todayISO() });
  saveState();
  toast("Assignment submitted.", "success");
  renderDashboard();
}

function saveProfile(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  const user = currentUser();
  user.name = data.name;
  user.email = data.email;
  const instructor = state.instructors.find((i) => i.id === user.id);
  if (instructor) instructor.name = data.name;
  saveState();
  toast("Profile saved.", "success");
  renderDashboard();
}

function saveCourse(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  const user = currentUser();
  const existing = courseById(event.target.dataset.courseId);
  const course = existing || {
    id: uid("course"),
    instructorId: user.id,
    instructor: user.name,
    rating: 4.6,
    students: 0,
    duration: "6h 30m",
    durationHours: 6,
    level: "Beginner",
    reviews: [],
    discussions: [],
    assignments: [{ id: uid("assign"), title: "Final project", due: "2026-08-01", grade: "Pending" }],
    quiz: seedState().courses[0].quiz,
    createdAt: todayISO(),
    color: "#176BFF"
  };
  Object.assign(course, {
    title: data.title,
    description: data.description,
    price: Number(data.price),
    discountPrice: Math.max(1, Number(data.price) - 20),
    category: data.category,
    requirements: data.requirements.split("\n").filter(Boolean),
    outcomes: data.outcomes.split("\n").filter(Boolean),
    chapters: data.chapters.split("\n").filter(Boolean).map((title, i) => ({ title, lessons: [{ id: uid("lesson"), title: `Lesson ${i + 1}`, duration: "12 min", video: "Uploaded video simulation" }] }))
  });
  if (!existing) state.courses.unshift(course);
  saveState();
  closeModal();
  toast("Course saved.", "success");
  currentDashboardTab = "courses";
  renderDashboard();
}

function deleteCourse(id) {
  state.courses = state.courses.filter((c) => c.id !== id);
  state.cart = state.cart.filter((c) => c !== id);
  saveState();
  toast("Course deleted.", "success");
  renderDashboard();
}

function deleteUser(id) {
  state.users = state.users.filter((u) => u.id !== id);
  saveState();
  toast("User deleted.", "success");
  renderDashboard();
}

function addCategory(event) {
  event.preventDefault();
  const value = new FormData(event.target).get("category").trim();
  if (value && !state.categories.includes(value)) state.categories.push(value);
  saveState();
  renderDashboard();
}

function openModal(title, body) {
  modal.innerHTML = `<div class="modal-card"><div class="modal-head"><h3>${title}</h3><button class="icon-btn" id="closeModal" aria-label="Close modal"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div><div class="modal-body">${body}</div></div>`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  document.getElementById("closeModal").onclick = closeModal;
  bindForms();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  clearInterval(quizTimer);
}

function drawCharts() {
  document.querySelectorAll("canvas.chart").forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const values = [42, 76, 58, 92, 67, 84, 73];
    const width = rect.width;
    const height = rect.height;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
    ctx.fillStyle = "rgba(25,199,212,.22)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    values.forEach((v, i) => {
      const x = 24 + (i * (width - 48)) / (values.length - 1);
      const y = height - 24 - (v / 100) * (height - 52);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    values.forEach((v, i) => {
      const x = 24 + (i * (width - 48)) / (values.length - 1);
      const y = height - 24 - (v / 100) * (height - 52);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  });
}

function observeReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function renderRoute() {
  showLoader();
  const route = getRoute();
  document.querySelectorAll(".main-nav a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${route.split("?")[0]}`));
  if (route === "home") return renderHome();
  if (route.startsWith("courses")) {
    const params = new URLSearchParams(route.split("?")[1] || "");
    renderCourses(params.get("category") === "All Categories" ? "" : params.get("category") || "");
    const search = params.get("search");
    if (search) {
      const input = document.getElementById("searchInput");
      input.value = search;
      input.dispatchEvent(new Event("input"));
    }
    return;
  }
  if (route.startsWith("course/")) return renderCourseDetail(route.split("/")[1]);
  if (route.startsWith("player/")) return renderPlayer(route.split("/")[1]);
  if (route === "login" || route === "signup") return renderAuth(route);
  if (route === "dashboard") return renderDashboard();
  if (["about", "contact", "terms", "privacy", "categories", "instructors"].includes(route)) return renderStaticPage(route);
  renderHome();
}

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("open");
  document.querySelector(".header-actions").classList.toggle("open");
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  state.currentUserId = null;
  saveState();
  toast("Logged out.");
  routeTo("home");
});

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("themeToggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem(THEME_KEY, next);
});

document.getElementById("backTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("scroll", () => document.getElementById("backTop").classList.toggle("show", scrollY > 600));
window.addEventListener("hashchange", renderRoute);
modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });

document.documentElement.dataset.theme = localStorage.getItem(THEME_KEY) || "light";
syncHeader();
renderRoute();
