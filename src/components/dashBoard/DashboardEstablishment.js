import style from "./DashboardEstablishment.module.css";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const schema = yup.object().shape({
  name: yup.string().required("Please enter a name").min(3),
  address: yup.string().required("Please enter an address"),
  price: yup.number().required("Please enter a price").min(50),
  rating: yup.number().required("Needs to be between 0 and 5").min(0).max(5),
  facilities: yup.array().required("Add at least one facility").min(1),
});

function DashboardEstablishment() {
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
    <div className={style.establishment}>
      <Container>
        <h3>
          <FontAwesomeIcon icon={faCirclePlus} className={style.icon_plus} />
          Add a new establishment
        </h3>
        <form onSubmit={handleSubmit(onSend)} className={style.form_container}>
          <div className={`${style.form} ${style.details_div}`}>
            <h4>Details</h4>
            <label htmlFor="name">Name</label>
            <input {...register("name")} id="name" />
            {errors.name && (
              <span className={style.error}>{errors.name.message}</span>
            )}

            <label htmlFor="address">Address</label>
            <input {...register("address", { required: true })} id="address" />
            {errors.address && (
              <span className={style.error}>{errors.address.message}</span>
            )}
            <label htmlFor="price">Price</label>
            <input {...register("price", { required: true })} id="price" />
            {errors.price && (
              <span className={style.error}>{errors.price.message}</span>
            )}

            <label htmlFor="rating">Rating</label>
            <input
              {...register("rating", { required: true })}
              id="rating"
              min={0}
              max={5}
            />
            {errors.message && (
              <span className={style.error}>{errors.message.message}</span>
            )}
          </div>
          <div className={`${style.form} ${style.facilities_div}`}>
            <h4>Facilities</h4>
            <label htmlFor="facilities">Facilities</label>
            <input
              {...register("facilities", { required: true })}
              id="facilities"
            />
          </div>
          <div className={`${style.form} ${style.resources_div}`}>
            <h4>Resources</h4>
            <label htmlFor="images">Images</label>
            <input
              type="file"
              accept="image/*"
              {...register("images", { required: true })}
              id="images"
            />
          </div>
          <div>
            <button>Clear</button>
            <button>Add</button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default DashboardEstablishment;
