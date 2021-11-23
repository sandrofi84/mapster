import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <>
      <h1 className={styles.title}>Welcome to Mapster!</h1>
      <h3>Deployed to S3 with a Github Action!</h3>

      <div className={styles.grid}>
        <Link href="/events">
          <a className={styles.card}>
            <h2>Events &rarr;</h2>
          </a>
        </Link>

        <Link href="/controls">
          <a className={styles.card}>
            <h2>Controls &rarr;</h2>
          </a>
        </Link>
        <Link href="/markers">
          <a className={styles.card}>
            <h2>Markers &rarr;</h2>
          </a>
        </Link>

        <Link href="/clustering">
          <a className={styles.card}>
            <h2>Clustering &rarr;</h2>
          </a>
        </Link>
      </div>
    </>
  );
};

export default Home;
