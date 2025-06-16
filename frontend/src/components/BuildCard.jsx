import '../styles/BuildCard.css';

function BuildCard({ build, onClick, showCharacterImage = true, size = 'medium', shareButton = null, likeButton = null }) {
    return (
        <div className={`build-card-structured build-${size}`} onClick={onClick}>
            {/* Top Info Bar */}
            <div className="build-info-bar">
                <h3 className="build-name">{build.name || 'Unnamed Build'}</h3>
                <div className="build-top-actions">
                    {build.creator_username && (
                        <p className="build-credits">By {build.creator_username}</p>
                    )}
                    {shareButton && shareButton}
                    {likeButton && likeButton}
                </div>
            </div>

            {/* Main Content */}
            <div className="build-content">
                <div className="weapon-grid">
                    {build.weapons.map((weapon, idx) => (
                        <div key={idx} className="weapon-slot-large">
                            {weapon ? (
                                <img src={weapon.image_url} alt={weapon.name} />
                            ) : (
                                <p>Empty</p>
                            )}
                        </div>
                    ))}
                </div>

                {showCharacterImage && build.character && (
                    <div className="character-panel">
                        <img
                            src={`/images/characters/${build.character.toLowerCase()}.png`}
                            alt={build.character}
                            className="character-img"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}


export default BuildCard;
