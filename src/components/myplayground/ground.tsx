import React from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import {
  CuboidCollider,
  RigidBody,
  type RigidBodyProps,
} from '@react-three/rapier';

interface GroundProps extends RigidBodyProps {}

export const Ground = (props: GroundProps) => {
  const texture = useTexture('/assets/grass.jpg');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return (
    <RigidBody {...props} type={'fixed'} colliders={false}>
      <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial
          /*map={texture}
          map-repeat={[240, 240]}*/
          color={"#77b85f"}
        />
      </mesh>
      <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
    </RigidBody>
  );
};

useTexture.preload('/assets/grass.jpg');
