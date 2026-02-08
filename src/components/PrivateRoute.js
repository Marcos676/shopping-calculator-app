import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ({userName}) => {
    return userName ? <Outlet /> : <Navigate to="/" />;
}