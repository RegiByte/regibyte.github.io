import {useEffect} from "react";
import {clearEffect, resizeEffect, setupEffect} from "../components/effects/flow-field/flow-field";

export function useCanvasEffect(setupEffect, clearEffect, resizeEffect) {
  useEffect(() => {
    const resizeCallback = () => {
      resizeEffect()
    }

    resizeCallback()
    window.addEventListener('resize', resizeCallback)

    setupEffect()

    return () => {
      // cleanup effect and listeners
      window.removeEventListener('resize', resizeCallback)
      clearEffect();
    }
  }, [])
}