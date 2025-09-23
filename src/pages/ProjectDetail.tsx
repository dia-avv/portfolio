// src/pages/ProjectDetail.tsx
import { useCallback, useEffect, useState } from "react";
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
  gallery?: string[];
};

const projects = raw as Project[];
const asset = (p?: string) =>
  p ? `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}` : "";

/* page-level + stagger */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

/* section/item entrance */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

/* link pill entrance + hover */
const linkItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  const [lbIndex, setLbIndex] = useState<number | null>(null);

  // lock body scroll while open
  useEffect(() => {
    if (lbIndex !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [lbIndex]);

  // keyboard: ESC/←/→
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (lbIndex === null || !project?.gallery?.length) return;
      if (e.key === "Escape") setLbIndex(null);
      if (e.key === "ArrowRight")
        setLbIndex((i) => (i! + 1) % project.gallery!.length);
      if (e.key === "ArrowLeft")
        setLbIndex(
          (i) => (i! - 1 + project.gallery!.length) % project.gallery!.length
        );
    },
    [lbIndex, project?.gallery]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

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
          <Link to="/mywork" className={styles.back}>
            ← Back to My Work
          </Link>
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
        {/* image: no hover animation */}
        <motion.img
          className={styles.cover}
          src={asset(project.image)}
          alt={project.title}
          variants={itemVariants}
        />
        <div className={styles.badges}>
          {project.categories.map((c) => (
            // category pills: no hover animation
            <motion.span
              key={c}
              className={styles.badge}
              variants={itemVariants}
            >
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
              {project.process.map((step) => (
                <motion.li
                  key={step.title}
                  className={styles.step}
                  variants={itemVariants}
                >
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
              {project.technologies.map((t) => (
                // tech pills: no hover animation
                <motion.li
                  key={t.name}
                  className={styles.tech}
                  variants={itemVariants}
                >
                  <img
                    src={t.icon}
                    alt={t.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                  <span>{t.name}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>
        )}

        {!!project.gallery?.length && (
          <div className={styles.gallery}>
            {project.gallery.map((src, i) => (
              <img
                key={i}
                src={asset(src)}
                alt={`${project.title} screenshot ${i + 1}`}
                className={styles.galleryImage}
                onClick={() => setLbIndex(i)} // 👈 open lightbox
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setLbIndex(i)}
              />
            ))}
          </div>
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
                <motion.li
                  key={i}
                  variants={linkItemVariants}
                  whileHover={{ scale: 1.06 }}
                >
                  {link.github && (
                    <a
                      href={link.github}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.link}
                    >
                      GitHub Repo
                    </a>
                  )}
                  {link.solution && (
                    <a
                      href={link.solution}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.link}
                    >
                      Live Solution
                    </a>
                  )}
                  {link.figma && (
                    <a
                      href={link.figma}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.link}
                    >
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
        <Link to="/mywork" className={styles.back}>
          ← Back to My Work
        </Link>
      </motion.footer>
      {lbIndex !== null && project.gallery && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setLbIndex(null)}
        >
          <div
            className={styles.lightboxInner}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.lightboxClose}
              aria-label="Close"
              onClick={() => setLbIndex(null)}
            >
              ×
            </button>

            {project.gallery.length > 1 && (
              <button
                className={styles.lightboxPrev}
                aria-label="Previous image"
                onClick={() =>
                  setLbIndex(
                    (i) =>
                      (i! - 1 + project.gallery!.length) %
                      project.gallery!.length
                  )
                }
              >
                ‹
              </button>
            )}

            <img
              className={styles.lightboxImage}
              src={asset(project.gallery[lbIndex])}
              alt={`${project.title} screenshot ${lbIndex + 1}`}
            />

            {project.gallery.length > 1 && (
              <button
                className={styles.lightboxNext}
                aria-label="Next image"
                onClick={() =>
                  setLbIndex((i) => (i! + 1) % project.gallery!.length)
                }
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
