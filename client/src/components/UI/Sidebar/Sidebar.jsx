import React, { useContext } from 'react'
import styles from './Sidebar.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../AuthContext/AuthContext';

export default function Sidebar() {
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
                <span onClick={() => navigate('/create')} className={location.pathname === "/create" ? styles.active : ""}>Create Quiz</span>
            </div>
            <div className={styles.logout}>
                <hr/>
                <span onClick={handleLogoutClick}>LOGOUT</span>
            </div>
    </aside>
    </>
  )
}
