import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Only show header on these routes
  const showHeader = ["/aboutme", "/mywork", "/sudoku"].includes(
    location.pathname
  );

  const handleContactClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    e.preventDefault();

    const el = document.getElementById("footer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false); // close menu
      return;
    }

    navigate("/", { replace: false });
    requestAnimationFrame(() => {
      const again = document.getElementById("footer");
      if (again) {
        again.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.hash = "#footer";
      }
      setMenuOpen(false); // close menu after fallback
    });
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden flex flex-col">
      {showHeader && (
        <div className={styles.headerBox}>
        <header className={styles.header}>
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className={styles.backButton}
            aria-label="Go back"
          >
            <img
              src="./images/arrow-blue.png"
              alt=""
              className={styles.backArrow}
            />
          </button>

          {/* Burger button */}
          <button
            className={styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          {/* Nav links */}
          <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
            <Link
              to="/"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/mywork"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              My Work
            </Link>
            <Link
              to="/aboutme"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <a
              href="#footer"
              onClick={handleContactClick}
              className={styles.navLink}
            >
              Contact
            </a>
            <Link
              to="/sudoku"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Sudoku
            </Link>
          </nav>
          <div
            className={`${styles.overlay} ${menuOpen ? styles.open : ""}`}
            onClick={() => setMenuOpen(false)} // clicking outside closes menu
          />
        </header>
        </div>
      )}

      <div className="flex-1">{children}</div>
    </div>
  );
}
