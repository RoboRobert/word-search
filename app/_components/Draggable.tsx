"use client";

import { useState } from "react";
import { useMousePosition } from "../_hooks/useMousePosition";
import { useRotation } from "../_hooks/useRotation";

export function Draggable({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement {
  const [isDragging, setIsDragging] = useState(false);
  const mousePosition = useMousePosition();
  const [rotation, resetRotation] = useRotation(isDragging);

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
      style={{
        left: position?.x,
        top: position?.y,
        transform: isDragging
          ? `translate(-50%, -50%) rotate(${rotation}deg)`
          : undefined,
      }}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => {
        resetRotation();
        setIsDragging(false);
      }}
    >
      {children}
    </div>
  );
}
