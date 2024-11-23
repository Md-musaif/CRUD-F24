import React, { useState } from 'react'


function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

        const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
      }


      const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
    
        if (!name || !email || !password) {
            return window.alert('name, email, and password are required');
        }
    
        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            });
    
            const { success, message, error } = await response.json();
            
            if (success) {
                window.alert("Successfull",message);
            } 
            else {
                window.alert( message);
            }
    
        } catch (err) {
            window.alert(err.message || err);
        }
    };

    return (
        <div className='container'>
            <h1>MySignup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>
                <button type='submit'>Signup</button>
            </form>
        </div>
    )
}
export default Signup
