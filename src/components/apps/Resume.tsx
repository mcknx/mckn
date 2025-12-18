import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import bear from "~/configs/bear";
import type { BearMdData } from "~/types";

interface ResumeProps {
  isStandalone?: boolean;
}

const Resume = ({ isStandalone = false }: ResumeProps) => {
  const [aboutMe, setAboutMe] = useState("");
  const [experience, setExperience] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper to extract clean text from markdown between headers
  const extractSection = (text: string, header: string, nextHeader?: string) => {
    if (!text) return "";
    const start = text.indexOf(header);
    if (start === -1) return "";
    let content = text.substring(start + header.length);
    if (nextHeader) {
      const end = content.indexOf(nextHeader);
      if (end !== -1) content = content.substring(0, end);
    }
    return content.trim();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ... (fetch logic) ...

        // 1. Fetch About Me
        const aboutRes = await fetch("markdown/about-me.md");
        const aboutText = await aboutRes.text();

        // Extract biography part
        // updated regex to only stop at next ## followed by space (H2) or end
        const bioMatch = aboutText.match(/## Biography\n([\s\S]*?)(?=\n##\s|$)/);
        const bioText = bioMatch ? bioMatch[1].trim() : aboutText;
        setAboutMe(bioText);

        // Extract Experience part
        // updated regex to only stop at next ## followed by space (H2) or end
        const expMatch = aboutText.match(/## Experience\n([\s\S]*?)(?=\n##\s|$)/);
        const expText = expMatch ? expMatch[1].trim() : "";
        setExperience(expText);

        // 2. Fetch Projects (Logic remains ...)
        const projectList = bear.find((b) => b.id === "project")?.md || [];

        const projectPromises = projectList.map(async (p) => {
          try {
            const res = await fetch(p.file);
            const text = await res.text();

            // ... (regex parsers) ...

            // Extract "Technology Used"
            const techMatch = text.match(/\*\*Technology Used:\*\*(.*?)(\n|$)/);
            const techStack = techMatch ? techMatch[1].trim() : "";

            // Extract Overview
            const overviewMatch = text.match(/## Overview\n([\s\S]*?)($)/);
            const overview = overviewMatch ? overviewMatch[1].trim() : p.excerpt;

            return {
              ...p,
              fullDescription: overview,
              techStack
            };
          } catch (e) {
            return p;
          }
        });

        const detailedProjects = await Promise.all(projectPromises);
        setProjects(detailedProjects);
      } catch (error) {
        console.error("Failed to fetch resume data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ... (handlePrint) ...

  const handlePrint = () => {
    if (isStandalone) {
      window.print();
    } else {
      window.open(window.location.origin + "/#/resume", "_blank");
    }
  };

  if (loading) {
    // ... (loader) ...
    return (
      <div
        className={`flex items-center justify-center h-full ${isStandalone ? "text-gray-800" : "text-white"}`}
      >
        Generating Resume...
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full bg-white overflow-y-auto flex flex-col items-center ${isStandalone ? "p-0" : "p-8"} print:p-0 print:overflow-visible print:h-auto print:block`}
    >
      {/* Print Button (Floating) - logic remains ... */}
      <button
        onClick={handlePrint}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg font-semibold flex items-center gap-2 transition-all print:hidden z-50 hover:scale-105 active:scale-95"
      >
        <span className="i-ph:printer-fill text-xl" />
        {isStandalone ? "Print Page" : "Open Printable Version"}
      </button>

      {/* ... (container and styles) ... */}
      <style>{`
           @media print {
               html, body, #root {
                   height: auto !important;
                   overflow: visible !important;
                   margin: 0 !important;
               }
           }
       `}</style>
      <div
        id="resume-content"
        className="w-full max-w-[210mm] bg-white p-8 text-gray-800 text-sm leading-6 print:w-full print:p-0 print:max-w-none print:h-auto"
      >
        {/* Header - (remains same) */}
        <header className="border-b-2 border-gray-800 pb-6 mb-6">
          {/* ... header content ... */}
          <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-tight mb-2">
            McKeen Asma
          </h1>
          <div className="flex flex-wrap gap-4 text-gray-600 text-sm font-medium">
            <div className="flex items-center gap-1">
              <span className="i-ph:map-pin-fill" aria-hidden="true" />
              Davao City, Philippines
            </div>
            <a
              href="mailto:mcknasma@gmail.com"
              className="flex items-center gap-1 hover:text-blue-600"
            >
              <span className="i-ph:envelope-fill" aria-hidden="true" />
              mcknasma@gmail.com
            </a>
            <a
              href="tel:+639323900204"
              className="flex items-center gap-1 hover:text-blue-600"
            >
              <span className="i-ph:phone-fill" aria-hidden="true" />
              +63 932 390 0204
            </a>
            <a
              href="https://mckeenasma.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-blue-600"
            >
              <span className="i-ph:globe-fill" aria-hidden="true" />
              mckeenasma.vercel.app
            </a>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-6">
          {/* ... */}
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 mb-3 pb-1">
            Professional Summary
          </h2>
          <div className="text-gray-700 text-justify">
            <ReactMarkdown>{aboutMe}</ReactMarkdown>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-6">
          {/* ... */}
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 mb-3 pb-1">
            Technical Skills
          </h2>
          <div className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
            <span className="font-bold text-gray-900">Core:</span>
            <span>
              ReactJS, React Native, Node.js, TypeScript, TailwindCSS, HTML5, CSS3,
              MongoDB, REST APIs
            </span>

            <span className="font-bold text-gray-900">Ecosystem:</span>
            <span>Next.js, Express, Redux, Context API, Firebase, Git, GitHub</span>

            <span className="font-bold text-gray-900">Tools:</span>
            <span>VS Code, Cursor, Antigravity, n8n, Jira, Trello, Figma, Postman</span>
          </div>
        </section>

        {/* Work Experience */}
        {experience && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 mb-4 pb-1">
              Work Experience
            </h2>
            <div className="text-gray-700 text-sm [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-0 [&>p]:mb-3 [&>p>em]:text-gray-500 [&>p>em]:text-xs [&>p>em]:not-italic [&>p>em]:block [&>p>em]:mb-1 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-3 text-justify">
              <ReactMarkdown>{experience}</ReactMarkdown>
            </div>
          </section>
        )}

        {/* Projects */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 mb-4 pb-1">
            Key Projects
          </h2>

          <div className="space-y-5">
            {/* ... mapped projects ... */}
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-gray-900">
                    {project.title}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 font-normal text-xs hover:underline print:text-gray-500 print:no-underline"
                      >
                        {project.link.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </h3>
                </div>
                {project.techStack && (
                  <div className="text-xs text-gray-500 italic mb-1">
                    Tech: {project.techStack}
                  </div>
                )}
                <div className="text-gray-700 text-sm">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p className="mb-1 last:mb-0" {...props} />
                      )
                    }}
                  >
                    {project.fullDescription || project.excerpt}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-6 break-inside-avoid">
          {/* ... */}
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 mb-3 pb-1">
            Education
          </h2>
          <div>
            <div className="flex justify-between font-bold text-gray-900">
              <span>University of the Immaculate Conception</span>
              <span>2018 - 2022</span>
            </div>
            <div>Bachelor of Science in Information Technology</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
