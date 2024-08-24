import React, { useState } from 'react'
import Card from '../../UI/Card/Card'
import styles from './Signup.module.css'
import { BASE_URL } from '../../../constants'

export default function Signup() {
    const [ formData, setFormData ] = useState({
        name: '',
        email:'',
        password:'',
        conf_pass:''
    })
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);
        const {name, email, password, conf_pass} = formData;
        try{
            if(password !== conf_pass){
                alert("Passwords do not match");
                return;
            }
            const response = await fetch(`${BASE_URL}/auth/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, email, password})
            });
            const data = await response.json();
            console.log(data);
            setFormData({name: '', email: '', password: '', conf_pass: ''});
        }catch(err){
            console.log(err);
        }
    }
  return (
    <Card>
        <div className={styles.card}>
            <h1>QUZZIE</h1>
            <div className={styles.links}>
                <span className={styles.active}>Sign Up</span>
                <span>Login</span>
            </div>
            <form>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input type="text" id='name' name='name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type="email" id='email' name='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                    <label htmlFor='pass'>Password</label>
                    <input type="password" id='pass' name='password' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>
                <div>
                    <label htmlFor='conf_pass'>Confirm Password</label>
                    <input type="password" id='conf_pass' name='conf_pass' value={formData.conf_pass} onChange={(e) => setFormData({ ...formData, conf_pass: e.target.value })} />
                </div>
                <div>
                <button onClick={handleSubmit}>Sign-Up</button>
                </div>
            </form>
        </div>
    </Card>
  )
}
