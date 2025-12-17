export interface HTMLAudioState {
  volume: number;
  playing: boolean;
}

export interface HTMLAudioProps {
  src: string;
  autoReplay?: boolean;
}

export function useAudio(props: HTMLAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create audio element only once
  if (!audioRef.current) {
    audioRef.current = new Audio(props.src);
  }

  const [state, setState] = useState<HTMLAudioState>({
    volume: 1,
    playing: false
  });

  // Update audio source when it changes
  useEffect(() => {
    const el = audioRef.current;
    if (el && el.src !== props.src) {
      const wasPlaying = !el.paused;
      el.src = props.src;
      el.load();
      if (wasPlaying) {
        el.play().catch(() => {});
      }
      setState((prev) => ({
        ...prev,
        playing: wasPlaying
      }));
    }
  }, [props.src]);

  const controls = {
    play: (): Promise<void> | void => {
      const el = audioRef.current;
      if (el) {
        setState((prev) => ({ ...prev, playing: true }));
        return el.play();
      }
    },

    pause: (): Promise<void> | void => {
      const el = audioRef.current;
      if (el) {
        setState((prev) => ({ ...prev, playing: false }));
        return el.pause();
      }
    },

    toggle: (): Promise<void> | void => {
      const el = audioRef.current;
      if (el) {
        const isPlaying = !el.paused;
        const promise = isPlaying ? el.pause() : el.play();
        setState((prev) => ({ ...prev, playing: !isPlaying }));
        return promise;
      }
    },

    volume: (value: number): void => {
      const el = audioRef.current;
      if (el) {
        value = Math.min(1, Math.max(0, value));
        el.volume = value;
        setState((prev) => ({ ...prev, volume: value }));
      }
    }
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const handler = () => {
      if (props.autoReplay) controls.play();
    };

    el.addEventListener("ended", handler);
    return () => {
      el.removeEventListener("ended", handler);
    };
  }, [props.autoReplay]);

  return [audioRef.current, state, controls, audioRef] as const;
}
