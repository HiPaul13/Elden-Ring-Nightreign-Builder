// React hooks and router utilities
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// API service to handle registration
import * as apiService from '../services/apiService';

// Shared styling with the login page
import '../styles/LoginPage.css';

/**
 * Component for user registration.
 * Collects username, email, password, and profile picture,
 * then submits the data to the backend.
 */
function RegisterPage() {
    // Form state variables
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // To navigate programmatically after registration

    /**
     * Handles image file upload and converts it to base64 for DB storage.
     */
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setProfilePicture(reader.result); // Set base64 image string
        reader.readAsDataURL(file);
    };

    /**
     * Handles form submission and registers the user via API.
     */
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await apiService.register(username, email, password, profilePicture); // Call backend
            navigate('/login'); // Redirect to login after success
        } catch (err) {
            setError(err.message); // Show error to user
        }
    };

    return (
        <div className="login-page">
            {/* Logo at top */}
            <img src="/images/Logo1.png" alt="Logo" className="login-logo" />

            {/* Main box for form content */}
            <div className="login-box">
                <h2>Create an Account</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* Registration form */}
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

                {/* Back to login button */}
                <div>
                    <button className="register-btn" onClick={() => navigate('/login')}>
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
