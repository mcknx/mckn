import { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeExternalLinks from "rehype-external-links";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import bear from "~/configs/bear";
import type { BearMdData } from "~/types";

interface ContentProps {
  contentID: string;
  contentURL: string;
}

interface MiddlebarProps {
  items: BearMdData[];
  cur: number;
  setContent: (id: string, url: string, index: number) => void;
}

interface SidebarProps {
  cur: number;
  setMidBar: (items: BearMdData[], index: number) => void;
}

interface NotesState extends ContentProps {
  curSidebar: number;
  curMidbar: number;
  midbarList: BearMdData[];
}

const Highlighter = (dark: boolean): any => {
  interface codeProps {
    node: any;
    inline: boolean;
    className: string;
    children: any;
  }

  return {
    code({ node, inline, className, children, ...props }: codeProps) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={dark ? dracula : prism}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      );
    }
  };
};

const Sidebar = ({ cur, setMidBar }: SidebarProps) => {
  return (
    <div className="text-white">
      <div className="h-12 pr-3 flex items-center justify-end space-x-3">
        <span className="i-ph:sidebar-simple text-gray-400 text-lg cursor-pointer hover:text-white" />
      </div>
      <ul>
        {bear.map((item, index) => (
          <li
            key={`notes-sidebar-${item.id}`}
            className={`pl-4 py-2 flex items-center gap-2 cursor-pointer ${
              cur === index ? "bg-yellow-600/40 text-yellow-400" : "hover:bg-gray-700"
            }`}
            onClick={() => setMidBar(item.md, index)}
          >
            <span className={item.icon} />
            <span className="text-sm">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Middlebar = ({ items, cur, setContent }: MiddlebarProps) => {
  return (
    <div className="py-2">
      {items.map((item: BearMdData, index: number) => (
        <div
          key={`notes-midbar-${item.id}`}
          className={`px-3 py-3 cursor-pointer border-l-2 ${
            cur === index
              ? "border-yellow-500 bg-gray-900"
              : "border-transparent hover:bg-gray-800"
          }`}
          onClick={() => setContent(item.id, item.file, index)}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={`${item.icon} text-gray-400`} />
            <span className="font-semibold text-sm text-white truncate flex-1">
              {item.title}
            </span>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="i-ph:arrow-square-out text-sm" />
              </a>
            )}
          </div>
          <div className="text-xs text-gray-500 line-clamp-2">{item.excerpt}</div>
        </div>
      ))}
    </div>
  );
};

const getRepoURL = (url: string) => {
  return url.slice(0, -10) + "/";
};

const fixImageURL = (text: string, contentURL: string): string => {
  text = text.replace(/&nbsp;/g, "");
  if (contentURL.indexOf("raw.githubusercontent.com") !== -1) {
    const repoURL = getRepoURL(contentURL);

    const imgReg = /!\[(.*?)\]\((.*?)\)/;
    const imgRegGlobal = /!\[(.*?)\]\((.*?)\)/g;

    const imgList = text.match(imgRegGlobal);

    if (imgList) {
      for (const img of imgList) {
        const imgURL = (img.match(imgReg) as Array<string>)[2];
        if (imgURL.indexOf("http") !== -1) continue;
        const newImgURL = repoURL + imgURL;
        text = text.replace(imgURL, newImgURL);
      }
    }
  }
  return text;
};

const Content = ({ contentID, contentURL }: ContentProps) => {
  const [storeMd, setStoreMd] = useState<{ [key: string]: string }>({});
  const dark = useStore((state) => state.dark);

  const fetchMarkdown = useCallback(
    (id: string, url: string) => {
      if (!storeMd[id]) {
        fetch(url)
          .then((response) => response.text())
          .then((text) => {
            storeMd[id] = fixImageURL(text, url);
            setStoreMd({ ...storeMd });
          })
          .catch((error) => console.error(error));
      }
    },
    [storeMd]
  );

  useEffect(() => {
    fetchMarkdown(contentID, contentURL);
  }, [contentID, contentURL, fetchMarkdown]);

  return (
    <div className="markdown w-full max-w-3xl mx-auto px-6 py-6 text-gray-100">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeKatex,
          [rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }]
        ]}
        components={Highlighter(dark as boolean)}
      >
        {storeMd[contentID]}
      </ReactMarkdown>
    </div>
  );
};

export default function Typora() {
  const [state, setState] = useState<NotesState>({
    curSidebar: 0,
    curMidbar: 0,
    midbarList: bear[0].md,
    contentID: bear[0].md[0].id,
    contentURL: bear[0].md[0].file
  });

  const setMidBar = (items: BearMdData[], index: number) => {
    setState({
      curSidebar: index,
      curMidbar: 0,
      midbarList: items,
      contentID: items[0].id,
      contentURL: items[0].file
    });
  };

  const setContent = (id: string, url: string, index: number) => {
    setState({
      ...state,
      curMidbar: index,
      contentID: id,
      contentURL: url
    });
  };

  return (
    <div className="bear flex h-full bg-gray-900 text-white font-sans">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:flex w-44 bg-gray-800 border-r border-gray-700 flex-col">
        <Sidebar cur={state.curSidebar} setMidBar={setMidBar} />
      </div>

      {/* Middle - Note List - hidden on small screens */}
      <div
        className="hidden sm:block w-60 bg-gray-850 border-r border-gray-700 overflow-y-auto"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <div className="h-10 flex items-center justify-between px-3 border-b border-gray-700">
          <span className="font-semibold text-sm">Notes</span>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="i-ph:pencil-simple-line text-lg cursor-pointer hover:text-white" />
          </div>
        </div>
        <Middlebar
          items={state.midbarList}
          cur={state.curMidbar}
          setContent={setContent}
        />
      </div>

      {/* Right - Content - always visible */}
      <div className="flex-1 overflow-y-auto bg-gray-900">
        <Content contentID={state.contentID} contentURL={state.contentURL} />
      </div>
    </div>
  );
}
