import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';
import '../styles/FormStyles.css';

function EditUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [updateUsername, setUpdateUsername] = useState('');
    const [updateEmail, setUpdateEmail] = useState('');
    const [updatePassword, setUpdatePassword] = useState('');


    const [updateError, setUpdateError] = useState('');
    const [isUpdatingUser, setIsUpdatingUser] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const user = await apiService.fetchUserById(token, id);

                setUpdateUsername(user.username || '');
                setUpdateEmail(user.email || '');
            } catch (error) {
                setUpdateError(error.message);
            }
        };

        fetchUser();
    }, [id]);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setUpdateError('');
        setIsUpdatingUser(true);

        try {
            const token = localStorage.getItem('token');

            const updatedData = {
                username: updateUsername,
                email: updateEmail,
            };

            if (updatePassword.trim()) {
                updatedData.password = updatePassword;
            }

            await apiService.updateUser(token, id, updatedData);
            navigate(`/users/${id}`);
        } catch (error) {
            setUpdateError(error.message);
        } finally {
            setIsUpdatingUser(false);
        }
    };

    return (
        <div className="page-container">
            <h3>Update User</h3>

            {isUpdatingUser ? (
                <p>Updating user...</p>
            ) : updateError ? (
                <p style={{ color: 'red' }}>{updateError}</p>
            ) : null}

            <form onSubmit={handleUpdateUser}>
                <div className="form-field">
                    <label htmlFor="updateUsername">Username:</label>
                    <input
                        type="text"
                        id="updateUsername"
                        value={updateUsername}
                        onChange={(e) => setUpdateUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="updateEmail">Email:</label>
                    <input
                        type="email"
                        id="updateEmail"
                        value={updateEmail}
                        onChange={(e) => setUpdateEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="updatePassword">New Password:</label>
                    <input
                        type="password"
                        id="updatePassword"
                        value={updatePassword}
                        onChange={(e) => setUpdatePassword(e.target.value)}
                    />
                </div>


                <div className="button-group">
                    <button type="submit">Update User</button>
                    <button className="button-secondary" onClick={() => navigate('/users')}>Back to Users</button>
                </div>
            </form>
        </div>
    );
}

export default EditUserPage;
