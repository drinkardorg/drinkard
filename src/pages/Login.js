import axios from "axios";
import NavigationBar from "../NavigationBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import { UserState } from "../context/User";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

    const onLoginButtonClicked = async (event) => {
        event.preventDefault();

        setSubmitted(true);

        const usernameValid = username.length >= 3 && username.length <= 15;
        const passwordValid = password.length >= 3;

        if (usernameValid && passwordValid) {
            let url = "http://localhost:8000/login";
            let body = {
                username: username,
                password: password
            };

            const response = await axios.post(url, body);
            if (response.data.err !== undefined) {
                setError(response.data.err);
            } else {
                navigateToHome("/");

                UserState.username = username;
                UserState.password = password;
            }
        }
    }

    return (
        <div>
            <NavigationBar />

            <div className="center">
                <div className="login-form-container">
                    <h1 className="form-field-title">Login</h1>
                    <form className="login-form" onSubmit={onLoginButtonClicked}>
                        <input
                            class="form-field"
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={onUsernameChange}
                        />

                        {submitted && (username.length < 3 || username.length > 15) ?
                            <p className="error">Username must be between 3 and 15 characters!</p> : null
                        }

                        <input
                            class="form-field"
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={onPasswordChange}
                        />

                        {submitted && (password.length < 3 || password.length > 250) ?
                            <p className="error">Password must be atleast 3 characters!</p> : null
                        }

                        <p className="to-register">
                            Don't have an account?
                            <a href="/register"> Register</a>
                        </p>

                        <button className="form-field" type="submit">Login</button>

                        {submitted && error.length > 0 ?
                            <p className="error">{error}</p> : null
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;