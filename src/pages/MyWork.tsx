import { Link } from "react-router-dom";
import { motion, easeOut } from "framer-motion";
import type { Variants } from "framer-motion";
import styles from "./MyWork.module.css";
import projectsData from "../data/projects.json";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
};

const projects = projectsData as Project[];

// Parent container for staggered children
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

export default function MyWork() {
  return (
    <motion.div
      className={styles.container}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* Page Title */}
      <motion.h1 className={styles.title} variants={itemVariants}>
        My Work
      </motion.h1>

      {/* Project List */}
      <motion.div className={styles.projectList} variants={containerVariants}>
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <Link to={`/projects/${project.id}`} className={styles.card}>
              <motion.img
                src={`${import.meta.env.BASE_URL}${project.image}`}
                alt={project.title}
                className={styles.coverPhoto}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
              <div className={styles.cardContent}>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <p>{project.description}</p>

                <div className={styles.categories}>
                  {project.categories.map((category) => (
                    <motion.span
                      key={category}
                      className={styles.category}
                      whileHover={{ scale: 1.1 }}
                    >
                      {category}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}