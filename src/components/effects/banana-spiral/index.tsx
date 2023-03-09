import React from 'react';
import './bezier-field.css'
import { useCanvasEffect } from '../../../hooks/useCanvasEffect';
import * as bananaSpiral from "./banana-spiral.js"

export const BananaSpiral = () => {
  useCanvasEffect(bananaSpiral.setupEffect, bananaSpiral.clearEffect, bananaSpiral.resizeEffect)

  return (
    <div>
    </div>
  );
};
