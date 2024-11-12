export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <a href="/">Agency Logo</a>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/works">Works</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/careers">Careers</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
