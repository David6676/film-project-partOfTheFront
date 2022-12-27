import { useEffect } from "react";
import { getUser } from "../features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AuthHOC = () => {

  const [response, setResponse] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser())
      .unwrap()
      .then(() => {
        setResponse(true);
      });
  }, []);


  if (response) {
    let min = Date.now()
    if (user && user.blockTime < min) {
      return <Outlet />
    } else if (!user) {
      return <Navigate to="/" replace={true} />;
    } else {
      alert("You Block")
      return <Navigate to="/" replace={true} />;
    }
  }
};