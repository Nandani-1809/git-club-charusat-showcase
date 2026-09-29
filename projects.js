// Edit this file to add or change projects. Replace github/demo links with real ones.
// Dates must stay in "YYYY-MM" format -- the ship-log heatmap and sorting rely on it.
const projects = [
  {
    id: 1, title: "BhojanSetu", category: "AI/ML", status: "Completed", date: "2026-08", featured: true,
    tagline: "An intelligent platform for predicting food surplus and improving food redistribution.",
    tech: ["Python", "Flask", "SQLite", "scikit-learn"],
    problem: "Institutional kitchens can prepare more food than required, resulting in avoidable food waste while nearby organizations may have difficulty discovering available surplus.",
    solution: "BhojanSetu uses demand forecasting and surplus prediction to identify potential excess food and support its redistribution through suitable organizations.",
    team: ["Git Club CHARUSAT Team"],
    github: "", demo: ""
  },
  {
    id: 2, title: "CampusRide", category: "App Development", status: "Active", date: "2026-07", featured: true,
    tagline: "A student-focused carpooling platform for easier and more efficient campus travel.",
    tech: ["Flutter", "Firebase", "Google Maps API"],
    problem: "Students travelling along similar routes often use separate vehicles, making daily commuting more expensive and less efficient.",
    solution: "CampusRide allows students to create or join rides based on route, timing and available seats, making it easier to coordinate shared travel.",
    team: ["Student Development Team"],
    github: "", demo: ""
  },
  {
    id: 3, title: "Threat Intelligence Correlation & Alert Prioritisation Assistant", category: "AI/ML", status: "Completed", date: "2026-09", featured: true,
    tagline: "AI-powered threat correlation and alert prioritisation for defence analysts.",
    tech: ["Python", "Streamlit", "IBM Bob"],
    problem: "Defence analysts receive thousands of alerts from different sources and struggle to identify and prioritise genuine threats in real time.",
    solution: "The system correlates related alerts into incidents, assigns risk scores, maps attacker behaviour to MITRE ATT&CK, and generates prioritised investigation reports through an interactive Command Center.",
    team: ["ByteForge"],
    github: "https://github.com/25cs065-ux/bob-ai-hackathon-ByteForge", demo: ""
  },
  {
    id: 4, title: "NoteNest", category: "Web Development", status: "Active", date: "2026-05", featured: false,
    tagline: "A centralized platform for organizing semester-wise notes and academic resources.",
    tech: ["React", "Node.js", "MongoDB"],
    problem: "Study material, notes and previous papers are often scattered across different messaging groups and become difficult to find later.",
    solution: "NoteNest organizes academic resources by semester, subject and unit, allowing students to find useful study material in one place.",
    team: ["Student Development Team"],
    github: "", demo: ""
  },
  {
    id: 5, title: "LabLog", category: "Web Development", status: "Completed", date: "2026-03", featured: false,
    tagline: "A digital dashboard for managing practical submissions and laboratory progress.",
    tech: ["PHP", "MySQL", "Bootstrap"],
    problem: "Managing practical submissions manually can make it difficult to identify pending work and track student progress.",
    solution: "LabLog provides a centralized dashboard where practical submissions can be managed and pending work can be identified more easily.",
    team: ["Student Development Team"],
    github: "", demo: ""
  },
  {
    id: 6, title: "AirNest", category: "IoT", status: "In Development", date: "2026-09", featured: false,
    tagline: "A low-cost air-quality monitoring concept designed for hostel rooms.",
    tech: ["ESP32", "MQ-135", "MQTT", "Node.js"],
    problem: "Poor ventilation and changing air quality in small indoor spaces can go unnoticed without continuous monitoring.",
    solution: "AirNest combines environmental sensors with a dashboard to monitor air-quality conditions and provide alerts when readings require attention.",
    team: ["Student Development Team"],
    github: "", demo: ""
  },
  {
    id: 7, title: "SwitchOff", category: "IoT", status: "Active", date: "2026-04", featured: false,
    tagline: "An automation concept for reducing unnecessary electricity usage in classrooms and labs.",
    tech: ["ESP8266", "Arduino", "Firebase"],
    problem: "Lights and fans can remain switched on in empty classrooms and laboratories, resulting in unnecessary electricity consumption.",
    solution: "SwitchOff uses motion detection and automated switching to identify inactive rooms and reduce unnecessary power usage while recording usage data.",
    team: ["Student Development Team"],
    github: "", demo: ""
  },
  {
    id: 8, title: "Commit UI Kit", category: "Design", status: "Completed", date: "2026-02", featured: false,
    tagline: "A reusable design system for creating consistent club and student project interfaces.",
    tech: ["Figma", "CSS", "Storybook"],
    problem: "Different student projects often recreate common interface components from scratch, leading to inconsistent designs and duplicated effort.",
    solution: "Commit UI Kit provides reusable components, design tokens and usage guidelines that help student teams create consistent interfaces faster.",
    team: ["Student Design Team"],
    github: "", demo: ""
  }
];
