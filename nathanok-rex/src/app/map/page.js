'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Terrain types
const TERRAIN = {
  GRASS: 'grass',
  WATER: 'water',
  MOUNTAIN: 'mountain',
};

// Probabilities for each terrain type
const TERRAIN_PROBABILITIES = {
  [TERRAIN.GRASS]: 0.7,
  [TERRAIN.WATER]: 0.2,
  [TERRAIN.MOUNTAIN]: 0.1,
};

// Generate a random map layout
const generateRandomMap = (size) => {
  const map = [];
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      const random = Math.random();
      if (random < TERRAIN_PROBABILITIES[TERRAIN.WATER]) {
        row.push(TERRAIN.WATER);
      } else if (random < TERRAIN_PROBABILITIES[TERRAIN.WATER] + TERRAIN_PROBABILITIES[TERRAIN.MOUNTAIN]) {
        row.push(TERRAIN.MOUNTAIN);
      } else {
        row.push(TERRAIN.GRASS);
      }
    }
    map.push(row);
  }
  return map;
};

// Find a random starting position on grass
const findRandomStartPosition = (map) => {
  const grassTiles = [];
  map.forEach((row, y) => {
    row.forEach((terrain, x) => {
      if (terrain === TERRAIN.GRASS) {
        grassTiles.push({ x, y });
      }
    });
  });
  return grassTiles[Math.floor(Math.random() * grassTiles.length)];
};

export default function Map() {
  const [mapLayout, setMapLayout] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const mapSize = 200;
  const mapContainerRef = useRef(null);

  // Generate the map and set the player's starting position
  useEffect(() => {
    const newMap = generateRandomMap(mapSize);
    const startPosition = findRandomStartPosition(newMap);
    setMapLayout(newMap);
    setPosition(startPosition);
  }, []);

  // Scroll the map to keep the player centered
  useEffect(() => {
    if (mapContainerRef.current) {
      const cellSize = 50; // Size of each cell in pixels
      const container = mapContainerRef.current;
      const scrollX = position.x * cellSize - container.clientWidth / 2 + cellSize / 2;
      const scrollY = position.y * cellSize - container.clientHeight / 2 + cellSize / 2;
      container.scrollTo({
        left: scrollX,
        top: scrollY,
        behavior: 'smooth',
      });
    }
  }, [position]);

  const move = (direction) => {
    setPosition((prev) => {
      let newX = prev.x;
      let newY = prev.y;

      switch (direction) {
        case 'up':
          newY = Math.max(0, prev.y - 1);
          break;
        case 'down':
          newY = Math.min(mapSize - 1, prev.y + 1);
          break;
        case 'left':
          newX = Math.max(0, prev.x - 1);
          break;
        case 'right':
          newX = Math.min(mapSize - 1, prev.x + 1);
          break;
        default:
          break;
      }

      // Prevent moving into water or mountains
      const terrain = mapLayout[newY][newX];
      if (terrain === TERRAIN.WATER || terrain === TERRAIN.MOUNTAIN) {
        return prev; // Don't move
      }

      return { x: newX, y: newY };
    });
  };

  // Keyboard controls
  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        move('up');
        break;
      case 'ArrowDown':
        move('down');
        break;
      case 'ArrowLeft':
        move('left');
        break;
      case 'ArrowRight':
        move('right');
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'black',
        color: 'white',
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h1>Map</h1>
      <div style={{ marginBottom: '20px' }}>
        <p>Position: ({position.x}, {position.y})</p>
      </div>
      <div
        ref={mapContainerRef}
        style={{
          width: '500px', // Fixed width for the visible area
          height: '500px', // Fixed height for the visible area
          overflow: 'auto', // Enable scrolling
          border: '2px solid white',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${mapSize}, 50px)`,
            gridTemplateRows: `repeat(${mapSize}, 50px)`,
            gap: '5px',
          }}
        >
          {mapLayout.map((row, y) =>
            row.map((terrain, x) => (
              <div
                key={`${x}-${y}`}
                style={{
                  width: '50px',
                  height: '50px',
                  border: '1px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    terrain === TERRAIN.GRASS
                      ? 'darkgreen'
                      : terrain === TERRAIN.WATER
                      ? 'blue'
                      : terrain === TERRAIN.MOUNTAIN
                      ? 'gray'
                      : 'black',
                  color: 'white',
                }}
              >
                {x === position.x && y === position.y && '👤'}
                {terrain === TERRAIN.WATER && '🌊'}
                {terrain === TERRAIN.MOUNTAIN && '⛰️'}
              </div>
            ))
          )}
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => move('up')}>Up</button>
        <button onClick={() => move('down')}>Down</button>
        <button onClick={() => move('left')}>Left</button>
        <button onClick={() => move('right')}>Right</button>
      </div>
      <Link href="/" style={{ marginTop: '20px', color: 'white' }}>
        Return to Home
      </Link>
    </div>
  );
}