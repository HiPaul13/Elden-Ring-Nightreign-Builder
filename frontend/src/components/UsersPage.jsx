import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';
import '../styles/FormStyles.css';

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [fetchUsersError, setFetchUsersError] = useState('');
    const navigate = useNavigate();

    const handleGetUsers = async () => {
        setIsLoadingUsers(true);
        setFetchUsersError('');

        try {
            const token = localStorage.getItem('token');
            const data = await apiService.fetchUsers(token);
            setUsers(data);
        } catch (error) {
            setFetchUsersError(error.message);
            if (error.status === 401 || error.status === 403) {
                navigate('/login');
            }
        } finally {
            setIsLoadingUsers(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        handleGetUsers();
    }, []);

    if (isLoadingUsers) return <div>Loading Users</div>;
    if (fetchUsersError) return <div style={{ color: 'red' }}>{fetchUsersError}</div>;

    return (
        <div className="page-container">
            <button className="button-secondary" onClick={handleLogout}>Logout</button>
            <h1>Users</h1>

            <div className="user-list">
                {users.map(user => (
                    <div key={user.id} className="user-card">
                        <div className="user-info">
                            <p><strong>{user.username}</strong></p>
                            <p>{user.email}</p>
                            <p>{user.role}</p>
                        </div>
                        <div className="user-actions">
                            <Link to={`/users/${user.id}`} className="action-link">View</Link>
                            <Link to={`/users/${user.id}/edit`} className="action-link">Edit</Link>
                        </div>
                    </div>
                ))}
            </div>

            <Link to="/users/new">
                <button>Create New User</button>
            </Link>
        </div>
    );
}

export default UsersPage;
