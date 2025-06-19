import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';
import '../styles/CreateWeaponBuild.css';
import Footer from "./Footer.jsx";

// Character image mapping
const characterImages = {
    "Raider": "/images/characters/raider.png",
    "Wylder": "/images/characters/wylder.png",
    "Ironeye": "/images/characters/ironeye.png",
    "Executor": "/images/characters/executor.png",
    "Duchess": "/images/characters/duchess.png",
    "Guardian": "/images/characters/guardian.png",
    "Recluse": "/images/characters/recluse.png",
    "Revenant": "/images/characters/revenant.png"
};

function CreateWeaponBuild() {
    const { id, buildId } = useParams(); // Route parameters: user ID and build ID
    const navigate = useNavigate();

    // Local component state
    const [buildName, setBuildName] = useState('');
    const [character, setCharacter] = useState('');
    const [selectedWeapons, setSelectedWeapons] = useState([null, null, null, null, null, null]);

    // Load build data (weapons, name, character) from localStorage and API
    useEffect(() => {
        async function loadBuild() {
            const newSelected = [];
            const token = localStorage.getItem('token');

            // Load weapon info for all 6 slots
            for (let i = 0; i < 6; i++) {
                const weaponId = localStorage.getItem(`build-${buildId}-slot-${i}`);
                if (weaponId) {
                    try {
                        const weapon = await apiService.fetchWeaponById(token, weaponId);
                        newSelected.push(weapon);
                    } catch {
                        newSelected.push(null);
                    }
                } else {
                    newSelected.push(null);
                }
            }
            setSelectedWeapons(newSelected);

            // Load build name and selected character from localStorage
            const savedName = localStorage.getItem(`build-${buildId}-name`);
            const savedChar = localStorage.getItem(`build-${buildId}-character`);
            if (savedName) setBuildName(savedName);
            if (savedChar) setCharacter(savedChar);
        }

        loadBuild();
    }, [buildId]);

    // When a weapon slot is clicked, store the selected slot and navigate to weapon selection page
    const handleSlotClick = (index) => {
        localStorage.setItem(`build-${buildId}-selected-slot`, index);
        navigate(`/users/${id}/creatingBuild/${buildId}/weapons`);
    };

    // Save build data to the server using apiService
    const handleSaveBuild = async () => {
        const token = localStorage.getItem('token');
        const weaponData = {};

        // Gather selected weapon IDs from localStorage
        for (let i = 0; i < 6; i++) {
            const weaponId = localStorage.getItem(`build-${buildId}-slot-${i}`);
            if (weaponId) {
                weaponData[`weapon_${i + 1}_id`] = weaponId;
            }
        }

        try {
            await apiService.updateBuild(token, buildId, {
                name: buildName,
                character: character,
                ...weaponData
            });
            alert('Build saved successfully!');
            navigate(`/users/${id}/myBuilds`);
        } catch (err) {
            console.error(err);
            alert('Failed to save build.');
        }
    };

    return (
        <div className="page-container1">
            <h2 className="create-build-header">Create Build</h2>

            {/* Character Dropdown */}
            <div className="character-select-row">
                <label className="input-label">Select Character</label>
                <select
                    value={character}
                    onChange={(e) => {
                        setCharacter(e.target.value);
                        localStorage.setItem(`build-${buildId}-character`, e.target.value);
                    }}
                    required
                >
                    <option value="">-- Choose --</option>
                    {Object.keys(characterImages).map((char) => (
                        <option key={char} value={char}>{char}</option>
                    ))}
                </select>
            </div>

            {/* Main build card layout */}
            <div className="create-build-body">
                <div className="build-card-left">

                    {/* Name + Save button row */}
                    <div className="top-form-row">
                        <input
                            type="text"
                            placeholder="Enter build name"
                            value={buildName}
                            onChange={(e) => {
                                setBuildName(e.target.value);
                                localStorage.setItem(`build-${buildId}-name`, e.target.value);
                            }}
                            required
                        />
                        <img
                            src="/images/buttons/Save_Build_Button.png"
                            alt="Save Build"
                            className="save-button-image"
                            onClick={handleSaveBuild}
                        />
                    </div>

                    {/* Weapon slots + character preview */}
                    <div className="bot-form-row">
                        <div className="weapon-grid">
                            {selectedWeapons.map((weapon, index) => (
                                <div key={index} className="weapon-slot" onClick={() => handleSlotClick(index)}>
                                    {weapon ? (
                                        <img src={weapon.image_url} alt={weapon.name} />
                                    ) : (
                                        <p style={{ fontSize: '2rem', color: '#333' }}>+</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Character preview image */}
                        {character && characterImages[character] && (
                            <div className="character-preview aligned-preview">
                                <img src={characterImages[character]} alt={character} />
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CreateWeaponBuild;
