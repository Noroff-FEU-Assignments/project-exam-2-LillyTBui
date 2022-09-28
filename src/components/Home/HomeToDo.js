import style from "./HomeToDo.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constants/api";
import ErrorMessage from "../UI/ErrorMessage";
import Spinner from "react-bootstrap/Spinner";

const API = API_URL + "wp/v2/posts";

/**
 * Generates a section with posts about things to do in Bergen
 * @returns a list of posts
 */

function HomeToDo() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await axios.get(API);
        setPosts(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="spinner_div">
        <Spinner animation="border" role="status" className="spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage>An error occurred: {error}</ErrorMessage>;
  }

  return (
    <div>
      <h2>Things to do in Bergen</h2>
      <div className={style.post_grid}>
        {posts.map((post) => {
          return (
            <div key={post.id} className={style.post_item}>
              <img
                src={post.acf.img_url}
                alt={post.acf.img_alt}
                className={style.post_img}
              />
              <p className={style.post_title}>{post.title.rendered}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeToDo;
