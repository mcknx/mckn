import type { TerminalData } from "~/types";

const terminal: TerminalData[] = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-bio",
        title: "bio.txt",
        type: "file",
        content: (
          <div className="py-1">
            <div>
              About myself I'm a guy who's passionate about both the technical side and
              the user experience. My goal is to create apps that not only perform well
              but also look great, keeping clients satisfied.
            </div>
          </div>
        )
      },
      {
        id: "about-interests",
        title: "interests.txt",
        type: "file",
        content: "ReactJS / TailwindCSS / NodeJS / UX Design"
      },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href="mailto:mcknasma@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                mcknasma@gmail.com
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href="https://github.com/mcknx"
                target="_blank"
                rel="noreferrer"
              >
                @mcknx
              </a>
            </li>
            <li>
              Portfolio:{" "}
              <a
                className="text-blue-300"
                href="https://mckeenasma.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                mckeenasma.vercel.app
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                className="text-blue-300"
                href="tel:+639323900204"
                target="_blank"
                rel="noreferrer"
              >
                +639323900204
              </a>
            </li>
          </ul>
        )
      }
    ]
  },
  {
    id: "about-dream",
    title: "my-dream.cpp",
    type: "file",
    content: (
      <div className="py-1">
        <div>
          <span className="text-yellow-400">while</span>(
          <span className="text-blue-400">sleeping</span>) <span>{"{"}</span>
        </div>
        <div>
          <span className="text-blue-400 ml-9">money</span>
          <span className="text-yellow-400">++</span>;
        </div>
        <div>
          <span>{"}"}</span>
        </div>
      </div>
    )
  }
];

export default terminal;
