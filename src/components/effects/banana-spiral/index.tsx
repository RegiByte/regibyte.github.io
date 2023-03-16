import React from 'react';
import './banana-spiral.css';
import { useCanvasEffect } from '../../../hooks/useCanvasEffect';
import * as bananaSpiral from './banana-spiral.js';
import { BananaEffectControls } from './controls';

export const BananaSpiral = () => {
  useCanvasEffect(
    bananaSpiral.setupEffect,
    bananaSpiral.clearEffect,
    bananaSpiral.resizeEffect,
  );

  const [bananasCount, setBananasCount] = React.useState(50);

  const handleBananasCountChange = (bananasCount: number) => {
    setBananasCount(bananasCount)
    bananaSpiral.onUpdateBananasCount(bananasCount)
  }

  return (
    <>
      <div className="fixed top-28 z-10 w-full text-center max-w-full px-10">
        <h1 className="text-3xl text-slate-100">
          {bananasCount} Bananas spiralling on your screen
        </h1>
      </div>

      <BananaEffectControls
        bananasCount={bananasCount}
        setBananasCount={handleBananasCountChange}
      />
    </>
  );
};
