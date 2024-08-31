import React, { useContext } from 'react'
import Sidebar from '../../UI/Sidebar/Sidebar'
import styles from './Settings.module.css'
import { QuizContext } from '../../../QuizContext/QuizContext'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdShare } from "react-icons/io";

export default function Settings() {
    const { quiz } = useContext(QuizContext);
    const formattedQuizzes = quiz.map((q) => {
        const date = new Date(q.createdAt);
        const day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits for day
        const month = date.toLocaleString('en-US', { month: 'short' }); // Short month name
        const year = date.getFullYear();
    
        q.formattedDate = `${day} ${month}, ${year}`; // Format with comma
        return {
            ...q, // Spread the existing quiz object to retain other properties
            formattedDate: `${day} ${month}, ${year}`, // Add the formattedDate property
        };
      });
  return (
    <>
        <section>
        <Sidebar />
      </section>
      <section className={styles.container}>
        <h1>Quiz Analysis</h1>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Quiz Name</th>
                    <th>Created on</th>
                    <th>Impressions</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {formattedQuizzes.map((quiz, index) => (
                    <tr key={quiz._id}>
                        <td>{index + 1}</td>
                        <td className={styles.name}>{quiz.name}</td>
                        <td>{quiz.formattedDate}</td>
                        <td>{quiz.views}</td>
                        <td><button><FaRegEdit /></button><button><RiDeleteBin5Fill /></button> <button><IoMdShare /></button> </td>
                        <td><a href={`/settings/${quiz._id}`}>Question wise analysis</a></td>
                    </tr>
                ))}
            </tbody>
        </table>
      </section>
    </>
  )
}
