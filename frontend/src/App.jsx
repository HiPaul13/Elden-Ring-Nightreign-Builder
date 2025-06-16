import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout'; // <- includes TopNavBar
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import UsersPage from './components/UsersPage';
import CreateUserPage from './components/CreateUserPage';
import EditUserPage from './components/EditUserPage';
import UserDetailPage from './components/UserDetailPage';
import WeaponsPage from './components/WeaponsPage';
import SelectWeaponPage from './components/SelectWeaponPage';
import CreateWeaponBuild from './components/CreateWeaponBuild';
import NavigateToNewBuild from './components/NavigateToNewBuild';
import MyBuildsPage from './components/MyBuildsPage';
import MyBuildDetailPage from './components/MyBuildDetailPage';
import BrowseBuildsPage from './components/BrowseBuildsPage';
import BuildDetailPage from './components/BuildDetailPage';

function App() {
    return (

            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/builds/:buildId" element={<BuildDetailPage />} />

                {/* Protected Routes - wrapped in Layout with nav */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="browse" element={<BrowseBuildsPage />} />
                    <Route path="weapons" element={<WeaponsPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/new" element={<CreateUserPage />} />
                    <Route path="users/:id" element={<UserDetailPage />} />
                    <Route path="users/:id/edit" element={<EditUserPage />} />
                    <Route path="users/:id/myBuilds" element={<MyBuildsPage />} />
                    <Route path="users/:id/myBuilds/:buildId" element={<MyBuildDetailPage />} />
                    <Route path="users/:id/createBuild" element={<NavigateToNewBuild />} />
                    <Route path="users/:id/createBuild/:buildId" element={<CreateWeaponBuild />} />
                    <Route path="users/:id/creatingBuild/:buildId/weapons" element={<SelectWeaponPage />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
    );
}

export default App;
