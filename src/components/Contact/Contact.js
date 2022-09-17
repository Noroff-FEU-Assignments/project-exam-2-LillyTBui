import style from "./Contact.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../UI/Button";
import Accordion from "react-bootstrap/Accordion";
import useAxios from "../../hooks/useAxios";
import { API_URL } from "../../constants/api";

//see på contact form 7
const url =
  API_URL +
  `wc/v3/products?consumer_key=${process.env.REACT_APP_WC_CONSUMER_KEY}&consumer_secret=${process.env.REACT_APP_WC_CONSUMER_SECRET}&Content-Type: application/json`;

const schema = yup.object().shape({
  fullName: yup.string().required("Please enter your full name").min(5),
  email: yup.string().email().required("Please enter your email"),
  subject: yup.string().required("Please enter subject").min(5),
  message: yup
    .string()
    .required("Needs to be at least 10 character long")
    .min(10),
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const http = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    console.log(data);
    const formatted_data = {
      name: data.subject,
      description: data.message,
      categories: [
        {
          id: 38,
          name: "Message",
          slug: "message",
          link: "https://sunnyday.one/project-exam-2-wordpress/product-category/message/",
        },
      ],
      attributes: [
        {
          id: 0,
          name: "name",
          terms: [{ id: 0, name: data.fullName }],
        },
        {
          id: 0,
          name: "email",
          terms: [{ id: 0, name: data.email }],
        },
      ],
    };

    console.log(formatted_data);
    try {
      const response = await http.post(url, formatted_data);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={style.contact}>
      <h1 className="uppercase">Contact</h1>
      <p className={style.text}>
        Need to get in touch with us? Either fill out the form with your inquiry
        or maybe you can find your answer in our Q&A section below.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
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
      <div className={style.accordion__div}>
        <h2 className={style.accordion__title}>Q&A</h2>
        <Accordion className={style.accordion}>
          <Accordion.Item eventKey="0">
            <Accordion.Header className={style.accordion__header}>
              How to make a reservation?
            </Accordion.Header>
            <Accordion.Body className={style.accordion__body}>
              Find an accommodation you like and make an enquiry by filling out
              when you want to stay and your contact details. You will get a
              confirmation from the host if you can stay at their accommodation.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>How to cancel a reservation?</Accordion.Header>
            <Accordion.Body className={style.accordion__body}>
              To cancel your reservation click on "cancel my reservation" in
              your confirmation email, and follow the instructions.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              I want to add an extra person to my reservation
            </Accordion.Header>
            <Accordion.Body className={style.accordion__body}>
              To add an extra person to your reservation you need to send a
              request to the host. You can send a request to the host by
              clicking on "send message" and write your enquiry. If the request
              is accepted you will get an invoice with the remaining payment
              fees and a new confirmation email.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Where can I park my car?</Accordion.Header>
            <Accordion.Body className={style.accordion__body}>
              Some accommodations do not have their own parking lots for guests.
              You can check if your desired accommodation has a parking lot by
              going to their details page and look at their "facilities"
              section. If you do not see parking lot under "facilities", the
              accommodation do not offer parking lot.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Can I bring my dog?</Accordion.Header>
            <Accordion.Body className={style.accordion__body}>
              Some accommodations allow pets. You can see which accommodations
              allow pets by going to their details page and look at the
              "facilities" section. Accommodations which allow pets have "pets
              allowed" under "facilities".
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default Contact;
