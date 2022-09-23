import style from "./HotelFacilities.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugSaucer,
  faUtensils,
  faWifi,
  faBanSmoking,
  faSquareParking,
  faDog,
  faTemperatureArrowDown,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Generates a list of facilities
 * @param {string} facilities string which contains all the facilities separated with comma
 * @returns each facility in the list with matching icon
 */

function HotelFacilities({ facilities }) {
  //get each facility from string
  const facilities_split = facilities.trim().split(",");
  let facilities_list = facilities_split.filter((facility) => {
    return facility.length !== 0;
  });

  //add icon to corresponding facility
  facilities_list = facilities_list.map((facility) => {
    let icon;
    if (facility === "Air condition") {
      icon = faTemperatureArrowDown;
    } else if (facility === "Breakfast") {
      icon = faMugSaucer;
    } else if (facility === "No smoking") {
      icon = faBanSmoking;
    } else if (facility === "Parking") {
      icon = faSquareParking;
    } else if (facility === "Pets allowed") {
      icon = faDog;
    } else if (facility === "Restaurant") {
      icon = faUtensils;
    } else if (facility === "Wi-fi") {
      icon = faWifi;
    }
    return { facility, icon };
  });

  return (
    <ul className={style.facilities_ul}>
      {facilities_list.map((facility) => {
        return (
          <li key={facility.facility}>
            <FontAwesomeIcon
              icon={facility.icon}
              className={style.facilities_icon}
            />
            {facility.facility}
          </li>
        );
      })}
    </ul>
  );
}

HotelFacilities.propTypes = {
  facilities: PropTypes.string.isRequired,
};

export default HotelFacilities;
