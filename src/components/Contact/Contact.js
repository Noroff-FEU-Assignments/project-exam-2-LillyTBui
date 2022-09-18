import style from "./Contact.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../../constants/api";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../UI/Button";
import { Alert } from "react-bootstrap";
import ContactAccordion from "./ContactAccordion";

const url =
  API_URL +
  `wc/v3/products?consumer_key=${process.env.REACT_APP_WC_CONSUMER_KEY}&consumer_secret=${process.env.REACT_APP_WC_CONSUMER_SECRET}&Content-Type:application/json`;

const schema = yup.object().shape({
  fullName: yup.string().required("Please enter your full name").min(5),
  email: yup.string().email().required("Please enter your email"),
  subject: yup.string().required("Please enter subject").min(5),
  message: yup
    .string()
    .required("Needs to be at least 10 character long")
    .min(10),
});

/**
 * Generates the whole contact page
 * Takes user input from contact form and makes a post request
 * @returns contact form, q&a accordion and error/success message
 */

function Contact() {
  const [serverError, setServerError] = useState(null);
  const [successful, setSuccessful] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    const formatted_data = {
      name: data.subject,
      description: data.message,
      short_description: data.email,
      categories: [
        {
          id: 38,
        },
      ],
    };

    try {
      const response = await axios.post(url, formatted_data);
      console.log("response", response.data);
      reset();
      setSuccessful(true);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    }
  }

  return (
    <div className={style.contact}>
      <h1 className="uppercase">Contact</h1>
      <p className={style.text}>
        Need to get in touch with us? Either fill out the form with your inquiry
        or maybe you can find your answer in our Q&A section below.
      </p>
      {serverError && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong!</Alert.Heading>
          <p>Please try again.</p>
        </Alert>
      )}
      {successful && (
        <Alert variant="success">
          <Alert.Heading>Message sent!</Alert.Heading>
          <p>
            Your message has been sent successfully! We will contact you as soon
            as possible
          </p>
        </Alert>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={style.form}
        onClick={() => setSuccessful(false)}
      >
        <label htmlFor="fullName">Full name</label>
        <input {...register("fullName")} id="fullName" />
        {errors.fullName && (
          <span className={style.error}>{errors.fullName.message}</span>
        )}

        <label htmlFor="email">Email</label>
        <input {...register("email", { required: true })} id="email" />
        {errors.email && (
          <span className={style.error}>{errors.email.message}</span>
        )}

        <label htmlFor="subject">Subject</label>
        <input {...register("subject", { required: true })} id="subject" />
        {errors.subject && (
          <span className={style.error}>{errors.subject.message}</span>
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
        <Button>Send</Button>
      </form>
      <ContactAccordion />
    </div>
  );
}

export default Contact;
