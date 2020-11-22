import React from "react";
import { Canvas } from "react-three-fiber";
import { Color } from "three";
import { extend } from "react-three-fiber";

interface Props {
  children: React.ReactNode;
}

export function Game({ children }: Props) {
  return (
    <Canvas
      gl={{ antialias: false }}
      orthographic
      camera={{
        zoom: 10,
        position: [0, -100, 0], //[0, -100, 0],
        up: [0, 0, 1],
        far: 1000
      }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(new Color("#000"));
      }}
    >
      {children}
    </Canvas>
  );
}
