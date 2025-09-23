import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <h2 className={styles.title}>Contact Info</h2>
      <div className={styles.infoGrid}>
        <div>
          <span className={styles.label}>GitHub:</span>
          <a
            href="https://github.com/dia-avv"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            dia-avv
          </a>
        </div>
        <div>
          <span className={styles.label}>Phone:</span>
          <a href="tel:+4549905480" className={styles.link}>
            +45 49 90 54 80
          </a>
        </div>
        <div>
          <span className={styles.label}>LinkedIn:</span>
          <a
            href="https://www.linkedin.com/in/andreea-vulpasu"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Andreea Vulpasu
          </a>
        </div>
        <div>
          <span className={styles.label}>CV:</span>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            See my CV
          </a>
        </div>
        <div>
          <span className={styles.label}>Email:</span>
          <a href="mailto:vulpasu.andreea@gmail.com" className={styles.link}>
            vulpasu.andreea@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
