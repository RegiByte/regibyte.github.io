import React, { useEffect } from 'react';
import * as flowField from './flow-field';
import './flow-field.css';
import { useCanvasEffect } from '../../../hooks/useCanvasEffect';
import FlowFieldControls from './controls';
import { repoUrl, siteUrl } from '../../../config/site';

interface FlowFieldEffectProps {

}

const FlowFieldEffect: React.FC<FlowFieldEffectProps> = (props) => {
  useCanvasEffect(flowField.setupEffect, flowField.clearEffect, flowField.resizeEffect);

  return (
    <>
      <FlowFieldControls
        onZoomChange={flowField.onZoomChange}
        onCurveChange={flowField.onCurveChange}
        onChangeColors={flowField.onChangeColors}
        sourceCodeUrl={`${repoUrl}/tree/main/src/components/effects/flow-field/flow-field.js`}
      />
    </>
  );
};

export default FlowFieldEffect;
