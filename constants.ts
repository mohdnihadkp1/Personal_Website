import { Project, Skill, SocialLink } from './types';

export const PORTFOLIO_OWNER = "Hola! Welcome";
export const PORTFOLIO_ROLE = "MOHAMMED NIHAD"; // Creative Developer & AI Specialist (previous Rule)
export const PORTFOLIO_BIO = "I craft digital experiences that merge cutting-edge AI with fluid, reactive design. Obsessed with performance, aesthetics, and code that feels alive.";

export const SYSTEM_INSTRUCTION = `
You are the AI Digital Twin of ${PORTFOLIO_OWNER}, a ${PORTFOLIO_ROLE}.
Your goal is to answer questions about Mohammed's background, skills, and projects.
Personality Traits:
- Optimistic, enthusiastic, and professionally humorous.
- Use emojis sparingly (maximum 1 per response) to add flavor but keep it clean.
- Be helpful and slightly futuristic in tone.

Key details:
- Stack: React, TypeScript, Node.js, Python, Tailwind, Gemini API, WebGL, Docker, GraphQL.
- Experience: 5+ years building scalable web apps and 2 years focusing on Generative AI integrations.
- Contact: mohdnihadkp@gmail.com.
- Status: Open to select freelance opportunities.
- Brevity: Keep responses concise (under 100 words) unless asked for deep technical details.
`;

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'PolyStudy',
    description: 'A comprehensive academic resource sharing platform. Students can access, upload, and organize study materials in a collaborative environment.',
    tags: ['React', 'Next.js', 'Tailwind', 'Vercel'],
    imageUrl: 'assets/project_1.png',
    size: 'large',
    link: 'https://polystudy.vercel.app/',
    githubUrl: 'https://github.com/mohdnihadkp/PolyStudy'
  },
  {
    id: '2',
    title: 'CHALIYAM CONNECT Application',
    description: 'A hyper-local community app designed to bridge the gap between residents and local services in Chaliyam. Features real-time updates and essential directory services. (Coming Soon)',
    tags: ['Mobile App', 'Community', 'UI/UX'],
    imageUrl: 'assets/chaliyam_connect.jpg',
    size: 'large',
    link: '',
    githubUrl: ''
  },
  {
    id: '3',
    title: 'EDUMATE KERALA',
    description: 'A dedicated educational platform empowering students in Kerala with streamlined access to academic resources, exam prep tools, and collaborative study features.',
    tags: ['React', 'Education', 'Platform'],
    imageUrl: 'assets/edumate_kerala.jpg',
    size: 'large',
    link: 'https://edumeta.lovable.app/',
    githubUrl: 'https://github.com/mohdnihadkp/edumate-plus'
  }
];

export const SKILLS: Skill[] = [
  { name: 'React / Next.js', category: 'frontend', level: 95 },
  { name: 'TypeScript', category: 'frontend', level: 90 },
  { name: 'Node.js', category: 'backend', level: 85 },
  { name: 'Gemini API', category: 'ai', level: 92 },
  { name: 'Python', category: 'backend', level: 80 },
  { name: 'Tailwind CSS', category: 'frontend', level: 98 },
  { name: 'Docker', category: 'tools', level: 75 },
  { name: 'GraphQL', category: 'backend', level: 82 },
  { name: 'Figma', category: 'tools', level: 70 },
];

export const SOCIALS: SocialLink[] = [
  { 
    platform: 'Instagram', 
    url: 'https://www.instagram.com/mohdnihadkp?igsh=MWs3M2k1OXNlbTV5YQ==', 
    icon: 'Instagram' 
  },
  { 
    platform: 'Whatsapp', 
    url: 'https://wa.me/qr/HQWL273HTEK4L1', 
    icon: 'Whatsapp' 
  },
  { 
    platform: 'X', 
    url: 'https://x.com/mohdnihadkp?t=6AuEYXj5pzlWX6RVQ91Xcw&s=09', 
    icon: 'X' 
  },
  { 
    platform: 'Pinterest', 
    url: 'https://pin.it/4SKTJurgS', 
    icon: 'Pinterest' 
  },
  { 
    platform: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/mohammed-nihad-kp-71b6b6339?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', 
    icon: 'Linkedin' 
  },
  { 
    platform: 'GitHub', 
    url: 'https://github.com/mohdnihadkp', 
    icon: 'Github' 
  },
  {
    platform: 'Email',
    url: 'mailto:mohdnihadkp@gmail.com',
    icon: 'Mail'
  }
];

export const QUOTES = [
    { text: "The people who are crazy enough to think they can change the world are the ones who do.", author: "Steve Jobs" },
    { text: "I think it is possible for ordinary people to choose to be extraordinary.", author: "Elon Musk" },
    { text: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg" },
    { text: "If you're not embarrassed by the first version of your product, you've launched too late.", author: "Reid Hoffman" },
    { text: "Play by the rules, but be ferocious.", author: "Phil Knight" }
];
