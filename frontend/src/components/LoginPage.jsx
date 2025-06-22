// React hooks and routing
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// API service for login
import * as apiService from '../services/apiService';

// CSS styling
import '../styles/LoginPage.css';

/**
 * LoginPage component handles user authentication.
 * Provides email/password fields, error handling, and navigation after login.
 */
function LoginPage() {
    // State for email, password, and error messages
    const [email, setEmail] = useState(''); // Default for testing
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Hook for navigating programmatically
    const navigate = useNavigate();

    /**
     * Handles form submission to login the user.
     */
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoginError("");  // Clear any existing error message

        try {
            // Call login API with credentials
            const data = await apiService.login(email, password);

            // Store token for authenticated access
            localStorage.setItem('token', data.token);

            // Redirect to Browse page after successful login
            navigate('/browse');
        } catch (error) {
            // Show error from server (e.g., invalid credentials)
            setLoginError(error.message);
        }
    };

    return (
        <div className="login-page">
            {/* Logo in top left */}
            <img src="/images/Logo1.png" alt="Logo" className="login-logo" />

            {/* Main login box */}
            <div className="login-box">
                <h2>Sign in with <br />Email</h2>

                {/* Error message if login fails */}
                {loginError && <p style={{ color: 'red' }}>{loginError}</p>}

                {/* Login form */}
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

                {/* Navigate to registration */}
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
