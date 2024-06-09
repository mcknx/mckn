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
    text: 'Software Developer with experience in frontend and backend technologies including React, NodeJS, ExpressJS, and C#. Skilled in integrating new designs and necessary npm packages based on the task at hand. Experienced in C# backend debugging and coding.'
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
    title: 'Frontend React Developer/Full Stack Developer',
    company: 'Steelx Pty Ltd',
    duration: 'November 2022 - April 2024',
    responsibilities: [
      `Demonstrated strong problem-solving skills using ReactJS, TailwindCSS, SASS, C# & .NET. Tasks included UI enhancements, bug fixes, and API integrations, benefiting over 500 users.`
    ]
  },
  {
    title: 'Frontend Developer',
    company: 'Tactiv Studios Design and Development',
    duration: 'April 2022 - November 2022',
    responsibilities: [
      `Focused on translating Figma designs to code, resolving Angular bugs, and setting up Python virtual environments for project execution.`
    ]
  },
  {
    title: 'Full Stack Web & Mobile Developer',
    company: 'WAL Software Solutions',
    duration: 'April 2021 - April 2022',
    responsibilities: [
      `Developed web skills with Vue.js, React.js, WordPress, Firebase, Mysql, & PostgreSQL, led mobile app improvements, and integrated APIs like Google Maps and Swiper.js for project success.`
    ]
  }
]
