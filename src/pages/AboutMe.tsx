import { motion, easeOut } from "framer-motion";
import type { Variants } from "framer-motion";
import styles from "./AboutMe.module.css";
import { useEffect } from "react";
import avatar from "../assets/images/me.png";
import react from "../assets/images/react.png";
import typescript from "../assets/images/typescript.png";
import javascript from "../assets/images/javascript.png";
import tailwind from "../assets/images/tailwind.png";
import html from "../assets/images/html.png";
import css from "../assets/images/css.png";
import github from "../assets/images/github.png";
import firebase from "../assets/images/firebase.png";
import vscode from "../assets/images/vscode.png";
import vite from "../assets/images/vite.png";
import node from "../assets/images/node.png";
import framermotion from "../assets/images/framermotion.png";
import figma from "../assets/images/figma.png";
import photoshop from "../assets/images/photoshop.png";
import premierepro from "../assets/images/premierepro.png";
import aftereffects from "../assets/images/aftereffects.png";
import notion from "../assets/images/notion.png";

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
            src={avatar}
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
                { src: react, label: "React" },
                { src: typescript, label: "TypeScript" },
                { src: javascript, label: "JavaScript" },
                { src: tailwind, label: "Tailwind" },
                { src: html, label: "HTML" },
                { src: css, label: "CSS" },
                { src: github, label: "GitHub" },
                { src: firebase, label: "Firebase" },
                { src: vscode, label: "Visual Studio Code" },
                { src: vite, label: "Vite" },
                { src: node, label: "Node.js" },
                { src: framermotion, label: "Framer Motion" },
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
                { src: figma, label: "Figma" },
                { src: photoshop, label: "Photoshop" },
                { src: premierepro, label: "Premiere Pro" },
                { src: aftereffects, label: "After Effects" },
                { src: notion, label: "Notion" },
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
