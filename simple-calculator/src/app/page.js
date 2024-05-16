"use client";

import Head from 'next/head';
import Calculator from '../../components/Calculator';
import styles from '../../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Simple Calculator</title>
        <meta name="description" content="A simple calculator built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Simple Calculator
        </h1>
        <Calculator />
      </main>
    </div>
  );
}
