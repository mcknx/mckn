import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, Grid, Html } from "@react-three/drei";
import * as THREE from "three";

// -----------------------------------------------------------------------------
// Personal Context (Embedded from about-me.md)
// -----------------------------------------------------------------------------
const PERSONAL_CONTEXT = `# About Me

## Biography
Hey there! I am **McKeen Asma**, a **Software Developer** based in **Davao City, Philippines**.

I'm a guy who's passionate about both the technical side and the user experience. My goal is to create apps that not only perform well but also look great, keeping clients satisfied. I've got skills in animation, complex layouts, and I'm eager to learn 3D designs. I've been using AI tools since ChatGPT came out, and lately, I've found Claude AI particularly helpful in my development work.

## Skills
### Core
- ReactJS, TailwindCSS, HTML5, CSS3, Javascript, MongoDB, React Native, NodeJS, Rest API

### Other
- ExpressJS, NextJS, Redux, C#, Laravel, Python, Angular, VueJS, Material UI, Git, Github

## Experience
- **Full Stack Developer @ Faithful Development** (April 2024 - Present) - Web, Mobile and Backend solutions
- **Frontend Developer @ Steelx Pty Ltd** (Nov 2022 - April 2024) - SVG shed layout renderer, workflow designer using ReactJS, TailwindCSS, C#
- **Frontend Developer @ Tactiv Studios** (April 2022 - Nov 2022) - Figma to code, ReactJS, Angular
- **Full Stack Developer @ WAL Software Solutions** (April 2021 - April 2022) - Trial Pulse, OneStopSnap, Sureplus, Sliver projects

## Education
- **Bachelor of Science in Information Technology** - University of the Immaculate Conception (2018-2022)

## Contact
- Email: mcknasma@gmail.com
- Github: mcknx
- Portfolio: mckeenasma.vercel.app
`;

// -----------------------------------------------------------------------------
// AI Service (Groq with DeepSeek)
// -----------------------------------------------------------------------------
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

const callGroq = async (
  text: string,
  systemContext: string = ""
): Promise<{ transcript: string; response: string }> => {
  if (!GROQ_API_KEY) {
    console.error("❌ Missing VITE_GROQ_API_KEY in .env file");
    return {
      transcript: text,
      response: "Configuration Error: Missing Groq API Key. Please check your .env file."
    };
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        // DeepSeek R1 Distill is available on Groq
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are the digital persona of McKeen Asma. 
Use the following MARKDOWN CONTEXT to answer questions about yourself, your skills, and your experience.
If the answer is not in the context, say you don't know, but be creative/friendly.

CONTEXT:
${systemContext}

RULES:
1. You ARE McKeen Asma. Speak in the first person ("I").
2. Keep answers short (max 2 sentences) and conversational.
3. If asked to open an app, use [[OPEN:app_id]].
4. Output raw text only.`
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.6,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Groq API Error (${response.status}):`, errorText);
      return {
        transcript: text,
        response: `API Error: ${response.status} - Check console for details.`
      };
    }

    const data = await response.json();
    let aiText = data.choices[0]?.message?.content || "";

    // Clean up DeepSeek's "thinking" logs (<think>...</think>)
    aiText = aiText.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

    return {
      transcript: text,
      response: aiText
    };
  } catch (error) {
    console.error("Groq connection failed:", error);
    return {
      transcript: text,
      response:
        "I'm having trouble connecting to the cloud. Check your internet or API key."
    };
  }
};

// -----------------------------------------------------------------------------
// TTS Service (Speechify - Direct HTTP)
// -----------------------------------------------------------------------------
const SPEECHIFY_API_KEY = import.meta.env.VITE_SPEECHIFY_API_KEY || "";

const callSpeechify = async (text: string): Promise<string | null> => {
  if (!SPEECHIFY_API_KEY) {
    return null;
  }

  try {
    const response = await fetch("https://api.sws.speechify.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SPEECHIFY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: text,
        voice_id: "9d9f6ae3-a407-4e75-bd73-8237f10435e1",
        model: "simba-english"
      })
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Decode Base64 audio_data to Blob
    const binaryString = window.atob(data.audio_data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "audio/mpeg" });
    return URL.createObjectURL(blob);
  } catch (error) {
    return null;
  }
};

// -----------------------------------------------------------------------------
// 1. Shared State (UI <-> 3D)

// -----------------------------------------------------------------------------
const useVoiceState = () => {
  const [state, setState] = useState({
    isListening: false,
    isSpeaking: false,
    transcript: "",
    error: null as string | null,
    userSubtitle: "",
    avatarSubtitle: ""
  });

  useEffect(() => {
    const handle = (e: any) => setState(e.detail);
    window.addEventListener("voice-state-change", handle);
    return () => window.removeEventListener("voice-state-change", handle);
  }, []);

  return state;
};

// -----------------------------------------------------------------------------
// 2. UI Overlay (Outside Canvas)
// -----------------------------------------------------------------------------
const VoiceOverlay = () => {
  const { isListening, isSpeaking, transcript, error, userSubtitle, avatarSubtitle } =
    useVoiceState();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Auto-show input if voice fails
  useEffect(() => {
    if (error) setShowInput(true);
  }, [error]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    (window as any).sendTextToAvatar(inputValue);
    setInputValue("");
    setShowInput(false);
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50 w-full max-w-md pointer-events-none">
      {/* Subtitle Container */}
      <div className="flex flex-col gap-2 w-full max-w-[90%] mb-4">
        {/* User Subtitle (what user said) */}
        {userSubtitle && (
          <div className="animate-fade-in-up px-4 py-2 bg-cyan-500/20 backdrop-blur-md rounded-2xl text-cyan-300 text-sm font-medium shadow-lg border border-cyan-400/30 text-right self-end">
            <span className="text-cyan-400/60 text-xs mr-2">You:</span>
            {userSubtitle}
          </div>
        )}

        {/* Avatar Subtitle (AI response) */}
        {avatarSubtitle && (
          <div className="animate-fade-in-up px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl text-white/90 text-sm font-medium shadow-lg border border-white/10 text-left self-start">
            <span className="text-white/50 text-xs mr-2">McKeen:</span>
            {avatarSubtitle}
          </div>
        )}
      </div>

      {/* Recording Indicator */}
      {isListening && (
        <div className="animate-fade-in-up mb-4 px-4 py-2 bg-red-500/80 backdrop-blur-md rounded-2xl text-white text-lg font-medium shadow-lg border border-red-400 text-center flex items-center gap-2">
          <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
          Recording Audio...
        </div>
      )}

      {/* Text Input Fallback */}
      {showInput && (
        <form
          onSubmit={handleSend}
          className="flex gap-2 bg-black/60 p-2 rounded-full backdrop-blur-md border border-white/20 animate-fade-in-up pointer-events-auto"
        >
          <input
            autoFocus
            type="text"
            className="bg-transparent text-white px-3 py-1 outline-none min-w-[200px]"
            placeholder="Type something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-white/20 hover:bg-white/40 text-black px-3 py-1 rounded-full text-white transition-colors"
          >
            Send
          </button>
        </form>
      )}

      {/* Error Alert */}
      {error && (
        <div className="bg-red-500/90 text-white px-4 py-2 rounded-lg backdrop-blur-md shadow-lg border border-red-400 text-sm font-medium animate-bounce pointer-events-auto">
          ⚠️ {error}
        </div>
      )}

      {/* Main Controls */}
      <div className="flex gap-2 items-center pointer-events-auto">
        <div
          className={`px-6 py-3 rounded-full text-white cursor-pointer transition-all border select-none flex items-center gap-3 whitespace-nowrap shadow-xl ${
            isListening
              ? "bg-red-500 border-red-400 animate-pulse"
              : "bg-black/60 hover:bg-white/20 border-white/20 backdrop-blur-md"
          }`}
          onClick={() => (window as any).triggerMic()}
        >
          <span
            className={`text-xl ${isListening ? "i-svg-spinners:pulse-2" : "i-ph:microphone-fill"}`}
          />
          <span className="text-sm font-bold tracking-wide">
            {isListening ? "Stop & Send" : isSpeaking ? "Speaking..." : "Click to Speak"}
          </span>
        </div>

        {/* Keyboard Toggle */}
        <div
          className="w-12 h-12 rounded-full bg-black/60 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white flex items-center justify-center cursor-pointer transition-all active:scale-95"
          onClick={() => setShowInput(!showInput)}
          title="Type Message"
        >
          <span className="text-xl i-ph:keyboard-fill" />
        </div>
      </div>

      {/* Helper Tip */}
      <div className="text-white/60 text-xs font-medium tracking-wide bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 whitespace-nowrap pointer-events-auto">
        Tip: Say "Open Safari" (Click again to stop)
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 3. Voice Avatar (Inside Canvas)
// -----------------------------------------------------------------------------
const VoiceAvatar = () => {
  const { scene } = useGLTF("/models/avatar.glb");
  const groupRef = useRef<THREE.Group>(null);

  // State
  const [isListening, setIsListening] = useState(false);
  const isListeningRef = useRef(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userSubtitle, setUserSubtitle] = useState("");
  const [avatarSubtitle, setAvatarSubtitle] = useState("");

  // Personal Context State
  const [personalContext, setPersonalContext] = useState(PERSONAL_CONTEXT);

  // Fetch Personal Context
  useEffect(() => {
    fetch("/markdown/about-me.md")
      .then((res) => res.text())
      .then((text) => {
        setPersonalContext(text);
      })
      .catch((err) => console.error("Failed to load context:", err));
  }, []);

  // Sync state to UI
  useEffect(() => {
    isListeningRef.current = isListening;
    window.dispatchEvent(
      new CustomEvent("voice-state-change", {
        detail: {
          isListening,
          isSpeaking,
          transcript,
          error: errorMessage,
          userSubtitle,
          avatarSubtitle
        }
      })
    );
  }, [isListening, isSpeaking, transcript, errorMessage, userSubtitle, avatarSubtitle]);

  const speakRef = useRef(false);
  // Ref to hold transcript for access inside closures/callbacks
  const transcriptRef = useRef("");

  useEffect(() => {
    // Response Logic (AI)
    const respond = async (text: string) => {
      if (!text.trim()) return;

      setUserSubtitle(text);
      setAvatarSubtitle("...");

      const { response: aiResponse } = await callGroq(text, personalContext);

      // Check for OPEN command
      const openMatch = aiResponse.match(/\[\[OPEN:(\w+)\]\]/);
      let spokenText = aiResponse;

      if (openMatch) {
        const appId = openMatch[1];
        window.dispatchEvent(new CustomEvent("open-app", { detail: { id: appId } }));
        spokenText = aiResponse.replace(/\[\[OPEN:\w+\]\]/, "").trim();
      }

      setAvatarSubtitle(spokenText);
      speak(spokenText);
    };

    // Initialize Speech Recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    let recognition: any = null;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const currentTranscript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");

        // Update state for UI
        setTranscript(currentTranscript);
        // Update ref for logic
        transcriptRef.current = currentTranscript;
      };

      recognition.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        if (event.error === "not-allowed") {
          setErrorMessage("Mic access denied.");
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      setErrorMessage("Browser doesn't support Speech API.");
    }

    // Microphone Handler (Web Speech API)
    (window as any).triggerMic = () => {
      if (!recognition) return;

      if (isListeningRef.current) {
        // STOP & SEND
        recognition.stop();
        setIsListening(false); // Force state update immediately

        // Send the tracked transcript
        if (transcriptRef.current.trim()) {
          respond(transcriptRef.current);
        }
      } else {
        // START
        setTranscript("");
        transcriptRef.current = "";
        setErrorMessage(null);
        try {
          recognition.start();
          setIsListening(true);
        } catch (e) {
          console.error("Failed to start recognition:", e);
        }
      }
    };

    // Text Fallback Handler
    (window as any).sendTextToAvatar = (text: string) => {
      respond(text);
    };

    return () => {
      if (recognition) recognition.stop();
      delete (window as any).sendTextToAvatar;
      delete (window as any).triggerMic;
    };
  }, []);

  const speak = async (text: string) => {
    setIsSpeaking(true);
    speakRef.current = true;

    // 1. Try Speechify (Cloned Voice)
    const audioUrl = await callSpeechify(text);
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.onended = () => {
        setIsSpeaking(false);
        speakRef.current = false;
        URL.revokeObjectURL(audioUrl); // Cleanup
      };
      audio.play().catch((e) => {
        console.error("Audio Playback Error:", e);
        setIsSpeaking(false);
      });
      return; // Exit if successful
    }

    // 2. Fallback: Browser Native TTS
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.name.includes("Google") || v.name.includes("Samantha")
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => {
      setIsSpeaking(true);
      speakRef.current = true;
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      speakRef.current = false;
    };
    window.speechSynthesis.speak(utterance);
  };

  return <primitive object={scene} ref={groupRef} />;
};

// -----------------------------------------------------------------------------
// 4. Camera Rig (Subtle Parallax)
// -----------------------------------------------------------------------------
function CameraRig() {
  useFrame((state) => {
    // Read mouse position (-1 to 1)
    const x = state.mouse.x;
    const y = state.mouse.y;

    // Smoothly interpolate camera position
    // Base position: [0, 0, 5.6]
    // Move x by +/- 0.5
    // Move y by +/- 0.2
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      x * 0.5,
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      y * 0.2,
      0.05
    );

    // Always look at center (the face)
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// -----------------------------------------------------------------------------
// 5. Main Scene (Default Export)
// -----------------------------------------------------------------------------
export default function AvatarScene() {
  return (
    // This div acts as the "Window Content". It fills 100% of the parent window.
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#111",
        position: "relative"
      }}
    >
      <Canvas dpr={[1, 2]} camera={{ fov: 35, position: [0, 0, 5.6] }}>
        <color attach="background" args={["#111"]} />

        <Suspense fallback={null}>
          {/* Stage handles lighting and centers your model automatically */}
          <Stage environment="city" intensity={0.5} shadows={false}>
            <VoiceAvatar />
          </Stage>
        </Suspense>

        <Grid
          renderOrder={-1}
          position={[0, -0.5, 0]}
          infiniteGrid
          cellSize={0.4}
          sectionSize={2}
          fadeDistance={20}
          sectionColor="#555"
          cellColor="#222"
        />

        <CameraRig />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>

      {/* UI Overlay sits on top of Canvas */}
      <VoiceOverlay />
    </div>
  );
}
