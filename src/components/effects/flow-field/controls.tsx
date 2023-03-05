import React, { useState } from 'react';
import { ColorPicker } from '../color-picker';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid';
import { GitHubIcon } from '../../ui/socialIcons';

interface FlowFieldControlsProps {
  onZoomChange: (newZoom) => void;
  onCurveChange: (newCurve) => void;
  onChangeColors: (newColors: string[]) => void;
  sourceCodeUrl?: string;
}

const FlowFieldControls: React.FC<FlowFieldControlsProps> = ({
  onZoomChange,
  onCurveChange,
  onChangeColors,
  sourceCodeUrl,
}) => {
  const [zoom, setZoom] = useState(0.3);
  const [curve, setCurve] = useState(3);

  const handleZoomChange = (e) => {
    const newValue = parseFloat(e.target.value);
    onZoomChange(newValue);
    setZoom(newValue);
  };

  const handleCurveChange = (e) => {
    onCurveChange(e.target.value);
    setCurve(e.target.value);
  };

  const handleColorsChange = (newColors) => {
    onChangeColors(newColors);
  };

  const handleRandomize = () => {
    const newZoom = Number((Math.random() * 5 + 0.1).toFixed(2));
    const newCurve = Number((Math.random() * 10 + 0.1).toFixed(2));

    setZoom(newZoom);
    setCurve(newCurve);
    onZoomChange(newZoom);
    onCurveChange(newCurve);
  };

  return (
    <div className="absolute bottom-20 left-0 z-10 h-8 w-full px-10 md:bottom-10">
      <div className="flex w-full flex-wrap justify-center gap-3 rounded dark:bg-zinc-800/90 bg-slate-100 px-4 py-3 md:justify-between">
        {/** Left side */}
        <div className="flex gap-3 flex-wrap text-neutral-500 dark:text-neutral-200">
          <div className="inline-flex items-center justify-center gap-2">
            <label htmlFor="Zoom">Zoom</label>
            <input onChange={handleZoomChange} type="range" value={zoom} min={0.01} max={5} step={0.01} /> {zoom}
          </div>

          <button
            onClick={handleRandomize}
            className="inline-flex items-center gap-2 rounded bg-slate-300 px-2 py-1 text-neutral-700">
            Randomize
            <ArrowPathRoundedSquareIcon className="h-4 w-4" />
          </button>

          <div className="inline-flex items-center justify-center gap-2">
            <label htmlFor="Zoom">Curve</label>
            <input onChange={handleCurveChange} type="range" value={curve} min={0.01} max={10} step={0.01} /> {curve}
          </div>

          <ColorPicker
            initialColors={['#fbbf24', '#fcd34d', '#fef08a', '#84cc16', '#10b981', '#2dd4bf']}
            onChange={handleColorsChange}
          />
        </div>

        {/** Right Side */}
        {!!sourceCodeUrl && (
          <div className="flex items-center">
            <a
              href={sourceCodeUrl}
              className={`inline-flex gap-2 rounded px-2 py-1 hover:bg-slate-200
                 text-neutral-600 dark:text-neutral-700 dark:bg-slate-200`}
              target="_blank">
              <GitHubIcon className="h-6 w-6" />
              View Source
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowFieldControls;
