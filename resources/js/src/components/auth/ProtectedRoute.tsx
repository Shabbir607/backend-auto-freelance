import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/api/mocks/_auth';

interface ProtectedRouteProps {
    allowedRoles?: UserRole[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, user, hasRole } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#020204]">
                <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-purple-500 animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        if (!hasRole(allowedRoles as any)) {
            return <Navigate to="/" replace />;
        }
    }

    return <Outlet />;
}

export default ProtectedRoute;
