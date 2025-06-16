import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apiService from '../services/apiService';
import { Link } from 'react-router-dom';
import '../styles/MyBuildsPage.css'; // Optional for styling

function MyBuildsPage() {
    const { id } = useParams(); // User ID from route
    const [builds, setBuilds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBuilds = async () => {
            const token = localStorage.getItem('token');
            try {
                const data = await apiService.fetchUserBuilds(token, id);
                setBuilds(data);
            } catch (err) {
                setError('Failed to load builds');
            } finally {
                setLoading(false);
            }
        };

        fetchBuilds();
    }, [id]);

    if (loading) return <p>Loading builds...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="page-container">
            <h2>My Weapon Builds</h2>
            {builds.length === 0 ? (
                <p>You haven't saved any builds yet.</p>
            ) : (
                <div className="build-list">
                    {builds.map((build) => (
                        <div key={build.id} className="build-card">
                            <div className="build-info">
                                <h3>{build.name || 'Unnamed Build'}</h3>

                                <div className="weapon-preview">
                                    {build.weapons.map((weapon, idx) => (
                                        <div key={idx} className="weapon-slot">
                                            {weapon ? (
                                                <>
                                                    <img src={weapon.image_url} alt={weapon.name} />
                                                    <p>{weapon.name}</p>
                                                </>
                                            ) : (
                                                <p>Empty</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="build-actions">
                                <Link
                                    to={`/users/${id}/myBuilds/${build.id}`}
                                    className="view-details-button"
                                >
                                    🔍 View Details
                                </Link>
                            </div>
                        </div>

                    ))}

                </div>
            )}
        </div>
    );
}

export default MyBuildsPage;
