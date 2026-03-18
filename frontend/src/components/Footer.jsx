// Import the associated CSS styling for the footer
import '../styles/Footer.css';

/**
 * Reusable Footer component for the application.
 * Contains basic information and navigation links.
 */
function Footer() {
    return (
        <footer className="footer">
            {/* Left column with site name and year */}
            <div className="footer-column">
                2025 Nightreign<br />Weapon Builder
            </div>

            {/* Center column with internal navigation links */}
            <div className="footer-column">
                <a href="/about">About</a> / <a href="/credits">Credits</a> / <a href="/privacy">Privacy</a>
            </div>

            {/* Right column with external or contact links */}
            <div className="footer-column">
                <a href="https://github.com/HiPaul13">Github</a> / <a href="/contact">Contact</a>
            </div>
        </footer>
    );
}

export default Footer;
