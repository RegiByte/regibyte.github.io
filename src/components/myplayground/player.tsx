import React, { useRef } from 'react';
import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d-compat';
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
  useRapier,
} from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export const Player = ({ lerp = THREE.MathUtils.lerp }) => {
  const ref = useRef<RAPIER.RigidBody>(null);
  const rapier = useRapier();
  const [, get] = useKeyboardControls();

  useFrame((state) => {
    let player = ref.current;
    if (!player) return;
    const { forward, backward, left, right, jump, sprint } = get();
    const velocity = player.linvel();
    const velocityT = new THREE.Vector3(velocity.x, velocity.y, velocity.z);
    // update camera
    let translation = player.translation();
    state.camera.position.set(translation.x, translation.y, translation.z);
    // movement
    const speedModifier = sprint ? 2 : 1;
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED * speedModifier)
      .applyEuler(state.camera.rotation);
    player.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true);
    // jumping
    const world = rapier.world;
    const ray = world.castRay(
      new RAPIER.Ray(translation, { x: 0, y: -1, z: 0 }),
      1,
      true,
    );
    const grounded = ray && ray.collider && Math.abs(ray.timeOfImpact) <= 1.75;
    if (jump && grounded) player.setLinvel({ x: 0, y: 7.5, z: 0 }, true);
  });
  return (
    <>
      <RigidBody
        ref={ref}
        colliders={false}
        mass={1}
        type="dynamic"
        position={[0, 10, 0]}
        enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[0.75, 0.5]} />
      </RigidBody>

    </>
  );
};
