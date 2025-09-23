import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // import for routing
import styles from "./Cell.module.css";

interface CellProps {
  title: string;
}

export default function Cell({ title }: CellProps) {
  const letters = title.split("");
  const isNumberCell = /^[0-9\s]+$/.test(title); // true if only numbers/spaces

  // Animation for small cells
  const letterVariants = {
    initial: { backgroundColor: "transparent" },
    hover: {
      backgroundColor: "rgba(0, 58, 146, 1)",
      transition: { duration: 0.3 },
    },
  };

  // Animation for grid (to stagger highlight effect)
  const gridVariants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  const content = (
    <motion.div
      className={styles.cellGrid}
      variants={gridVariants}
      initial="initial"
      whileHover="hover"
    >
      {letters.map((char, i) => {
        const style: React.CSSProperties = {
          borderRight: i % 3 !== 2 ? "1px solid #4B5563" : undefined,
          borderBottom: i < 6 ? "1px solid #4B5563" : undefined,
          aspectRatio: "1 / 1",
          boxSizing: "border-box",
        };

        const isNumber = !isNaN(Number(char));

        return (
          <motion.div
            key={i}
            className={`${styles.letter} ${
              isNumber ? styles.number : styles.text
            }`}
            style={style}
            variants={letterVariants}
          >
            {char === " " ? "\u00A0" : char}
          </motion.div>
        );
      })}
    </motion.div>
  );

  // If it's numbers only → static
  if (isNumberCell) {
    return <motion.div className={styles.cell}>{content}</motion.div>;
  }

  if (title.replace(/\s+/g, "").toLowerCase() === "contact") {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      const footer = document.getElementById("footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <a href="#footer" onClick={handleClick} className={styles.linkWrapper}>
        <motion.div className={`${styles.cell} ${styles.clickable}`}>
          {content}
        </motion.div>
      </a>
    );
  }

  // If it's text → wrap in Link and add clickable style
  const routePath = `/${title.trim().toLowerCase().replace(/\s+/g, "")}`;
  return (
    <Link to={routePath} className={styles.linkWrapper}>
      <motion.div className={`${styles.cell} ${styles.clickable}`}>
        {content}
      </motion.div>
    </Link>
  );
}
