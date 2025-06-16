import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';

function MyBuildDetailPage() {
    const { id, buildId } = useParams(); // id = user ID
    const navigate = useNavigate();
    const [build, setBuild] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [shareSuccess, setShareSuccess] = useState(false);

    const fetchBuild = async () => {
        try {
            const token = localStorage.getItem('token');
            const builds = await apiService.fetchUserBuilds(token, id);
            const match = builds.find(b => b.id === parseInt(buildId));
            if (!match) throw new Error('Build not found');
            setBuild(match);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        try {
            const token = localStorage.getItem('token');
            await apiService.shareBuild(token, buildId);
            setShareSuccess(true);
            navigate('/browse');
            fetchBuild(); // refresh public state
        } catch (err) {
            alert('Failed to share build');
        }
    };

    useEffect(() => {
        fetchBuild();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="page-container">
            <h2>{build.name}</h2>
            <p><strong>Character:</strong> {build.character}</p>
            <div className="weapon-preview">
                {build.weapons.map((weapon, idx) => (
                    <div key={idx} className="weapon-slot">
                        <img src={weapon.image_url} alt={weapon.name} />
                        <p>{weapon.name}</p>
                    </div>
                ))}
            </div>

            {build.is_public ? (
                <p style={{ color: 'green' }}>✅ This build is public</p>
            ) : (
                <button onClick={handleShare}>🌐 Share This Build</button>
            )}

            {shareSuccess && <p style={{ color: 'green' }}>Build shared successfully!</p>}
        </div>
    );
}

export default MyBuildDetailPage;
