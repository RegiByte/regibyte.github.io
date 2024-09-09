import React, { useEffect, useState } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import {
  Html,
  Text,
  OrbitControls,
  PivotControls,
  TransformControls,
  Float,
  MeshReflectorMaterial,
  Outlines,
  KeyboardControls,
  type KeyboardControlsEntry,
  Sky,
  PointerLockControls,
} from '@react-three/drei';
import {
  ACESFilmicToneMapping,
  BufferGeometry,
  CineonToneMapping,
  DoubleSide,
  Euler,
  Group,
  Mesh,
} from 'three';
import './shell.css';
import { Physics } from '@react-three/rapier';
import { Ground } from '@components/myplayground/ground.tsx';
import { Player } from '@components/myplayground/player.tsx';

export const Shell = () => {
  return (
    <>
      <ShellControls>
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            toneMapping: ACESFilmicToneMapping,
          }}
          shadows
          camera={{
            fov: 45,
            // zoom: 100,
          }}>
          <Experience />
          <PointerLockControls />
        </Canvas>
      </ShellControls>
    </>
  );
};

const controls: KeyboardControlsEntry<string>[] = [
  {
    name: 'forward',
    keys: ['ArrowUp', 'w'],
  },
  {
    name: 'backward',
    keys: ['ArrowDown', 's'],
  },
  {
    name: 'left',
    keys: ['ArrowLeft', 'a'],
  },
  {
    name: 'right',
    keys: ['ArrowRight', 'd'],
  },
  {
    name: 'jump',
    keys: ['Space'],
  },
  {
    name: 'sprint',
    keys: ['ShiftLeft'],
  }
];

const ShellControls = ({ children }: { children: React.ReactNode }) => {
  return <KeyboardControls map={controls}>{children}</KeyboardControls>;
};

const Experience = () => {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={2.3} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Ground />
        <Player />
      </Physics>
    </>
  );
};
