import React, { useState } from 'react'
import { TextField } from '@mui/material/';

function Signup() {

    const [signupInfo, setSIgnupInfo] = useState({
        name: "",
        email: "",
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSIgnupInfo({ ...signupInfo, [name]: value })
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return window.alert("name,email,password are required")
        }
        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            })

            const { success, message, error } = await response.json();
            if (success) {
                window.alert("Successfull", message)
            } else {
                window.alert(message)
            }
        } catch (err) {
            window.alert('Server Error', err)

        }
    }

    return (
        <>
            <form onSubmit={handleSignup}>
                <label>Name</label>
                <input type="name" name="name" onChange={handleChange} /><br></br>
                <label>Email</label>
                <input type="email" name="email" onChange={handleChange} /><br></br>
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} /><br></br>
                <button type="submit">Submit</button>
            </form>


        </>
    )
}

export default Signup