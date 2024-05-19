"use client";

import Calculator from '../../components/Calculator';
import styles from '../../styles/Home.module.css';
import React from 'react';

export default function Home() {
  return (
    <div className={styles.carcase}>
      <Calculator />
    </div>
  );
}
