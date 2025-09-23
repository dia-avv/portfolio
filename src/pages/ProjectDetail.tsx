// src/pages/ProjectDetail.tsx
import { useParams, Link } from "react-router-dom";
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

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Project not found</h1>
        <Link to="/mywork" className={styles.back}>← Back to My Work</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>{project.title}</h1>
        <img className={styles.cover} src={asset(project.image)} alt={project.title} />
        <div className={styles.badges}>
          {project.categories.map(c => (
            <span key={c} className={styles.badge}>{c}</span>
          ))}
        </div>
      </header>

      {project.problem && (
        <section className={styles.section}>
          <h2>Problem Statement</h2>
          <p>{project.problem}</p>
        </section>
      )}
      {project.concept && (
        <section className={styles.section}>
          <h2>Concept</h2>
          <p>{project.concept}</p>
          {project.problemPhoto && (
            <img
              className={styles.problemPhoto}
              src={asset(project.problemPhoto)}
              alt="Concept illustration"
            />
          )}
        </section>
      )}

      {!!project.process?.length && (
        <section className={styles.section}>
          <h2>Process</h2>
          <ol className={styles.process}>
            {project.process.map(step => (
              <li key={step.title} className={styles.step}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {!!project.technologies?.length && (
        <section className={styles.section}>
          <h2>Technologies</h2>
          <ul className={styles.techList}>
            {project.technologies.map(t => (
              <li key={t.name} className={styles.tech}>
                <img
                  src={t.icon}
                  alt={t.name}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                <span>{t.name}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className={styles.footerNav}>
        <Link to="/mywork" className={styles.back}>Back to My Work</Link>
      </footer>
    </div>
  );
}