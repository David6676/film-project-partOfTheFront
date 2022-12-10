import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../features/auth/authApi";

export const AdminHOC = () => {
    const [response, setResponse] = useState(false);

    const { user } = useSelector((state) => state.auth);
    console.log(user);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
            .unwrap()
            .then(() => {
                setResponse(true);
            });
    }, []);

    if(!user){
        return <Navigate to="/" replace={true} />;
    }

    if (response) {
        if (user.userType == 1) {
            return <Outlet />;
        } else {
            return <Navigate to="/" replace={true} />;
        }
    } else {
        return <></>;
    }
};