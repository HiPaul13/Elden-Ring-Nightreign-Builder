// Import necessary modules from React Router
import { Outlet } from 'react-router-dom';
import TopNavBar from './TopNavBar';

/**
 * Helper function to extract the user ID from a JWT token stored in localStorage.
 * Returns null if no token is present or parsing fails.
 */
function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
        return payload.id;
    } catch (err) {
        return null; // In case of an invalid token format
    }
}

/**
 * Layout component that wraps all page views.
 * Includes the TopNavBar and ensures space for fixed elements.
 */
function Layout() {
    const userId = getUserIdFromToken(); // Extract current user ID

    return (
        <div>
            {/* Top navigation bar with dynamic user ID */}
            <TopNavBar userId={userId} />

            {/* Main content area with padding to account for fixed navbar */}
            <div style={{ paddingTop: '70px' }}>
                <Outlet /> {/* Renders the child route's component */}
            </div>
        </div>
    );
}

export default Layout;
