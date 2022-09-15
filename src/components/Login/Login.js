import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";
import { API_URL, TOKEN_PATH } from "../../constants/api";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";

import style from "./Login.module.css";
import { useContext } from "react";

const url = API_URL + TOKEN_PATH;

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onLogin(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);
    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
      setAuth(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
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
        <input
          type="password"
          {...register("password", { required: true })}
          id="password"
        />
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
