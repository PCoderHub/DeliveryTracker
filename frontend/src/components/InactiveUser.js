import React, { useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';

const InactiveUser = () => {

    const location = useLocation();
    const navigate = useNavigate();
    let timeout = null;

    const noAutoLogout = () => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            navigate('/');
        }, 10*1000*60);
    }

    useEffect(() => {
        let notApplicable = false;
        if (location.pathname === '/') {
            notApplicable = true;
        } 
        if (notApplicable) {
            return;
        }
        noAutoLogout();
        window.addEventListener('mousemove', noAutoLogout);

        return () => {
            if (timeout) {
                clearTimeout(timeout);
                window.removeEventListener('mousemove', noAutoLogout);
            }
        }
        
    }, [location.pathname]);

    return <div></div>
}

export default InactiveUser;