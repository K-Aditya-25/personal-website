export const profile = {
  name: "Aditya Kharbanda",
  title: "Junior Technical Business Analyst",
  company: "Web Summit",
  previousRole: "Data Science Intern at Eton",
  location: "Dublin",
  email: "adityakharbanda25@icloud.com",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aditya-kharbanda-657984a0/" },
    { label: "X", href: "https://x.com/K_aditya25" },
    { label: "GitHub", href: "https://github.com/K-Aditya-25" },
  ],
};

export const emailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;

export const books = {
  reading: [
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman" },
    { title: "The Secret of Secrets", author: "Dan Brown" },
  ],
  upNext: [
    { title: "The Art of Thinking Clearly", author: "Rolf Dobelli" },
    { title: "An Illustrated Guide to AI Agents", author: "Maarten Grootendorst and Jay Alammar" },
  ],
  read: [
    { title: "Angels & Demons", author: "Dan Brown" },
    { title: "The Da Vinci Code", author: "Dan Brown" },
    { title: "The Lost Symbol", author: "Dan Brown" },
    { title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey" },
    { title: "The Psychology of Money", author: "Morgan Housel" },
  ],
};

export const hackathons = [
  { year: "2026", title: "Hack for Humanity" },
  { year: "2026", title: "Build for Ireland Hackathon", detail: "October" },
  { year: "2026", title: "Claude Code Hackathon", detail: "March" },
  { year: "2025", title: "HackIreland", detail: "February" },
  { year: "2024", title: "HackTrinity" },
];

export const badminton = [
  { year: "2026", league: "DDLC", detail: "Men’s doubles, Division 4", club: "Sheriff Badminton Club" },
  { year: "2025", league: "DDLC", detail: "Men’s doubles, Division 5", club: "TCD" },
  { year: "2024", league: "DDLC", detail: "Men’s doubles, Division 5", club: "TCD" },
];

export const certificates = [
  { href: "https://coursera.org/share/220727d81d5055eb7c167f2c60567a78", label: "Generative Adversarial Networks (GANs) Specialization", completed: "August 2024" },
  { href: "https://coursera.org/share/112ad25f0c25c10c3b89bb8e5f3143d2", label: "Deep Learning Specialization", completed: "June 2024" },
  { href: "https://coursera.org/share/d4d5e0f2644ab0eb2a10af5893158d42", label: "Machine Learning Specialization", completed: "January 2024" },
  { href: "https://coursera.org/share/89e37291111636e2779fe3356f7576d7", label: "Mathematics for Machine Learning Specialization", completed: "January 2024" },
  { href: "https://coursera.org/share/1f8bda91e717da888d570b566c83da48", label: "Retrieval Augmented Generation (RAG)", completed: "November 2025" },
];

export const volunteering = [
  {
    title: "Give(a)Go events",
    body: "I volunteer at events in Dublin, helping create content and capture moments through photos and video.",
    image: "/images/give-a-go.jpg",
    imageAlt: "Aditya volunteering at a Give(a)Go event",
    imageNote: "Add a Give(a)Go event photo",
  },
  {
    title: "Trinity College Dublin Open Day",
    body: "I volunteered at TCD Open Day in 2023 and 2024.",
    image: "/images/tcd-open-day.jpg",
    imageAlt: "Aditya volunteering at a Trinity College Dublin Open Day",
    imageNote: "Add the TCD Open Day photo",
  },
];

export const futurePages = ["Travel"];
