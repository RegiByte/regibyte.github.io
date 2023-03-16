import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';

export interface ControlledInput3DProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export const ControlledInput3D: React.FC<ControlledInput3DProps> = ({
  value,
  onChange,
  ...props
}) => {
  const [cursor, setCursor] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.focus();
      input.setSelectionRange(cursor, cursor);
    }
  }, [inputRef, cursor, value]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    const cursor = event.target.selectionStart;
    setCursor(cursor);
    onChange?.(value);
  };

  return <input type="text" value={value} onChange={handleChange} {...props} />;
};
