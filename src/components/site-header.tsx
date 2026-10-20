import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/learn", label: "Guides", exact: false },
  { to: "/calculator", label: "Calculator", exact: true },
  { to: "/market", label: "Market", exact: true },
  { to: "/connect", label: "Co-operatives", exact: true },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper">
      <div className="h-1 bg-forest" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="group flex min-h-11 items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-sm bg-forest text-paper">
            <MilkMark />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-medium tracking-tight text-ink">
              Dairy Farmers Hub
            </span>
            <span className="block text-sm text-muted">Kenya · free to use</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.exact }}
              className="inline-flex min-h-11 items-center px-3 text-base text-muted"
              activeProps={{
                className: "font-semibold text-ink underline decoration-forest decoration-2 underline-offset-8",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-line px-4 py-2 lg:hidden" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.exact }}
              className="flex min-h-11 items-center text-base text-ink"
              activeProps={{ className: "font-semibold" }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

function MilkMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden fill="none">
      <path
        d="M12 2.5c2.2 3.2 5.5 6.4 5.5 10.2A5.5 5.5 0 0 1 12 18.2 5.5 5.5 0 0 1 6.5 12.7C6.5 8.9 9.8 5.7 12 2.5Z"
        fill="currentColor"
      />
      <path d="M8 19.5h8M9.2 21.5h5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
