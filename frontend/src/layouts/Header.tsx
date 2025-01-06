import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <h1>Checkpoint : frontend</h1>
      <nav>
        <Link href="/">See all countries</Link>
        <Link href="/country/new">Add a country</Link>
      </nav>
    </header>
  );
}
