import { API_URL, TOKEN_PATH } from "../constants/api";
import axios from "axios";

const url = API_URL + TOKEN_PATH;

/**
 * Generates message token to make post requests
 * Token expires after some days so I can't hardcode the token
 * @returns message token in localStorage
 */

async function messageToken() {
  const data = {
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD,
  };

  try {
    const response = await axios.post(url, data);
    localStorage.setItem("messageToken", response.data.token);
  } catch (error) {
    console.log("error", error);
  }
}

export default messageToken;
