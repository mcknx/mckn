import { appBarHeight } from "~/utils";
import type { AppsData } from "~/types";
import AvatarApp from "~/components/apps/AvatarApp";
import Resume from "~/components/apps/Resume";

const apps: AppsData[] = [
  // {
  //   id: "launchpad",
  //   title: "Launchpad",
  //   desktop: false,
  //   img: "img/icons/launchpad.png"
  // },
  {
    id: "typora",
    title: "Notes",
    desktop: true,
    width: 1300,
    height: 650,
    show: true,
    x: -200,
    img: "img/icons/typora.png",
    content: <Typora />
  },
  {
    id: "safari",
    title: "Safari",
    desktop: true,
    width: 1024,
    minWidth: 375,
    minHeight: 200,
    img: "img/icons/safari.png",
    content: <Safari />
  },
  {
    id: "vscode",
    title: "VSCode",
    desktop: true,
    width: 900,
    height: 600,
    img: "img/icons/vscode.png",
    content: <VSCode />
  },
  {
    id: "facetime",
    title: "FaceTime",
    desktop: true,
    img: "img/icons/facetime.png",
    width: 500 * 1.7,
    height: 500 + appBarHeight,
    minWidth: 350 * 1.7,
    minHeight: 350 + appBarHeight,
    aspectRatio: 1.7,
    content: <FaceTime />
  },
  {
    id: "terminal",
    title: "Terminal",
    desktop: true,
    img: "img/icons/terminal.png",
    content: <Terminal />
  },
  {
    id: "github",
    title: "Github",
    desktop: false,
    img: "img/icons/github.png",
    link: "https://github.com/mcknx"
  },
  {
    id: "avatar",
    title: "Avatar",
    desktop: true,
    width: 500,
    height: 550,
    show: true,
    x: 400,
    img: "img/photo/avatar_3d.png",
    content: <AvatarApp />
  },
  {
    id: "resume",
    title: "Resume",
    desktop: true,
    width: 900,
    height: 800,
    show: false,
    img: "img/icons/launchpad/resume.png",
    content: <Resume />
  }
];

export default apps;
