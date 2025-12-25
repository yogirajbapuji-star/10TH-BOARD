
import { Subject, ChapterStatus, DailySchedule } from './types';

export const MOTIVATIONAL_QUOTES = [
  "Success is the sum of small efforts, repeated day in and day out. 🚀",
  "Don't stop until you're proud. Maharashtra Board 2025 is yours! ✨",
  "Consistency beats pressure every single time. Stay steady. 💪",
  "Your future self will thank you for the hard work you put in today. 🌟",
  "Focus on progress, not perfection. You're on track! 📈",
  "Every chapter you finish brings you closer to your dream score. 🎓",
  "Believe you can and you're halfway there. 🎯"
];

export const FIXED_SCHEDULE: DailySchedule[] = [
  { time: "06:00 - 09:00", start: 6, end: 9, task: "Coaching Class", type: "busy", category: "coaching" },
  { time: "09:30 - 11:30", start: 9.5, end: 11.5, task: "Morning Self Study", type: "study", category: "self" },
  { time: "12:00 - 17:00", start: 12, end: 17, task: "School Hours", type: "busy", category: "school" },
  { time: "17:00 - 18:00", start: 17, end: 18, task: "Home Revision", type: "study", category: "self" },
  { time: "18:00 - 20:00", start: 18, end: 20, task: "Evening Coaching", type: "busy", category: "coaching" },
  { time: "20:30 - 22:00", start: 20.5, end: 22, task: "Night Review & Lang. Practice", type: "study", category: "self" },
];

export const INITIAL_SYLLABUS: Subject[] = [
  {
    id: 'english-kumarbharati',
    name: 'English (Kumarbharati)',
    medium: 'English',
    chapters: [
      { id: 'en-1.1', name: '1.1 Where the Mind is Without Fear (Poem)', status: ChapterStatus.NOT_STARTED },
      { id: 'en-1.2', name: "1.2 The Thief's Story", status: ChapterStatus.NOT_STARTED },
      { id: 'en-1.3', name: '1.3 On Wings of Courage', status: ChapterStatus.NOT_STARTED },
      { id: 'en-1.4', name: "1.4 All the World's a Stage (Poem)", status: ChapterStatus.NOT_STARTED },
      { id: 'en-1.5', name: '1.5 Joan of Arc', status: ChapterStatus.NOT_STARTED },
      { id: 'en-1.6', name: '1.6 The Alchemy of Nature', status: ChapterStatus.NOT_STARTED },
      { id: 'en-2.1', name: '2.1 Animals (Poem)', status: ChapterStatus.NOT_STARTED },
      { id: 'en-2.2', name: '2.2 The Three Questions', status: ChapterStatus.NOT_STARTED },
      { id: 'en-2.3', name: '2.3 Connecting the Dots', status: ChapterStatus.NOT_STARTED },
      { id: 'en-2.4', name: '2.4 The Pulley (Poem)', status: ChapterStatus.NOT_STARTED },
      { id: 'en-2.5', name: "2.5 Let's March", status: ChapterStatus.NOT_STARTED },
      { id: 'en-2.6', name: '2.6 Science and Spirituality', status: ChapterStatus.NOT_STARTED },
      { id: 'en-3.1', name: '3.1 Night of the Scorpion (Poem)', status: ChapterStatus.NOT_STARTED },
      { id: 'en-3.2', name: '3.2 The Night I Met Einstein', status: ChapterStatus.NOT_STARTED },
      { id: 'en-3.3', name: '3.3 Stephen Hawking', status: ChapterStatus.NOT_STARTED },
      { id: 'en-3.4', name: '3.4 The Will to Win (Poem)', status: ChapterStatus.NOT_STARTED },
      { id: 'en-3.5', name: '3.5 Unbeatable Spirit: Mary Kom', status: ChapterStatus.NOT_STARTED },
      { id: 'en-3.6', name: '3.6 The Concert', status: ChapterStatus.NOT_STARTED },
      { id: 'en-4.1', name: '4.1 A Thing of Beauty... (Poem)', status: ChapterStatus.NOT_STARTED },
      { id: 'en-4.2', name: '4.2 The Luncheon', status: ChapterStatus.NOT_STARTED },
      { id: 'en-4.3', name: '4.3 World Heritage', status: ChapterStatus.NOT_STARTED },
      { id: 'en-4.4', name: '4.4 The Height of the Ridiculous (Poem)', status: ChapterStatus.NOT_STARTED },
      { id: 'en-4.5', name: '4.5 The Old Man and The Sea (Review)', status: ChapterStatus.NOT_STARTED },
      { id: 'en-4.6', name: '4.6 The Gift of the Magi', status: ChapterStatus.NOT_STARTED },
      { id: 'en-gram-1', name: 'Grammar: Language Study (Do as Directed)', status: ChapterStatus.NOT_STARTED },
      { id: 'en-gram-2', name: 'Grammar: Tenses, Voice & Reported Speech', status: ChapterStatus.NOT_STARTED },
      { id: 'en-write-1', name: 'Writing: Formal & Informal Letters', status: ChapterStatus.NOT_STARTED },
      { id: 'en-write-2', name: 'Writing: Summary & Information Transfer', status: ChapterStatus.NOT_STARTED },
      { id: 'en-write-3', name: 'Writing: News Report & Expansion of Ideas', status: ChapterStatus.NOT_STARTED },
      { id: 'en-write-4', name: 'Writing: Drafting a Speech & Dialogue', status: ChapterStatus.NOT_STARTED },
    ]
  },
  {
    id: 'marathi-aksharbharati',
    name: 'Marathi (Aksharbharati)',
    medium: 'Marathi',
    chapters: [
      { id: 'ma-1', name: '१. तू बुद्धि दे (प्रार्थना)', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-2', name: '२. संतवाणी (अ) अंकिला मी दास तुझा', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-3', name: '२. संतवाणी (आ) योगी पावन मना', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-4', name: '३. शाल', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-5', name: '४. उपास', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-6', name: '५. दोन दिवस (कविता)', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-7', name: '६. चुडीवाला', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-8', name: '७. फूटप्रिंट्स', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-9', name: '८. ऊर्जाशक्तीचा जागर', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-10', name: '९. औक्षण (कविता)', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-11', name: '१०. रंग साहित्याचे', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-12', name: '११. जंगल डायरी', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-13', name: '१२. जिथे शब्द संपतात (कविता)', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-14', name: '१३. खरा नागरिक', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-15', name: '१४. स्वप्न करू साकार (कविता)', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-16', name: '१५. व्युत्पत्ती कोश', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-17', name: 'स्थूलवाचन: १. मोठे होत असलेल्या मुलांनो', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-18', name: 'स्थूलवाचन: २. जाता अस्ताला', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-19', name: 'स्थूलवाचन: ३. वीरांगना', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-20', name: 'व्याकरण: समास व अलंकार', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-21', name: 'व्याकरण: शब्दसिद्धी व वाक्प्रचार', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-22', name: 'उपयोजित लेखन: पत्र व सारांश', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-23', name: 'उपयोजित लेखन: जाहिरात व बातमी', status: ChapterStatus.NOT_STARTED },
      { id: 'ma-24', name: 'उपयोजित लेखन: कथा व निबंध', status: ChapterStatus.NOT_STARTED },
    ]
  },
  {
    id: 'math-algebra',
    name: 'Mathematics Part I (Algebra)',
    medium: 'English',
    chapters: [
      { id: 'm1-1', name: 'Linear Equations in Two Variables', status: ChapterStatus.NOT_STARTED },
      { id: 'm1-2', name: 'Quadratic Equations', status: ChapterStatus.NOT_STARTED },
      { id: 'm1-3', name: 'Arithmetic Progression', status: ChapterStatus.NOT_STARTED },
      { id: 'm1-4', name: 'Financial Planning', status: ChapterStatus.NOT_STARTED },
      { id: 'm1-5', name: 'Probability', status: ChapterStatus.NOT_STARTED },
      { id: 'm1-6', name: 'Statistics', status: ChapterStatus.NOT_STARTED },
    ]
  },
  {
    id: 'math-geometry',
    name: 'Mathematics Part II (Geometry)',
    medium: 'English',
    chapters: [
      { id: 'm2-1', name: 'Similarity', status: ChapterStatus.NOT_STARTED },
      { id: 'm2-2', name: 'Pythagoras Theorem', status: ChapterStatus.NOT_STARTED },
      { id: 'm2-3', name: 'Circle', status: ChapterStatus.NOT_STARTED },
      { id: 'm2-4', name: 'Geometric Constructions', status: ChapterStatus.NOT_STARTED },
      { id: 'm2-5', name: 'Coordinate Geometry', status: ChapterStatus.NOT_STARTED },
      { id: 'm2-6', name: 'Trigonometry', status: ChapterStatus.NOT_STARTED },
      { id: 'm2-7', name: 'Mensuration', status: ChapterStatus.NOT_STARTED },
    ]
  },
  {
    id: 'science-1',
    name: 'Science & Technology Part 1',
    medium: 'English',
    chapters: [
      { id: 's1-1', name: 'Gravitation', status: ChapterStatus.NOT_STARTED },
      { id: 's1-2', name: 'Periodic Classification of Elements', status: ChapterStatus.NOT_STARTED },
      { id: 's1-3', name: 'Chemical Reactions and Equations', status: ChapterStatus.NOT_STARTED },
      { id: 's1-4', name: 'Effects of Electric Current', status: ChapterStatus.NOT_STARTED },
      { id: 's1-5', name: 'Heat', status: ChapterStatus.NOT_STARTED },
      { id: 's1-6', name: 'Refraction of Light', status: ChapterStatus.NOT_STARTED },
      { id: 's1-7', name: 'Lenses', status: ChapterStatus.NOT_STARTED },
      { id: 's1-8', name: 'Metallurgy', status: ChapterStatus.NOT_STARTED },
      { id: 's1-9', name: 'Carbon Compounds', status: ChapterStatus.NOT_STARTED },
      { id: 's1-10', name: 'Space Missions', status: ChapterStatus.NOT_STARTED },
    ]
  },
  {
    id: 'science-2',
    name: 'Science & Technology Part 2',
    medium: 'English',
    chapters: [
      { id: 's2-1', name: 'Heredity and Evolution', status: ChapterStatus.NOT_STARTED },
      { id: 's2-2', name: 'Life Processes in Living Organisms Part 1', status: ChapterStatus.NOT_STARTED },
      { id: 's2-3', name: 'Life Processes in Living Organisms Part 2', status: ChapterStatus.NOT_STARTED },
      { id: 's2-4', name: 'Environmental Management', status: ChapterStatus.NOT_STARTED },
      { id: 's2-5', name: 'Towards Green Energy', status: ChapterStatus.NOT_STARTED },
      { id: 's2-6', name: 'Animal Classification', status: ChapterStatus.NOT_STARTED },
      { id: 's2-7', name: 'Introduction to Microbiology', status: ChapterStatus.NOT_STARTED },
      { id: 's2-8', name: 'Cell Biology and Biotechnology', status: ChapterStatus.NOT_STARTED },
      { id: 's2-9', name: 'Social Health', status: ChapterStatus.NOT_STARTED },
      { id: 's2-10', name: 'Disaster Management', status: ChapterStatus.NOT_STARTED },
    ]
  },
  {
    id: 'history-marathi',
    name: 'History & Political Science',
    medium: 'Marathi',
    chapters: [
      { id: 'hm-1', name: 'इतिहासलेखन : पाश्चात्त्य परंपरा', status: ChapterStatus.NOT_STARTED },
      { id: 'hm-2', name: 'इतिहासलेखन : भारतीय परंपरा', status: ChapterStatus.NOT_STARTED },
      { id: 'hm-3', name: 'उपयोजित इतिहास', status: ChapterStatus.NOT_STARTED },
      { id: 'hm-4', name: 'भारतीय कलांचा इतिहास', status: ChapterStatus.NOT_STARTED },
      { id: 'hm-5', name: 'प्रसारमाध्यमे आणि इतिहास', status: ChapterStatus.NOT_STARTED },
      { id: 'hm-6', name: 'मनोरंजनाची माध्यमे आणि इतिहास', status: ChapterStatus.NOT_STARTED },
      { id: 'pm-1', name: 'संविधानाची वाटचाल', status: ChapterStatus.NOT_STARTED },
      { id: 'pm-2', name: 'निवडणूक प्रक्रिया', status: ChapterStatus.NOT_STARTED },
      { id: 'pm-3', name: 'राजकीय पक्ष', status: ChapterStatus.NOT_STARTED },
    ]
  },
  {
    id: 'geography-marathi',
    name: 'Geography',
    medium: 'Marathi',
    chapters: [
      { id: 'gm-1', name: 'क्षेत्रभेट', status: ChapterStatus.NOT_STARTED },
      { id: 'gm-2', name: 'स्थान व विस्तार', status: ChapterStatus.NOT_STARTED },
      { id: 'gm-3', name: 'प्राकृतिक रचना व जलप्रणाली', status: ChapterStatus.NOT_STARTED },
      { id: 'gm-4', name: 'हवामान', status: ChapterStatus.NOT_STARTED },
      { id: 'gm-5', name: 'नैसर्गिक वनस्पती व प्राणी', status: ChapterStatus.NOT_STARTED },
      { id: 'gm-6', name: 'लोकसंख्या', status: ChapterStatus.NOT_STARTED },
      { id: 'gm-7', name: 'मानवी वस्ती', status: ChapterStatus.NOT_STARTED },
      { id: 'gm-8', name: 'अर्थव्यवस्था आणि व्यवसाय', status: ChapterStatus.NOT_STARTED },
      { id: 'gm-9', name: 'पर्यटन, वाहतूक व संदेशवहन', status: ChapterStatus.NOT_STARTED },
    ]
  },
  {
    id: 'sanskrit-amod',
    name: 'Sanskrit (Āmod / आमोद)',
    medium: 'Sanskrit',
    chapters: [
      { id: 'sk-1', name: 'आद्यकृषकः पृथुवैन्यः', status: ChapterStatus.NOT_STARTED },
      { id: 'sk-2', name: 'व्यसने मित्रपरीक्षा', status: ChapterStatus.NOT_STARTED },
      { id: 'sk-3', name: 'सूक्तिसुधा (पद्यम्)', status: ChapterStatus.NOT_STARTED },
      { id: 'sk-4', name: 'स एव परमाणुः', status: ChapterStatus.NOT_STARTED },
      { id: 'sk-5', name: 'युग्ममाला (पद्यम्)', status: ChapterStatus.NOT_STARTED },
      { id: 'sk-6', name: 'व्यायामाः सर्वदा पथ्यः', status: ChapterStatus.NOT_STARTED },
      { id: 'sk-7', name: 'वाचनप्रशंसा', status: ChapterStatus.NOT_STARTED },
      { id: 'sk-8', name: 'चित्रकाव्यम्', status: ChapterStatus.NOT_STARTED },
    ]
  }
];

export const TOTAL_DAYS = 340;
export const SYLLABUS_DAYS = 320;
export const PAPER_SOLVING_DAYS = 20;
