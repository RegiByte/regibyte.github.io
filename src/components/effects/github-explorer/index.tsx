import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { getUserProfile } from '../../../services/githubService';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { ControlledInput3D } from './ControlledInput3d';
import { GithubUser } from '../../../types/github';
import { GithubProfile } from './GithubProfile';
import { useGithubForm } from './useGithubForm';


const state = {
  top: 0
};

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [axis, setAxis] = useState(
    () => ['x', 'y'][Math.floor(Math.random() * 2)],
  );
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation[axis] += delta));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => {
        setAxis((current) => (current === 'x' ? 'y' : 'x'));
        // setActive(!active);
      }}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export const GithubExplorer = () => {
  const {
    setUser,
    user,
    setUsername,
    username,
    loading,
    setLoading,
    handleSubmit,
  } = useGithubForm('RegiByte');
  const scrollArea = useRef()
  const onScroll = useCallback((e) => {
    state.top = e.target.scrollTop
  }, [])

  return (
    <>
      <div className="absolute h-full w-full top-0 left-0">
        <Canvas
          gl={{ alpha: false }}
          className={'bg-slate-100 h-full w-full'}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />

          <Html transform position={[0, 2.5, -1]}>
            <form
              onSubmit={handleSubmit}
              className="flex gap-2 flex-col md:flex-row">
              <ControlledInput3D
                className="max-w-full px-1"
                placeholder="Username"
                value={username}
                onChange={setUsername}
              />
              <button type="submit" className="px-2 bg-slate-200 rounded">
                Search User
              </button>
            </form>
          </Html>
        </Canvas>
      </div>
    </>
  );
};
