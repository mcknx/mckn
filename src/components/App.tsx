import React from 'react'
import '../styles/index.css'

function App() {
  const headerTexts = [
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

  const initials = ['M', 'C', 'K', 'N']

  const contactDetails = [
    {
      href: 'https://mckeenasma.tech',
      label: 'Portfolio:',
      value: 'mckeenasma.tech'
    },
    {
      href: 'https://github.com/mcknx',
      label: 'Github:',
      value: 'mcknx'
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

  const summaryDetails = [
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

  const educationDetails = [
    {
      title: 'EDUCATION',
      schools: [
        {
          name: 'University of the Immaculate Conception',
          period:
            'June 2018 to June 2022 | Bachelor of Science in Information Technology',
          details: [
            {
              label: 'Skills:',
              value:
                'Visual Studio Code, Postgres, MongoDB, Firebase, HTML5/CSS, Javascript, ReactJS, React Native, NodeJS, ExpressJS, NextJS, Laravel, Python, Angular, Rest API, Axios, RTK query, Context API Redux, Git, Github, Bitbucket, Trello Jira, TailwindCSS, Material UI, AntD, Bootstrap'
            }
          ]
        }
      ]
    }
  ]

  const skills = [
    'HTML5/CSS',
    'Javascript',
    'ReactJS',
    'React Native',
    'NodeJS',
    'ExpressJS',
    'NextJS',
    'Laravel',
    'Python',
    'Angular',
    'Rest API',
    'Axios',
    'RTK query',
    'Context API Redux',
    'Git',
    'Github',
    'Bitbucket',
    'Trello Jira',
    'TailwindCSS',
    'Material UI',
    'AntD',
    'Bootstrap'
  ]

  const jobs = [
    {
      title: 'Full Stack Web & Mobile Developer',
      company: 'WAL Software Solutions',
      duration: 'December 2021 - April 2022',
      responsibilities: [
        'Gained a lot of frontend experience, used Firebase, TailwindCSS, ReactJS, a little bit of WordPress, VueJS, and built apps from scratch using Firebase and ReactJS.'
      ]
    },
    {
      title: 'Junior Frontend Developer',
      company: 'Tactiv Studios Design and Development',
      duration: 'June 2022 - November 2022',
      responsibilities: [
        'Primarily focused on translating designs from Figma to code and fixing bugs in Angular.'
      ]
    },
    {
      title: 'Frontend React Developer/Full Stack Developer',
      company: 'Steelx Pty Ltd',
      duration: 'November 2022 - April 2024',
      responsibilities: [
        'Focused on frontend React applications, primarily addressing issues within a significant management system used by at least 500 individuals, including clients and administrators. Additionally, I handled integrating new designs and necessary npm packages based on the task at hand. Furthermore, I performed C# backend debugging and coding as required, given that the majority of the system is coded in C#.'
      ]
    }
  ]

  return (
    <main className="font-jost hyphens-manual">
      <section className="p-3 my-auto mx-auto max-w-3xl bg-gray-100 rounded-2xl border-4 border-gray-700 sm:p-9 md:p-16 lg:mt-6 print:border-0 page print:max-w-letter print:max-h-letter print:mx-0 print:my-o xsm:p-8 print:bg-white md:max-w-letter md:h-letter lg:h-letter">
        <header className="inline-flex justify-between items-baseline mb-2 w-full align-top border-b-4 border-gray-300">
          <section className="block">
            {headerTexts.map((item, index) => (
              <h1 key={index} className={item.className}>
                {item.text}
              </h1>
            ))}
          </section>

          <section
            className="justify-between px-3 mt-0 mb-5 text-4xl font-black leading-none text-white bg-gray-700 initials-container print:bg-black"
            style={{ paddingBottom: '1.5rem', paddingTop: '1.5rem' }}
          >
            {initials.map((initial, index) => (
              <section key={index} className="text-center initial">
                {initial}
              </section>
            ))}
          </section>
        </header>

        <section className="col-gap-8 print:col-count-2 print:h-letter-col-full col-fill-balance md:col-count-2 md:h-letter-col-full">
          <section className="flex-col">
            {/* contactDetails */}
            <section className="pb-2 mt-4 mb-0 first:mt-0">
              <section className="break-inside-avoid">
                <section className="pb-4 mb-2 border-b-4 border-gray-300 break-inside-avoid">
                  <ul className="pr-7 list-inside">
                    {contactDetails.map((item, index) => (
                      <li
                        key={index}
                        className="mt-1 leading-normal text-gray-500 transition duration-100 ease-in hover:text-gray-700 text-md"
                      >
                        <a href={item.href} className="group">
                          <span className="mr-2 text-lg font-semibold text-gray-700 leading-snugish">
                            {item.label}
                          </span>
                          {item.value}
                          <span className="inline-block font-normal text-gray-500 transition duration-100 ease-in group-hover:text-gray-700 print:text-black">
                            ↗
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </section>
            </section>

            {/* summaryDetails */}
            <section className="pb-2 pb-4 mt-0 border-b-4 border-gray-300 first:mt-0">
              <section className="break-inside-avoid">
                {summaryDetails.map((item, index) => {
                  const Tag = item.tag as keyof JSX.IntrinsicElements
                  return (
                    <Tag key={index} className={item.className}>
                      {item.text}
                    </Tag>
                  )
                })}
              </section>
            </section>

            {/* educationDetails */}
            <section className="pb-0 mt-2 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
              <section className="break-inside-avoid">
                {educationDetails.map((item, index) => (
                  <React.Fragment key={index}>
                    <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
                      {item.title}
                    </h2>
                    {item.schools.map((school, schoolIndex) => (
                      <section
                        key={schoolIndex}
                        className="mt-2 border-b-2 break-inside-avoid"
                      >
                        <header>
                          <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                            {school.name}
                          </h3>
                          <p className="leading-normal text-gray-500 text-md">
                            {school.period}
                          </p>
                        </header>
                        <ul className="mt-2 list-disc list-inside text-gray-800 text-md">
                          {school.details.map((detail, detailIndex) => (
                            <li key={detailIndex}>
                              <span className="font-semibold text-md">
                                {detail.label}
                              </span>
                              {detail.value}
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </React.Fragment>
                ))}
              </section>
            </section>

            {/* skills */}
            <section className="pb-6 mt-0 mb-4 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
              <section className="break-inside-avoid">
                <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
                  SKILLS
                </h2>
                <section className="mb-0 break-inside-avoid">
                  <section className="mt-1 last:pb-1">
                    <ul className="flex flex-wrap -mb-1 font-bold leading-relaxed text-md -mr-1.6">
                      {skills.map((skill, index) => (
                        <li
                          key={index}
                          className="p-1.5 mb-1 leading-relaxed text-white bg-gray-800 mr-1.6 print:bg-white print:border-inset"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </section>
                </section>
              </section>
            </section>

            <aside className="pb-2 pb-4 mt-4 border-b-4 border-gray-300 first:mt-0">
              <section className="break-inside-avoid">
                <h2 className="mb-2 text-xl font-black tracking-widest text-gray-800 print:font-normal">
                  EXPERIENCE
                </h2>

                {jobs.map((job, index) => (
                  <section
                    key={index}
                    className={`mb-2 ${
                      index !== jobs.length - 1
                        ? 'border-b-2 border-gray-300'
                        : ''
                    } break-inside-avoid`}
                  >
                    <header>
                      <h3 className="font-semibold text-gray-800 text-md leading-snugish">
                        {job.title}
                      </h3>
                      <p className="text-sm leading-normal text-gray-500">
                        {job.duration}
                      </p>
                    </header>
                    <ul className="pl-3 mt-2 font-normal text-gray-700 text-md leading-snugish">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index}>
                          <span className="text-gray-500 transform -translate-y-px select-none">
                            &rsaquo;
                          </span>
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </section>
            </aside>
          </section>
        </section>
      </section>
    </main>
  )
}

export default App
