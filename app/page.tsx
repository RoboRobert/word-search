"use client";

import { getRandomValues } from "crypto";
import { useEffect, useId, useState } from "react";

export default function Home() {
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
          min={1}
          max={10}
          defaultValue={GRIDROWS}
          onChange={(changeEvent) =>
            setGridRows(Number(changeEvent.target.value))
          }
        />

        <label htmlFor="numColumns">Number of Columns: {GRIDCOLUMNS}</label>
        <input
          id="numColumns"
          type="range"
          min={1}
          max={10}
          defaultValue={GRIDCOLUMNS}
          onChange={(changeEvent) =>
            setGridColumns(Number(changeEvent.target.value))
          }
        />
      </div>
      <div
        className={`grid grid-rows-${GRIDROWS} grid-cols-${GRIDCOLUMNS} m-auto h-fit w-fit gap-2`}
      >
        {grid.map((row) =>
          row.map((character) => (
            <div key={crypto.randomUUID()}>{character}</div>
          )),
        )}
      </div>
    </div>
  );
}

function renderGrid(grid: string[][]): React.ReactElement {
  return (
    <div>
      {grid.map((row) => (
        <div>
          {row.map((character) => (
            <p>{character}</p>
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
