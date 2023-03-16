import React from 'react';

interface EffectControlWrapperProps {
  children: React.ReactNode;
}

export const EffectControlWrapper = ({ children }) => {
  return (
    <div
      className={`fixed flex items-end bottom-0 left-0 z-10 h-8 w-full px-10 md:bottom-6`}>
      <div className="flex w-full flex-wrap mb-4 md:mb-0 justify-center gap-3 rounded dark:bg-zinc-800/90 bg-slate-100 px-4 py-3 md:justify-between">
        <div className="flex justify-center items-center">{children}</div>
      </div>
    </div>
  );
};
