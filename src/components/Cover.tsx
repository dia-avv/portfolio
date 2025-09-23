import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import styles from "./Cover.module.css";
import waves from "../images/waves.png";
import spiral from "../images/spiral.png";
import starfish from "../images/starfish.png";
import arrow from "../images/arrow.png";

export default function Cover() {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Step 1: Entrance
      await controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 1, delay: 1.8 },
      });

      // Step 2: Infinite bounce (only affects y)
      controls.start({
        y: [0, -15, 0],
        opacity: 1, // stays visible
        transition: {
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        },
      });
    };

    sequence();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 1.2,
        staggerChildren: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className={styles.container}>
      {/* Intro text */}
      <motion.h2
        className={styles.intro}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Hi! I am
      </motion.h2>

      {/* Title + images */}
      <motion.h1
        className={styles.title}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Andreea
        <br />
        Vulpasu

        {/* Spiral */}
        <motion.img
          src={spiral}
          alt="spiral"
          className={styles.spiral}
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        {/* Starfish */}
        <motion.img
          src={starfish}
          alt="starfish"
          className={styles.starfish}
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        {/* Waves */}
        <motion.img
          src={waves}
          alt="waves"
          className={styles.waves}
          animate={{ x: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
      </motion.h1>

      {/* Roles */}
      <motion.div
        className={styles.roles}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>Frontend Developer</motion.div>
        <motion.div variants={itemVariants}>Content Creator</motion.div>
      </motion.div>

      {/* Arrow */}
      <motion.img
        src={arrow}
        alt="arrow"
        className={styles.arrow}
        initial={{ y: 50, opacity: 0 }}
        animate={controls} // controlled sequence
      />
    </div>
  );
}
