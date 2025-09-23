import styles from "./MyWork.module.css";
import { Link } from "react-router-dom";
import projectsData from "../data/projects.json";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
};

const projects = projectsData as Project[];

export default function MyWork() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Work</h1>
      <div className={styles.projectList}>
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className={styles.card}
          >
            <div>
              <img src={`${import.meta.env.BASE_URL}${project.image}`} alt={project.title} className={styles.coverPhoto}/>
              <div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </div>
            </div>
            <div className={styles.categories}>
              {project.categories.map((category) => (
                <span key={category} className={styles.category}>
                  {category}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
