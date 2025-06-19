// Import hooks and modules
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';

/**
 * WeaponsPage component displays all available weapons fetched from the backend.
 * Requires authentication. Redirects to login if token is invalid.
 */
function WeaponsPage() {
    // State to store weapons
    const [weapons, setWeapons] = useState([]);

    // Loading and error state
    const [isLoadingWeapons, setIsLoadingWeapons] = useState(false);
    const [fetchWeaponsError, setFetchWeaponsError] = useState('');

    const navigate = useNavigate();

    /**
     * Fetches weapon data from the API
     */
    const handleGetWeapons = async () => {
        setIsLoadingWeapons(true);
        setFetchWeaponsError('');

        try {
            const token = localStorage.getItem('token'); // JWT from localStorage
            const data = await apiService.fetchWeapons(token); // Call to API service
            setWeapons(data); // Store weapons in state
        } catch (error) {
            setFetchWeaponsError(error.message); // Display error

            // Redirect to login on 401 or 403
            if (error.status === 401 || error.status === 403) {
                navigate('/login');
            }
        } finally {
            setIsLoadingWeapons(false);
        }
    };

    /**
     * Clears token and redirects to homepage
     */
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Fetch weapons on mount
    useEffect(() => {
        handleGetWeapons();
    }, []);

    // Render loading or error state
    if (isLoadingWeapons) return <div>Loading Weapons</div>;
    if (fetchWeaponsError) return <div style={{ color: 'red' }}>{fetchWeaponsError}</div>;

    // Render weapon list
    return (
        <div className="page-container">
            <button className="button-secondary" onClick={handleLogout}>Logout</button>
            <h1>All Weapons</h1>

            <div className="user-list">
                {weapons.map(weapon => (
                    <div key={weapon.id} className="user-card">
                        <div className="user-info">
                            <p><strong>{weapon.name}</strong></p>
                            <p>{weapon.type}</p>
                            <img src={weapon.image_url} alt={weapon.name} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeaponsPage;
