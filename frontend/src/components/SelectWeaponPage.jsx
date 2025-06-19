// React hooks and utilities
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// API service for fetching weapon data
import * as apiService from '../services/apiService';

// Styles specific to this page
import '../styles/WeaponSelect.css';

/**
 * Page to display and select a weapon for a given build slot.
 * Supports searching and filtering by weapon type.
 */
function SelectWeaponPage() {
    // Extract route parameters: user ID and build ID
    const { id, buildId } = useParams();
    const navigate = useNavigate();

    // State for weapon data and UI states
    const [weapons, setWeapons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [weaponType, setWeaponType] = useState('');

    // Fetch all weapons once when component mounts
    useEffect(() => {
        async function fetchWeapons() {
            try {
                const data = await apiService.fetchAllWeapons();
                setWeapons(data); // Store fetched weapons
            } catch (err) {
                setError(err.message); // Show error on failure
            } finally {
                setLoading(false); // Always stop loading
            }
        }

        fetchWeapons();
    }, []);

    /**
     * Filters weapons based on search term and type.
     */
    const filteredWeapons = weapons.filter(weapon =>
        weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (weaponType === '' || weapon.type === weaponType)
    );

    /**
     * Called when a weapon is selected.
     * Stores the selected weapon in localStorage and redirects to the build page.
     */
    const handleWeaponSelect = (weaponId) => {
        const slot = localStorage.getItem(`build-${buildId}-selected-slot`);
        if (!slot) {
            alert("No slot selected.");
            return;
        }

        // Save selected weapon to the chosen slot
        localStorage.setItem(`build-${buildId}-slot-${slot}`, weaponId);

        // Navigate back to the build creation page
        navigate(`/users/${id}/createBuild/${buildId}`);
    };

    // Show loading or error message if necessary
    if (loading) return <p>Loading weapons...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="page-container">
            <h2>Select a Weapon</h2>

            {/* Filter controls */}
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
                    {/* Create list of unique weapon types */}
                    {[...new Set(weapons.map(w => w.type))].map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            {/* Render filtered weapons */}
            <div className="weapon-list">
                {filteredWeapons.map(weapon => (
                    <div
                        key={weapon.id}
                        className="weapon-card"
                        onClick={() => handleWeaponSelect(weapon.id)}
                    >
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
