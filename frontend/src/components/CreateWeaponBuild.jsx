import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';
import '../styles/CreateBuild.css';


function CreateWeaponBuild() {
    const { id, buildId } = useParams();
    const navigate = useNavigate();
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

    return (
        <div className="page-container">
            <h2>Create Your Weapon Build</h2>
            <div className="build-grid">
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
            </div>
        </div>
    );
}

export default CreateWeaponBuild;
