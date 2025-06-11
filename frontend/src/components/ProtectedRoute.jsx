import { Navigate } from 'react-router-dom'

//gets prop and checks for a token, if no token redirect to loginpage
function ProtectedRoute ( { children }) {
    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children;
}

export default ProtectedRoute