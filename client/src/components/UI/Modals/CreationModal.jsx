import React, { useContext, useState } from "react";
import styles from "./Modals.module.css";
import { BASE_URL } from "../../../constants";
import { QuizContext } from "../../../QuizContext/QuizContext";

export default function CreationModal({ data, onClose, setOpen}) {
  const { setQuiz, quiz } = useContext(QuizContext);
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: [
        { text: "", imageUrl: "" },
        { text: "", imageUrl: "" },
        { text: "", imageUrl: "" },
        { text: "", imageUrl: "" },
      ],
      type: "t",
      answer: -1, // Tracks the selected answer index
      time: 0,
    },
  ]);
  const [index, setIndex] = useState(1);
  const addQuestion = () => {
    if (questions.length < 5) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          question: "",
          options: [
            { text: "", imageUrl: "" },
            { text: "", imageUrl: "" },
            { text: "", imageUrl: "" },
            { text: "", imageUrl: "" },
          ],
          type: "t",
          answer: -1,
          time: 0,
        },
      ]);
    }
  };

  const removeSlide = (index) => {
    if (questions.length > 1) {
      setQuestions((prevQuestion) =>
        prevQuestion.filter((_, i) => i !== index)
      );
    }
  };

  const handleTimeClick = (index, timeValue) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) => (i === index ? { ...q, time: timeValue } : q))
    );
  };

  const handleTypeChange = (index, type) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) => (i === index ? { ...q, type: type } : q))
    );
  };

  const handleAnswerChange = (questionIndex, answerIndex) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === questionIndex ? { ...q, answer: answerIndex } : q
      )
    );
  };

  const handleQuestionChange = (questionIndex, question) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === questionIndex ? { ...q, question: question } : q
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateQuestions = () => {
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
  
        // Check if the question text is empty
        if (!question.question.trim()) {
          return { isValid: false, message: `Question ${i + 1} cannot be empty.` };
        }
  
        // Validate options based on type
        for (let option of question.options) {
          if (question.type === "t" && !option.text.trim()) {
            return { isValid: false, message: `Text in question ${i + 1} cannot be empty.` };
          }
          if (question.type === "i" && !option.imageUrl.trim()) {
            return { isValid: false, message: `Image URL in question ${i + 1} cannot be empty.` };
          }
          if (question.type === "it") {
            if (!option.text.trim() || !option.imageUrl.trim()) {
              return { isValid: false, message: `Both text and image URL in question ${i + 1} must be filled.` };
            }
          }
        }
      }
      return { isValid: true };
    };
  
    // Call validation function
    const validation = validateQuestions();
  
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }
    const formData = {
      name: data.name,
      type: data.type,
      questions: questions,
      userId: localStorage.getItem("userId"),
    };

    console.log(formData);
    
    
    const response = await fetch(`${BASE_URL}/quiz/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();

      setQuiz([...quiz, result.quiz]);
      console.log(quiz);
      setOpen(false);

  };

  // const closeModal = () => {
  //   onClose();
  // };

  return (
    <>
      <form className={`${styles.modal} ${styles["creation-modal"]}`}>
        <div className={styles["slide-container"]}>
          {questions.map((slide, i) => (
            <section key={i}>
              {questions.length > 1 && (
                <span onClick={() => removeSlide(i)}>+</span>
              )}
              <button
                key={i}
                onClick={() => setIndex(i + 1)}
                className={`${styles.slide} ${
                  i === index - 1 ? styles.active : ""
                }`}
                type="button"
              >
                {i + 1}
              </button>
            </section>
          ))}
          {questions.length < 5 && (
            <button
              onClick={addQuestion}
              className={styles.addSlide}
              type="button"
            >
              +
            </button>
          )}
        </div>
        <input type="text" placeholder="Question" value={questions[index - 1].question} onChange={(e) => handleQuestionChange(index - 1, e.target.value)} />
        <div className={styles.options}>
          <p>Option type</p>
          <div>
            <div>
              <input
                type="radio"
                name="type"
                value="t"
                defaultChecked
                onChange={() => handleTypeChange(index - 1, "t")}
              />
              <label>Text</label>
            </div>
            <div>
              <input
                type="radio"
                name="type"
                value="i"
                onChange={() => handleTypeChange(index - 1, "i")}
              />
              <label>Image URL</label>
            </div>
            <div>
              <input
                type="radio"
                name="type"
                value="it"
                onChange={() => handleTypeChange(index - 1, "it")}
              />
              <label>Text and Image URL</label>
            </div>
          </div>
        </div>
        <section className={styles["answers-container"]}>
          <div className={styles.answers}>
            {questions[index - 1].options.map((option, optionIndex) => (
              <div key={optionIndex}>
                {data.type === "mcq" && (
                  <input
                    type="radio"
                    name={`answer-${index}`}
                    checked={questions[index - 1].answer === optionIndex}
                    onChange={() => handleAnswerChange(index - 1, optionIndex)}
                  />
                )}
                {(questions[index - 1].type === "t" ||
                  questions[index - 1].type === "it") && (
                  <input
                    type="text"
                    name={`options-${index}`}
                    placeholder="Text"
                    className={
                      questions[index - 1].answer === optionIndex
                        ? styles.active
                        : ""
                    }
                    value={option.text}
                    onChange={(e) =>
                      setQuestions((prevQuestions) =>
                        prevQuestions.map((q, i) =>
                          i === index - 1
                            ? {
                                ...q,
                                options: q.options.map((opt, j) =>
                                  j === optionIndex
                                    ? { ...opt, text: e.target.value }
                                    : opt
                                ),
                              }
                            : q
                        )
                      )
                    }
                  />
                )}
                {(questions[index - 1].type === "i" ||
                  questions[index - 1].type === "it") && (
                  <input
                    type="text"
                    name={`options-${index}`}
                    placeholder="Image URL"
                    className={
                      questions[index - 1].answer === optionIndex
                        ? styles.active
                        : ""
                    }
                    value={option.imageUrl}
                    onChange={(e) =>
                      setQuestions((prevQuestions) =>
                        prevQuestions.map((q, i) =>
                          i === index - 1
                            ? {
                                ...q,
                                options: q.options.map((opt, j) =>
                                  j === optionIndex
                                    ? { ...opt, imageUrl: e.target.value }
                                    : opt
                                ),
                              }
                            : q
                        )
                      )
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <div className={styles.timer}>
            <p>Timer</p>
            <button
              type="button"
              className={questions[index - 1].time === 0 ? styles.active : ""}
              onClick={() => handleTimeClick(index - 1, 0)}
            >
              OFF
            </button>
            <button
              type="button"
              className={questions[index - 1].time === 5 ? styles.active : ""}
              onClick={() => handleTimeClick(index - 1, 5)}
            >
              5 sec
            </button>
            <button
              type="button"
              className={questions[index - 1].time === 10 ? styles.active : ""}
              onClick={() => handleTimeClick(index - 1, 10)}
            >
              10 sec
            </button>
          </div>
        </section>
        <div className={styles.buttons}>
          <button onClick={onClose}>Cancel</button>
          <button
          onClick={handleSubmit}
          >
            Create Quiz
          </button>
        </div>
      </form>
    </>
  );
}
