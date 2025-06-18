import { useEffect, useState } from 'react';
import * as apiService from '../services/apiService';
import { Link } from 'react-router-dom';
import '../styles/BrowseBuildsPage.css'; // reuse for styling
import BuildCard from './BuildCard';
import { useNavigate } from 'react-router-dom';

function BrowseBuildsPage() {
    const [builds, setBuilds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [characterFilter, setCharacterFilter] = useState('');
    const [sortByLikes, setSortByLikes] = useState(false);
    const navigate = useNavigate();

    const hasLikedBuild = (buildId) => {
        return !!localStorage.getItem(`liked-build-${buildId}`);
    };


    const fetchBuilds = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await apiService.fetchPublicBuilds(characterFilter, sortByLikes);
            setBuilds(data);
        } catch (err) {
            setError('Failed to fetch public builds');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBuilds();
    }, [characterFilter, sortByLikes]);

    const handleLike = async (buildId) => {
        try {
            // prevent double-like on frontend
            const liked = localStorage.getItem(`liked-build-${buildId}`);

            if (liked) return;

            await apiService.likeBuild(buildId);
            localStorage.setItem(`liked-build-${buildId}`, 'true'); // mark as liked
            fetchBuilds(); // refresh like count
        } catch {
            alert('Failed to like the build');
        }
    };

    const LikeButton = ({ build }) => {
        const liked = hasLikedBuild(build.id);

        return (
            <div className="like-wrapper">
                <img
                    src="/images/buttons/LikeButton.PNG" // your own like image
                    alt="Like"
                    className={`like-icon ${liked ? 'disabled' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!liked) handleLike(build.id);
                    }}
                />
                <span className="like-count">{build.likes}</span>
            </div>
        );
    };



    return (
        <div className="page-container">
            <h2>Browse Builds</h2>

            <div style={{ marginBottom: '1rem' }}>
                <label>Filter by Character: </label>
                <select value={characterFilter} onChange={(e) => setCharacterFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="Raider">Raider</option>
                    <option value="Wylder">Wylder</option>
                    <option value="Ironeye">Ironeye</option>
                    <option value="Executor">Executor</option>
                    <option value="Duchess">Duchess</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Recluse">Recluse</option>
                    <option value="Revenant">Revenant</option>
                </select>

                <label style={{ marginLeft: '1rem' }}>
                    <input type="checkbox" checked={sortByLikes} onChange={() => setSortByLikes(!sortByLikes)} />
                    Sort by Likes
                </label>
            </div>

            {loading ? (
                <p>Loading builds...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : builds.length === 0 ? (
                <p>No builds found.</p>
            ) : (
                <div className="build-grid">
                    {builds.map((build) => (
                        <BuildCard
                            key={build.id}
                            build={build}
                            size="small"
                            onClick={() => navigate(`/builds/${build.id}`)}
                            likeButton={<LikeButton build={build} />}
                        />
                    ))}
                </div>


            )}
        </div>
    );
}

export default BrowseBuildsPage;
