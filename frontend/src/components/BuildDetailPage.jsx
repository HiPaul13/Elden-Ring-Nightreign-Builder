import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apiService from '../services/apiService';
import '../styles/BuildDetailPage.css';
import BuildCard from "./BuildCard.jsx";

/**
 * BuildDetailPage Component
 * Displays a detailed view of a single build with an enlarged BuildCard.
 * Allows liking a build unless it has already been liked.
 */
function BuildDetailPage() {
    // Get build ID from URL parameters (e.g., /builds/:buildId)
    const { buildId } = useParams();

    // Component state
    const [build, setBuild] = useState(null);         // Stores build data
    const [loading, setLoading] = useState(true);     // Loading indicator
    const [error, setError] = useState('');           // Error message if fetching fails

    // Check if this build has been liked locally
    const hasLikedBuild = (id) => !!localStorage.getItem(`liked-build-${id}`);

    // Fetch build data from the API
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

    // Handle like button click
    const handleLike = async () => {
        if (hasLikedBuild(build.id)) return; // Prevent duplicate likes

        try {
            await apiService.likeBuild(build.id);
            localStorage.setItem(`liked-build-${build.id}`, 'true'); // Mark as liked
            fetchBuild(); // Refresh build data to reflect new like count
        } catch {
            alert('Failed to like this build');
        }
    };

    // Fetch build data on component mount or when buildId changes
    useEffect(() => {
        fetchBuild();
    }, [buildId]);

    // Conditional UI rendering
    if (loading) return <p>Loading...</p>;
    if (error || !build) return <p style={{ color: 'red' }}>{error || 'Build not found'}</p>;

    return (
        <div className="detail-page-wrapper">
            <h2>Build Details</h2>

            {/* Render the detailed BuildCard with optional buttons */}
            <div className="build-card-with-share">
                <BuildCard
                    build={build}
                    size="large"
                    showCharacterImage={true}
                    // Optional like button could be added here if needed
                />
            </div>
        </div>
    );
}

export default BuildDetailPage;
