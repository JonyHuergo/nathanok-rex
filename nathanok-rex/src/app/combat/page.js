'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Combat() {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);

  const attack = () => {
    setEnemyHealth(enemyHealth - 10);
    if (enemyHealth <= 0) {
      alert('You defeated the enemy!');
    } else {
      // Enemy counterattacks
      setPlayerHealth(playerHealth - 5);
      if (playerHealth <= 0) {
        alert('You have been defeated!');
      }
    }
  };

  return (
    <div>
      <h1>Combat</h1>
      <div>
        <h2>Character</h2>
        <p>Health: {playerHealth}</p>
      </div>
      <div>
        <h2>Enemy</h2>
        <p>Health: {enemyHealth}</p>
        <button onClick={attack}>Attack</button>
      </div>
      <Link href="/">Return to Home</Link>
    </div>
  );
}