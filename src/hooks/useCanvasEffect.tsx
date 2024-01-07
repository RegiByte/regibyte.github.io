import React, {useEffect} from "react";

type Callback = () => void;

export function useCanvasEffect(setupEffect: Callback, clearEffect: Callback, resizeEffect: Callback): void {
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
