// Import navigation hook from React Router
import { useNavigate } from 'react-router-dom';

// Import styles for the top navigation bar
import '../styles/TopNavBar.css';

/**
 * TopNavBar component renders a fixed top navigation bar with logo and icon buttons.
 * It uses the user's ID to enable navigation to personalized pages like Create Build and Profile.
 *
 * Props:
 * - userId: the currently logged-in user's ID (used for routing to user-specific pages)
 */
function TopNavBar({ userId }) {
    const navigate = useNavigate(); // React Router hook to handle page navigation

    return (
        <div className="top-nav-bar">
            {/* Logo (click to go to homepage/browse builds) */}
            <img
                src="/images/Logo1.png"
                alt="Home"
                className="logo"
                onClick={() => navigate('/browse')}
                title="Home"
            />

            {/* Navigation icons for chat, create build, and profile */}
            <div className="nav-buttons">
                <img
                    src="/images/buttons/Chat.png"
                    alt="Chat"
                    className="nav-icon"
                    onClick={() => navigate('/Chat')}
                    title="Chat"
                />

                <img
                    src="/images/buttons/CreateBuild.png"
                    alt="Create"
                    className="nav-icon"
                    onClick={() => navigate(`/users/${userId}/createBuild`)}
                    title="Create Build"
                />

                <img
                    src="/images/buttons/Profile.png"
                    alt="Profile"
                    className="nav-icon"
                    onClick={() => navigate(`/users/${userId}`)}
                    title="Profile"
                />
            </div>
        </div>
    );
}

export default TopNavBar;
