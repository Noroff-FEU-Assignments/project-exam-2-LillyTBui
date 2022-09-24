import style from "./Login.module.css";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";
import { API_URL, TOKEN_PATH } from "../../constants/api";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";

const url = API_URL + TOKEN_PATH;

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

/**
 * Generates a login page
 * Checks user input and saves credential if login is success
 * @returns login form
 */

function Login({ setUser }) {
  const [loginError, setLoginError] = useState(null);
  const [, setAuth] = useContext(AuthContext);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onLogin(data) {
    setLoginError(null);

    try {
      const response = await axios.post(url, data);
      setAuth(response.data);
      setUser(data.username);
      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
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
        <div className={style.button_div}>
          <Button>Login</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
