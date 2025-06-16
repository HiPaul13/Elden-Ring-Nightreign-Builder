import { Outlet } from 'react-router-dom';
import TopNavBar from './TopNavBar';

function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id;
    } catch (err) {
        return null;
    }
}

function Layout() {
    const userId = getUserIdFromToken();

    return (
        <div>
            <TopNavBar userId={userId} />
            <div style={{ paddingTop: '70px' }}>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
