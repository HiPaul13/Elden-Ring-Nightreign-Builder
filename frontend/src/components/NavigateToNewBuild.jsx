import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createBuild } from '../services/apiService';

function NavigateToNewBuild() {
    const { id } = useParams(); // user ID
    const navigate = useNavigate();

    useEffect(() => {
        const initializeBuild = async () => {
            const token = localStorage.getItem('token');
            try {
                const newBuild = await createBuild(token, id); // 👈 Get real build ID from backend
                console.log(newBuild);
                navigate(`/users/${id}/createBuild/${newBuild.id}`);
            } catch (err) {
                console.error("❌ Failed to create build:", err);
            }
        };

        initializeBuild();
    }, [id]);

    return <p>Creating new build...</p>;
}

export default NavigateToNewBuild;
