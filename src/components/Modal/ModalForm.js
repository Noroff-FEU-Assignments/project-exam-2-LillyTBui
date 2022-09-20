import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { API_URL } from "../../constants/api";
import Context from "../../Context/ModelFormContext";
import axios from "axios";
import style from "./ModalForm.module.css";
import ModalPrice from "./ModalPrice";
import { useNavigate } from "react-router-dom";

//hard coded token to be able to make post requests
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3VubnlkYXkub25lXC9wcm9qZWN0LWV4YW0tMi13b3JkcHJlc3MiLCJpYXQiOjE2NjM2NzQwNTMsIm5iZiI6MTY2MzY3NDA1MywiZXhwIjoxNjY0Mjc4ODUzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIzIn19fQ.YiG5uQQCNtJ4NcHRKVWRFQVyerykw_PdMqbqKIykvwg";

const options = {
  headers: { Authorization: `Bearer ${token}` },
};

const url = API_URL + `wp/v2/enquiries`;

const schema = yup.object().shape({
  firstName: yup.string().required("Please enter your first name").min(2),
  lastName: yup.string().required("Please enter your last name").min(2),
  email: yup.string().email().required("Please enter your email"),
  number: yup.number().required("Please enter your phone number").min(8),
});

/**
 * Generates an enquiry form
 * @param {object} object has name (string) and price (number) values
 * @returns enquiry form
 */

function ModalForm({ name, price }) {
  const [totalPrice] = useContext(Context);

  const [serverError, setServerError] = useState(null);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [dateError, setDateError] = useState(false);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const changeDateStart = (event) => {
    setDateStart(event.target.value);
  };

  const changeDateEnd = (event) => {
    setDateEnd(event.target.value);
  };

  async function onSubmit(data) {
    if (dateStart === "" || dateEnd === "") {
      setDateError(true);
    } else {
      setDateError(false);

      const formatted_data = {
        status: "publish",
        title: name,
        acf: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          number: data.number,
          startDate: dateStart,
          endDate: dateEnd,
          travelers: data.travelers,
          price: totalPrice,
        },
      };

      try {
        const response = await axios.post(url, formatted_data, options);
        console.log("response", response.data);
        navigate("/confirmed");
      } catch (error) {
        console.log("error", error.message);
        setServerError(error.toString());
      }
    }
  }

  //get current date in correct format so that the user can't pick a date in the past
  const date = new Date();
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  const year = date.getFullYear();
  const minDate = `${year}-${month}-${day}`;

  return (
    <>
      <div className={style.trip_form}>
        <h4 className="uppercase">Your trip</h4>
        <div className={style.trip_form_input}>
          <label htmlFor="startDate">Check-in *</label>
          <input
            type="date"
            id="startDate"
            name="trip-start"
            min={minDate}
            max={dateEnd}
            onChange={changeDateStart}
          />
          {dateError && (
            <span className={style.error}>Please choose your trip date</span>
          )}
        </div>
        <div className={style.trip_form_input}>
          <label htmlFor="endDate">Check-out *</label>
          <input
            type="date"
            id="endDate"
            name="trip-start"
            min={dateStart}
            max="2023-12-31"
            onChange={changeDateEnd}
          />
          {dateError && (
            <span className={style.error}>Please choose your trip date</span>
          )}
        </div>
        <div className={style.trip_form_input}>
          <label htmlFor="travelers">Select number of travelers *</label>
          <select {...register("travelers")} name="travelers" id="travelers">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
      </div>
      <ModalPrice startDate={dateStart} endDate={dateEnd} price={price} />
      <div className={style.modal_form}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
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

          <label htmlFor="number">Phone number</label>
          <input {...register("number", { required: true })} id="number" />
          {errors.number && (
            <span className={style.error}>{errors.number.message}</span>
          )}
          {serverError && (
            <span className={style.error}>
              Something went wrong. Please try again.
            </span>
          )}
          <button className={style.send_btn}>Send</button>
        </form>
      </div>
    </>
  );
}

export default ModalForm;
