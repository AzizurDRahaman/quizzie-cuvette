import React, { useContext } from 'react'
import styles from './Modals.module.css'
import { BASE_URL } from '../../../constants.js';
import { QuizContext } from '../../../QuizContext/QuizContext.jsx';

export default function DeletionModal( props ) {
    const { setQuiz } = useContext(QuizContext);
    const handleDelete = async () => {
        const id = props.id;
        try {
            const response = await fetch(`${BASE_URL}/quiz/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify({ userId: localStorage.getItem("userId") }),
            });
            const data = await response.json();
            
            if (response.ok) {
                // Fetch the updated quiz list
                
                const updatedResponse = await fetch(`${BASE_URL}/user/info/${localStorage.getItem("userId")}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `${localStorage.getItem("token")}`
                    }
                });
                
                const updatedData = await updatedResponse.json();
                console.log(updatedData);
                setQuiz(updatedData.quizes); // Update the quiz context
                props.handleCloseModal(); // Close the modal after successful deletion
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
  return (
    <div className={styles.modal}>
        <div className={styles.content}>
            <h1>Are you sure you want to delete this quiz?</h1>
            <div>
                <button onClick={props.handleCloseModal}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    </div>
  )
}
