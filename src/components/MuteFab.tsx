import { useStore } from "~/stores";

export default function MuteFab() {
  const { volume, setVolume } = useStore((state) => ({
    volume: state.volume,
    setVolume: state.setVolume
  }));

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(100);
    }
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed top-12 right-4 z-50 p-2 bg-gray-800/80 hover:bg-gray-700/90 backdrop-blur-md rounded-full text-white shadow-lg transition-all"
      title={volume > 0 ? "Mute Music" : "Unmute Music"}
    >
      {volume > 0 ? (
        <span className="i-ph:speaker-high-fill text-xl" />
      ) : (
        <span className="i-ph:speaker-slash-fill text-xl" />
      )}
    </button>
  );
}
