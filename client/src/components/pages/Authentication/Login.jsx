import React, { useContext, useState } from 'react'
import styles from './Signup.module.css'
import { useNavigate } from 'react-router-dom'
import Card from '../../UI/Card/Card';
import { AuthContext } from '../../../AuthContext/AuthContext';

export default function Login() {
    const { isAuthenticated, handleLogin } = useContext(AuthContext);
    const [ formData, setFormData ] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate();


    const handleSubmit = async(e) => {
        e.preventDefault();
        handleLogin(formData);
    }

  return (
    <Card>
        <div className={styles.card}>
            <h1>QUZZIE</h1>
            <div className={styles.links}>
                <span onClick={() => navigate("/sign-up")}>Sign Up</span>
                <span className={styles.active}>Login</span>
            </div>
            <form>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type="email" id='email' name='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                    <label htmlFor='pass'>Password</label>
                    <input type="password" id='pass' name='password' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>
                <div>
                <button onClick={handleSubmit}>Login</button>
                </div>
            </form>
        </div>
    </Card>
  )
}
