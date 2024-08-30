import React, { useState } from 'react'
import styles from './Modals.module.css'
import { Modal } from '@mui/material';
import CreationModal from './CreationModal';

export default function InitiateModal({ onClose, setOpen }) {
    const [activeType, setActiveType] = useState('mcq'); // Default active type is 'Q & A'
    const [ formData, setFormData ] = useState({
        name: '',
        type: activeType
    })
    const [childOpen, setChildOpen] = useState(false);
  const handleOpen = () => {
    setChildOpen(true);
    // onClose();
  };
  const handleClose = () => {
    setChildOpen(false);
  };

  const handleTypeClick = (type) => {
    setActiveType(type); // Set the clicked type as active
    setFormData({ ...formData, type: type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.name === '') return;
    handleOpen();
  };

  return (
    <>
      <form className={styles.modal}>
        <input type="text" placeholder='Quiz Name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <div className={styles.types}>
            <p>Quiz Type</p>
            <span className={activeType === 'mcq' ? styles.active : ''}
            onClick={() => handleTypeClick('mcq')}>Q & A</span>
            <span className={activeType === 'poll' ? styles.active : ''}
            onClick={() => handleTypeClick('poll')}>Poll Type</span>
        </div>
        <div className={styles.buttons}>
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleSubmit}>Continue</button>
        </div>
      </form>
      <Modal open={childOpen} onClose={handleClose} >
        <CreationModal data={formData} onClose handleClose setOpen={setOpen}/>
      </Modal>
    </>
  )
}
