// ============================================
// UniVibe - Society Data
// All society information is stored here
// ============================================

const societies = [
  {
    id: 1,
    name: "TechNova",
    category: "Technical",
    tagline: "Build. Code. Create.",
    description: "A community for students interested in coding, technology and innovation.",
    about: "TechNova is a student community for people interested in coding, technology and problem solving. Whether you're a complete beginner or already building projects, there's a place for you here.",
    activities: [
      "Participate in coding competitions",
      "Build small projects together",
      "Conduct technical workshops",
      "Attend hackathons",
      "Work on team projects"
    ],
    roles: ["Technical Team", "Design Team", "Content Team", "Management Team"],
    whyJoin: "You'll learn practical skills, meet people who share your interests, and get to build things that actually work. Plus, hackathons are genuinely fun.",
    status: "open",
    icon: "💻",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=240&fit=crop"
  },
  {
    id: 2,
    name: "Crescendo",
    category: "Music & Dance",
    tagline: "Where campus finds its rhythm.",
    description: "A music society for singers, instrumentalists and music enthusiasts.",
    about: "Crescendo is the go-to place on campus if you love music. We jam together, perform at college events, and sometimes just hang out and listen to good music.",
    activities: [
      "Jam sessions every weekend",
      "Perform at college fests",
      "Open mic nights",
      "Music workshops and masterclasses",
      "Collaborate on original compositions"
    ],
    roles: ["Vocalist", "Instrumentalist", "Sound/Tech Team", "Event Coordinator"],
    whyJoin: "Music is better with company. Whether you sing in the shower or play guitar at bonfires, Crescendo gives you a stage and a crew.",
    status: "open",
    icon: "🎵",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=240&fit=crop"
  },
  {
    id: 3,
    name: "Dramatics Society",
    category: "Cultural",
    tagline: "Stories that come alive.",
    description: "Explore acting, theatre, stage performance and storytelling.",
    about: "We're the drama people — and we mean that in the best way. From street plays to full-length productions, we bring stories to life on stage.",
    activities: [
      "Stage plays and street theatre",
      "Improv and sketch comedy sessions",
      "Script writing workshops",
      "Inter-college drama competitions",
      "Annual theatre production"
    ],
    roles: ["Actor", "Director", "Scriptwriter", "Stage & Props Team", "Publicity Team"],
    whyJoin: "Theatre teaches you confidence, empathy and teamwork. Also, it's one of the most exciting things you can do in college.",
    status: "open",
    icon: "🎭",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&h=240&fit=crop"
  },
  {
    id: 4,
    name: "Pixels",
    category: "Photography",
    tagline: "Capture the campus differently.",
    description: "A creative community for photography and visual storytelling.",
    about: "Pixels is for anyone who likes to look at the world through a lens — phone camera or DSLR, it doesn't matter. We focus on learning, experimenting and capturing moments.",
    activities: [
      "Photowalks around campus and city",
      "Photography challenges and contests",
      "Editing workshops (Lightroom, Snapseed)",
      "Photo exhibitions",
      "Cover college events"
    ],
    roles: ["Photographer", "Editor", "Social Media Team", "Event Coverage Team"],
    whyJoin: "You'll develop an eye for detail, build a portfolio, and see your campus from perspectives you never noticed before.",
    status: "coming-soon",
    icon: "📸",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=240&fit=crop"
  },
  {
    id: 5,
    name: "Athletic Club",
    category: "Sports",
    tagline: "Play. Compete. Grow.",
    description: "For students interested in sports, fitness and college competitions.",
    about: "The Athletic Club is for everyone — from casual players to serious athletes. We organise sports events, fitness sessions and represent the college in inter-college tournaments.",
    activities: [
      "Weekly sports meetups (cricket, football, badminton, etc.)",
      "Fitness and workout sessions",
      "Inter-college tournaments",
      "Sports day organisation",
      "Friendly matches and leagues"
    ],
    roles: ["Team Captain", "Sports Coordinator", "Fitness Lead", "Event Organiser"],
    whyJoin: "Staying active keeps you sharp. Plus, there's nothing like the feeling of representing your college on the field.",
    status: "open",
    icon: "⚽",
    image: "https://images.unsplash.com/photo-1461896836934-bd45ba48c3b7?w=400&h=240&fit=crop"
  },
  {
    id: 6,
    name: "Literary Circle",
    category: "Literary",
    tagline: "Ideas worth putting into words.",
    description: "A space for writers, readers, poets and public speakers.",
    about: "If you like reading, writing, debating, or just having long conversations about ideas — Literary Circle is your kind of place.",
    activities: [
      "Creative writing sessions",
      "Book club meetings",
      "Poetry slams and open mics",
      "Debate and public speaking practice",
      "Publish a college magazine/blog"
    ],
    roles: ["Writer", "Editor", "Debate Team", "Event Coordinator", "Design Team"],
    whyJoin: "Words are powerful. This society helps you express yourself better — whether on paper, on stage, or in conversation.",
    status: "open",
    icon: "📝",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=240&fit=crop"
  },
  {
    id: 7,
    name: "E-Cell",
    category: "Entrepreneurship",
    tagline: "Ideas into action.",
    description: "Learn about startups, business ideas and entrepreneurship.",
    about: "E-Cell is where students with business ideas come together to learn, experiment and maybe even start something real. We bring in speakers, run workshops and host startup competitions.",
    activities: [
      "Startup idea pitching sessions",
      "Business plan competitions",
      "Guest lectures from founders",
      "Entrepreneurship workshops",
      "Networking events"
    ],
    roles: ["Strategy Team", "Marketing Team", "Content Team", "Operations Team"],
    whyJoin: "Even if you don't start a company tomorrow, understanding how businesses work is a skill that helps everywhere.",
    status: "open",
    icon: "🚀",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=240&fit=crop"
  },
  {
    id: 8,
    name: "Social Impact Club",
    category: "Social Service",
    tagline: "Small actions. Real impact.",
    description: "Students working together on social and community initiatives.",
    about: "We believe students can make a difference. The Social Impact Club organises drives, awareness campaigns and community projects that actually help people.",
    activities: [
      "Community service drives",
      "Awareness campaigns on campus",
      "Teaching underprivileged children",
      "Environmental initiatives",
      "Fundraising events"
    ],
    roles: ["Volunteer Coordinator", "Outreach Team", "Content & Social Media", "Event Planner"],
    whyJoin: "Doing something meaningful feels good. And doing it with a group of motivated students makes it even better.",
    status: "open",
    icon: "🤝",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=240&fit=crop"
  },
  {
    id: 9,
    name: "Design Den",
    category: "Technical",
    tagline: "Design is thinking made visual.",
    description: "For students passionate about UI/UX design, graphic design and creative problem solving.",
    about: "Design Den is a space for students who think visually. We learn design tools, work on real projects and explore everything from posters to product interfaces.",
    activities: [
      "Design challenges and competitions",
      "Figma and Canva workshops",
      "UI/UX case study discussions",
      "Poster and branding projects",
      "Collaborate with other societies on design work"
    ],
    roles: ["Graphic Designer", "UI/UX Designer", "Social Media Designer", "Workshop Lead"],
    whyJoin: "Good design is everywhere — apps, posters, websites. Learning it early gives you a skill that's useful no matter what field you go into.",
    status: "coming-soon",
    icon: "🎨",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop"
  },
  {
    id: 10,
    name: "Axiom",
    category: "Literary",
    tagline: "Question everything. Understand deeper.",
    description: "A philosophical society for thinkers, debaters and anyone who loves asking 'why?'.",
    about: "Axiom is for students who enjoy thinking deeply about the world — ethics, existence, logic, society, and everything in between. You don't need to have read Plato to join; you just need to be curious.",
    activities: [
      "Weekly philosophical discussions and debates",
      "Thought experiments and group reflections",
      "Screening philosophical films and documentaries",
      "Guest talks by philosophy professors",
      "Writing essays and opinion pieces for the college blog"
    ],
    roles: ["Discussion Moderator", "Research Team", "Content & Blog Writer", "Event Coordinator"],
    whyJoin: "Philosophy sharpens how you think, argue, and see the world. It's the kind of skill that quietly improves everything else you do.",
    status: "open",
    icon: "🏛️",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=240&fit=crop"
  }
];

// ============================================
// Categories list for the filter section
// ============================================
const categories = [
  "All",
  "Technical",
  "Cultural",
  "Sports",
  "Literary",
  "Photography",
  "Entrepreneurship",
  "Social Service",
  "Music & Dance"
];

// ============================================
// Quiz questions for the recommendation feature
// ============================================
const quizQuestions = [
  {
    question: "What do you enjoy doing the most?",
    options: [
      { text: "Coding / Technology", scores: { "Technical": 3 } },
      { text: "Performing", scores: { "Cultural": 2, "Music & Dance": 2 } },
      { text: "Playing Sports", scores: { "Sports": 3 } },
      { text: "Writing / Reading", scores: { "Literary": 3 } },
      { text: "Photography / Designing", scores: { "Photography": 3, "Technical": 1 } },
      { text: "Organising Events", scores: { "Entrepreneurship": 2, "Cultural": 1 } },
      { text: "Helping People", scores: { "Social Service": 3 } },
      { text: "Business / Startups", scores: { "Entrepreneurship": 3 } }
    ]
  },
  {
    question: "What kind of activities sound interesting?",
    options: [
      { text: "Competitions", scores: { "Technical": 2, "Sports": 2, "Literary": 1 } },
      { text: "Creative projects", scores: { "Photography": 2, "Cultural": 2, "Music & Dance": 1 } },
      { text: "Team activities", scores: { "Sports": 2, "Social Service": 1 } },
      { text: "Events and performances", scores: { "Cultural": 2, "Music & Dance": 2 } },
      { text: "Social initiatives", scores: { "Social Service": 3 } },
      { text: "Workshops", scores: { "Technical": 2, "Entrepreneurship": 1 } }
    ]
  },
  {
    question: "How would you describe yourself?",
    options: [
      { text: "Creative", scores: { "Photography": 2, "Cultural": 2, "Music & Dance": 1 } },
      { text: "Curious", scores: { "Technical": 2, "Literary": 2 } },
      { text: "Competitive", scores: { "Sports": 2, "Technical": 1 } },
      { text: "Social", scores: { "Social Service": 2, "Cultural": 1 } },
      { text: "Problem Solver", scores: { "Technical": 2, "Entrepreneurship": 2 } },
      { text: "Organised", scores: { "Entrepreneurship": 2, "Social Service": 1 } }
    ]
  },
  {
    question: "What would you like to improve?",
    options: [
      { text: "Technical Skills", scores: { "Technical": 3 } },
      { text: "Communication", scores: { "Literary": 2, "Cultural": 2 } },
      { text: "Leadership", scores: { "Entrepreneurship": 2, "Sports": 1 } },
      { text: "Creativity", scores: { "Photography": 2, "Music & Dance": 2, "Cultural": 1 } },
      { text: "Teamwork", scores: { "Sports": 2, "Social Service": 2 } },
      { text: "Confidence", scores: { "Cultural": 2, "Literary": 1 } }
    ]
  }
];

// ============================================
// Campus tips - shown randomly
// ============================================
const campusTips = [
  "Don't join a society only because your friends are joining. Pick something that gives you a chance to learn or create something you genuinely enjoy.",
  "It's okay to try out multiple societies in your first semester. Most of them let you attend a few sessions before committing.",
  "The skills you pick up in societies — teamwork, communication, event management — often matter more than you'd expect.",
  "Don't worry if you're not \"good enough\" to join. Most societies are looking for enthusiasm, not expertise.",
  "Societies are one of the best ways to make friends outside your branch. Give it a shot."
];

// ============================================
// Preference options for "What are you looking for?" section
// Each preference maps to society categories
// ============================================
const preferenceOptions = [
  {
    id: "meet-people",
    emoji: "🤝",
    label: "Meet new people",
    categories: ["Cultural", "Sports", "Music & Dance", "Social Service"]
  },
  {
    id: "learn-skills",
    emoji: "💻",
    label: "Learn new skills",
    categories: ["Technical", "Literary", "Entrepreneurship"]
  },
  {
    id: "be-creative",
    emoji: "🎨",
    label: "Be creative",
    categories: ["Photography", "Cultural", "Music & Dance"]
  },
  {
    id: "compete",
    emoji: "🏆",
    label: "Compete & challenge myself",
    categories: ["Technical", "Sports", "Literary"]
  },
  {
    id: "build-resume",
    emoji: "📈",
    label: "Build my resume",
    categories: ["Technical", "Entrepreneurship", "Literary"]
  },
  {
    id: "confidence",
    emoji: "🎤",
    label: "Improve my confidence",
    categories: ["Cultural", "Literary", "Entrepreneurship"]
  },
  {
    id: "make-impact",
    emoji: "🌱",
    label: "Make an impact",
    categories: ["Social Service"]
  },
  {
    id: "have-fun",
    emoji: "🎉",
    label: "Have fun",
    categories: ["Sports", "Cultural", "Music & Dance"]
  }
];

// ============================================
// Mood options for "What's your campus mood today?" section
// Each mood maps to society categories + a description
// ============================================
const moodOptions = [
  {
    id: "fun",
    emoji: "😎",
    label: "I want to have fun",
    categories: ["Sports", "Music & Dance", "Cultural"],
    reason: "Because you're in the mood to have fun, you might enjoy societies where the energy is always high."
  },
  {
    id: "learn",
    emoji: "🧠",
    label: "I want to learn something",
    categories: ["Technical", "Literary", "Entrepreneurship"],
    reason: "Because you're in the mood to learn, you might enjoy societies that run workshops and skill-building sessions."
  },
  {
    id: "create",
    emoji: "🎨",
    label: "I want to create",
    categories: ["Photography", "Cultural", "Music & Dance"],
    reason: "Because you're in the mood to create, you might enjoy societies where you can work on creative projects."
  },
  {
    id: "compete",
    emoji: "🏆",
    label: "I want to compete",
    categories: ["Sports", "Technical", "Literary"],
    reason: "Because you're in the mood to compete, you might enjoy societies that participate in competitions and challenges."
  },
  {
    id: "meet",
    emoji: "🤝",
    label: "I want to meet people",
    categories: ["Cultural", "Sports", "Music & Dance", "Social Service"],
    reason: "Because you want to meet new people, you might enjoy societies with lots of group activities and social events."
  },
  {
    id: "impact",
    emoji: "🌱",
    label: "I want to make an impact",
    categories: ["Social Service", "Entrepreneurship"],
    reason: "Because you want to make a difference, you might enjoy societies focused on community and real-world change."
  }
];
