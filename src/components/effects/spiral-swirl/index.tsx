import React, { useEffect } from 'react';
import * as spiralSwirlEffect from './spiral-swirl.js';
import './spiral-swirl.css';
import { useCanvasEffect } from '../../../hooks/useCanvasEffect';

export default function SpiralSwirlEffect() {
  useCanvasEffect(
    spiralSwirlEffect.setupEffect,
    spiralSwirlEffect.clearEffect,
    spiralSwirlEffect.resizeEffect,
  );

  return null;
}
