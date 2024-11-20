import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link href="/">Agency Logo</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/pricing">Pricing</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/careers">Careers</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}