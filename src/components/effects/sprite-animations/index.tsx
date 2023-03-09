import React from 'react';
import './sprite-animations.css';
import { useCanvasEffect } from '../../../hooks/useCanvasEffect';
import * as spriteAnimations from './sprite-animations.js';
import mandrakeImg from './assets/mandrake.png';

export const SpriteAnimations = () => {
  useCanvasEffect(spriteAnimations.setupEffect, spriteAnimations.clearEffect, spriteAnimations.resizeEffect);

  return (
    <>
      <img src={mandrakeImg} alt="Mandrage spritesheet" className="hidden" />

      <div className="fixed flex items-end bottom-0 left-0 z-10 h-8 w-full px-10 md:bottom-6">
        <div className='flex w-full flex-wrap mb-4 md:mb-0 justify-center gap-3 rounded dark:bg-zinc-800/90 bg-slate-100 px-4 py-3 md:justify-between'>
          {/** Left */}
          <div className="flex gap-3 flex-wrap justify-center md:justify-start text-neutral-500 dark:text-neutral-200">
            <p>Play Animation</p>
            <input type="radio" name="animation" id="all" checked />
            <label htmlFor="all">All</label>

            <input type="radio" name="animation" id="grow" />
            <label htmlFor="grow">Grow</label>

            <input type="radio" name="animation" id="wink" />
            <label htmlFor="wink">Wink</label>

            <input type="radio" name="animation" id="float" />
            <label htmlFor="float">Float</label>

            <input type="radio" name="animation" id="hide" />
            <label htmlFor="hide">Hide</label>
          </div>
        </div>
      </div>
    </>
  );
};
