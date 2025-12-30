import { useState } from "react";
import { useMousePosition } from "../_hooks/useMousePosition";
import { useRotation } from "../_hooks/useRotation";

export function DraggableWordComponent({
  word,
}: {
  word: string;
}): React.ReactElement {
  const [isDragging, setIsDragging] = useState(false);
  const position = useMousePosition();
  const [rotation, resetRotation] = useRotation(isDragging);

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
    <div
      className={`${isDragging ? "absolute" : "static"}`}
      style={{
        left: isDragging ? position.x : undefined,
        top: isDragging ? position.y : undefined,
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
      <div className="flex h-fit w-fit flex-row rounded-xl bg-black outline-2 -outline-offset-3 outline-yellow-400">
        {characterElements}
      </div>
    </div>
  );
}
