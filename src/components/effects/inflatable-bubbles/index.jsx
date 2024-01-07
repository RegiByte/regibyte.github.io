import React, {useEffect} from "react";
import * as flowField from "./inflatable-bubbles";
import "./inflatable-bubbles.css"
import {useCanvasEffect} from "../../../hooks/useCanvasEffect";

export default function FlowFieldEffect() {
  useCanvasEffect(flowField.setupEffect, flowField.clearEffect, flowField.resizeEffect)

  return null
}
