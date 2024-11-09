import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import classes from "./post.module.scss";
import Nav from "../../Navbar/Nav";

export default function Post() {
  const [post, setPost] = useState();
  const params = useParams();

  const [isLiked, setisLiked] = useState(false);

  const [userId, setUserID] = useState(
    JSON.parse(localStorage.getItem("token")).id
  );

  const like = () => {
    setisLiked(isLiked == true ? false : true);
    axios
      .get(`http://45.67.59.245:8082/liked/${userId}/${post.id}`)
      .then((res) => {
        if (res.data.length == 0) {
          axios
            .post("http://45.67.59.245:8082/liked", {
              iduser: userId,
              idpost: post.id,
            })
            .then((res) => console.log(res));
        } else {
          axios
            .delete("http://45.67.59.245:8082/liked", {
              data: {
                iduser: userId,
                idpost: post.id,
              },
            })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios.get(`http://45.67.59.245:8082/posts/${params.idpost}`).then((res) => {
      setPost(res.data[0]);
      axios
        .get(`http://45.67.59.245:8082/liked/${userId}/${res.data[0].id}`)
        .then((res) =>
          res.data.length == 0 ? setisLiked(false) : setisLiked(true)
        )
        .catch((err) => console.log(err));
    });
  }, []);
  return (
    <div>
      <Nav />
      <div className={classes.main}>
        <div className={classes.wrapper}>
          <div className={classes.info}>
            {post == undefined ? (
              <p className={classes.title}>Loading</p>
            ) : (
              <div>
                <p className={classes.title}>{post.title}</p>
                <p className={classes.text}>{post.text}</p>
              </div>
            )}
            <button
              onClick={like}
              className={isLiked == true ? classes.liked : classes.notLiked}
            >
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
