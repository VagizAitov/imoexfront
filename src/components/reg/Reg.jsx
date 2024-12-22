import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import classes from "./reg.module.scss";

export default function Reg() {
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("jwt") != null) {
      axios
        .get(
          `http://localhost:8082/jwtCheck?token=${localStorage.getItem("jwt")}`
        )
        .then((res) => {
          if (res.data) {
            nav("/main/shares/1");
          }
        });
    }
  }, []);

  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [resp, setResp] = useState(false);

  const submit = () => {
    axios.get(`http://localhost:8082/users/${login}`).then((res) => {
      console.log(res.data);
      if (res.data.length == 1) {
        console.log(234);
        const id = Date.now();
        axios
          .post("http://localhost:8082/users", {
            id: id,
            pass: pass,
            login: login,
            token: "",
          })
          .then((res) => {
            console.log(res);
            axios
              .get(
                `http://localhost:8082/getToken?id=${id}&login=${login}&pass=${pass}`
              )
              .then((res) => localStorage.setItem("jwt", res.data));
          })
          .catch((err) => console.log(err));
        localStorage.setItem(
          "token",
          JSON.stringify({
            id: id,
            login: login,
            pass: pass,
          })
        );
        alert("Вы зарегистрировались");
        nav(`/profile/${id}`);
      } else {
        console.log("This login already exist");
      }
    });
  };

  return (
    <div className={classes.main}>
      <div className={classes.wrapper}>
        <div className={classes.regForm}>
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/pastel-glyph/100/person-male--v2.png"
            alt="person-male--v2"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Имя пользователя"
            onChange={() => setLogin(event.target.value)}
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Пароль"
            onChange={() => setPass(event.target.value)}
          />
          <button onClick={submit}>Зарегистрироваться</button>
          <div className={classes.haveAcc}>
            <p>Уже есть аккаунт?</p>
            <button onClick={() => nav("/login")}>Войти</button>
          </div>
        </div>
      </div>
    </div>
  );
}
