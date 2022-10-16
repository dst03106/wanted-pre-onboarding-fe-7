import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Signup() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const { email, password } = inputs;
    const navigate = useNavigate();
    const isInvalidInput = !email.includes("@") || password.length < 8;

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/todo");
        }
    }, []);

    const handleSubmit = async () => {
        await axios.post(
            "https://pre-onboarding-selection-task.shop/auth/signup",
            {
                "email": inputs.email,
                "password": password
            }
        )
            .then(response => {
                localStorage.setItem('token', response.data.access_token);
                alert('성공적으로 로그인 했습니다');
                navigate("/todo");
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    return <>
        <form>
            <p>
                <label>Email address</label><br />
                <input name="email" type="email" onChange={handleInputChange} value={email} /><br />
            </p>
            <p>
                <label>Password</label><br />
                <input name="password" type="password" onChange={handleInputChange} value={password} /><br />
            </p>
        </form>
        <p>
            <button onClick={handleSubmit} disabled={isInvalidInput}>Register</button>
        </p>
    </>
}

export default Signup;