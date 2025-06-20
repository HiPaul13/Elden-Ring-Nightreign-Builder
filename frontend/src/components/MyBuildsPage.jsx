// React and routing imports
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// API call functions and components
import * as apiService from '../services/apiService';
import '../styles/MyBuildsPage.css';
import BuildCard from './BuildCard.jsx';
import Footer from './Footer';

/**
 * Displays all builds created by the current user.
 * Allows navigation to each individual build for detailed view/editing.
 */
function MyBuildsPage() {
    const { id } = useParams(); // Get user ID from URL
    const navigate = useNavigate(); // Navigation hook
    const [builds, setBuilds] = useState([]); // All fetched builds
    const [loading, setLoading] = useState(true); // Loading indicator
    const [error, setError] = useState(''); // Error message

    // Fetch all builds for the user on initial mount
    useEffect(() => {
        const fetchBuilds = async () => {
            const token = localStorage.getItem('token'); // Get JWT token
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

    // Render loading or error states
    if (loading) return <p>Loading builds...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="page-container">
            <div className="my-builds-wrapper">
                <h2>My Weapon Builds</h2>

                {/* Display message if no builds are saved */}
                {builds.length === 0 ? (
                    <p>You haven't saved any builds yet.</p>
                ) : (
                    // Render a list of BuildCard components
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
        </div>
    );
}

export default MyBuildsPage;
