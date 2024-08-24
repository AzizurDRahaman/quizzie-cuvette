import React, { useContext } from 'react'
import Sidebar from '../../UI/Sidebar/Sidebar'
import { AuthContext } from '../../../AuthContext/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();
    if(!isAuthenticated){
        navigate('/login');
    }
  return (
    <div>
        <Sidebar />
    </div>
  )
}
