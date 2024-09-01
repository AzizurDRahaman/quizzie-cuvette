import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Quiz.module.css";
import { BASE_URL } from "../../../constants.js";
import cup from "../../../assets/Images/Cup.png";

export default function Quiz() {
  const { quizId } = useParams();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isOngoing, setIsOngoing] = useState(true);
  const [quiz, setQuiz] = useState({
    questions: [
      {
        question: "Your question text comes here, its a sample text.",
        options: [
          {
            text: "Option 1",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            count: 0,
          },
        ],
        time: 0,
        views: 0,
      },
    ],
    type: "",
  });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/quiz/${quizId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [quizId]);

  useEffect(() => {
    const addView = async () => {
      try {
        const response = await fetch(`${BASE_URL}/quiz/addView/${quizId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ index }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (index < quiz.questions.length)
    addView();
  }, [index, quizId]);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${BASE_URL}/quiz/answer/${quizId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index, answer: activeIndex }),
    });
    const data = await response.json();

    if (data.isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    setIndex(index + 1);
    setActiveIndex(null);
    if (index === quiz.questions.length-1) {
      console.log(correctAnswers);
      setIsOngoing(false);
    }
  };

  const handleClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.body}>
            {isOngoing && (
              <>
                <div className={styles.header}>
                  <span>
                    0{index + 1}/0{quiz.questions.length}
                  </span>
                  {quiz.questions[index].time > 0 && (
                    <span>00:{quiz.questions[index].time}s</span>
                  )}
                </div>
                <h2>{quiz.questions[index].question}</h2>
                <div className={styles.options}>
                  {quiz.questions[index].options.map((option, i) => (
                    <div
                      className={`${styles.option} ${
                        activeIndex === i ? styles.active : ""
                      }`}
                      key={i}
                      onClick={() => handleClick(i)}
                    >
                      {option.imageUrl && <img src={option.imageUrl} />}
                      {option.text && <span>{option.text}</span>}
                    </div>
                  ))}
                </div>
                <div className={styles.footer}>
                  <button onClick={handleSubmit}>Next</button>
                </div>
              </>
            )}
            {
              !isOngoing && (
                <>
                  {quiz.type === "mcq" &&<div className={styles.result}>
                    <h2>Congrats Quiz is Completed</h2>
                    <img src={cup} />
                    <h2>Your Score is <span>{correctAnswers}/{quiz.questions.length}</span></h2>
                  </div>}
                  {quiz.type === "poll" && <div className={styles.result}>
                      <h1 className={styles.thankYou}>Thank you for participating in the Poll</h1>
                    </div>}
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}
