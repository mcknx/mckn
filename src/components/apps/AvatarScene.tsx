import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, Grid, Html } from "@react-three/drei";
import * as THREE from "three";
import { GoogleGenerativeAI } from "@google/generative-ai";

// -----------------------------------------------------------------------------
// AI Service (Gemini)
// -----------------------------------------------------------------------------
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const callGemini = async (text: string): Promise<string> => {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY.trim());

    // For the free API key (via AI Studio), 'gemini-1.5-flash-latest' works reliably.
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a helpful and cool 3D avatar in a portfolio. Keep answers short (max 2 sentences). User says: ${text}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Gemini Request Failed:", error);

    // Check for specific 404 (Model Not Found)
    if (error.toString().includes("404")) {
      return "Error 404: The model is acting up. It might be region locked or improved.";
    }
    return "I'm connecting to the cloud... try again in a second.";
  }
};

// -----------------------------------------------------------------------------
// 1. Shared State (UI <-> 3D)
// -----------------------------------------------------------------------------
const useVoiceState = () => {
  const [state, setState] = useState({ isListening: false, isSpeaking: false });

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
  const { isListening, isSpeaking } = useVoiceState();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    (window as any).sendTextToAvatar(inputValue);
    setInputValue("");
    setShowInput(false);
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50">
      {/* Text Input Fallback */}
      {showInput && (
        <form
          onSubmit={handleSend}
          className="flex gap-2 bg-black/60 p-2 rounded-full backdrop-blur-md border border-white/20 animate-fade-in-up"
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

      {/* Main Controls */}
      <div className="flex gap-2 items-center">
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
            {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Click to Speak"}
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
    </div>
  );
};

// -----------------------------------------------------------------------------
// 3. Voice Avatar (Inside Canvas)
// -----------------------------------------------------------------------------
const VoiceAvatar = () => {
  // Load ONLY the closed mouth model (Statue Mode)
  const { scene } = useGLTF("/models/avatar.glb");
  const groupRef = useRef<THREE.Group>(null);

  const [isListening, setIsListening] = useState(false);
  const isListeningRef = useRef(false);

  const [transcript, setTranscript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync state to UI
  useEffect(() => {
    isListeningRef.current = isListening;
    window.dispatchEvent(
      new CustomEvent("voice-state-change", {
        detail: { isListening, isSpeaking }
      })
    );
  }, [isListening, isSpeaking]);

  const speakRef = useRef(false);

  useEffect(() => {
    // Response Logic (AI)
    const respond = async (text: string) => {
      const aiResponse = await callGemini(text);
      speak(aiResponse);
    };

    // Speech Recognition Setup
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition API not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (e: any) => {
      console.error("Speech Error:", e);
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      console.log("User said:", text);
      respond(text);
    };

    (window as any).triggerMic = () => {
      if (isListeningRef.current) {
        console.log("Stopping Mic manually...");
        recognition.stop();
      } else {
        console.log("Starting Mic...");
        try {
          recognition.start();
        } catch (e) {
          console.warn("Mic start error (likely already running):", e);
        }
      }
    };

    (window as any).sendTextToAvatar = (text: string) => {
      console.log("Manual text input:", text);
      respond(text);
    };

    return () => {
      recognition.abort();
      delete (window as any).sendTextToAvatar;
    };
  }, []);

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
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

  // Optional: Add a very subtle "breathing" or "listening" idle animation if desired later.
  // For now, it is a pure statue.

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
