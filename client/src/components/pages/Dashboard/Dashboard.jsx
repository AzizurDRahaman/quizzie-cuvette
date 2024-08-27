import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../UI/Sidebar/Sidebar'
import { AuthContext } from '../../../AuthContext/AuthContext'
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import styles from './Dashboard.module.css'
import { BASE_URL } from '../../../constants';

export default function Dashboard() {
    const {isAuthenticated} = useContext(AuthContext);
    const [ info, setInfo ] = useState({
      total_quiz: 0,
      total_questions: 0,
      total_views: 0
    });
    const [ trending, setTrending ] = useState([]);
    const navigate = useNavigate();
    if(!isAuthenticated){
        navigate('/login');
    }

    useEffect(() => {
      const fetchInfo = async()=>{
        const response = await fetch(`${BASE_URL}/user/info/${localStorage.getItem("userId")}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `${localStorage.getItem("token")}`
          }
        });

        const data = await response.json();

        if(data.total_views>999){
          data.total_views = (Math.floor(data.total_views / 100) / 10).toFixed(1) + "K";
        }

        setInfo(data);
      }

      const fetchTrending = async()=>{
        const response = await fetch(`${BASE_URL}/quiz/trending`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `${localStorage.getItem("token")}`
          }
        });
        const data = await response.json();
        const formattedQuizzes = data.quizzes.map((quiz) => {
          const date = new Date(quiz.createdAt);
          const day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits for day
          const month = date.toLocaleString('en-US', { month: 'short' }); // Short month name
          const year = date.getFullYear();
      
          quiz.formattedDate = `${day} ${month}, ${year}`; // Format with comma
          return quiz;
        });
        setTrending(formattedQuizzes);
      }

      fetchInfo();
      fetchTrending();
    },[]);
  return (
    <>
      <section>
        <Sidebar />
      </section>
      <section className={styles.container}>
        <div className={styles.cardList}>
          <div className={styles.card} style={{color:"#FF5D01"}}>
            <p><span>{info.total_quiz}</span> Quiz</p>
            <p>Created</p>
          </div>
          <div className={styles.card} style={{color:"#60B84B"}}>
            <p><span>{info.total_questions}</span> Questions</p>
            <p>Created</p>
          </div>
          <div className={styles.card} style={{color:"#5076FF"}}>
            <p><span>{info.total_views}</span> Total</p>
            <p>Impressions</p>
          </div>
        </div>
        <div className={styles.trending}>
          <h1>Trending Quizes</h1>
          <div className={styles.capsuleList}>
            {trending.map((quiz)=>{
              return (
              <div className={styles.capsule} key={quiz._id}>
                <div className={styles.header}>
                  <p>{quiz.name}</p>
                  <span>{quiz.views} <FaEye /></span>
                </div>
                <p className={styles.info}>Created on: {quiz.formattedDate}</p>
              </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
