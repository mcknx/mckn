import React from "react";
import { websites, wallpapers } from "~/configs";
import { checkURL } from "~/utils";
import type { SiteSectionData, SiteData } from "~/types";

interface SafariState {
  goURL: string;
  currentURL: string;
}

interface SafariProps {
  width?: number;
}

interface NavProps {
  width: number;
  setGoURL: (url: string) => void;
}

interface NavSectionProps extends NavProps {
  section: SiteSectionData;
}

// Favorite site icons with rounded squares
const favorites = [
  {
    id: "apple",
    title: "Apple",
    img: "img/icons/apple-dark.png",
    link: "https://apple.com"
  },
  {
    id: "icloud",
    title: "iCloud",
    img: "img/icons/apple-dark.png",
    link: "https://icloud.com"
  },
  {
    id: "yahoo",
    title: "Yahoo",
    img: "",
    link: "https://yahoo.com",
    bg: "bg-purple-600",
    text: "yahoo!"
  },
  {
    id: "bing",
    title: "Bing",
    img: "",
    link: "https://bing.com",
    bg: "bg-teal-600",
    text: "B"
  },
  {
    id: "google",
    title: "Google",
    img: "",
    link: "https://google.com",
    bg: "bg-white",
    text: "G"
  },
  {
    id: "wikipedia",
    title: "Wikipedia",
    img: "",
    link: "https://wikipedia.org",
    bg: "bg-white",
    text: "W"
  },
  {
    id: "facebook",
    title: "Facebook",
    img: "",
    link: "https://facebook.com",
    bg: "bg-blue-600",
    text: "f"
  },
  {
    id: "twitter",
    title: "Twitter",
    img: "",
    link: "https://twitter.com",
    bg: "bg-black",
    text: "X"
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    img: "",
    link: "https://linkedin.com",
    bg: "bg-blue-700",
    text: "in"
  }
];

const numTracker = Math.floor(Math.random() * 10 + 1);
const trackerPercent = Math.floor(Math.random() * 40 + 50);

const NavPage = ({ width, setGoURL }: NavProps) => {
  return (
    <div className="w-full safari-content overflow-y-scroll bg-gray-900 text-white">
      <div className="w-full min-h-full py-8 px-6">
        {/* Start Page Banner */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gray-800 rounded-xl p-4 flex items-center gap-4 relative">
            <button className="absolute top-2 left-2 text-gray-500 hover:text-white text-xs">
              ✕
            </button>
            <div className="w-24 h-20 bg-gradient-to-br from-cyan-400 to-orange-300 rounded-lg flex items-center justify-center overflow-hidden">
              <div className="text-xs text-white font-semibold text-center">
                <div>Favorites</div>
                <div>Suggestions</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-lg">Start Page</div>
              <div className="text-gray-400 text-sm">
                Customize your wallpaper and sections that appear when creating new tabs.
              </div>
              <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md">
                Customize Start Page
              </button>
            </div>
          </div>
        </div>

        {/* Favorites */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="font-semibold text-xl mb-4">Favorites</div>
          <div className="flex flex-wrap gap-4">
            {favorites.map((site) => (
              <div
                key={site.id}
                className="flex flex-col items-center w-16 cursor-pointer"
                onClick={() => window.open(site.link)}
              >
                <div
                  className={`size-14 rounded-xl flex items-center justify-center ${site.bg || "bg-gray-700"} shadow-lg`}
                >
                  {site.img ? (
                    <img src={site.img} alt={site.title} className="size-8" />
                  ) : (
                    <span
                      className={`text-lg font-bold ${site.bg === "bg-white" ? "text-black" : "text-white"}`}
                    >
                      {site.text}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1.5 text-gray-300 text-center truncate w-full">
                  {site.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Report */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="font-semibold text-xl mb-4">Privacy Report</div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex gap-6">
              {/* Left side */}
              <div className="flex-1">
                <div className="text-green-400 text-4xl mb-4">
                  <span className="i-ph:shield-check-fill" />
                </div>
                <div className="text-white">
                  Safari prevents trackers from profiling you.
                </div>
                <button className="text-blue-400 text-sm mt-4 hover:underline">
                  Show More
                </button>
              </div>
              {/* Right side - Stats */}
              <div className="flex-1 space-y-3">
                <div className="text-xs text-gray-400">Last 30 days</div>
                <div className="flex gap-3">
                  <div className="flex-1 bg-gray-700 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">
                      Trackers prevented from profiling you
                    </div>
                    <div className="text-2xl font-semibold">{numTracker}</div>
                  </div>
                  <div className="flex-1 bg-gray-700 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">
                      Websites that contacted trackers
                    </div>
                    <div className="text-2xl font-semibold">{trackerPercent}%</div>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Most contacted tracker</div>
                  <div className="text-sm">
                    googletagmanager.com was prevented from profiling you across 2
                    websites
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions placeholder */}
        <div className="max-w-4xl mx-auto">
          <div className="font-semibold text-xl mb-4">Suggestions</div>
          <div className="flex gap-4">
            <div className="w-48 h-28 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl"></div>
            <div className="w-48 h-28 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl"></div>
            <div className="w-48 h-28 bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoInternetPage = () => {
  const dark = useStore((state) => state.dark);

  return (
    <div
      className="w-full safari-content bg-blue-50 overflow-y-scroll bg-center bg-cover"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
    >
      <div className="w-full h-full pb-10 backdrop-blur-2xl flex-center text-c-600 bg-c-100/80">
        <div className="text-center">
          <div className="text-2xl font-bold">You Are Not Connected to the Internet</div>
          <div className="pt-4 text-sm">
            This page can't be displayed because your computer is currently offline.
          </div>
        </div>
      </div>
    </div>
  );
};

const Safari = ({ width }: SafariProps) => {
  const wifi = useStore((state) => state.wifi);
  const [state, setState] = useState<SafariState>({
    goURL: "",
    currentURL: ""
  });

  const setGoURL = (url: string) => {
    const isValid = checkURL(url);

    if (isValid) {
      if (url.substring(0, 7) !== "http://" && url.substring(0, 8) !== "https://")
        url = `https://${url}`;
    } else if (url !== "") {
      url = `https://www.bing.com/search?q=${url}`;
    }

    setState({
      goURL: url,
      currentURL: url
    });
  };

  const pressURL = (e: React.KeyboardEvent) => {
    const keyCode = e.key;
    if (keyCode === "Enter") setGoURL((e.target as HTMLInputElement).value);
  };

  const buttonColor = state.goURL === "" ? "text-c-400" : "text-c-700";
  const grid = (width as number) < 640 ? "grid-cols-2" : "grid-cols-3";
  const hideLast = (width as number) < 640 ? "hidden" : "flex";

  return (
    <div className="w-full h-full">
      {/* browser topbar */}
      <div className={`h-10 grid ${grid} items-center bg-c-white`}>
        <div className="flex px-2">
          <button
            className={`safari-btn w-7 ${buttonColor}`}
            onClick={() => setGoURL("")}
          >
            <span className="i-jam:chevron-left text-xl" />
          </button>
          <button className="safari-btn w-7 text-c-400">
            <span className="i-jam:chevron-right text-xl" />
          </button>
          <button className="safari-btn w-9 ml-3 text-c-700">
            <span className="i-bi:layout-sidebar text-sm" />
          </button>
        </div>
        <div className="hstack space-x-2 px-2">
          <button className="safari-btn w-9 -ml-10 text-c-400">
            <span className="i-fa-solid:shield-alt text-sm" />
          </button>
          <input
            type="text"
            value={state.currentURL}
            onChange={(e) => setState({ ...state, currentURL: e.target.value })}
            onKeyPress={pressURL}
            className="h-6 w-full p-2 rounded font-normal no-outline text-sm text-center text-c-500 bg-c-200"
            border="2 transparent focus:blue-400 dark:focus:blue-500"
            placeholder="Search or enter website name"
          />
        </div>
        <div className={`${hideLast} justify-end space-x-2 px-2`}>
          <button className={`safari-btn w-9 ${buttonColor}`}>
            <span className="i-ion:share-outline" />
          </button>
          <button className="safari-btn w-9 text-c-700">
            <span className="i-ion:copy-outline" />
          </button>
        </div>
      </div>

      {/* browser content */}
      {wifi ? (
        state.goURL === "" ? (
          <NavPage setGoURL={setGoURL} width={width as number} />
        ) : (
          <iframe
            title={"Safari clone browser"}
            src={state.goURL}
            className="safari-content w-full bg-white"
          />
        )
      ) : (
        <NoInternetPage />
      )}
    </div>
  );
};

export default Safari;
