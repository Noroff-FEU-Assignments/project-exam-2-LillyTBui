import style from "./DashboardEstablishment.module.css";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../UI/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import { API_URL } from "../../constants/api";
import axios from "axios";
import { useState } from "react";

const url =
  API_URL +
  `wc/v3/products?consumer_key=${process.env.REACT_APP_WC_CONSUMER_KEY}&consumer_secret=${process.env.REACT_APP_WC_CONSUMER_SECRET}&Content-Type:application/json`;

const schema = yup.object().shape({
  name: yup.string().required("Please enter a name").min(3),
  type: yup.string().required("Please choose an establishment type"),
  address: yup.string().required("Please enter an address"),
  price: yup.number().required("Please enter a price").min(50),
  rating: yup.number().required("Needs to be between 0 and 5").min(0).max(5),
  description: yup
    .string()
    .required("Please enter a short description")
    .min(10),
  images: yup
    .string()
    .url()
    .test((value) => {
      return value.endsWith(".jpg") || value.endsWith(".jpeg");
    })
    .required("Please upload an image url that ends with .jpg or .jpeg"),
  facilities: yup.array().required("Add at least one facility").min(1),
});

function DashboardEstablishment() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

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
    const image_url = data.images;
    console.log(data.facilities);

    //format the tags into objects with id
    let tags = [];
    data.facilities.forEach((tag) => {
      tags.push({ id: tag });
    });

    //create correct formatted data before posting it
    const formatted_data = {
      name: data.name,
      type: "simple",
      regular_price: data.price.toString(),
      description: data.description,
      short_description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      categories: [
        {
          id: data.type,
        },
      ],
      images: [
        {
          src: image_url,
        },
      ],
      tags: tags,
    };

    console.log(formatted_data);
    try {
      const response = await axios.post(url, formatted_data);
      console.log("response", response.data);
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={style.form_container}
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
              <option value="26">Hotel</option>
              <option value="37">Bed and breakfast</option>
              <option value="28">Guesthouse</option>
            </select>
            {errors.type && (
              <span className={style.error}>{errors.type.message}</span>
            )}

            <label htmlFor="address">Address</label>
            <input {...register("address", { required: true })} id="address" />
            {errors.address && (
              <span className={style.error}>{errors.address.message}</span>
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
              min={0}
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
              <option value="32">Air condition</option>
              <option value="36">Breakfast</option>
              <option value="31">No smoking</option>
              <option value="30">Parking</option>
              <option value="29">Pets allowed</option>
              <option value="35">Restaurant</option>
              <option value="34">Wi-fi</option>
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
            <button className={style.form_button_clear}>Clear</button>
            <button className={style.form_button_add}>Add</button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default DashboardEstablishment;
