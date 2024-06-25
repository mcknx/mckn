import React, { ComponentType, Suspense, useState, useEffect } from 'react'

interface Page {
  year: string
  month: string
  day: string
  Component: ComponentType<any> // Define Component as a React component type
}

const Loading = () => <div>Loading...</div>

const Projects: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([])

  useEffect(() => {
    const modules = import.meta.glob('../projects/**/*/*.tsx', { eager: true })

    const pages = Object.keys(modules)
      .map((key): Page | undefined => {
        // Adjusted regex to match the correct path structure
        const matchResult = key.match(/projects\/(\d+)\/(\w+)\/(\d+)\.tsx$/)
        console.log(matchResult)
        console.log(key);
        

        if (matchResult) {
          const [, year, month, day] = matchResult

          const Component: ComponentType<any> = React.lazy(() =>
            Promise.resolve({
              default: (modules[key] as { default: ComponentType<any> }).default
            })
          )

          return { year, month, day, Component }
        }
        return undefined
      })
      .filter((page): page is Page => page !== undefined)

    setPages(pages)
  }, [])

  // useEffect(() => {
  //   const modules = import.meta.glob('../projects/**/*.tsx')

  //   // Helper function to delay execution
  //   const delay = (ms: number) =>
  //     new Promise((resolve) => setTimeout(resolve, ms))

  //   const promises = Object.keys(modules).map(
  //     async (key): Promise<Page | undefined> => {
  //       const matchResult = key.match(/\.\/(\d+)\/(\w+)\/(\d+)\.tsx$/)

  //       console.log(matchResult);
  //       console.log(key);

  //       if (matchResult) {
  //         const [, year, month, day] = matchResult

  //         // Await both the module to be imported and a delay
  //         const modulePromise = modules[key]()
  //         await delay(1000) // Delay for 1 second, adjust as needed
  //         const value = await modulePromise

  //         const Component: ComponentType<any> = React.lazy(() =>
  //           Promise.resolve({
  //             default: (value as { default: ComponentType<any> }).default
  //           })
  //         )

  //         return { year, month, day, Component }
  //       }
  //       return undefined
  //     }
  //   )

  //   // console.log(promises)

  //   Promise.all(promises).then((results) => {
  //     // Filter out undefined results in case matchResult was null
  //     // console.log(results);

  //     const filteredResults = results.filter(
  //       (page): page is Page => page !== undefined
  //     )
  //     setPages(filteredResults)
  //   })
  // }, [])

  console.log(pages)

  return (
    <div>
      {pages.map(({ year, month, day, Component }) => (
        <div key={`${year}-${month}-${day}`}>
          <h3>{`${year}-${month}-${day}`}</h3>
          <Suspense fallback={<Loading />}>
            <Component />
          </Suspense>
        </div>
      ))}
    </div>
  )
}

export default Projects
