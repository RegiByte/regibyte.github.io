import React from 'react';
// a component that will be used to control the banana effect
// it will show a slider to control the number of bananas
// and a button to reset the effect

interface BananaEffectControlsProps {
  bananasCount: number;
  setBananasCount: (value: number) => void;
}

export const BananaEffectControls = ({ bananasCount, setBananasCount }) => {
  return (
    <div className={`fixed flex items-end bottom-0 left-0 z-10 h-8 w-full px-10 md:bottom-6`}>
      <div className='flex w-full flex-wrap mb-4 md:mb-0 justify-center gap-3 rounded dark:bg-zinc-800/90 bg-slate-100 px-4 py-3 md:justify-between'>
        <div className="flex justify-center items-center">
          {/** Left Side */}
          <div className="flex gap-3 flex-wrap justify-center md:justify-start text-neutral-500 dark:text-neutral-200">
            <div className='inline-flex items-center flex-wrap justify-center gap-2'>
              <label htmlFor="bananasCount">
                Number of Bananas: {bananasCount}
              </label>
              <input
                id="bananasCount"
                type="range"
                min="1"
                max="80"
                step="1"
                value={bananasCount}
                onChange={(e) => setBananasCount(parseInt(e.target.value))}
                className=""
              />
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};
