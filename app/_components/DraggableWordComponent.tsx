"use client";

import { useState } from "react";
import { useMousePosition } from "../_hooks/useMousePosition";
import { useRotation } from "../_hooks/useRotation";
import { Draggable } from "./Draggable";

export function DraggableWordComponent({
  word,
}: {
  word: string;
}): React.ReactElement {
  const [rotation, resetRotation] = useRotation(true);

  const shouldLengthen = rotation % 90 !== 0;

  const characterElements: React.ReactElement[] = [];

  for (let i = 0; i < word.length; i++) {
    characterElements.push(
      <div
        style={{
          transform: `rotate(-${rotation}deg)`,
        }}
        className={`${shouldLengthen ? "w-[44.8px]" : "w-8"} grid place-items-center`}
      >
        {word.charAt(i)}
      </div>,
    );
  }

  return (
    <Draggable>
      <div className="flex h-fit w-fit flex-row rounded-xl bg-black outline-2 -outline-offset-3 outline-yellow-400">
        {characterElements}
      </div>
    </Draggable>
  );
}
