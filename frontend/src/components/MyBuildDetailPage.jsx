import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as apiService from '../services/apiService';
import BuildCard from './BuildCard';
import '../styles/BuildDetailPage.css';

function MyBuildDetailPage() {
    const { id, buildId } = useParams(); // id = userId
    const [build, setBuild] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [shareSuccess, setShareSuccess] = useState(false);
    const navigate = useNavigate();

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

    const handleShare = async () => {
        try {
            const token = localStorage.getItem('token');
            await apiService.shareBuild(token, buildId);
            setShareSuccess(true);
            navigate('/browse');
        } catch {
            alert('Failed to share build');
        }
    };

    if (loading) return <p>Loading build...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!build) return <p>Build not found</p>;

    return (
        <div className="detail-page-wrapper">
            <h2>Build Details</h2>

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

            {shareSuccess && <p style={{ color: 'green' }}>Build shared successfully!</p>}
        </div>


    );
}

export default MyBuildDetailPage;
