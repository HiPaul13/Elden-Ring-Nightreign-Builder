import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';
import '../styles/LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('admin@nightreign.com');
    const [password, setPassword] = useState('admin');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError("");

        try {
            const data = await apiService.login(email, password);
            localStorage.setItem('token', data.token);
            navigate('/browse');
        } catch (error) {
            setLoginError(error.message);
        }
    };

    return (
        <div className="login-page">
            <img src="/images/Logo1.png" alt="Logo" className="login-logo" />

            <div className="login-box">
                <h2>Sign in with <br/>Email</h2>

                {loginError && <p style={{ color: 'red' }}>{loginError}</p>}

                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="login-btn">Login</button>

                    </form>



                <div>
                    <button className="register-btn" onClick={() => navigate('/register')}>
                        Register
                    </button>
                </div>


            </div>
        </div>
    );
}

export default LoginPage;
