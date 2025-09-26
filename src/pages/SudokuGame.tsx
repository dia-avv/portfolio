import { motion, easeOut } from "framer-motion";
import type { Variants } from "framer-motion";
import styles from "./SudokuGame.module.css";
import { Link } from "react-router-dom";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

// Fade + slide in
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const linkItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export default function SudokuGame() {
  return (
    <motion.div
      className={styles.container}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* Page Title */}
      <motion.h1 className={styles.title} variants={itemVariants}>
        Sudoku Game
      </motion.h1>
      <motion.section className={styles.section} variants={itemVariants}>
        <h2>This is still a work in progress.</h2>
        <h4>But you can still check out other cool stuff!</h4>
        <motion.div
          style={{ display: "inline-block" }}
          variants={linkItemVariants}
          whileHover={{ scale: 1.06 }}
        >
          <Link to="/mywork" className={styles.link}>
            See My Work
          </Link>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
