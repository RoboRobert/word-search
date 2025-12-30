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
  const rotation = useRotation();

  console.log(rotation);

  const characterElements: React.ReactElement[] = [];

  for (let i = 0; i < word.length; i++) {
    characterElements.push(
      <p
        style={{
          transform: `rotate(-${rotation}deg)`,
        }}
        className="size-8 text-center"
      >
        {word.charAt(i)}
      </p>,
    );
  }

  return (
    <div
      className={"absolute"}
      style={{
        left: isDragging ? position.x : undefined,
        top: isDragging ? position.y : undefined,
        transform: isDragging
          ? `translate(-50%, -50%) rotate(${rotation}deg)`
          : undefined,
      }}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
    >
      <div className="flex size-10 w-fit flex-row rounded-xl border-2 border-yellow-400 p-1">
        {characterElements}
      </div>
    </div>
  );
}
