import { useNavigate } from 'react-router-dom';
import '../styles/TopNavBar.css';

function TopNavBar({ userId }) {
    const navigate = useNavigate();

    return (
        <div className="top-nav-bar">
            <img
                src="/images/Logo1.png"
                alt="Home"
                className="logo"
                onClick={() => navigate('/browse')}
                title="Home"
            />

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
