// src/pages/ProjectDetail.tsx
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, easeOut } from "framer-motion";
import type { Variants } from "framer-motion";
import raw from "../data/projects.json";
import styles from "./ProjectDetail.module.css";

type ProcessStep = { title: string; description: string };
type Tech = { name: string; icon: string };
type Links = { github?: string; solution?: string; figma?: string };

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
  links?: Links[];
};

const projects = raw as Project[];
const asset = (p?: string) =>
  p ? `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}` : "";

/* page-level + stagger */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.25 } }
};

/* section/item entrance */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } }
};

/* link pill entrance + hover */
const linkItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } }
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <motion.div className={styles.container} initial="hidden" animate="show" variants={containerVariants}>
        <motion.h1 className={styles.title} variants={itemVariants}>Project not found</motion.h1>
        <motion.div variants={itemVariants}>
          <Link to="/mywork" className={styles.back}>← Back to My Work</Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div className={styles.container} initial="hidden" animate="show" variants={containerVariants}>
      {/* hero/card header */}
      <motion.header className={styles.hero} variants={itemVariants}>
        <h1 className={styles.title}>{project.title}</h1>
        {/* image: no hover animation */}
        <motion.img
          className={styles.cover}
          src={asset(project.image)}
          alt={project.title}
          variants={itemVariants}
        />
        <div className={styles.badges}>
          {project.categories.map(c => (
            // category pills: no hover animation
            <motion.span key={c} className={styles.badge} variants={itemVariants}>
              {c}
            </motion.span>
          ))}
        </div>
      </motion.header>

      {/* sections */}
      <motion.main className={styles.content} variants={containerVariants}>
        {project.problem && (
          <motion.section className={styles.section} variants={itemVariants}>
            <h2>The Starting Point</h2>
            <p>{project.problem}</p>
          </motion.section>
        )}

        {project.concept && (
          <motion.section className={styles.section} variants={itemVariants}>
            <h2>The Vision</h2>
            <p>{project.concept}</p>

            {project.problemPhoto && (
              // problem image: no hover animation
              <motion.img
                className={styles.problemPhoto}
                src={asset(project.problemPhoto)}
                alt="Concept illustration"
                variants={itemVariants}
              />
            )}
          </motion.section>
        )}

        {!!project.process?.length && (
          <motion.section className={styles.section} variants={itemVariants}>
            <h2>The Journey</h2>
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
            <h2>Powered By</h2>
            <motion.ul
              className={styles.techList}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {project.technologies.map(t => (
                // tech pills: no hover animation
                <motion.li key={t.name} className={styles.tech} variants={itemVariants}>
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

        {!!project.links?.length && (
          <motion.section className={styles.section} variants={itemVariants}>
            <h2>See It In Action</h2>
            {/* animate each link pill in, and add hover pop */}
            <motion.ul
              className={styles.links}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {project.links.map((link, i) => (
                <motion.li key={i} variants={linkItemVariants} whileHover={{ scale: 1.06 }}>
                  {link.github && (
                    <a href={link.github} target="_blank" rel="noreferrer" className={styles.link}>
                      GitHub Repo
                    </a>
                  )}
                  {link.solution && (
                    <a href={link.solution} target="_blank" rel="noreferrer" className={styles.link}>
                      Live Solution
                    </a>
                  )}
                  {link.figma && (
                    <a href={link.figma} target="_blank" rel="noreferrer" className={styles.link}>
                      Figma Prototype
                    </a>
                  )}
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