import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";

import style from "./Login.module.css";

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loginError, setLoginError] = useState(false);

  function onLogin(data) {
    console.log(data);
    setLoginError(true);
  }

  return (
    <div className={style.login}>
      {loginError && <ErrorMessage>Wrong username or password</ErrorMessage>}
      <h1 className={style.title}>Login</h1>
      <form onSubmit={handleSubmit(onLogin)} className={style.form}>
        <label htmlFor="username">Username</label>
        <input {...register("username")} id="username" />
        {errors.username && (
          <span className={style.error}>{errors.username.message}</span>
        )}
        <label htmlFor="password">Password</label>
        <input {...register("password", { required: true })} id="password" />
        {errors.password && (
          <span className={style.error}>{errors.password.message}</span>
        )}
        <div className={style.checkbox__div}>
          <input type="checkbox" id="checkLogin" className={style.checkbox} />
          <label htmlFor="checkLogin">Keep me logged in</label>
        </div>
        <Button>Login</Button>
      </form>
    </div>
  );
}

export default Login;
