import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({children, requireAdmin}) {
    const {loading, user} = useAuthContext();
    
    if(loading) return null;

    if(!user || (requireAdmin && !user.isAdmin)) {
        return <Navigate to="/" replace />
    }

    return children;
}

