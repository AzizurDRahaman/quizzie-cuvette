import React, { useContext } from 'react'
import Sidebar from '../../UI/Sidebar/Sidebar'
import { AuthContext } from '../../../AuthContext/AuthContext'
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import styles from './Dashboard.module.css'

export default function Dashboard() {
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();
    if(!isAuthenticated){
        navigate('/login');
    }
  return (
    <>
      <section>
        <Sidebar />
      </section>
      <section className={styles.container}>
        <div className={styles.cardList}>
          <div className={styles.card} style={{color:"#FF5D01"}}>
            <p><span>12</span> Quiz</p>
            <p>Created</p>
          </div>
          <div className={styles.card} style={{color:"#60B84B"}}>
            <p><span>12</span> Questions</p>
            <p>Created</p>
          </div>
          <div className={styles.card} style={{color:"#5076FF"}}>
            <p><span>12</span> Total</p>
            <p>Impressions</p>
          </div>
        </div>
        <div className={styles.trending}>
          <h1>Trending Quizes</h1>
          <div className={styles.capsuleList}>
            <div className={styles.capsule}>
              <div className={styles.header}>
                <p>Quiz 1</p>
                <span>667 <FaEye /></span>
              </div>
              <p className={styles.info}>Created on: 26 Aug, 2023</p>
            </div>
            <div className={styles.capsule}>
              <div className={styles.header}>
                <p>Quiz 1</p>
                <span>667 <FaEye /></span>
              </div>
              <p className={styles.info}>Created on: 26 Aug, 2023</p>
            </div>
            <div className={styles.capsule}>
              <div className={styles.header}>
                <p>Quiz 1</p>
                <span>667 <FaEye /></span>
              </div>
              <p className={styles.info}>Created on: 26 Aug, 2023</p>
            </div>
            <div className={styles.capsule}>
              <div className={styles.header}>
                <p>Quiz 1</p>
                <span>667 <FaEye /></span>
              </div>
              <p className={styles.info}>Created on: 26 Aug, 2023</p>
            </div>
            <div className={styles.capsule}>
              <div className={styles.header}>
                <p>Quiz 1</p>
                <span>667 <FaEye /></span>
              </div>
              <p className={styles.info}>Created on: 26 Aug, 2023</p>
            </div>
            <div className={styles.capsule}>
              <div className={styles.header}>
                <p>Quiz 1</p>
                <span>667 <FaEye /></span>
              </div>
              <p className={styles.info}>Created on: 26 Aug, 2023</p>
            </div>
            <div className={styles.capsule}>
              <div className={styles.header}>
                <p>Quiz 1</p>
                <span>667 <FaEye /></span>
              </div>
              <p className={styles.info}>Created on: 26 Aug, 2023</p>
            </div>
            <div className={styles.capsule}>
              <div className={styles.header}>
                <p>Quiz 1</p>
                <span>667 <FaEye /></span>
              </div>
              <p className={styles.info}>Created on: 26 Aug, 2023</p>
            </div>
            <div className={styles.capsule}>
              <div className={styles.header}>
                <p>Quiz 1</p>
                <span>667 <FaEye /></span>
              </div>
              <p className={styles.info}>Created on: 26 Aug, 2023</p>
            </div>
            <div className={styles.capsule}>
              <div className={styles.header}>
                <p>Quiz 1</p>
                <span>667 <FaEye /></span>
              </div>
              <p className={styles.info}>Created on: 26 Aug, 2023</p>
            </div>
            <div className={styles.capsule}>
              <div className={styles.header}>
                <p>Quiz 1</p>
                <span>667 <FaEye /></span>
              </div>
              <p className={styles.info}>Created on: 26 Aug, 2023</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
