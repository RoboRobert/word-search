"use client";

import { useState } from "react";
import { useMousePosition } from "../_hooks/useMousePosition";
import { useRotation } from "../_hooks/useRotation";

export function Snap({
  draggable = false,
  rotatable = false,
  childrenRetainOrientation = false,
  children,
}: {
  draggable?: boolean;
  rotatable?: boolean;
  childrenRetainOrientation?: boolean;
  children: React.ReactElement;
}): React.ReactElement {
  const [isDragging, setIsDragging] = useState(false);
  const mousePosition = useMousePosition();
  const [rotation, setRotation] = useState(0);

  let position = undefined;
  let snapPosition = undefined;

  if (isDragging) {
    const elements = document
      .elementsFromPoint(mousePosition.x, mousePosition.y)
      .filter((element) => element.getAttribute("data-droppable"));

    const boundingRect = elements[0]?.getBoundingClientRect();
    if (isDragging) {
      snapPosition = boundingRect
        ? {
            x: boundingRect?.left + boundingRect.width / 2,
            y: boundingRect?.top + boundingRect.height / 2,
          }
        : undefined;
    }
  }

  function updateRotation(key: string) {
    if (isDragging) {
      if (key === "KeyQ") {
        setRotation((r) => (r - 45 + 360) % 360);
      } else if (key === "KeyE") {
        setRotation((r) => (r + 45) % 360);
      }
    }
  }

  console.log(snapPosition);

  if (!isDragging) {
    position = undefined;
  } else if (snapPosition) {
    position = snapPosition;
  } else {
    position = mousePosition;
  }

  return (
    <div
      className={"absolute select-none"}
      tabIndex={-1}
      style={{
        left: position?.x,
        top: position?.y,
        transform: isDragging
          ? `translate(-50%, -50%) rotate(${rotation}deg)`
          : undefined,
      }}
      onPointerDown={() => {
        if (draggable) setIsDragging(true);
      }}
      onPointerUp={() => {
        if (draggable) setIsDragging(false);

        if (rotatable) setRotation(0);
      }}
      onKeyDown={(event) => {
        if (rotatable) updateRotation(event.code);
      }}
    >
      {children}
    </div>
  );
}
