import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {

    const [quiz, setQuiz] = useState([]);

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
            setQuiz(data.quizes);
          }

        fetchInfo();
    },[]);

    return (
        <QuizContext.Provider value={{ quiz, setQuiz }} >{children}</QuizContext.Provider>
    );
}