import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const Pr = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user) {
            navigate(`/pr/${user.uniqueURL}`);
        }
    }, [user, navigate]);

    return null;
};

export default Pr;
