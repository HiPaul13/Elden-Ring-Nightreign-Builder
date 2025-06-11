import { Link } from "react-router-dom";
import '../styles/FormStyles.css';

function HomePage() {
    return (
        <div className="page-container">
            <h1>Welcome to the FWOC Semester Project</h1>
            <p>Created by Paul Hitzl (cc241055)</p>

            <Link to="/login">
                <button>Login</button>
            </Link>
        </div>
    );
}

export default HomePage;
