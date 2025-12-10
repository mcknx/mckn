import { useEffect } from "react";
import useSound from "use-sound";
import { useStore } from "~/stores";

const SoundManager = () => {
  const { volume } = useStore((state) => ({
    volume: state.volume
  }));

  const [playClick] = useSound("/sounds/click.mp3", {
    volume: 0.5
  });

  const [playType] = useSound("/sounds/typing.mp3", {
    volume: 0.25,
    interrupt: true
  });

  useEffect(() => {
    const handleMouseDown = () => {
      // Slightly different pitch for mouse too
      // Range: 0.95 - 1.05
      const randomRate = 0.95 + Math.random() * (1.05 - 0.95);
      playClick({ playbackRate: randomRate });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore modifier keys to avoid spamming sounds
      if (
        ["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab", "Escape"].includes(e.key)
      ) {
        return;
      }

      // Randomize pitch between 0.9 and 1.1 to sound "real"
      const randomRate = 0.9 + Math.random() * (1.1 - 0.9);
      playType({ playbackRate: randomRate });
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playClick, playType]);

  return null;
};

export default SoundManager;
