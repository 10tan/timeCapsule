// token-utils.js
import {jwtDecode} from 'jwt-decode';

export function isTokenExpired() {
    const token = localStorage.getItem('token');
    if (!token) return true; // No token, consider it expired

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        return decoded.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true; // Assume expired on error
    }
}