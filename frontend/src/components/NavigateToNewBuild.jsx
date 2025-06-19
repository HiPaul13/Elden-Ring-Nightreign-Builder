// React hooks and routing tools
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// API service to create a new build
import { createBuild } from '../services/apiService';

/**
 * Component that immediately creates a new build for the current user
 * and redirects them to the build creation page.
 */
function NavigateToNewBuild() {
    const { id } = useParams(); // Extract user ID from the URL
    const navigate = useNavigate(); // Hook to programmatically navigate

    useEffect(() => {
        const initializeBuild = async () => {
            const token = localStorage.getItem('token'); // Retrieve JWT token

            try {
                // Create a new build using the API and get its ID
                const newBuild = await createBuild(token, id);
                console.log(newBuild);

                // Redirect to the build editor page with the new build ID
                navigate(`/users/${id}/createBuild/${newBuild.id}`);
            } catch (err) {
                console.error("❌ Failed to create build:", err);
            }
        };

        // Trigger build creation as soon as component mounts
        initializeBuild();
    }, [id]);

    // Display a loading indicator while the request is in progress
    return <p>Creating new build...</p>;
}

export default NavigateToNewBuild;
