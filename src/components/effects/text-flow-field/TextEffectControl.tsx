import React, { useEffect, useState } from 'react';
import { ControlledInput3D } from '../github-explorer/ControlledInput3d.tsx';
import { getInitialColors, getInitialText } from './helpers.ts';
import { ShareIcon } from '@heroicons/react/24/solid';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/cn/ui/tooltip.tsx';
import { Toaster } from '@components/cn/ui/toaster.tsx';
import { useToast } from '@components/cn/ui/use-toast.ts';
import { ColorPicker } from '@components/effects/color-picker';

export const TextEffectControl = ({
  onChange,
  onChangeColors,
  initialValue = getInitialText(),
  initialColors = getInitialColors(),
}: {
  onChange: (newValue: string) => void;
  onChangeColors: (newColors: string[]) => void;
  initialValue?: string;
  initialColors?: string[];
}) => {
  const [value, setValue] = useState(initialValue);
  const [colors, setColors] = useState<string[]>(initialColors);
  const { toast } = useToast();

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  const handleChangeColors = (newColors: string[]) => {
    setColors(newColors);
    onChangeColors(newColors);
  };

  const handleShareEffect = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('text', encodeURIComponent(value));
    url.searchParams.set('colors', encodeURIComponent(colors.join(',')));
    navigator.clipboard.writeText(url.href);
    const {dismiss} = toast({
      title: 'Link copiado para a área de transferência',
      description: 'Compartilhe o link para este efeito com seus amigos!',
    });
    setTimeout(dismiss, 4000)
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 z-10 flex h-8 w-full items-end px-10 md:bottom-8">
        <div className="mb-4 flex w-full flex-wrap justify-center gap-3 rounded bg-slate-100 px-4 py-3 dark:bg-zinc-800/90 md:mb-0 md:justify-start">
          <ControlledInput3D
            value={value}
            onChange={handleChange}
            placeholder={'Write some text for the effect here.'}
            className={`sm:leading-2 min-w-[250px] rounded-md py-1.5 pl-2 
        text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-teal-400 sm:text-sm`}
          />
          <ColorPicker initialColors={colors} onChange={handleChangeColors} />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={handleShareEffect}>
                  <ShareIcon className="w-5 h-5 text-gray-400" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                Compartilhe o link para este efeito com seus amigos!
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Toaster />
    </>
  );
};
