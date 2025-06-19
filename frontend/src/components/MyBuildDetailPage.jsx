// React and Router hooks
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// API service functions
import * as apiService from '../services/apiService';

// Reusable build card component and styling
import BuildCard from './BuildCard';
import '../styles/BuildDetailPage.css';

/**
 * Displays a detailed view of a user's own build.
 * Allows the user to share the build if it hasn't been made public yet.
 */
function MyBuildDetailPage() {
    const { id, buildId } = useParams(); // `id` is the user ID, `buildId` is the selected build
    const [build, setBuild] = useState(null); // State to hold build data
    const [loading, setLoading] = useState(true); // Loading flag
    const [error, setError] = useState(''); // Error message
    const [shareSuccess, setShareSuccess] = useState(false); // Success flag after sharing
    const navigate = useNavigate(); // Hook for navigation

    // Load the specific build details for the logged-in user
    useEffect(() => {
        const fetchBuild = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await apiService.fetchUserBuilds(token, id);
                const match = data.find(b => b.id === parseInt(buildId));
                if (!match) throw new Error('Build not found');
                setBuild(match);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBuild();
    }, [id, buildId]);

    /**
     * Trigger sharing of the build (mark it as public).
     */
    const handleShare = async () => {
        try {
            const token = localStorage.getItem('token');
            await apiService.shareBuild(token, buildId);
            setShareSuccess(true);
            navigate('/browse'); // Redirect to public builds
        } catch {
            alert('Failed to share build');
        }
    };

    // Loading / error states
    if (loading) return <p>Loading build...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!build) return <p>Build not found</p>;

    // Main render
    return (
        <div className="detail-page-wrapper">
            <h2>Build Details</h2>

            {/* BuildCard with optional share button */}
            <div className="build-card-with-share">
                <BuildCard
                    build={build}
                    size="large"
                    showCharacterImage={true}
                    shareButton={
                        !build.is_public && (
                            <img
                                onClick={handleShare}
                                src="/images/buttons/ShareBuild.png"
                                alt="Share"
                                className="share-icon-button"
                            />
                        )
                    }
                />
            </div>

            {/* Success message */}
            {shareSuccess && <p style={{ color: 'green' }}>Build shared successfully!</p>}
        </div>
    );
}

export default MyBuildDetailPage;
