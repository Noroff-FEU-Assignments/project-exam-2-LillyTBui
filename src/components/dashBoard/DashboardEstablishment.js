import style from "./DashboardEstablishment.module.css";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import { API_URL } from "../../constants/api";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";

const url = API_URL + "wp/v2/hotels";

const schema = yup.object().shape({
  name: yup.string().required("Please enter a name").min(3),
  type: yup.string().required("Please choose an establishment type"),
  address: yup.string().required("Please enter an address"),
  address_description: yup
    .string()
    .required("Please write a short description")
    .min(10),
  km: yup.number().required("Please enter km away from center"),
  price: yup.number().required("Please enter a price").min(50),
  rating: yup.number().required("Needs to be between 0 and 5").min(0.1).max(5),
  description: yup
    .string()
    .required("Please enter a short description")
    .min(10),
  facilities: yup.array().required("Add at least one facility").min(1),
  images: yup
    .string()
    .url()
    // .test((value) => {
    //   return value.endsWith(".jpg") || value.endsWith(".jpeg");
    // })
    .required("Please upload an image url"),
});

function DashboardEstablishment() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [successful, setSuccessful] = useState(false);

  const http = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    console.log(data);
    const image_url = data.images;
    console.log(data.facilities);

    //create a string of facilities because array is not accepted
    let facilities = "";
    data.facilities.forEach((facility) => {
      facilities += facility + ",";
    });

    //create correct formatted data before posting it
    const formatted_data = {
      status: "publish",
      title: data.name,
      acf: {
        type: data.type,
        address: data.address,
        address_description: data.address_description,
        km: data.km,
        price: data.price,
        rating: data.rating,
        description: data.description,
        image_url: data.images,
        facilities: facilities,
      },
    };

    // console.log(formatted_data);
    try {
      const response = await http.post(url, formatted_data);
      console.log("response", response.data);
      reset();
      setSuccessful(true);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={style.establishment}>
      <Container>
        <h3>
          <FontAwesomeIcon icon={faCirclePlus} className={style.icon_plus} />
          Add a new establishment
        </h3>
        {serverError && (
          <p className="error">There is an server error. Please try again</p>
        )}
        {successful && (
          <p className="success">Establishment successfully uploaded!</p>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={style.form_container}
          onClick={() => {
            setSuccessful(false);
          }}
        >
          <div className={`${style.form} ${style.details_div}`}>
            <h4>Details</h4>
            <label htmlFor="name">Name</label>
            <input {...register("name")} id="name" />
            {errors.name && (
              <span className={style.error}>{errors.name.message}</span>
            )}

            <label htmlFor="type">Type</label>
            <select {...register("type")}>
              <option value="Hotel">Hotel</option>
              <option value="Bed and breakfast">Bed and breakfast</option>
              <option value="Guesthouse">Guesthouse</option>
            </select>
            {errors.type && (
              <span className={style.error}>{errors.type.message}</span>
            )}

            <label htmlFor="address">Address</label>
            <input {...register("address", { required: true })} id="address" />
            {errors.address && (
              <span className={style.error}>{errors.address.message}</span>
            )}

            <label htmlFor="address_description">Address description</label>
            <textarea
              {...register("address_description", { required: true })}
              id="address_description"
              rows={5}
            />
            {errors.address_description && (
              <span className={style.error}>
                {errors.address_description.message}
              </span>
            )}

            <label htmlFor="km">Km away from city center</label>
            <input {...register("km", { required: true })} id="km" />
            {errors.km && (
              <span className={style.error}>{errors.km.message}</span>
            )}

            <label htmlFor="price">Price</label>
            <input
              type="number"
              {...register("price", { required: true })}
              id="price"
            />
            {errors.price && (
              <span className={style.error}>{errors.price.message}</span>
            )}

            <label htmlFor="rating">Rating</label>
            <input
              {...register("rating", { required: true })}
              id="rating"
              min={0.1}
              step="0.01"
              max={5}
              type="number"
            />
            {errors.rating && (
              <span className={style.error}>{errors.rating.message}</span>
            )}

            <label htmlFor="description">Description</label>
            <textarea
              {...register("description", { required: true })}
              id="description"
              rows={5}
            />
            {errors.description && (
              <span className={style.error}>{errors.description.message}</span>
            )}
          </div>
          <div className={`${style.form} ${style.facilities_div}`}>
            <h4>Facilities</h4>
            <label htmlFor="facilities">Facilities</label>
            <select
              {...register("facilities")}
              name="facilities"
              id="facilities"
              multiple
            >
              <option value="Air condition">Air condition</option>
              <option value="Breakfast">Breakfast</option>
              <option value="No smoking">No smoking</option>
              <option value="Parking">Parking</option>
              <option value="Pets allowed">Pets allowed</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Wi-fi">Wi-fi</option>
            </select>
            {errors.facilities && (
              <span className={style.error}>{errors.facilities.message}</span>
            )}
          </div>
          <div className={`${style.form} ${style.resources_div}`}>
            <h4>Resources</h4>
            <label htmlFor="images">Images</label>
            <input
              type="url"
              {...register("images", { required: true })}
              id="images"
              placeholder="Image url"
            />
            {errors.images && (
              <span className={style.error}>{errors.images.message}</span>
            )}
          </div>
          <div className={style.form_button_div}>
            <button
              className={style.form_button_clear}
              onClick={() => {
                reset();
              }}
            >
              Clear
            </button>
            <button className={style.form_button_add}>Add</button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default DashboardEstablishment;
