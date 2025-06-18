import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';

function WeaponsPage() {
    const [weapons, setWeapons] = useState([]);
    const [isLoadingWeapons, setIsLoadingWeapons] = useState(false);
    const [fetchWeaponsError, setFetchWeaponsError] = useState('');
    const navigate = useNavigate();

    const handleGetWeapons = async () => {
        setIsLoadingWeapons(true);
        setFetchWeaponsError('');

        try {
            const token = localStorage.getItem('token');
            const data = await apiService.fetchWeapons(token);
            setWeapons(data);
        } catch (error) {
            setFetchWeaponsError(error.message);
            if (error.status === 401 || error.status === 403) {
                navigate('/login');
            }
        } finally {
            setIsLoadingWeapons(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        handleGetWeapons();
    }, []);

    if (isLoadingWeapons) return <div>Loading Weapons</div>;
    if (fetchWeaponsError) return <div style={{ color: 'red' }}>{fetchWeaponsError}</div>;

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
                            <img src={weapon.image_url} alt={weapon.name}/>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default WeaponsPage;
