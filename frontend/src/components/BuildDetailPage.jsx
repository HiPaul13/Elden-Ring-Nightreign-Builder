import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apiService from '../services/apiService';
import '../styles/MyBuildsPage.css'; // reuse styles

function BuildDetailPage() {
    const { buildId } = useParams();
    const [build, setBuild] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const hasLikedBuild = (id) => !!localStorage.getItem(`liked-build-${id}`);


    const fetchBuild = async () => {
        try {
            setLoading(true);
            const data = await apiService.fetchBuildById(buildId);
            setBuild(data);
        } catch (err) {
            setError('Failed to load build');
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        if (hasLikedBuild(build.id)) return;

        try {
            await apiService.likeBuild(build.id);
            localStorage.setItem(`liked-build-${build.id}`, 'true');
            fetchBuild(); // refresh likes
        } catch {
            alert('Failed to like this build');
        }
    };


    useEffect(() => {
        fetchBuild();
    }, [buildId]);

    if (loading) return <p>Loading...</p>;
    if (error || !build) return <p style={{ color: 'red' }}>{error || 'Build not found'}</p>;

    return (
        <div className="page-container">
            <h2>{build.name}</h2>
            <p><strong>Character:</strong> {build.character}</p>
            <p><strong>Likes:</strong> {build.likes}</p>

            <div className="weapon-preview">
                {build.weapons.map((weapon, idx) => (
                    <div key={idx} className="weapon-slot">
                        <img src={weapon.image_url} alt={weapon.name} />
                        <p>{weapon.name}</p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => handleLike()}
                disabled={hasLikedBuild(build.id)}
                className={hasLikedBuild(build.id) ? 'liked-button' : ''}
            >
                {hasLikedBuild(build.id) ? '✅ Liked' : '👍 Like This Build'}
            </button>

        </div>
    );
}

export default BuildDetailPage;
