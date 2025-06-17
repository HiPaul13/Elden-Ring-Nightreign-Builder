import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apiService from '../services/apiService';
import '../styles/BuildDetailPage.css';
import BuildCard from "./BuildCard.jsx";

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
        <div className="detail-page-wrapper">
            <h2>Build Details</h2>

            <div className="build-card-with-share">
                <BuildCard
                    build={build}
                    size="large"
                    showCharacterImage={true}
                    likeButton={
                        <button
                            onClick={handleLike}
                            disabled={hasLikedBuild(build.id)}
                            className={hasLikedBuild(build.id) ? 'liked-button' : ''}
                        >
                            {hasLikedBuild(build.id) ? '✅ Liked' : '👍Like'}
                        </button>
                    }
                />
            </div>
        </div>
    );

}

export default BuildDetailPage;
