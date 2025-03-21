'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [health, setHealth] = useState(100);

  return (
    <div>
      <h1>Nathanok Rex</h1>
      <div>
        <h2>Character</h2>
        <p>Health: {health}</p>
      </div>
      <nav>
        <Link href="/combat">Go to Combat</Link>
        <br />
        <Link href="/map">Go to Map</Link>
      </nav>
    </div>
  );
}