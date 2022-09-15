import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import style from "./ModalForm.module.css";

const schema = yup.object().shape({
  firstName: yup.string().required("Please enter your first name").min(5),
  lastName: yup.string().required("Please enter your last name").min(5),
  email: yup.string().email().required("Please enter your email"),
  number: yup.number().required("Please enter your phone number").min(8),
  message: yup
    .string()
    .required("Needs to be at least 10 character long")
    .min(10),
});

function ModalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSend(data) {
    console.log(data);
  }

  return (
    <>
      <div className={style.modal_form}>
        <form onSubmit={handleSubmit(onSend)} className={style.form}>
          <h4 className="uppercase">Contact details</h4>
          <label htmlFor="firstName">First name</label>
          <input {...register("firstName")} id="firstName" />
          {errors.firstName && (
            <span className={style.error}>{errors.firstName.message}</span>
          )}

          <label htmlFor="lastName">Last name</label>
          <input {...register("lastName")} id="lastName" />
          {errors.lastName && (
            <span className={style.error}>{errors.lastName.message}</span>
          )}

          <label htmlFor="email">Email</label>
          <input {...register("email", { required: true })} id="email" />
          {errors.email && (
            <span className={style.error}>{errors.email.message}</span>
          )}

          <label htmlFor="number">Subject</label>
          <input {...register("number", { required: true })} id="number" />
          {errors.number && (
            <span className={style.error}>{errors.number.message}</span>
          )}

          <label htmlFor="message">Message</label>
          <textarea
            {...register("message", { required: true })}
            id="message"
            rows="5"
          />
          {errors.message && (
            <span className={style.error}>{errors.message.message}</span>
          )}
        </form>
      </div>
    </>
  );
}

export default ModalForm;
