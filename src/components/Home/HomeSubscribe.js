import style from "./HomeSubscribe.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../UI/ErrorMessage";

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter a valid email"),
});

/**
 * Generates a dummy subscribe section
 * @returns dummy subscribe section with success/error message
 */

function HomeSubscribe() {
  const [send, setSend] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    setSend(true);
  };

  const updateState = () => {
    setSend(false);
  };

  return (
    <div className={style.subscribe_div}>
      <h3>Get the newest updates!</h3>
      <p className={style.subscribe_p}>Sign up and we'll keep you updated </p>
      <div className={style.subscribe_input_div}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            type="email"
            className={style.subscribe_input}
            placeholder="Your email"
            id="email"
            onChange={updateState}
          />
          <button className={style.subscribe_btn}>Subscribe</button>
        </form>
      </div>
      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      {send && (
        <div className="success">
          <p>Thanks for subscribing!</p>
        </div>
      )}
    </div>
  );
}

export default HomeSubscribe;
