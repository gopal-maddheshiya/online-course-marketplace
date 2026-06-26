// Helper for random data generation
const random = {
    int: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    arrayElement: (arr) => arr[Math.floor(Math.random() * arr.length)],
    date: (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
};

// Helper to generate a unique ID
const uid = (prefix) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

// Helper to get today's date in ISO format
const todayISO = () => new Date().toISOString().slice(0, 10);

export function generateDemoData() {
    console.log('Generating demo data...');

    const gopalProfile = {
        id: "user_gopal",
        name: "Gopal Maddheshiya",
        email: "gopal@example.com",
        role: "Admin",
        phone: "+91-9876543210",
        location: "Uttar Pradesh, India",
        profilePhoto: "assets/gopal-avatar.png",
        bio: "Aspiring Software Engineer passionate about Full Stack Development, Java, DSA, MERN Stack and building scalable web applications.",
        university: "Shri Ramswaroop Memorial University",
        branch: "Computer Science & Engineering",
        currentYear: "3rd Year",
        skills: ["Java", "DSA", "MERN Stack", "Full Stack Development", "Node.js", "React"]
    };

    const instructors = Array.from({ length: 10 }, (_, i) => ({
        id: `inst_${i + 1}`,
        name: `Instructor ${i + 1}`,
        headline: `Expert in ${random.arrayElement(["Web", "Java", "Python"])}`,
        specialty: random.arrayElement(["Web Development", "Java Development", "Python"]),
        bio: `A passionate instructor with over ${random.int(5, 15)} years of experience.`,
        rating: (4.5 + Math.random() * 0.5).toFixed(1),
        students: random.int(1000, 15000),
    }));

    const otherUsers = Array.from({ length: 489 }, (_, i) => ({
        id: `student_${i}`,
        name: `Student ${i}`,
        email: `student${i}@example.com`,
        role: "Student",
    }));

    const users = [gopalProfile, ...instructors, ...otherUsers];

    const courseTitles = [
        "Java Programming Masterclass", "Complete Web Development Bootcamp", "Advanced JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "Data Structures", "Algorithms", "Git & GitHub", "System Design Basics", "SQL Fundamentals",
    ];

    const courses = Array.from({ length: 120 }, (_, i) => {
        const instructor = random.arrayElement(instructors);
        const title = i < courseTitles.length ? courseTitles[i] : `Course ${i + 1} on ${instructor.specialty}`;
        return {
            id: `course_${i + 1}`,
            title: title,
            instructor: instructor.name,
            price: random.int(50, 200),
            rating: (4.0 + Math.random()).toFixed(1),
            students: random.int(100, 5000),
            duration: `${random.int(5, 50)}h ${random.int(0, 59)}m`,
            level: random.arrayElement(["Beginner", "Intermediate", "Advanced"]),
            category: instructor.specialty,
            thumbnail: `assets/course-pattern.svg`,
        };
    });

    const enrolledCourses = courses.slice(0, 12).map(course => ({
        courseId: course.id,
        progress: random.int(10, 100),
        completed: random.int(10, 100) > 90,
        lastWatched: random.date(new Date(2023, 0, 1), new Date()).toISOString().slice(0, 10),
    }));

    const wishlist = courses.slice(12, 20).map(c => c.id);
    const cart = courses.slice(20, 24);

    const certificates = enrolledCourses.filter(e => e.completed).slice(0, 6).map(e => ({
        courseId: e.courseId,
        courseName: courses.find(c => c.id === e.courseId).title,
        certId: `CERT-${e.courseId}-${gopalProfile.id}`,
        completionDate: random.date(new Date(2023, 0, 1), new Date()).toISOString().slice(0, 10),
    }));

    const quizHistory = Array.from({ length: 20 }, () => {
        const score = random.int(40, 100);
        return {
            courseName: random.arrayElement(enrolledCourses).courseId,
            score: score,
            status: score >= 70 ? 'Pass' : 'Fail',
            timeTaken: `${random.int(5, 20)}m`,
            date: random.date(new Date(2023, 0, 1), new Date()).toISOString().slice(0, 10),
        };
    });

    const assignments = Array.from({ length: 15 }, () => ({
        courseName: random.arrayElement(enrolledCourses).courseId,
        status: random.arrayElement(["Completed", "Pending", "Late"]),
        dueDate: random.date(new Date(), new Date(2026, 11, 31)).toISOString().slice(0, 10),
    }));
    
    const notifications = Array.from({ length: 25 }, () => ({
        text: random.arrayElement(["Course enrolled", "Certificate earned", "Assignment due", "Quiz completed", "Instructor announcement"]),
        date: random.date(new Date(2023, 0, 1), new Date()).toISOString().slice(0, 10),
    }));


    // This is the full dataset that will be loaded into the app's state
    const fullDemoState = {
        user: gopalProfile,
        courses,
        users, // For admin stats
        instructors,
        studentData: {
            enrolledCourses,
            wishlist,
            cart,
            certificates,
            quizHistory,
            assignments,
            notifications,
            notes: [{ course: 'Java Programming Masterclass', note: 'Remember to practice generics.' }],
            bookmarks: [{ course: 'Complete Web Development Bootcamp', lesson: 'CSS Grid' }],
            achievements: Array.from({length: 15}, (_, i) => `Achievement Badge ${i+1}`),
            learningStreak: { current: 87, longest: 124 },
        },
        // other top-level state if needed by the app
    };

    return fullDemoState;
}
