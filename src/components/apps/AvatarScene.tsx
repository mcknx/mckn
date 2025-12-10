import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, Grid } from "@react-three/drei";

// 1. The Model Loader
function AvatarModel() {
  // Ensure the path matches where you put the file in /public
  const { scene } = useGLTF("/models/avatar.glb");
  return <primitive object={scene} />;
}

// 2. The Scene Setup
export default function AvatarScene() {
  return (
    // This div acts as the "Window Content". It fills 100% of the parent window.
    <div style={{ width: "100%", height: "100%", backgroundColor: "#111" }}>
      <Canvas dpr={[1, 2]} camera={{ fov: 40, position: [0, 0, 5] }}>
        <color attach="background" args={["#111"]} />

        <Suspense fallback={null}>
          {/* Stage handles lighting and centers your model automatically */}
          <Stage environment="city" intensity={0.5} contactShadow={false}>
            <AvatarModel />
          </Stage>
        </Suspense>

        {/* The Retro Grid Floor */}
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

        {/* Allow user to rotate the model */}
        <OrbitControls autoRotate autoRotateSpeed={-0.5} enableZoom={true} makeDefault />
      </Canvas>
    </div>
  );
}
