import React, {useEffect} from "react";
import * as flowField from "./flow-field";
import "./flow-field.css"
import {useCanvasEffect} from "../../../hooks/useCanvasEffect";

export default function FlowFieldEffect() {
  useCanvasEffect(flowField.setupEffect, flowField.clearEffect, flowField.resizeEffect)

  return null
}