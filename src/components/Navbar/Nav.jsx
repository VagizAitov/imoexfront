import React from "react";
import { Link, UNSAFE_NavigationContext } from "react-router-dom";
import classes from "./nav.module.scss";

export default function Nav({ link }) {
  const logout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("jwt", "");
    nav("/login");
  };
  const id =
    localStorage.getItem("token") == ""
      ? ""
      : JSON.parse(localStorage.getItem("token")).id;

  const pressedKey = (event) => {
    if (event.key == "Enter") {
    }
  };
  return (
    <header className={classes.wrapper}>
      <div className={classes.underline}>
        <nav className={classes.navbar}>
          <ul>
            <li>
              {link == "profile" ? (
                <Link to={`/`} className={classes.main}>
                  Главная
                </Link>
              ) : (
                <Link to={`/profile/${id}`} className={classes.main}>
                  Профиль
                </Link>
              )}
            </li>
          </ul>
          <ul></ul>
          <ul>
            <li>
              <Link onClick={logout} to="/login" className={classes.login}>
                Выход
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
