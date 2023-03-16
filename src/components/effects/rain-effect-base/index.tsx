import React from 'react';
import { useCanvasEffect } from '../../../hooks/useCanvasEffect';
import * as pixelRainEffect from './pixel-rain.effect';
import './rain-effect.css';
import { EffectControlWrapper } from '../../controls/effects/EffectControlWrapper';

export const PixelRain = () => {
  useCanvasEffect(
    pixelRainEffect.setupEffect,
    pixelRainEffect.clearEffect,
    pixelRainEffect.resizeEffect,
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      pixelRainEffect.onUpdateImage(image);
    }
  }

  return (
    <EffectControlWrapper>
      <div className="flex gap-3 flex-wrap justify-center md:justify-start text-neutral-500 dark:text-neutral-200">
        <input type="file" accept="image/png,image/jpeg" className="border" onChange={handleImageChange}/>
      </div>
    </EffectControlWrapper>
  );
};
