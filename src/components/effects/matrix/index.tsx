import React, { useEffect } from 'react';
import * as matrixEffect from './matrix.js';
import './matrix.css';
import { useCanvasEffect } from '../../../hooks/useCanvasEffect';

export default function MatrixEffect() {
  useCanvasEffect(
    matrixEffect.setupEffect,
    matrixEffect.clearEffect,
    matrixEffect.resizeEffect,
  );

  return null;
}
