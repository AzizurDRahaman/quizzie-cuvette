import React, { useEffect } from "react";
import styles from "./Quiz.module.css";

export default function Quiz() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.body}>
          <div className={styles.header}>
            <span>01/04</span>
            <span>00:10s</span>
          </div>
          <h2>Your question text comes here, its a sample text.</h2>
          <div className={styles.options}>
            <div className={styles.option}><img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" /> Option 1</div>
            <div className={styles.option}>Option 2</div>
            <div className={styles.option}>Option 3</div>
            <div className={styles.option}>Option 4</div>
          </div>
          <div className={styles.footer}>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
