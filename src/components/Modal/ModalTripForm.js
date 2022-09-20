import { useState } from "react";
import style from "./ModalTripForm.module.css";

function ModalTripForm({ price }) {
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [travelers, setTravelers] = useState(1);

  let price_per_night = price;
  let total_price = 0;
  let total_nights = 0;
  let night = "night";
  let minDateEnd = "";

  //calculate price and nights
  if (dateStart !== "") {
    //must choose a check out time minimum a day later
    let splitDateStart = dateStart.split("-");
    let yearStart = splitDateStart[0];
    let monthStart = splitDateStart[1];
    let dayStart = parseInt(splitDateStart[2]) + 1;

    if (dayStart < 10) {
      dayStart = "0" + dayStart.toString();
    }

    minDateEnd = `${yearStart}-${monthStart}-${dayStart}`;

    //calculate nights
    if (dateEnd !== "") {
      let date1 = new Date(dateStart);
      let date2 = new Date(dateEnd);

      const difference_in_time = date2.getTime() - date1.getTime();
      total_nights = difference_in_time / (1000 * 3600 * 24);

      if (total_nights > 1) {
        night = "nights";
      }
      //calculate price
      total_price = price_per_night * total_nights;
    }
  }

  //get current date in correct format
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

  const changeDateStart = (event) => {
    console.log(event.target.value);
    setDateStart(event.target.value);
  };
  const changeDateEnd = (event) => {
    setDateEnd(event.target.value);
  };

  const selectTravelers = (event) => {
    setTravelers(event.target.value);
  };

  return (
    <>
      <div className={style.trip_form}>
        <h4 className="uppercase">Your trip</h4>
        <div className={style.trip_form_input}>
          <label htmlFor="start">Check-in *</label>
          <input
            type="date"
            id="start"
            name="trip-start"
            value={dateStart}
            min={minDate}
            max={dateEnd}
            onChange={changeDateStart}
          />
        </div>
        <div className={style.trip_form_input}>
          <label htmlFor="end">Check-out *</label>
          <input
            type="date"
            id="end"
            name="trip-start"
            value={dateEnd}
            min={minDateEnd}
            max="2023-12-31"
            onChange={changeDateEnd}
          />
        </div>
        <div className={style.trip_form_input}>
          <label htmlFor="travelers">Select number of travelers *</label>
          <select name="travelers" id="travelers" onChange={selectTravelers}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
      </div>
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
    </>
  );
}

export default ModalTripForm;
