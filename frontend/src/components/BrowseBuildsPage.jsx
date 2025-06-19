import { useEffect, useState } from 'react';
import * as apiService from '../services/apiService';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/BrowseBuildsPage.css';
import BuildCard from './BuildCard';
import Footer from './Footer';

function BrowseBuildsPage() {
    // Local state
    const [builds, setBuilds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [characterFilter, setCharacterFilter] = useState('');
    const [sortByLikes, setSortByLikes] = useState(false);

    const navigate = useNavigate();

    /**
     * Check localStorage to see if a build was already liked by the user.
     * Used to prevent multiple likes from the same client.
     */
    const hasLikedBuild = (buildId) => {
        return !!localStorage.getItem(`liked-build-${buildId}`);
    };

    /**
     * Fetch builds from API based on current filter and sort options.
     */
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

    // Trigger builds fetch on initial load and whenever filters change
    useEffect(() => {
        fetchBuilds();
    }, [characterFilter, sortByLikes]);

    /**
     * Handle liking a build:
     * - Prevent double likes via localStorage
     * - Send like to backend
     * - Refresh build list to update like count
     */
    const handleLike = async (buildId) => {
        try {
            const liked = localStorage.getItem(`liked-build-${buildId}`);
            if (liked) return;

            await apiService.likeBuild(buildId);
            localStorage.setItem(`liked-build-${buildId}`, 'true');
            fetchBuilds(); // re-fetch to show updated like count
        } catch {
            alert('Failed to like the build');
        }
    };

    /**
     * Custom like button component with icon and count.
     * Prevents event propagation to card navigation and disables if already liked.
     */
    const LikeButton = ({ build }) => {
        const liked = hasLikedBuild(build.id);

        return (
            <div className="like-wrapper">
                <img
                    src="/images/buttons/LikeButton.PNG" // Replace with transparent version if needed
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

            {/* Filtering and Sorting Controls */}
            <div style={{ marginBottom: '1rem' }}>
                <label>Filter by Character: </label>
                <select
                    value={characterFilter}
                    onChange={(e) => setCharacterFilter(e.target.value)}
                >
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
                    <input
                        type="checkbox"
                        checked={sortByLikes}
                        onChange={() => setSortByLikes(!sortByLikes)}
                    />
                    Sort by Likes
                </label>
            </div>

            {/* Conditional UI rendering */}
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

            <Footer />
        </div>
    );
}

export default BrowseBuildsPage;
