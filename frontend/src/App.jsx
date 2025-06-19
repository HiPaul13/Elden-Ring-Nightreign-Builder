import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout'; // <- includes TopNavBar
import LoginPage from './components/LoginPage';
import WeaponsPage from './components/WeaponsPage';
import SelectWeaponPage from './components/SelectWeaponPage';
import CreateWeaponBuild from './components/CreateWeaponBuild';
import NavigateToNewBuild from './components/NavigateToNewBuild';
import MyBuildsPage from './components/MyBuildsPage';
import MyBuildDetailPage from './components/MyBuildDetailPage';
import BrowseBuildsPage from './components/BrowseBuildsPage';
import BuildDetailPage from './components/BuildDetailPage';
import UserProfilePage from "./components/UserProfilePage.jsx";
import RegisterPage from "./components/ReigisterPage.jsx";
import ChatPage from './components/ChatPage';

function App() {
    return (

            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />


                {/* Protected Routes - wrapped in Layout with nav */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/builds/:buildId" element={<BuildDetailPage />} />
                    <Route path="browse" element={<BrowseBuildsPage />} />
                    <Route path="weapons" element={<WeaponsPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="users/:id" element={<UserProfilePage />} />
                    <Route path="users/:id/myBuilds" element={<MyBuildsPage />} />
                    <Route path="users/:id/myBuilds/:buildId" element={<MyBuildDetailPage />} />
                    <Route path="users/:id/createBuild" element={<NavigateToNewBuild />} />
                    <Route path="users/:id/createBuild/:buildId" element={<CreateWeaponBuild />} />
                    <Route path="users/:id/creatingBuild/:buildId/weapons" element={<SelectWeaponPage />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
    );
}

export default App;
