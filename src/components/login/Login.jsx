import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./login.module.scss";

export default function Login() {
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
  const [password, setPassword] = useState("");

  const submit = () => {
    axios
      .get(`http://localhost:8082/users/${login}`)
      .then((res) => {
        if (res.data.length < 2) {
          alert("Неверный логин или пароль");
        } else {
          if (res.data[0].pass == password) {
            localStorage.setItem(
              "token",
              JSON.stringify({
                id: res.data[0].id,
                login: login,
                pass: password,
              })
            );
            localStorage.setItem("jwt", res.data[1]);
            alert("Вы вошли");
            nav(`/`);
          }
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.main}>
      <div className={classes.wrapper}>
        <div className={classes.loginForm}>
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
            type="password"
            name=""
            id=""
            placeholder="Пароль"
            onChange={() => setPassword(event.target.value)}
          />
          <button onClick={submit}>Войти</button>
          <div className={classes.noAcc}>
            <div>
              <p>Нет аккаунта?</p>
              <button onClick={() => nav("/registration")}>Регистрация</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
