import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';
import '../styles/FormStyles.css';

// Component responsible for user login
function LoginPage() {
    // Controlled input state for login form
    const [email, setEmail] = useState('admin@nightreign.com'); // default value for testing
    const [password, setPassword] = useState('admin');         // default password
    const [loginError, setLoginError] = useState('');          // handles error display

    // Navigation hook from React Router
    const navigate = useNavigate();

    // Handles login form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form reload behavior //don't do the things you would normally do on an event
        setLoginError("");  // Clear previous error messages

        try {
            // Call login API with current input values
            const data = await apiService.login(email, password);

            // Store the JWT token in localStorage for authenticated routes
            localStorage.setItem('token', data.token);

            // Redirect to the protected users page
            navigate('/users');
        } catch (error) {
            // Show error message returned from API (e.g., invalid credentials)
            setLoginError(error.message);
        }
    };

    return (
        <div className='page-container'>
            <h2>Login</h2>

            {/* Conditionally show an error message */}
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}

            {/* Login form */}
            <form onSubmit={handleLogin}>
                <div className="form-field">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Submit button */}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;