import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverLink } from './App';
import Loader from './Components/Loader/Loader';
const PrivateRoutes = ({ Component }) => {
    const [token, setToken] = useState(false);
    const navigate = useNavigate();
    const isAuth = async () => {
        try {
            const res = await axios.get(`${serverLink}/auth/isauth`, { withCredentials: true })
            if (res.status === 200) {
                setToken(true);
            }
        } catch (err) {
            navigate('/page02');
        }
    }

    useEffect(() => {
        isAuth();
    },);

    return (
        <>{
            token ? <Component /> : <Loader />
        }

        </>

    )
}

export default PrivateRoutes