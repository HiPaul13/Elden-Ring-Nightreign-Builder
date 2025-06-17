import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';
import '../styles/LoginPage.css'; // reuse the styling

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setProfilePicture(reader.result);
        reader.readAsDataURL(file);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await apiService.register(username, email, password, profilePicture);
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-page">
            <img src="/images/logo.png" alt="Logo" className="login-logo" />

            <div className="login-box">
                <h2>Create an Account</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
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
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <button type="submit" className="login-btn">Register</button>
                </form>

                <button className="register-btn" onClick={() => navigate('/login')}>
                    Back to Login
                </button>
            </div>
        </div>
    );
}

export default RegisterPage;
