import { useContext } from "react";
import style from "./ModalPrice.module.css";
import Context from "../../Context/ModelFormContext";

/**
 * Calculates and displays price details
 * @param {*} props takes in startDate, endDate and price
 * @returns price details
 */

function ModalPrice(props) {
  const [totalPrice, setTotalPrice] = useContext(Context);

  let price_per_night = props.price;
  let total_price = 0;
  let total_nights = 0;
  let night = "night";

  //calculate price and nights
  if (props.startDate !== "") {
    //calculate nights
    if (props.endDate !== "") {
      let date1 = new Date(props.startDate);
      let date2 = new Date(props.endDate);

      const difference_in_time = date2.getTime() - date1.getTime();
      total_nights = difference_in_time / (1000 * 3600 * 24);

      if (total_nights > 1) {
        night = "nights";
      }
      //calculate price
      total_price = price_per_night * total_nights;
      setTotalPrice(total_price);
    }
  }

  return (
    <div className={style.price_details_div}>
      <h4 className="uppercase">Price details</h4>
      <div className={style.price_details}>
        <p>{price_per_night} NOK per night</p>
        <p>
          {total_nights} {night}
        </p>
      </div>
      <div className={style.price_details_total}>
        <h5 className="uppercase">Total</h5>
        <p>{total_price} NOK</p>
      </div>
    </div>
  );
}

export default ModalPrice;
