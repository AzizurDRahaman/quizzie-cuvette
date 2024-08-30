import React, { useContext, useState } from 'react'
import styles from './Sidebar.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../AuthContext/AuthContext';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import InitiateModal from '../Modals/InitiateModal';

export default function Sidebar() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const {handleLogout} = useContext(AuthContext);
  const handleLogoutClick = () => {
    handleLogout();
  }
  return (
    <>
    <aside className={styles.container}>
            <div className={styles.logo}>
                <h1>QUZZIE</h1>
            </div>
            <div className={styles.links}>
                <span onClick={() => navigate('/')} className={location.pathname === "/" ? styles.active : ""}>Dashboard</span>
                <span onClick={() => navigate('/analytics')} 
                className={location.pathname === "/analytics" ? styles.active : ""}>Analytics</span>
                <span onClick={handleOpen}>Create Quiz</span>
            </div>
            <div className={styles.logout}>
                <hr/>
                <span onClick={handleLogoutClick}>LOGOUT</span>
            </div>
    </aside>
    <Modal open={open} onClose={handleClose}>
      <InitiateModal onClose={handleClose} setOpen={setOpen}/>
    </Modal>
    </>
  )
}
