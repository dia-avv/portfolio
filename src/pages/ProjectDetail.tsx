import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, easeOut } from "framer-motion";
import type { Variants } from "framer-motion";
import raw from "../data/projects.json";
import styles from "./ProjectDetail.module.css";

type ProcessStep = { title: string; description: string };
type Tech = { name: string; icon: string };

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  problem?: string;
  concept?: string;
  problemPhoto?: string;
  process?: ProcessStep[];
  technologies?: Tech[];
};

const projects = raw as Project[];
const asset = (p?: string) =>
  p ? `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}` : "";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut }
  }
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <motion.div
        className={styles.container}
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <motion.h1 className={styles.title} variants={itemVariants}>
          Project not found
        </motion.h1>
        <motion.div variants={itemVariants}>
          <Link to="/mywork" className={styles.back}>← Back to My Work</Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.container}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* hero/card header */}
      <motion.header className={styles.hero} variants={itemVariants}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.subtitle}>{project.description}</p>

        <div className={styles.badges}>
          {project.categories.map(c => (
            <motion.span
              key={c}
              className={styles.badge}
              variants={itemVariants}
              whileHover={{ scale: 1.08 }}
            >
              {c}
            </motion.span>
          ))}
        </div>

        <motion.img
          className={styles.cover}
          src={asset(project.image)}
          alt={project.title}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 180 }}
        />
      </motion.header>

      {/* sections */}
      <motion.main className={styles.content} variants={containerVariants}>
        {project.problem && (
          <motion.section className={styles.section} variants={itemVariants}>
            <h2>Problem Statement</h2>
            <p>{project.problem}</p>
          </motion.section>
        )}

        {project.concept && (
          <motion.section className={styles.section} variants={itemVariants}>
            <h2>Concept</h2>
            <p>{project.concept}</p>

            {project.problemPhoto && (
              <motion.img
                className={styles.problemPhoto}
                src={asset(project.problemPhoto)}
                alt="Concept illustration"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 180 }}
              />
            )}
          </motion.section>
        )}

        {!!project.process?.length && (
          <motion.section className={styles.section} variants={itemVariants}>
            <h2>Process</h2>
            <motion.ol
              className={styles.process}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {project.process.map(step => (
                <motion.li key={step.title} className={styles.step} variants={itemVariants}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.li>
              ))}
            </motion.ol>
          </motion.section>
        )}

        {!!project.technologies?.length && (
          <motion.section className={styles.section} variants={itemVariants}>
            <h2>Technologies</h2>
            <motion.ul
              className={styles.techList}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {project.technologies.map(t => (
                <motion.li
                  key={t.name}
                  className={styles.tech}
                  variants={itemVariants}
                  whileHover={{ scale: 1.06 }}
                >
                  <img
                    src={t.icon}
                    alt={t.name}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <span>{t.name}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>
        )}
      </motion.main>

      <motion.footer className={styles.footerNav} variants={itemVariants}>
        <Link to="/mywork" className={styles.back}>← Back to My Work</Link>
      </motion.footer>
    </motion.div>
  );
}