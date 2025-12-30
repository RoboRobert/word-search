import { useState, useEffect } from "react";

export const useRotation = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const updateRotation = (event: KeyboardEvent) => {
      const key = event.code;
      console.log(key);
      if (key === "KeyQ") {
        setRotation((r) => (r - 45 + 360) % 360);
      } else if (key === "KeyE") {
        setRotation((r) => (r + 45) % 360);
      }
    };

    window.addEventListener("keydown", updateRotation);
    return () => {
      window.removeEventListener("keydown", updateRotation);
    };
  }, []);

  return rotation;
};
