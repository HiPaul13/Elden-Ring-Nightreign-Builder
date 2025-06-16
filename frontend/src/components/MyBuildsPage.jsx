import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';
import '../styles/MyBuildsPage.css';
import BuildCard from './BuildCard.jsx';

function MyBuildsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
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
        <div className="my-builds-wrapper">
            <h2>My Weapon Builds</h2>
            {builds.length === 0 ? (
                <p>You haven't saved any builds yet.</p>
            ) : (
                <div className="build-grid">
                    {builds.map((build) => (
                        <BuildCard
                            key={build.id}
                            build={build}
                            size="small"
                            onClick={() => navigate(`/users/${id}/myBuilds/${build.id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBuildsPage;
