import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';
import '../styles/WeaponSelect.css';


function SelectWeaponPage() {
    const { id, buildId } = useParams();
    const navigate = useNavigate();
    const [weapons, setWeapons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchWeapons() {
            try {
                const data = await apiService.fetchAllWeapons(); // <- you need to implement this
                setWeapons(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchWeapons();
    }, []);

    const handleWeaponSelect = (weaponId) => {
        const slot = localStorage.getItem(`build-${buildId}-selected-slot`);
        if (!slot) {
            alert("No slot selected.");
            return;
        }

        // Save the selected weapon ID into the corresponding slot key
        localStorage.setItem(`build-${buildId}-slot-${slot}`, weaponId);

        // Redirect back to the create build page
        navigate(`/users/${id}/createBuild`);
    };


    if (loading) return <p>Loading weapons...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="page-container">
            <h2>Select a Weapon</h2>
            <div className="weapon-list">
                {weapons.map(weapon => (
                    <div key={weapon.id} className="weapon-card" onClick={() => handleWeaponSelect(weapon.id)}>
                        <img src={weapon.image_url} alt={weapon.name} />
                        <p>{weapon.name}</p>
                        <small>{weapon.type}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectWeaponPage;
