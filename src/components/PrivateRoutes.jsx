import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const token = localStorage.getItem('token');
    const auth = token;
    return auth ? <Outlet /> : <Navigate to="/" />;
}


export const PublicRoute = () => {
    const token = localStorage.getItem('token');
    const auth = token;
    return !auth ? <Outlet /> : <Navigate to="/dashboard" />;
}