import React, { useEffect, useRef } from 'react';
import { TextField } from '@mui/material';

export const AutoWidthTextField = ({ value, fontSize, ...props }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && value) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = `${fontSize} ${window.getComputedStyle(inputRef.current).fontFamily}`;
      const textWidth = context.measureText(value).width;
      inputRef.current.style.width = `${Math.ceil(textWidth)}px`;
    }
  }, [value]);

  return <TextField inputRef={inputRef} value={value} inputProps={{ style: { fontSize: '2rem' } }} {...props} />;
};
