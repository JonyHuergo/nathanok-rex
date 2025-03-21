import './globals.css';

import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link> | <Link href="/combat">Combat</Link> | <Link href="/map">Map</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}