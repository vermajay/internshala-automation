let COVER_LETTER = "The moment I saw the job description and responsibilities, I felt that I am perfectly cut out for this internship. My skills in HTML, CSS, JavaScript, ReactJS, NodeJS, MongoDB align seamlessly with the responsibilities outlined. I have developed various real life projects related to these skills., and if you hire me, I promise to deliver quality work throughout the tenure of the internship. Backed by certifications in MERN Stack and Web Development. All I want is a chance to prove it to you. This internship will give me a great opportunity to work and apply my knowledge, skills in a professional setting. I will further develop and learn new skills. And I am certain that this internship experience will go a long way in shaping a professional out of me.";

function generateAnswer(question) {
    const keywordGroups = {
      shareProfile: ["github", "linkedin", "portfolio", "resume"],
      shareProjectsAndExperience: ["projects", "experiences", "website"],
      howProficientOrExperienced: ["proficient", "how much", "how long", "experience"],
      readyOrAvailableToWork: ["ready", "available", "work", "start", "immediately", "month", "day", "hour", "hours"],  
      canSubmitAssessment: ["submit", "assessment"],
      canRelocate: ["relocate", "move", "location", "city", "state"],
      graduation: ["when", "which year", "graduate", "graduation", "graduated"],
      whyJoin: ["why", "interest", "motivation", "reason", "passion", "love", "like", "decision", "choice", "decide"],
      rateYourself: ["rate", "yourself", "how good"],
      describeProject: ["describe", "project"],
      goals: ["goal", "aspiration", "future", "career"],
      teamwork: ["team", "collaboration", "communication"],
      strengths: ["strength", "ability", "competency"],
      weaknesses: ["weakness", "improvement", "challenge"],
      collegeName: ["college", "university", "institute"],
      workingHours: ["preferred working hours", "working hours", "availability"],
    };
  
    const answers = {
      shareProfile: "Here are my profile links:\n Linkedin: https://www.linkedin.com/in/verma-jay/ \n Github: https://github.com/vermajay \n Portfolio: https://jayverma.netlify.app/ \n Resume: https://jayverma.netlify.app/resume.pdf",
  
      shareProjectsAndExperience: "I've worked on several projects during my studies and personal time. For instance, I developed a tool to automate the process of applying to internships using Puppeteer. I have also developed many MERN stack applications. I am also familiar with Firebase and hosting tools like Vercel and Netlify. I have also done 3 internships related to web development in the past. \n You can find more details about my projects and experiences on my Portfolio: https://jayverma.netlify.app/",
  
      howProficientOrExperienced: "I have 3 years of experience in web development. I have a good understanding of React, Node.js, Express, MongoDB, Tailwind CSS, and Git. I am also familiar with Firebase, Vercel, Netlify, and Puppeteer. I have also worked with databases like MySQL, PostgreSQL, and MongoDB.",
  
      readyOrAvailableToWork: "Yes, I am ready to work. I am currently looking for an internship opportunity as well as a full time opportunity. I am available to start as soon as possible.",
  
      canSubmitAssessment: "Yes, I am confident that I can submit the assessment.",
  
      canRelocate: "Yes, I am willing to relocate. I am currently looking for an internship opportunity as well as a full time opportunity. I am available to start as soon as possible.",
  
      graduation: "I am currently in my final year of college and will be graduating in 2025.",
  
      whyJoin: "I am highly interested in this opportunity and confident in my ability to contribute effectively. My skills and experience align well with the requirements, and I'm excited about the potential to learn and grow in this role.",
  
      rateYourself: "I would rate myself a 9/10. I am a quick learner and I am always eager to learn new technologies and tools. I am also a good problem solver and I am always eager to take on new challenges.",
  
      describeProject: "I have made a full stack MERN application called 'StudyNotion' over a period of 3 months which is a platform for students and mentors. Mentors can create courses and students can buy courses. I have used technologies like React, Node.js, Express, MongoDB, Tailwind CSS, and Git. Razorpay is used for payment gateway. \n Find the link to the project on my portfolio: https://jayverma.netlify.app/",
      
      goals: "My short-term goal is to gain practical experience and contribute meaningfully to your team, applying and expanding my skills in a professional setting. Long-term, I aim to grow into a Software Engineer and continue making impactful contributions in this field. I'm committed to continuous learning and see this internship as a crucial step towards achieving these aspirations.",
  
      teamwork: "I thrive in collaborative environments and have strong teamwork skills. In group projects, I focus on clear communication, active listening, and contributing my strengths while supporting my teammates. I'm adept at facilitating group discussions and resolving conflicts constructively, which has consistently led to successful outcomes in team settings.",
  
      strengths: "My key strengths include adaptability, quick learning, problem-solving, and effective communication. I'm proficient in coding, and I'm always eager to take on new challenges and expand my skill set. My ability to learn new technologies and tools has been particularly valuable in my previous projects.",
      
      weaknesses: "I sometimes tend to be overly critical of my own work, which can lead to perfectionism. However, I'm actively working on balancing self-improvement with efficiency. I've learned to set realistic deadlines and seek feedback from peers, which has helped me manage this tendency while maintaining high-quality output.",
  
      collegeName: "I am currently pursuing a Bachelor's degree in Computer Science and Engineering at University Institute of Engineering and Technology, Kurukshetra University.",
  
      workingHours: "I can work from 9 AM to 5 PM IST. I am also flexible to work overtime if needed."
    };
  
    const lowercaseQuestion = question.toLowerCase();
    let relevantAnswers = [];
  
    const questionWords = lowercaseQuestion.split(/\s+/);
    for (const [group, keywords] of Object.entries(keywordGroups)) {
      if (keywords.some(keyword => questionWords.includes(keyword))) {
        relevantAnswers.push(answers[group]);
      }
    }
  
    if (relevantAnswers.length > 0) {
      return relevantAnswers.join("\n Furthermore, ");
    }
  
    return "I'm highly interested in this opportunity and confident in my ability to contribute effectively. My skills and experience align well with the requirements, and I'm excited about the potential to learn and grow in this role.";
}

module.exports = {
  COVER_LETTER, generateAnswer
}