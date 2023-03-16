import React, { useEffect } from 'react';
import * as experimentalEffect from './experimental';
import './experimental.css';
import { useCanvasEffect } from '../../../hooks/useCanvasEffect';

export default function ExperimentalEffect() {
  useCanvasEffect(
    experimentalEffect.setupEffect,
    experimentalEffect.clearEffect,
    experimentalEffect.resizeEffect,
  );

  return null;
}
