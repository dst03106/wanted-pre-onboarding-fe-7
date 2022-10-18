import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { signUp } from '../apis';

const Login = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const { email, password } = inputs;

    const isInvalidInput = !email.includes("@") || password.length < 8;

    const handleInputChange = ({ name, value }) => {
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        const ok = await signUp({ email, password });

        if (ok) navigate("/todo");
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/todo");
        }
    }, []);

    return <>
        <form>
            <div>
                <label>Email address</label>
                <br />
                <input name="email" type="email" onChange={({ target: { name, value } }) => handleInputChange({ name, value })} value={email} />
                <br />
            </div>
            <div>
                <label>Password</label>
                <br />
                <input name="password" type="password" onChange={({ target: { name, value } }) => handleInputChange({ name, value })} value={password} />
                <br />
            </div>
        </form>
        <div>
            <button onClick={handleSubmit} disabled={isInvalidInput}>Register</button>
        </div>
    </>
}

export default Login;