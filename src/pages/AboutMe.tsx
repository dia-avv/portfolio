import { motion, easeOut } from "framer-motion";
import type { Variants } from "framer-motion";
import styles from "./AboutMe.module.css";
import { useEffect } from "react";

export default function AboutMe() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Parent container for staggered children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
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

  return (
    <motion.div
      className={styles.wrapper}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <motion.section className={styles.card} variants={itemVariants}>
        {/* Top Banner */}
        <motion.div className={styles.banner} variants={itemVariants}>
          <h1 className={styles.title}>ABOUT ME</h1>
          <span className={styles.level}>
            Multimedia Design @ Business Academy Aarhus
          </span>
        </motion.div>

        {/* Profile Row */}
        <motion.div className={styles.profileRow} variants={itemVariants}>
          <motion.img
            src="/images/me.png"
            alt="avatar"
            className={styles.avatar}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <div className={styles.info}>
            <h2 className={styles.name}>Andreea-Valentina Vulpasu</h2>
            <p className={styles.roles}>
              Frontend Developer | Content Creator
            </p>
          </div>
        </motion.div>

        {/* About + Tech Stack */}
        <motion.div className={styles.split} variants={containerVariants}>
          {/* About */}
          <motion.div className={styles.about} variants={itemVariants}>
            <h3>Get To Know Me</h3>
            <p>
              I’m a Multimedia Design student at Business Academy Aarhus with a
              strong focus on <strong>web development</strong> and{" "}
              <strong>content creation</strong>. I’m passionate about crafting
              engaging online experiences and helping ideas stand out through
              design and interaction.
              <br />
              <br />
              I’m originally from Romania, now based in <strong>Aarhus</strong>.
              <br />
              <br />
              Outside of studies, I’m a bit of a puzzle addict 🧩 —{" "}
              <strong>Sudoku</strong> is my go-to (and the reason my portfolio
              looks the way it does!). I also play volleyball, love discovering
              Aarhus with friends and on quiet days you’ll probably find me
              rewatching one of my favorite TV shows, <em>Friends</em>.<br />
              <br />
              🏎️ As a Formula 1 fan, my dream is to one day bring my creative
              skills into the world of motorsport media, combining speed,
              storytelling and strategy.
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div className={styles.techStack} variants={itemVariants}>
            <h3>Where I Work Best</h3>
            <ul>
              {[
                { src: "/images/react.png", label: "React" },
                { src: "/images/typescript.png", label: "TypeScript" },
                { src: "/images/javascript.png", label: "JavaScript" },
                { src: "/images/tailwind.png", label: "Tailwind" },
                { src: "/images/html.png", label: "HTML" },
                { src: "/images/css.png", label: "CSS" },
                { src: "/images/github.png", label: "GitHub" },
                { src: "/images/firebase.png", label: "Firebase" },
                { src: "/images/vscode.png", label: "Visual Studio Code" },
                { src: "/images/vite.png", label: "Vite" },
                { src: "/images/node.png", label: "Node.js" },
                { src: "/images/framermotion.png", label: "Framer Motion" },
              ].map((tool, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.img
                    src={tool.src}
                    alt={tool.label}
                  />
                  <span>{tool.label}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Tools Row */}
        <motion.div className={styles.skillsRow} variants={containerVariants}>
          <motion.div className={styles.tools} variants={itemVariants}>
            <h3>But I Know My Way Around In</h3>
            <ul>
              {[
                { src: "/images/figma.png", label: "Figma" },
                { src: "/images/photoshop.png", label: "Photoshop" },
                { src: "/images/premierepro.png", label: "Premiere Pro" },
                { src: "/images/aftereffects.png", label: "After Effects" },
                { src: "/images/notion.png", label: "Notion" },
              ].map((tool, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.img
                    src={tool.src}
                    alt={tool.label}
                  />
                  <span>{tool.label}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
