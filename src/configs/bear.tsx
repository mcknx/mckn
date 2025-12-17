import type { BearData } from "~/types";

const bear: BearData[] = [
  {
    id: "profile",
    title: "Profile",
    icon: "i-ph:user-circle-fill",
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: "i-ph:user-fill",
        excerpt: "Passionate and dedicated software developer with a strong..."
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: "i-icon-park-outline:github",
        excerpt: "Here are some status about my github account..."
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: "i-ph:globe-fill",
        excerpt: "Something about this personal portfolio site..."
      }
    ]
  },
  {
    id: "project",
    title: "Projects",
    icon: "i-ph:code-fill",
    md: [
      {
        id: "svg-shed-layout",
        title: "SVG Shed Layout",
        file: "markdown/svg-shed-layout.md",
        icon: "i-mdi:drawing-box",
        excerpt: "Sophisticated SVG Shed Layout Renderer utilizing svg elements...",
        link: "https://github.com/mcknx"
      },
      {
        id: "workflow-designer",
        title: "Workflow Designer",
        file: "markdown/workflow-designer.md",
        icon: "i-carbon:flow-stream",
        excerpt: "Flow chart creation and visualization using Socket.io...",
        link: "https://github.com/mcknx"
      },
      {
        id: "ulayaw-chatbot",
        title: "Ulayaw Chatbot",
        file: "markdown/ulayaw-chatbot.md",
        icon: "i-bx:bot",
        excerpt: "Web-based chatbot that assesses suicidal behaviors...",
        link: "http://ulayaw.herokuapp.com"
      },
      {
        id: "sliver-nft",
        title: "Sliver NFT Game",
        file: "markdown/sliver-nft-game.md",
        icon: "i-ri:sword-fill",
        excerpt: "Multi-platform 1v1 battle game and NFT ecosystem...",
        link: "http://sliver.world"
      },
      {
        id: "sarwisi",
        title: "Sarwisi",
        file: "markdown/sarwisi.md",
        icon: "i-fa-solid:tools",
        excerpt: "Web platform connecting trusted taskers with local needs...",
        link: "http://sarwisi.com"
      },
      {
        id: "sureplus-market",
        title: "Sureplus Market",
        file: "markdown/sureplus-market.md",
        icon: "i-mdi:fruit-cherries",
        excerpt: "Social enterprise reducing food waste by reselling surplus food...",
        link: "http://sureplus.net"
      },
      {
        id: "faithful-word",
        title: "Faithful Word",
        file: "markdown/faithful-word.md",
        icon: "i-fa-solid:bible",
        excerpt: "Platform offering over 10,000 Bible-based video and audio files...",
        link: "https://github.com/mcknx"
      },
      {
        id: "trial-pulse",
        title: "Trial Pulse",
        file: "markdown/trial-pulse.md",
        icon: "i-medical-icon:clinical-fe",
        excerpt: "Connects participants with clinical studies...",
        link: "https://github.com/mcknx"
      },
      {
        id: "onestopsnap",
        title: "OneStopSnap",
        file: "markdown/onestopsnap.md",
        icon: "i-mdi:shopping",
        excerpt: "Online shopping featuring restaurant listings and products...",
        link: "https://github.com/mcknx"
      }
    ]
  }
];

export default bear;
