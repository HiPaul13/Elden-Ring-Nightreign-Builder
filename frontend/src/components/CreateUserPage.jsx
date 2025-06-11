import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';
import '../styles/FormStyles.css';

function CreateUserPage() {
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [createUserError, setCreateUserError] = useState('');
    const [isCreatingUser, setIsCreatingUser] = useState(false);

    const navigate = useNavigate();

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setCreateUserError('');
        setIsCreatingUser(true);

        try {
            const token = localStorage.getItem('token');
            const userData = {
                username: newUsername,
                email: newEmail,
                password: newPassword,
            };
            await apiService.createUser(token, userData);
            navigate('/users');
        } catch (error) {
            setCreateUserError(error.message);
        } finally {
            setIsCreatingUser(false);
        }
    };

    return (
        <div className="page-container">
            <h3>Create new User</h3>
            {createUserError && (
                <p className="error-message" style={{ color: 'red' }}>
                    {createUserError}
                </p>
            )}

            <form onSubmit={handleCreateUser}>
                <div className="form-field">
                    <label htmlFor="newUsername">Username:</label>
                    <input
                        type="text"
                        id="newUsername"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="newEmail">Email:</label>
                    <input
                        type="email"
                        id="newEmail"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="newPassword">Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={isCreatingUser}>
                    {isCreatingUser ? 'Creating...' : 'Create User'}
                </button>

                <br /><br />
                <button className="button-secondary" onClick={() => navigate('/users')}>
                    Back to Users
                </button>
            </form>
        </div>
    );
}

export default CreateUserPage;
