// Zentrix 2k26 Official Data & Configuration

export const SYMPOSIUM_INFO = {
  name: "Zentrix 2k26",
  tagline: "A National Level Technical Symposium",
  department: "Department of Artificial Intelligence and Data Science",
  college: "T.J.S Engineering College",
  accreditation: "An Autonomous Institution | Approved by AICTE | Affiliated to Anna University, Chennai | NAAC 'A' Grade | ISO 9001:2015",
  targetDate: "2026-09-11T09:00:00+05:30",
  venue: "T.J.S. Engineering College, Puduvoyal, Tamil Nadu 601206",
  entryFee: 100,
  highlights: [
    "Events start strictly at 9:00 AM",
    "Win Exciting Cash Prizes & Trophies",
    "One Registration = Access to Multiple Events",
    "All Participants Receive Official Certificate",
    "Complementary Delicious Lunch (Veg & Non-Veg Provided)"
  ],
  socials: {
    instagram: "https://instagram.com/aizion_2k25",
    instagramHandle: "@AIZION_2K25",
    facebook: "https://facebook.com/TJSGROUPOFINSTITUTIONS",
    youtube: "https://youtube.com/@TJSECDIGITALCELL",
    linkedin: "https://linkedin.com/school/TJSEC2009",
    email: "aizion2k25@gmail.com",
    website: "https://www.tjsec.in",
    websiteDisplay: "www.tjsec.in"
  }
};

// 10 Core Events + Fun Challenges with images and paragraph descriptions
export const EVENTS_DATA = [
  {
    id: "paper-presentation",
    title: "Paper Presentation",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Present your innovative research papers and AI breakthrough ideas to expert panelists.",
    description: "Paper Presentation provides an elite stage for undergraduate scholars to articulate revolutionary findings in Artificial Intelligence, Machine Learning, Data Analytics, Cybersecurity, and Cloud Computing. Presenters get 7 minutes of presentation followed by 3 minutes of Q&A with domain experts.",
    rules: [
      "Max 3 members per team.",
      "Abstract must be submitted prior to the presentation date.",
      "Presentation time: 7 mins + 3 mins Q&A.",
      "Bring 2 hard copies of the full paper and soft copy on a pendrive."
    ],
    time: "10:00 AM - 12:30 PM",
    venue: "Main Auditorium - Seminar Hall A",
    prize: "₹1,000 (1st Place) + ₹500 (2nd Place) + Certificate"
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Craft precision LLM prompts to solve complex algorithmic & creative AI tasks under time pressure.",
    description: "Master the art of AI communication in this modern high-stakes competition! Participants are challenged to engineer precise prompts for Large Language Models (LLMs) and Generative AI systems to generate complex code, resolve edge cases, produce high-fidelity synthetic images, and optimize token efficiency in real-time.",
    rules: [
      "Individual participation.",
      "3 round challenge: Text Generation, Code Synthesis, Multimodal Crafting.",
      "No external search engines permitted during live prompt tests.",
      "Evaluated on prompt brevity, output accuracy, and creative problem-solving."
    ],
    time: "10:30 AM - 12:00 PM",
    venue: "AI & DS Computer Lab 2",
    prize: "₹1,000 (1st Place) + ₹500 (2nd Place) + Certificate"
  },
  {
    id: "technical-quiz",
    title: "Technical Quiz",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Test your speed and memory across AI, algorithms, data structures, and computer tech history.",
    description: "Put your tech intellect to the ultimate test! Technical Quiz features multiple buzzer rounds covering Artificial Intelligence, Neural Networks, Database Systems, Computer Vision, Cloud Infrastructure, and iconic Tech Trivia.",
    rules: [
      "Team of 2 members.",
      "Round 1: Rapid Fire MCQ Preliminary Test.",
      "Round 2: Audio-Visual & Buzzer Round for Top 6 Teams.",
      "Negative marking applies in the final buzzer round."
    ],
    time: "11:30 AM - 01:00 PM",
    venue: "Seminar Hall B",
    prize: "₹1,000 (1st Place) + ₹500 (2nd Place) + Certificate"
  },
  {
    id: "code-debugging",
    title: "Code Debugging",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Spot syntactical flaws, memory leaks, and logic bugs in Python, C++, and Java snippets.",
    description: "Debugging is an essential skill for any software architect. In Code Debugging, coders race against time to fix obfuscated, bug-riddled code snippets across C++, Python, and Java.",
    rules: [
      "Individual participation.",
      "Allowed languages: Python, C++, Java.",
      "Level 1: Syntax & Logic Errors (15 mins).",
      "Level 2: Complex Memory & Algorithmic Bug Fixing (30 mins)."
    ],
    time: "01:30 PM - 03:00 PM",
    venue: "Advanced Programming Lab 1",
    prize: "₹1,000 (1st Place) + ₹500 (2nd Place) + Certificate"
  },
  {
    id: "project-expo",
    title: "Project Expo",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Showcase working hardware prototypes, IoT systems, and innovative AI software applications.",
    description: "Unveil your working prototypes to industry experts and academia! Project Expo welcomes hardware IoT setups, AI-powered robotics, mobile apps, web platforms, and automated machine learning prototypes.",
    rules: [
      "Max 4 members per team.",
      "Working prototype or live software demo is mandatory.",
      "Bring poster/display board detailing architecture and workflow.",
      "Power sockets and Wi-Fi access will be provided at the venue."
    ],
    time: "10:00 AM - 03:00 PM (Continuous Exhibition)",
    venue: "Main Campus Expo Gallery",
    prize: "₹1,000 (1st Place) + ₹500 (2nd Place) + Certificate"
  },
  {
    id: "treasure-hunt",
    title: "Treasure Hunt",
    category: "Non-Technical",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Decode encrypted riddles, follow hidden campus clues, and race to uncover the final vault key.",
    description: "Transform the T.J.S Engineering College campus into your playground! Teams must solve high-concept riddles, decode ciphered messages, and trace hidden checkpoints scattered across campus grounds.",
    rules: [
      "Team of 3 to 4 members.",
      "All clues must be handed back in order.",
      "No splitting up beyond designated zone boundaries.",
      "Fastest completion time wins."
    ],
    time: "01:30 PM - 03:30 PM",
    venue: "Campus Wide Grounds",
    prize: "₹1,000 (1st Place) + ₹500 (2nd Place) + Certificate"
  },
  {
    id: "meme-find",
    title: "Meme Find",
    category: "Non-Technical",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Unleash your comedic genius by creating trending tech memes and identifying famous viral templates.",
    description: "Express tech culture through humor! Meme Find challenges creators to design witty, hilarious, and relatable memes based on engineering life, coding fails, and modern AI trends.",
    rules: [
      "Individual or team of 2.",
      "Original memes created on-spot using given topics.",
      "No vulgar or offensive content permitted.",
      "Evaluated on humor, creativity, and viral potential."
    ],
    time: "11:00 AM - 12:30 PM",
    venue: "Media Hall 3",
    prize: "₹1,000 (1st Place) + ₹500 (2nd Place) + Certificate"
  },
  {
    id: "wolftrix",
    title: "Wolftrix",
    category: "Non-Technical",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
    shortDesc: "The signature Zentrix strategy game! Outsmart your rivals in tactical decision-making puzzles.",
    description: "Wolftrix is Zentrix's signature strategy survival game. Modeled after tactical deception and resource allocation puzzles, players must analyze opponent maneuvers, negotiate alliances, and make calculating moves under time constraints to emerge as the lone alpha wolf.",
    rules: [
      "Individual entry.",
      "Multi-stage elimination strategy matrix.",
      "Rules revealed live at the beginning of each round.",
      "Top strategist takes home the Wolftrix Trophy."
    ],
    time: "02:00 PM - 03:30 PM",
    venue: "Auditorium Annex",
    prize: "₹1,000 (1st Place) + ₹500 (2nd Place) + Certificate"
  },
  {
    id: "howl-tunes",
    title: "Howl Tunes",
    category: "Non-Technical",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Test your musical ear with song identification, reverse audio clips, and lyrics completion.",
    description: "Are you a true music fanatic? Howl Tunes tests your audio memory! Guess the song from a 3-second snippet, identify reversed instrumentals, complete missing lyrics from hit cinema tracks, and match background scores to iconic movie scenes.",
    rules: [
      "Team of 2 members.",
      "3 rounds: 3-Second Audio Snippet, Reverse Audio, Lyric Match.",
      "Buzzer rules apply for bonus points."
    ],
    time: "11:30 AM - 01:00 PM",
    venue: "Open Air Stage",
    prize: "₹1,000 (1st Place) + ₹500 (2nd Place) + Certificate"
  },
  {
    id: "esports",
    title: "Esports (BGMI & Valorant)",
    category: "Non-Technical",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Battle it out in high-octane BGMI Custom Rooms and Valorant 1v1 / Squad tournaments.",
    description: "Gear up for competitive gaming! Zentrix Esports hosts custom BGMI lobbies and intense Valorant tactical matches. Dominate the lobby, execute flawless site takes, and showcase your reflexes to claim the title of Zentrix Gaming Champion.",
    rules: [
      "BGMI Squads / Individual 1v1 Valorant options.",
      "Players must use their own mobile devices / gaming gear.",
      "Emulators strictly prohibited for mobile tournaments.",
      "Fair play & anti-cheat enforced strictly."
    ],
    time: "10:30 AM - 03:30 PM",
    venue: "Gaming Zone - Lab 4",
    prize: "₹1,000 (1st Place) + ₹500 (2nd Place) + Certificate"
  },
  {
    id: "fun-challenges",
    title: "Fun Fitness Challenges",
    category: "Fun Challenges",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Push your physical limits with Push Ups, Deadlifts, Squats, and instant prize games!",
    description: "Take a break from mental battles and test your raw physical endurance! Features spot challenges including Maximum Push-Ups in 60s, Form-Strict Deadlifts, Bodyweight Squats challenge, and quick reflex games with instant spot prizes.",
    rules: [
      "Open to all registered symposium participants.",
      "On-spot registration available at the fitness arena.",
      "Referees evaluate strict form and repetition count."
    ],
    time: "12:00 PM - 02:30 PM",
    venue: "Sports Complex Lawn",
    prize: "Spot Cash Prizes + Medals + Certificate"
  }
];

// Symposium Members (Exact posts and phone numbers requested by user)
export const MEMBERS_DATA = [
  {
    id: "m1",
    name: "Lavinmaran. D",
    posting: "President",
    category: "Executive Committee",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    phone: "+91 93450 17909",
    bio: "President of Zentrix 2k26 executive committee."
  },
  {
    id: "m2",
    name: "Bhuvana Priya PT",
    posting: "Vice President",
    category: "Executive Committee",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    phone: "+91 63858 04942",
    bio: "Vice President managing symposium event operations and committee workflows."
  },
  {
    id: "m3",
    name: "Ajay Kumar. BS",
    posting: "Overall Event Coordinator",
    category: "Executive Committee",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    phone: "+91 63857 38261",
    bio: "Overall Event Coordinator supervising inter-college event execution and schedules."
  },
  {
    id: "m4",
    name: "Lakshan Kumar. R",
    posting: "Secretary",
    category: "Executive Committee",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    phone: "+91 93454 87117",
    bio: "Secretary managing symposium registrations, communications, and certificates."
  },
  {
    id: "m5",
    name: "Tamil maran. T",
    posting: "Senior Joint Secretary",
    category: "Executive Committee",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop",
    phone: null, // Strictly no phone number
    bio: "Senior Joint Secretary coordinating technical logistics and venue setups."
  },
  {
    id: "m6",
    name: "Hema Deepika. R",
    posting: "Junior Joint Secretary",
    category: "Executive Committee",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    phone: null, // Strictly no phone number
    bio: "Junior Joint Secretary assisting hospitality, registrations, and delegate support."
  },
  {
    id: "m7",
    name: "Nivetha.V",
    posting: "Trustee",
    category: "Trustees",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    phone: null, // Strictly no phone number
    bio: "Trustee representing Zentrix 2k26 advisory board."
  },
  {
    id: "m8",
    name: "Mithun Sriram V",
    posting: "Chief Editor",
    category: "Editorial & Media",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    phone: null, // Strictly no phone number
    bio: "Chief Editor overseeing technical content, digital assets, and souvenir design."
  },
  {
    id: "m9",
    name: "Praveen Balaji. P",
    posting: "Co-Editor",
    category: "Editorial & Media",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop",
    phone: null, // Strictly no phone number
    bio: "Co-Editor curating event rules, press releases, and publication layouts."
  },
  {
    id: "m10",
    name: "Kishore Reddy. J",
    posting: "Media Team",
    category: "Editorial & Media",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    phone: null, // Strictly no phone number
    bio: "Media Team lead managing video promos, photography, and live streaming."
  },
  {
    id: "m11",
    name: "Eswar Ajay. B",
    posting: "Media Team",
    category: "Editorial & Media",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    phone: null, // Strictly no phone number
    bio: "Media Team member managing social media releases and graphic content."
  }
];

// Contact Persons (Faculties & Student Leaders)
export const CONTACT_PERSONS = [
  {
    name: "Mrs. PAVITHRA.P",
    posting: "Event Organizer (Faculty)",
    phone: "+91 63743 59810",
    type: "Faculty"
  },
  {
    name: "Lavinmaran. D",
    posting: "President",
    phone: "+91 93450 17909",
    type: "Student"
  },
  {
    name: "Bhuvana Priya PT",
    posting: "Vice President",
    phone: "+91 63858 04942",
    type: "Student"
  },
  {
    name: "Ajay Kumar. BS",
    posting: "Overall Event Coordinator",
    phone: "+91 63857 38261",
    type: "Student"
  },
  {
    name: "Lakshan Kumar. R",
    posting: "Secretary",
    phone: "+91 93454 87117",
    type: "Student"
  },
  {
    name: "Tamil maran. T",
    posting: "Senior Joint Secretary",
    phone: null,
    type: "Student"
  },
  {
    name: "Hema Deepika. R",
    posting: "Junior Joint Secretary",
    phone: null,
    type: "Student"
  },
  {
    name: "Nivetha.V",
    posting: "Trustee",
    phone: null,
    type: "Trustee"
  },
  {
    name: "Mithun Sriram V",
    posting: "Chief Editor",
    phone: null,
    type: "Editorial"
  },
  {
    name: "Praveen Balaji. P",
    posting: "Co-Editor",
    phone: null,
    type: "Editorial"
  },
  {
    name: "Kishore Reddy. J",
    posting: "Media Team",
    phone: null,
    type: "Media"
  },
  {
    name: "Eswar Ajay. B",
    posting: "Media Team",
    phone: null,
    type: "Media"
  }
];
