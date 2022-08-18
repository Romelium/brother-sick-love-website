import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Can We Hang Out?</title>
        <meta
          name="description"
          content="My brother beg on his knees for me to make this site"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}></main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/Romelianism"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by your and truly
          <span className={styles.logo}>Romelianism</span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
