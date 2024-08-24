import React, { useState } from 'react'
import styles from './Signup.module.css'
import { useNavigate } from 'react-router-dom'
import Card from '../../UI/Card/Card';

export default function Login() {
    const [ formData, setFormData ] = useState({
        name: '',
        email:'',
        password:'',
        conf_pass:''
    })
    const navigate = useNavigate();
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
                <button>Login</button>
                </div>
            </form>
        </div>
    </Card>
  )
}
