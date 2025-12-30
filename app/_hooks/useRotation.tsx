import { useState, useEffect } from "react";

export function useRotation(isDragging: boolean): [number, () => void] {
  const [rotation, setRotation] = useState(0);

  console.log(isDragging);

  const resetRotation = () => {
    setRotation(0);
  };

  useEffect(() => {
    const updateRotation = (event: KeyboardEvent) => {
      if (isDragging) {
        const key = event.code;
        if (key === "KeyQ") {
          setRotation((r) => (r - 45 + 360) % 360);
        } else if (key === "KeyE") {
          setRotation((r) => (r + 45) % 360);
        }
      }
    };

    window.addEventListener("keydown", updateRotation);
    return () => {
      window.removeEventListener("keydown", updateRotation);
    };
  }, [isDragging]);

  return [rotation, resetRotation];
}
