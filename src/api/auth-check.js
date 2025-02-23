// useAuthCheck.js (or auth-check.js in your utils directory)
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from './token-utils'; // Adjust path if needed

export function useAuthCheck(interval = 60000) { // Default: 1 minute
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            if (isTokenExpired()) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        checkAuth(); // Initial check
        const timer = setInterval(checkAuth, interval);

        return () => clearInterval(timer); // Cleanup on unmount
    }, [navigate, interval]);
}