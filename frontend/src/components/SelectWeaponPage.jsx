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
    const [searchTerm, setSearchTerm] = useState('');
    const [weaponType, setWeaponType] = useState('');

    useEffect(() => {
        async function fetchWeapons() {
            try {
                const data = await apiService.fetchAllWeapons();
                setWeapons(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchWeapons();
    }, []);

    const filteredWeapons = weapons.filter(weapon =>
        weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (weaponType === '' || weapon.type === weaponType)
    );

    const handleWeaponSelect = (weaponId) => {
        const slot = localStorage.getItem(`build-${buildId}-selected-slot`);
        if (!slot) {
            alert("No slot selected.");
            return;
        }

        localStorage.setItem(`build-${buildId}-slot-${slot}`, weaponId);
        navigate(`/users/${id}/createBuild/${buildId}`);
    };

    if (loading) return <p>Loading weapons...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="page-container">
            <h2>Select a Weapon</h2>

            <div className="filter-bar">
                <input
                    type="text"
                    placeholder="Search by weapon name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={weaponType}
                    onChange={(e) => setWeaponType(e.target.value)}
                >
                    <option value="">All Types</option>
                    {[...new Set(weapons.map(w => w.type))].map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div className="weapon-list">
                {filteredWeapons.map(weapon => (
                    <div key={weapon.id} className="weapon-card" onClick={() => handleWeaponSelect(weapon.id)}>
                        <img src={weapon.image_url} alt={weapon.name} />
                        <div className="weapon-info">
                            <h3>{weapon.name}</h3>
                            <p>{weapon.type}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectWeaponPage;
