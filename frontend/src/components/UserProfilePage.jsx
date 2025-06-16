import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as apiService from '../services/apiService';
import BuildCard from './BuildCard';
import '../styles/UserProfilePage.css';

function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id;
    } catch {
        return null;
    }
}

function UserProfilePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const currentUserId = getUserIdFromToken();
    const isOwner = parseInt(id) === parseInt(currentUserId);


    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [builds, setBuilds] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userData = await apiService.fetchUserById(token, id);
                setUser(userData);
                setUsername(userData.username);
                setEmail(userData.email);
                setProfilePicture(userData.profile_picture || '');
            } catch (err) {
                console.error('Failed to fetch user data', err);
            }
        };

        const fetchPublicBuilds = async () => {
            try {
                const allBuilds = await apiService.fetchPublicBuilds();
                const userBuilds = allBuilds.filter(b => b.user_id === parseInt(id));
                setBuilds(userBuilds);
            } catch (err) {
                console.error('Failed to fetch builds', err);
            }
        };

        fetchUserData();
        fetchPublicBuilds();
    }, [id]);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            await apiService.updateUser(token, id, { username, email, profilePicture });
            alert('Profile updated');
        } catch {
            alert('Failed to save profile');
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfilePicture(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile-wrapper">
            <div className="profile-header">
                <img
                    src={profilePicture || '/images/ProfilePicture.png'}
                    alt="Avatar"
                    className="profile-avatar"
                />

                <div className="profile-fields">
                    {isOwner ? (
                        <>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <button onClick={handleSave}>Save Profile</button>
                        </>
                    ) : (
                        <>
                            <h2>{username}</h2>
                        </>
                    )}
                </div>
            </div>

            {isOwner && (
                <button className="my-builds-button" onClick={() => navigate(`/users/${id}/myBuilds`)}>
                    View My Builds
                </button>
            )}

            <h3>{username}'s Builds</h3>
            <div className="build-grid">
                {builds.map((build) => (
                    <BuildCard
                        key={build.id}
                        build={build}
                        size="small"
                        onClick={() => navigate(`/builds/${build.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}

export default UserProfilePage;
