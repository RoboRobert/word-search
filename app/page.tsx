"use client";

import { getRandomValues } from "crypto";
import { useEffect, useId, useState } from "react";

export default function Home() {
  const MIN_SIZE = 1;
  const MAX_SIZE = 20;
  const CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const [GRIDROWS, setGridRows] = useState(5);
  const [GRIDCOLUMNS, setGridColumns] = useState(5);

  const grid: string[][] = [];

  for (let i = 0; i < GRIDROWS; i++) {
    grid.push([]);
    for (let j = 0; j < GRIDCOLUMNS; j++) {
      grid[i].push(getRandomCharacterFromSet(CHARACTER_SET));
    }
  }

  console.log(grid.length);

  return (
    <div className="flex h-screen w-screen flex-row items-center gap-4 py-2">
      <div className="flex h-full flex-col border-2 p-2">
        <label htmlFor="numRows">Number of Rows: {GRIDROWS}</label>
        <input
          id="numRows"
          type="range"
          min={MIN_SIZE}
          max={MAX_SIZE}
          value={GRIDROWS}
          onChange={(changeEvent) =>
            setGridRows(Number(changeEvent.target.value))
          }
        />

        <label htmlFor="numColumns">Number of Columns: {GRIDCOLUMNS}</label>
        <input
          id="numColumns"
          type="range"
          min={MIN_SIZE}
          max={MAX_SIZE}
          value={GRIDCOLUMNS}
          onChange={(changeEvent) =>
            setGridColumns(Number(changeEvent.target.value))
          }
        />

        <label htmlFor="gridSize">
          Size: {Math.max(GRIDROWS, GRIDCOLUMNS)}
        </label>
        <input
          id="gridSize"
          type="range"
          min={MIN_SIZE}
          max={MAX_SIZE}
          value={Math.max(GRIDROWS, GRIDCOLUMNS)}
          onChange={(changeEvent) => {
            setGridColumns(Number(changeEvent.target.value));
            setGridRows(Number(changeEvent.target.value));
          }}
        />
      </div>
      <div className="m-auto h-fit w-fit">{renderGrid(grid)}</div>
    </div>
  );
}

function renderGrid(grid: string[][]): React.ReactElement {
  return (
    <div className="flex flex-col">
      {grid.map((row) => (
        <div className="flex flex-row justify-between">
          {row.map((character) => (
            <p className="m-auto size-8 text-center">{character}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 *
 * @returns Returns a character from the selected set, or uses the set
 * "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" by default
 */
function getRandomCharacterFromSet(characterSet?: string): string {
  let characters = characterSet;
  if (!characters) {
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  }

  return characters.charAt(Math.floor(Math.random() * characters.length));
}
