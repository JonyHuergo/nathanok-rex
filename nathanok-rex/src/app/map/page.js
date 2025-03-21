'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Map() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const move = (direction) => {
    switch (direction) {
      case 'up':
        setPosition((prev) => ({ ...prev, y: prev.y - 1 }));
        break;
      case 'down':
        setPosition((prev) => ({ ...prev, y: prev.y + 1 }));
        break;
      case 'left':
        setPosition((prev) => ({ ...prev, x: prev.x - 1 }));
        break;
      case 'right':
        setPosition((prev) => ({ ...prev, x: prev.x + 1 }));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Map</h1>
      <div>
        <p>Position: ({position.x}, {position.y})</p>
        <button onClick={() => move('up')}>Up</button>
        <button onClick={() => move('down')}>Down</button>
        <button onClick={() => move('left')}>Left</button>
        <button onClick={() => move('right')}>Right</button>
      </div>
      <Link href="/">Return to Home</Link>
    </div>
  );
}