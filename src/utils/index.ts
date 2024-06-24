export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export const headerTexts = [
  {
    text: 'McKeen Asma',
    className: 'mb-0 text-5xl font-bold text-gray-700'
  },
  {
    text: 'Software Developer',
    className: 'm-0 ml-2 text-2xl font-semibold text-gray-700 leading-snugish'
  },
  {
    text: 'Davao City, Philippines',
    className:
      'm-0 mt-2 ml-2 text-xl font-semibold text-gray-500 leading-snugish'
  }
]

export const initials = ['M', 'C', 'K', 'N']

export const contactDetails = [
  {
    href: 'https://mckeenasma.vercel.app/',
    label: 'Portfolio:',
    value: 'mckeenasma.vercel.app'
  },
  {
    href: 'https://github.com/mcknx',
    label: 'Github:',
    value: 'github.com/mcknx'
  },
  {
    href: 'mailto:mcknasma@gmail.com',
    label: 'Email:',
    value: 'mcknasma@gmail.com'
  },
  {
    href: 'tel:+639323900204',
    label: 'Phone:',
    value: '+639323900204'
  }
]

export const summaryDetails = [
  {
    tag: 'h2',
    className:
      'mb-2 text-xl font-bold tracking-widest text-gray-700 print:font-normal',
    text: 'SUMMARY'
  },
  {
    tag: 'p',
    className: 'mt-2 leading-normal text-gray-700 text-md',
    text: 'Experienced in frontend and full stack development, adeptly translating complex designs into functional code with ReactJS, React Native, Vue.js, Firebase, MySQL, MongoDB, and more. Skilled in improving UI/UX and achieving project success through collaborative problem-solving, deadline management, and mentoring junior team members, fostering efficient project delivery and skill growth.'
  }
]

export const educationDetails = [
  {
    title: 'EDUCATION',
    schools: [
      {
        name: 'University of the Immaculate Conception',
        period:
          'June 2018 to June 2022 | Bachelor of Science in Information Technology'
      }
    ]
  }
]

export const skills = [
  'ReactJS',
  'TailwindCSS',
  'HTML5',
  'CSS3',
  'Javascript',
  'MongoDB',
  'React Native',
  'NodeJS',
  'Rest API'
]

export const otherSkills = [
  'ExpressJS',
  'NextJS',
  'Axios',
  'Context API',
  'Redux',
  'C#',
  'Laravel',
  'Python',
  'Angular',
  'VueJS',
  'Material UI',
  'AntD',
  'Bootstrap',
  'Trello',
  'Jira',
  'Git',
  'Github',
  'Bitbucket'
]

export const jobs = [
  {
    title: 'Full Stack Developer',
    company: 'Faithful Development - Work from Home',
    duration: 'April 2024 to Present',
    responsibilities: [
      `Developed Web, Mobile and Backend solutions. Coordinate with manager regularly.`
    ]
  },
  {
    title: 'Frontend Developer',
    company: 'Steelx Pty Ltd - Work from Home',
    duration: 'November 2022 - April 2024',
    responsibilities: [
      `During my time at Steelx, I focused on two key projects: an SVG-based shed layout renderer and a workflow designer. The shed layout renderer visualized intricate shed designs, including doors and bays, using SVG elements. The workflow designer outlined tasks in flow diagrams. Using ReactJS, TailwindCSS, and C#, I handled UI enhancements, bug fixes, and API integrations, collaborating with senior developers to improve my problem-solving and technical skills.`
    ]
  },
  {
    title: 'Frontend Developer',
    company: 'Tactiv Studios Design and Development - Work from Home',
    duration: 'April 2022 - November 2022',
    responsibilities: [
      `At Tactiv Studios, I specialized in translating intricate Figma designs into code, collaborating closely with designers to ensure precise implementation. This involved handling diverse design-to-code tasks with tailored npm packages from regular designer meetings. By employing ReactJS, TailwindCSS, and Angular, I enhanced UI solutions and integrated APIs, playing a pivotal role in achieving project milestones and optimizing outcomes.`
    ]
  },
  {
    title: 'Full Stack Web & Mobile Developer',
    company: 'WAL Software Solutions - Davao City',
    duration: 'April 2021 - April 2022',
    responsibilities: [
      `During my time at WAL Software Solutions, I handled diverse roles from maintaining legacy code to leading projects from inception. Working closely with my manager, I effectively set and met deadlines while guiding junior team members in code setup, bug resolution, and collaborative learning. I significantly contributed to projects like Trial Pulse (mobile frontend), OneStopSnap (fullstack mobile), Sureplus (fullstack web), and Sliver (fullstack web), utilizing technologies such as ReactJS, React Native, Vue.js, Firebase, MySQL, MongoDB, and more. These experiences sharpened my leadership skills and technical awareness, ensuring efficient project delivery and robust skill enhancement.`
    ]
  }
]
