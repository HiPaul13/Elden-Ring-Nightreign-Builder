import { useEffect, useState } from 'react';
import * as apiService from '../services/apiService';
import { Link } from 'react-router-dom';
import '../styles/MyBuildsPage.css'; // reuse for styling

function BrowseBuildsPage() {
    const [builds, setBuilds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [characterFilter, setCharacterFilter] = useState('');
    const [sortByLikes, setSortByLikes] = useState(false);

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


    return (
        <div className="page-container">
            <h2>Browse Public Builds</h2>

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
                <div className="build-list">
                    {builds.map((build) => (
                        <div key={build.id} className="build-card">
                            <Link
                                to={`/builds/${build.id}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <h3>{build.name || 'Unnamed Build'}</h3>
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
                            </Link>

                            {/* ✅ This works now */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleLike(build.id);
                                }}
                                disabled={hasLikedBuild(build.id)}
                                className={hasLikedBuild(build.id) ? 'liked-button' : ''}
                            >
                                {hasLikedBuild(build.id) ? '✅ Liked' : '👍 Like This Build'}
                            </button>


                        </div>

                    ))}

                </div>

            )}
        </div>
    );
}

export default BrowseBuildsPage;
