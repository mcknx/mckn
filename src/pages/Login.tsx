import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { wallpapers, user } from "~/configs";
import type { MacActions } from "~/types";
import { useStore } from "~/stores";

export default function Login(props: MacActions) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const dark = useStore((state) => state.dark);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Enter key to login
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        props.setLogin(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [props]);

  return (
    <div
      className="size-full flex flex-col items-center justify-between py-16 cursor-pointer"
      style={{
        background: `url(${
          dark ? wallpapers.night : wallpapers.day
        }) center/cover no-repeat`
      }}
      onClick={() => props.setLogin(true)}
    >
      {/* Top: Date and Time */}
      <div className="text-center text-white mt-8">
        <div className="text-xl font-light tracking-wide opacity-90">
          {format(currentTime, "EEE MMM d")}
        </div>
        <div className="text-8xl font-extralight tracking-tight mt-1">
          {format(currentTime, "h:mm")}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom: User Avatar and Name */}
      <div className="text-center mb-8">
        <img
          className="rounded-full size-16 mx-auto border-2 border-white/20"
          src={user.avatar}
          alt={user.name}
        />
        <div className="text-white text-sm font-medium mt-2 opacity-90">
          {user.name.toLowerCase().replace(" ", "")}
        </div>
        <div className="text-white/60 text-xs mt-1">Touch ID or Enter Password</div>
      </div>
    </div>
  );
}
