import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace/>;
}

export default AdminRoute