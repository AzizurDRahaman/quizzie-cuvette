import React, { useEffect, useState } from "react";
import Sidebar from "../../UI/Sidebar/Sidebar";
import styles from "./Settings.module.css";
import { BASE_URL } from "../../../constants";
import { useParams } from "react-router-dom";

export default function QuizDetails() {
  const [details, setDetails] = useState({
    name: "Quiz 2",
    views: 100,
    createdAt: "30 Aug, 2024",
    type: "mcq",
    quizDetails: [
      {
        question: "",
        views: 0,
        correctAttempts: 0,
        incorrectAttempts: 0,
        count: [0,0,0,0],
      },
    ],
  });
  const { quizId } = useParams();
  console.log(details);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/quiz/details/${quizId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        });

        const data = await response.json();
        const date = new Date(data.createdAt);
        const day = date.getDate().toString().padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();
        const formattedDate = `${day} ${month}, ${year}`;

        // Update the details object with the formatted date
        setDetails({ ...data, createdAt: formattedDate });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [quizId]);

  return (
    <>
      <section>
        <Sidebar />
      </section>
      <section className={styles.container}>
        <div className={styles.heading}>
          <h2>{details.name} Question Analysis</h2>
          <div>
            <p>Created On: {details.createdAt}</p>
            <p>Impressions: {details.views}</p>
          </div>
        </div>
        {details.quizDetails.map((q, index) => (
          <div className={styles.detail} key={index}>
            <h2>
              Q.{index + 1} {q.question}
            </h2>
            {details.type === "mcq" && (
              <div className={styles.body}>
                <div>
                  <p>{q.views}</p>
                  <span>people attempted the question</span>
                </div>
                <div>
                  <p>{q.correctAttempts}</p>
                  <span>people answered correctly</span>
                </div>
                <div>
                  <p>{q.incorrectAttempts}</p>
                  <span>people answered incorrectly</span>
                </div>
              </div>
            )}
            {details.type === "poll" && (
              <div className={styles.body}>
                {q.count.map((c, index) => (
                  <div key={index}>
                    <p>{c}</p>
                    <span>people chose option {index + 1}</span>
                  </div>
                ))}
              </div>
            )}
            <hr />
          </div>
        ))}
      </section>
    </>
  );
}
