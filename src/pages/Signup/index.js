import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import SignupStyle from "./Signup.module.css"
import BigSignupDiv from "./BigSignupDiv.module.css"


export const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const save = async (data) => {
    console.log(data);
    await dispatch(addUser(data)).unwrap();
    navigate("/");
    reset();
  };

  return (
    <div className={BigSignupDiv.bgd} >
      <div className={SignupStyle.signup}>
        <h2>Registartion</h2>
        <form onSubmit={handleSubmit(save)}>
          <div>
            <input type="text" {...register("name", { required: true })} placeholder="Name" />
            {errors.name && <p>Name is required.</p>}
          </div>
          <div>
            <input type="text" {...register("surname", { required: true })} placeholder="Surname" />
            {errors.surname && <p>Surname is required.</p>}
          </div>
          <div>
            <input type="email" {...register("email", { required: true })} placeholder="Email" />
            {errors.email && <p>Please enter your email</p>}
          </div>
          <div>
            <input
              type="password"
              {...register("password", { required: true })} placeholder="Password"
            />
            {errors.password && <p>Please enter your password</p>}
          </div><br />
          <button>Register</button>
        </form>
      </div><br />
    </div>
  );
};