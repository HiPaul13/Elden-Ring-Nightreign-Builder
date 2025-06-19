// React hooks and router tools
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';

/**
 * Component for displaying details of a specific user.
 * Allows editing and deleting the user (if permitted).
 */
function UserDetailPage() {
    const { id } = useParams(); // Extract user ID from URL
    const navigate = useNavigate(); // Navigation hook

    // State variables for user data and UI feedback
    const [user, setUser] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(false);
    const [fetchUserError, setFetchUserError] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [isDeletingUser, setIsDeletingUser] = useState(false);

    // Load user data when component mounts or ID changes
    useEffect(() => {
        const loadUser = async () => {
            setIsLoadingUser(true);
            setFetchUserError('');
            try {
                const token = localStorage.getItem('token');
                const data = await apiService.fetchUserById(token, id);
                setUser(data);
            } catch (error) {
                setFetchUserError(error.message);
            } finally {
                setIsLoadingUser(false);
            }
        };
        loadUser();
    }, [id]);

    // Loading and error states
    if (isLoadingUser) return <p>Loading user...</p>;
    if (fetchUserError) return <p style={{ color: 'red' }}>{fetchUserError}</p>;
    if (!user) return <p>User not found.</p>;

    // Handler for deleting the user
    const handleDeleteUser = async (e) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        e.preventDefault();
        setDeleteError('');
        setIsDeletingUser(true);

        try {
            const token = localStorage.getItem('token');
            await apiService.deleteUser(token, id);
            navigate('/users'); // Redirect after deletion
        } catch (error) {
            setDeleteError(error.message);
        } finally {
            setIsDeletingUser(false);
        }
    };

    return (
        <div className="page-container">
            <div className="user-detail-header">
                <h2>User Details</h2>
                <button
                    onClick={handleDeleteUser}
                    className="delete-button"
                    disabled={isDeletingUser}
                >
                    {isDeletingUser ? 'Deleting...' : 'Delete'}
                </button>
            </div>

            {/* Display delete error if any */}
            {deleteError && <p className="error-message">{deleteError}</p>}

            {/* Basic user info */}
            <div className="user-info-display">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>

            {/* Navigation buttons */}
            <div className="button-group">
                <button onClick={() => navigate(`/users/${user.id}/edit`)}>Edit</button>
                <button className="button-secondary" onClick={() => navigate('/users')}>Back to Users</button>
            </div>
        </div>
    );
}

export default UserDetailPage;
