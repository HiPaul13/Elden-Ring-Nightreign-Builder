import '../styles/BuildCard.css';

/**
 * BuildCard Component
 * Renders a styled card displaying build information and weapons.
 *
 * @param {Object} props - Component props
 * @param {Object} props.build - The build object containing name, creator, weapons, etc.
 * @param {Function} props.onClick - Callback when the card is clicked
 * @param {boolean} [props.showCharacterImage=true] - Whether to show the character image
 * @param {string} [props.size='medium'] - Size variant for the card (e.g., 'small', 'medium')
 * @param {ReactNode} [props.shareButton=null] - Optional share button component
 * @param {ReactNode} [props.likeButton=null] - Optional like button component
 */
function BuildCard({ build, onClick, showCharacterImage = true, size = 'medium', shareButton = null, likeButton = null }) {
    return (
        <div className={`build-card-structured build-${size}`} onClick={onClick}>
            {/* Header section with name, creator, share & like buttons */}
            <div className="build-info-bar">
                <h3 className="build-name">{build.name || 'Unnamed Build'}</h3>
                <div className="build-top-actions">
                    <div>
                        {/* Display build creator's username if available */}
                        {build.creator_username && (
                            <p className="build-credits">By {build.creator_username}</p>
                        )}
                    </div>
                    <div>
                        {/* Optional share button */}
                        {shareButton && shareButton}
                    </div>
                    <div>
                        {/* Optional like button */}
                        {likeButton && likeButton}
                    </div>
                </div>
            </div>

            {/* Weapon grid and optional character image */}
            <div className="build-content">
                <div className="weapon-grid">
                    {/* Loop through build weapons and show either image or fallback text */}
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

                {/* Optionally show the character image beside the weapon grid */}
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
