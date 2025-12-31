"use client";

import { useRef, useState } from "react";
import { DraggableWordComponent } from "./_components/DraggableWordComponent";

const DEFAULT_CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Home() {
  const MIN_SIZE = 1;
  const MAX_SIZE = 20;

  const DEFAULT_SIZE = 10;

  const [CHARACTER_SET, setCharacterSet] = useState(DEFAULT_CHARACTER_SET);

  const [GRIDROWS, setGridRows] = useState(DEFAULT_SIZE);
  const [GRIDCOLUMNS, setGridColumns] = useState(DEFAULT_SIZE);

  const wordCreatorRef = useRef<HTMLInputElement>(null);

  const [wordList, setWordList] = useState<string[]>([]);

  const grid: string[][] = [];

  for (let i = 0; i < GRIDROWS; i++) {
    grid.push([]);
    for (let j = 0; j < GRIDCOLUMNS; j++) {
      grid[i].push(getRandomCharacterFromSet(CHARACTER_SET));
    }
  }

  function addWordToList() {
    const value = wordCreatorRef.current?.value;
    if (value) {
      const newList = wordList.concat(value);
      setWordList(newList);
    }
  }

  return (
    <div className="bg-accent flex h-screen w-screen flex-row items-center gap-4 p-2">
      <div
        style={{ boxShadow: "4px 4px 0px 0px #000000" }}
        className="flex h-full w-82 flex-col gap-2 overflow-y-auto border-2 p-2"
      >
        <div className="flex flex-col border p-2">
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

        <div className="flex flex-col border p-2">
          <div className="wrap-anywhere">
            Character Set:
            <span className="block">{CHARACTER_SET}</span>
          </div>

          <label htmlFor="characterSet">Change Character Set</label>
          <input
            id="characterSet"
            type="text"
            className="border"
            onInput={(event) => setCharacterSet(event.currentTarget.value)}
          ></input>
          <button
            className="border"
            onClick={() => setCharacterSet(DEFAULT_CHARACTER_SET)}
          >
            Reset Character Set
          </button>
        </div>
        <div className="flex flex-col border p-2">
          <input
            id="wordCreator"
            type="text"
            className="border"
            ref={wordCreatorRef}
          ></input>
          <button className="border" onClick={() => addWordToList()}>
            Add Word to List
          </button>
        </div>
        <div className="flex h-full flex-col overflow-y-scroll border p-2">
          Word List:
          <div className="flex flex-wrap gap-2">
            {wordList.map((word) => (
              <DraggableWordComponent word={word}></DraggableWordComponent>
            ))}
          </div>
        </div>
      </div>
      <div className="m-auto h-fit w-fit">{GridComponent(grid)}</div>
    </div>
  );
}

function GridComponent(grid: string[][]): React.ReactElement {
  return (
    <div className="flex flex-col">
      {grid.map((row, rowIndex) => (
        <div className="flex flex-row justify-between">
          {row.map((character, columnIndex) => (
            <div
              className="grid size-8 place-items-center select-none"
              data-droppable={true}
              data-row={rowIndex}
              data-column={columnIndex}
            >
              {character}
            </div>
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
    characters = DEFAULT_CHARACTER_SET;
  }

  return characters.charAt(Math.floor(Math.random() * characters.length));
}
