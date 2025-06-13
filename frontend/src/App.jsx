import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import UsersPage from './components/UsersPage'
import ProtectedRoute from "./components/ProtectedRoute";
import CreateUserPage from "./components/CreateUserPage";
import UserDetailPage from "./components/UserDetailPage.jsx";
import EditUserPage from "./components/EditUserPage";
import WeaponsPage from "./components/WeaponsPage.jsx";
import SelectWeaponPage from './components/SelectWeaponPage';
import CreateWeaponBuild from "./components/CreateWeaponBuild";
import NavigateToNewBuild from './components/NavigateToNewBuild';


function App() {

    return (

        <Routes>

            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/weapons" element={<WeaponsPage/>}></Route>





            <Route path="/users/:id/createBuild/:buildId" element={
                <ProtectedRoute>
                    <CreateWeaponBuild />
                </ProtectedRoute>
            } />

            <Route path="/users/:id/creatingBuild/:buildId/weapons" element={
                <ProtectedRoute>
                    <SelectWeaponPage />
                </ProtectedRoute>
            } />

            <Route path="/users/:id/createBuild" element={
                <ProtectedRoute>
                    <NavigateToNewBuild />
                </ProtectedRoute>
            } />



            {/* protected Routes */}
            <Route path="/users" element={
                <ProtectedRoute>
                    <UsersPage/>
                </ProtectedRoute>
            }/>

            <Route path="/users/new" element={
                <ProtectedRoute>
                    <CreateUserPage/>
                </ProtectedRoute>
            }/>

            <Route path="/users/:id" element={
                <ProtectedRoute>
                    <UserDetailPage/>
                </ProtectedRoute>
            }/>

            <Route path="/users/:id/edit" element={
                <ProtectedRoute>
                    <EditUserPage/>
                </ProtectedRoute>
            }/>

        </Routes>

    )
}
export default App

