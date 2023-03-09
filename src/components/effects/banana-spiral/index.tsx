import React from 'react';
import './bezier-field.css'
import { useCanvasEffect } from '../../../hooks/useCanvasEffect';
import * as bananaSpiral from "./banana-spiral.js"

export const BananaSpiral = () => {
  useCanvasEffect(bananaSpiral.setupEffect, bananaSpiral.clearEffect, bananaSpiral.resizeEffect)

  return (
    <div className="fixed top-28 z-10 w-full text-center max-w-full px-10">
      <h1 className="text-3xl text-slate-100">100 Bananas spiralling on your screen</h1>
    </div>
  );
};
