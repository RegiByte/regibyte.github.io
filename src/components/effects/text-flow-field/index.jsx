import React, { useEffect } from 'react';
import './text-flow-field.css';
import * as effect from './text-flow-field';
import { useCanvasEffect } from '../../../hooks/useCanvasEffect';
import { TextEffectControl } from './TextEffectControl';

export default function TextFlowFieldEffect() {
  useCanvasEffect(effect.setupEffect, effect.clearEffect, effect.resizeEffect);

  return (
    <TextEffectControl
      onChangeColors={effect.onEffectColorsChange}
      onChange={effect.onEffectTextChange}
    />
  );
}
