import React, { useState } from 'react'
import '../styles/index.css'

// files
import projectImg1 from 'assets/images/1.png'
import projectImg2 from 'assets/images/2.png'
import projectImg3 from 'assets/images/3.png'

// details
import {
  headerTexts,
  initials,
  contactDetails,
  summaryDetails,
  educationDetails,
  skills,
  otherSkills,
  jobs
} from 'utils'

const projectsImages = [projectImg1, projectImg2, projectImg3]

function Resume() {
  return (
    <div className="font-jost hyphens-manual mb-16">
      <section className="p-3 my-auto lg:mx-auto max-w-3xl bg-gray-100 rounded-2xl border-4 border-gray-700 sm:p-9 md:p-16 mt-2 mx-2 lg:mt-6 print:border-0 page print:max-w-letter print:max-h-letter print:mx-0 print:my-o xsm:p-8 print:bg-white md:max-w-letter md:h-letter lg:h-letter">
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
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                        >
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
                        className="mt-2 break-inside-avoid"
                      >
                        <header>
                          <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                            {school.name}
                          </h3>
                          <p className="leading-normal text-gray-500 text-md">
                            {school.period}
                          </p>
                        </header>
                        {/* <ul className="mt-2 list-disc list-inside text-gray-800 text-md">
                          {school.details.map((detail, detailIndex) => (
                            <li key={detailIndex}>
                              <span className="font-semibold text-md">
                                {detail.label}
                              </span>
                              {detail.value}
                            </li>
                          ))}
                        </ul> */}
                      </section>
                    ))}
                  </React.Fragment>
                ))}
              </section>
            </section>

            <section className="pb-6 mt-0 mb-4 border-b-4 border-gray-300 first:mt-0 break-inside-avoid">
              {/* skills */}
              <section className="mt-2 break-inside-avoid">
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
              {/* other skills */}
              <section className="mt-2 break-inside-avoid">
                <h2 className="mb-2 text-lg font-bold tracking-widest text-gray-700 print:font-normal">
                  OTHER SKILLS
                </h2>
                <section className="mb-0 break-inside-avoid">
                  <section className="mt-1 last:pb-1">
                    <ul className="flex flex-wrap -mb-1 font-bold leading-relaxed text-md -mr-1.6">
                      {otherSkills.map((oskill, index) => (
                        <li
                          key={index}
                          className="p-1.5 mb-1 leading-relaxed text-white bg-gray-800 mr-1.6 print:bg-white print:border-inset"
                        >
                          {oskill}
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
                      <div className="flex justify-between align-center">
                        <h3 className="font-semibold text-gray-800 text-md leading-snugish">
                          {job.title}
                        </h3>
                        <p className="p-1.5 text-sm leading-normal font-semibold text-white bg-gray-800 mr-1.6 print:bg-white print:border-inset w-fit">
                          {job.company}
                        </p>
                      </div>
                      <p className="text-sm leading-normal text-gray-500">
                        {job.duration}
                      </p>
                    </header>
                    <ul className="pl-3 mt-2 font-normal text-gray-700 text-md leading-snugish">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index}>
                          <span className="text-gray-500 transform -translate-y-px select-none">
                            &rsaquo;{' '}
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

      {projectsImages.map((image, index) => (
        <section
          key={index}
          className="my-lg:auto mx-auto max-w-3xl bg-gray-100 rounded-2xl border-4 border-gray-700 mt-2 mx-2 lg:mt-6 print:border-0 page print:max-w-letter print:mx-0 print:my-o print:bg-white md:max-w-letter"
        >
          <img
            src={image}
            alt={`Project ${index + 1}`}
            style={{
              width: '100%',
              objectFit: 'contain',
              borderRadius: '16px'
            }}
          />
        </section>
      ))}
    </div>
  )
}

export default Resume
