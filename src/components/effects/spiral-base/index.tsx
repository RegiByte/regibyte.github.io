import React from 'react';
import './bezier-field.css'
import { useCanvasEffect } from '../../../hooks/useCanvasEffect';
import * as bezierField from "./bezier-field.js"

export const BezierField = () => {
  useCanvasEffect(bezierField.setupEffect, bezierField.clearEffect, bezierField.resizeEffect)

  return (
    <div>
    </div>
  );
};
