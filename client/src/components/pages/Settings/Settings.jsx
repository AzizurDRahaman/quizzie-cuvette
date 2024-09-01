import React, { useContext, useState } from 'react'
import Sidebar from '../../UI/Sidebar/Sidebar'
import styles from './Settings.module.css'
import { QuizContext } from '../../../QuizContext/QuizContext'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdShare } from "react-icons/io";
import { Alert, Modal, Snackbar } from '@mui/material';
import DeletionModal from '../../UI/Modals/DeletionModal';

export default function Settings() {
    const { quiz } = useContext(QuizContext);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedQuizId, setSelectedQuizId] = useState(null);

    const handleOpenModal = (id) => {
      setSelectedQuizId(id);
      setOpenModal(true);
    };
  const handleCloseModal = () => setOpenModal(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
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

    const copy = (id)=>{
        const baseUrl = "https://quizzie-cuvette-8nwh.vercel.app/"; // Replace with your actual base URL
        const url = `${baseUrl}/quiz/${id}`;
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        handleClick();
      }

    
    
  return (
    <>
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Link Copied to Clipboard!
        </Alert>
      </Snackbar>
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
                        <td>
                            <button><FaRegEdit /></button>
                            <button onClick={() => handleOpenModal(quiz._id)}><RiDeleteBin5Fill /></button> 
                            <button onClick={()=>{copy(quiz._id)}}><IoMdShare /></button> 
                        </td>
                        <td><a href={`/settings/${quiz._id}`}>Question wise analysis</a></td>
                    </tr>
                ))}
            </tbody>
        </table>
      </section>
      <Modal open={openModal} onClose={handleCloseModal}>
        <DeletionModal id={selectedQuizId} handleCloseModal={handleCloseModal} />
      </Modal>
    </>
  )
}
