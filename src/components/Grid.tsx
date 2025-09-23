import { useRef } from "react";
import Cell from "./Cell";
import { easeOut, motion, useInView } from "framer-motion";
import styles from "./Grid.module.css";
import shellBlue from "../assets/images/shell-blue.png";
import starfishBlue from "../assets/images/starfish-blue.png";
import palmtreeBlue from "../assets/images/palmtree-blue.png";
import wavesBlue from "../assets/images/waves-blue.png";

export default function Grid() {
  const titles: string[] = [
    "MY  WO RK",
    "  23   1 ",
    "ABOUT  ME",
    "5     6  ",
    "   7 9   ",
    "  45  12 ",
    "CO  NTACT",
    "5   6 937",
    "SU  DOKU ",
  ];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cellVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <div className={styles.gridWrapper}>
      <img
        src={shellBlue}
        className={`${styles.backgroundIcon} ${styles.iconTopLeft}`}
      />
      <img
        src={starfishBlue}
        className={`${styles.backgroundIcon} ${styles.iconTopRight}`}
      />
      <img
        src={palmtreeBlue}
        className={`${styles.backgroundIcon} ${styles.iconBottomLeft}`}
      />
      <img
        src={wavesBlue}
        className={`${styles.backgroundIcon} ${styles.iconBottomRight}`}
      />
      <motion.div
        ref={ref}
        className={styles.gridContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {titles.map((title, i) => (
          <motion.div
            key={i}
            className={styles.cellWrapper}
            variants={cellVariants}
          >
            <Cell title={title} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
