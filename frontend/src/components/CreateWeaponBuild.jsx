import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';
import '../styles/CreateBuild.css';

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
    const { id, buildId } = useParams();
    const navigate = useNavigate();
    const [buildName, setBuildName] = useState('');
    const [character, setCharacter] = useState('');
    const [selectedWeapons, setSelectedWeapons] = useState([null, null, null, null, null, null]);



    useEffect(() => {
        async function loadWeapons() {
            const newSelected = [];
            const token = localStorage.getItem('token');

            for (let i = 0; i < 6; i++) {
                const weaponId = localStorage.getItem(`build-${buildId}-slot-${i}`);
                if (weaponId) {
                    try {
                        const weapon = await apiService.fetchWeaponById( token, weaponId);
                        newSelected.push(weapon);
                    } catch {
                        newSelected.push(null);
                    }
                } else {
                    newSelected.push(null);
                }
            }
            setSelectedWeapons(newSelected);
        }
        loadWeapons();
    }, [id]);

    const handleSlotClick = (index) => {
        localStorage.setItem(`build-${buildId}-selected-slot`, index);
        navigate(`/users/${id}/creatingBuild/${buildId}/weapons`);
    };

    const handleSaveBuild = async () => {
        const token = localStorage.getItem('token');
        const weaponData = {};

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
            navigate(`/users/${id}/myBuilds`); // Redirect to user page or builds list
        } catch (err) {
            console.error(err);
            alert('Failed to save build.');
        }
    };

    return (
        <div className="page-container">
            <h2>Create Your Weapon Build</h2>
            <div className="build-grid">

                <input
                    type="text"
                    placeholder="Enter build name"
                    value={buildName}
                    onChange={(e) => setBuildName(e.target.value)}
                    required
                />

                <div className="form-field">
                    <label htmlFor="character">Select Character:</label>
                    <select
                        id="character"
                        value={character}
                        onChange={(e) => setCharacter(e.target.value)}
                        required
                    >
                        <option value="">-- Choose --</option>
                        <option value="Raider">Raider</option>
                        <option value="Wylder">Wylder</option>
                        <option value="Ironeye">Ironeye</option>
                        <option value="Executor">Executor</option>
                        <option value="Duchess">Duchess</option>
                        <option value="Guardian">Guardian</option>
                        <option value="Recluse">Recluse</option>
                        <option value="Revenant">Revenant</option>
                    </select>
                </div>

                {character && characterImages[character] && (
                    <div className="character-preview">
                        <h4>Selected Character: {character}</h4>
                        <img src={characterImages[character]} alt={character} style={{ maxWidth: '200px' }} />
                    </div>
                )}



                {selectedWeapons.map((weapon, index) => (
                    <div key={index} className="build-slot" onClick={() => handleSlotClick(index)}>
                        {weapon ? (
                            <>
                                <img src={weapon.image_url} alt={weapon.name} />
                                <p>{weapon.name}</p>
                            </>
                        ) : (
                            <p>+</p>
                        )}
                    </div>
                ))}
                <button onClick={handleSaveBuild}>Save Build</button>

            </div>
        </div>
    );
}
export default CreateWeaponBuild;
