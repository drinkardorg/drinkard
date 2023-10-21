import "./Register.css"
import { useState } from "react";
import NavigationBar from "../NavigationBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    const navigateToHome = useNavigate();

    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const onUsernameChange = (event) => {
        event.preventDefault();
        setUsername(event.target.value);
    };

    const onPasswordChange = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    }

    const onVerifyPasswordChange = (event) => {
        event.preventDefault();
        setVerifyPassword(event.target.value);
    }

    const onRegisterButtonClicked = async (event) => {
        event.preventDefault();

        setSubmitted(true);

        const usernameValid = username.length >= 3 && username.length <= 15;
        const passwordValid = password.length >= 3;
        const verifyPasswordValid = password === verifyPassword;

        if (usernameValid && passwordValid && verifyPasswordValid) {
            let url = "http://localhost:8000/register";
            let body = {
                username: username,
                password: password
            };

            const response = await axios.post(url, body);
            if (response.data.err.length > 0) {
                setError(response.data.err);
            } else {
                navigateToHome("/");
            }
        }
    }

    return (
        <div className="register">
            <NavigationBar />

            <div className="center">
                <div className="register-form-container">
                    <h1 className="form-field-title">Register</h1>
                    <form className="register-form" onSubmit={onRegisterButtonClicked}>
                        <input
                            className="form-field"
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={onUsernameChange}
                        />

                        {submitted && (username.length < 3 || username.length > 15) ?
                            <p className="error">Username must be between 3 and 15 characters!</p> : null
                        }

                        <input
                            className="form-field"
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={onPasswordChange}
                        />

                        {submitted && (password.length < 3 || password.length > 250) ?
                            <p className="error">Password must be atleast 3 characters!</p> : null
                        }

                        <input
                            className="form-field"
                            type="password"
                            placeholder="Verify Password"
                            name="verifypassword"
                            onChange={onVerifyPasswordChange}
                        />

                        {submitted && password !== verifyPassword ?
                            <p className="error">Password mismatch!</p> : null
                        }

                        <div className="submit-button">
                            <button className="form-field" type="submit">Register</button>
                        </div>

                        {submitted && error.length > 0 ?
                            <p className="error">{error}</p> : null
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;