import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ColorPickerProps {
  initialColors: string[];
  onChange: (newColors: string[]) => void;
}

interface ColorBlockProps {
  color: string;
  onRemove: () => void;
}

const ColorBlock: React.FC<ColorBlockProps> = ({ color, onRemove }) => {
  return (
    <div
      className="group relative h-4 w-4 cursor-pointer rounded"
      onClick={onRemove}
      style={{
        backgroundColor: color,
      }}>
      <XMarkIcon className="absolute top-0 right-0 hidden text-xs group-hover:inline-flex">X</XMarkIcon>
    </div>
  );
};

interface NewColorPickerProps {
  initialColor?: string;
  onAdd: (newColor: string) => void;
}

const NewColorPicker: React.FC<NewColorPickerProps> = ({ initialColor = '#000000', onAdd }) => {
  const [currentColor, setCurrentColor] = useState(initialColor);

  const handleColorChange = (e) => {
    console.log(e.target.value);
    setCurrentColor(e.target.value);
  };

  const handleAddNewColor = () => {
    onAdd(currentColor);
  };

  return (
    <div className="relative inline-flex items-center justify-center md:justify-start gap-2 w-full md:w-auto">
      <button onClick={handleAddNewColor} className={'rounded bg-slate-300 px-2 py-1 text-neutral-700'}>
        Confirm (after selecting custom color)
      </button>
      <input type="color" className={''} value={currentColor} onChange={handleColorChange} />
    </div>
  );
};

export const ColorPicker: React.FC<ColorPickerProps> = ({ initialColors, onChange }) => {
  const [colors, setColors] = useState(initialColors);

  const handleChangeColor = (e) => {
    let newColors = [...colors, e.target.value];
    onChange(newColors);
    setColors(newColors);
  };

  const handleAddNewColor = (newColor: string) => {
    let newColors = [...colors, newColor];
    onChange(newColors);
    setColors(newColors);
  };

  const handleRemoveColor = (color) => {
    let newColors = colors.filter((childColor) => childColor !== color);
    onChange(newColors);
    setColors(newColors);
  };

  return (
    <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
      <div className="flex items-center gap-2">
        {colors.map((color, index) => (
          <ColorBlock key={index} color={color} onRemove={() => handleRemoveColor(color)} />
        ))}
      </div>

      <NewColorPicker onAdd={handleAddNewColor} />
    </div>
  );
};
