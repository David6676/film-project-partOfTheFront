import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authApi";
import { PaginatedItems } from "../Pagination";
import SigninStyle from "./Signin.module.css"
import BigSigninDiv from "./BigSigninDiv.module.css"

export const Signin = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const save = async (data) => {
    let res = await dispatch(loginUser(data)).unwrap();
    if ("error" in res) {
      alert(res.error);
    } else {
      reset();
      navigate("/profile");
    }
  };

  return (
    <div className={BigSigninDiv.sign}>
      <div className={SigninStyle.signin}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(save)}>
          <div>
            <input type="email"
              {...register("email", { required: true })} placeholder="Email" />
            {errors.email && <p>Please enter your email</p>}
          </div>
          <div>
            <input
              type="password"
              {...register("password", { required: true })} placeholder="Password"
            />
            {errors.password && <p>Please enter your password</p>}
          </div><br />
          <button>Log In Now</button>
        </form>
      </div>
      {/* <PaginatedItems /> */}
    </div>
  );
};
