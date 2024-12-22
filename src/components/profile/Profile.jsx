import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Nav from "../Navbar/Nav";
import classes from "./profile.module.scss";

export default function Profile() {
  const params = useParams();
  const nav = useNavigate();
  const [user, setUser] = useState();
  const [sharesOrBonds, setSharesOrBonds] = useState("shares");
  const [lengthArr, setLengthArr] = useState();
  const [cost, setCost] = useState(0);
  const [data, setData] = useState([]);
  const [liked, setLiked] = useState([]);
  const [count, setCount] = useState(0);
  const [countPages, setCountPages] = useState(0);
  const [page, setPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const paintedPages = [];

  useEffect(() => {
    axios
      .get(
        `http://localhost:8082/jwtCheck?token=${localStorage.getItem("jwt")}`
      )
      .then((res) => {
        if (!res.data) {
          nav("/login");
        }
      });
    setLiked([]);
    axios
      .get(`http://localhost:8082/usersById?id=${params.id}`)
      .then((res) => setUser(res.data));
    if (sharesOrBonds == "shares") {
      axios
        .get(`http://localhost:8082/likedSharesById?iduser=${params.id}`)
        .then((res) => {
          setLengthArr(res.data.length);
          for (let i = 0; i < res.data.length; i++) {
            setLiked((liked) => [...liked, res.data[i].price / 2]);
            axios
              .get(`http://localhost:8082/sharesById?id=${res.data[i].idshare}`)
              .then((res) => {
                setData((data) => [...data, res.data[0]]);
                setCost((cost) => cost + res.data[0].LAST / 2);
              });
          }
        });
    } else {
      axios
        .get(`http://localhost:8082/likedBondsById?iduser=${params.id}`)
        .then((res) => {
          axios
            .get(`http://localhost:8082/bondsById?id=${params.id}`)
            .then((res) => {
              for (let i = 0; i < res.data.length; i++) {
                setLiked((liked) => [...liked, res.data[i].price / 2]);
                axios
                  .get(
                    `http://localhost:8082/bondsById?id=${res.data[i].idbond}`
                  )
                  .then((res) => {
                    setData((data) => [...data, res.data[0]]);
                    setCost((cost) => cost + res.data[0].LAST);
                  });
              }
            });
        });
    }
  }, []);

  const refreshPage = (isShares) => {
    setLiked([]);
    setCost(0);
    setData([]);
    if (isShares == "shares") {
      axios
        .get(`http://localhost:8082/likedSharesById?iduser=${params.id}`)
        .then((res) => {
          setLengthArr(res.data.length);
          for (let i = 0; i < res.data.length; i++) {
            setLiked((liked) => [...liked, res.data[i].price]);
            axios
              .get(`http://localhost:8082/sharesById?id=${res.data[i].idshare}`)
              .then((res) => {
                setData((data) => [...data, res.data[0]]);
                setCost((cost) => cost + res.data[0].LAST);
              });
          }
        });
    } else {
      axios
        .get(`http://localhost:8082/likedBondsById?iduser=${params.id}`)
        .then((res) => {
          setLengthArr(res.data.length);

          for (let i = 0; i < res.data.length; i++) {
            setLiked((liked) => [...liked, res.data[i].price]);
            axios
              .get(`http://localhost:8082/bondsById?id=${res.data[i].idbond}`)
              .then((res) => {
                setData((data) => [...data, res.data[0]]);
                setCost((cost) => cost + res.data[0].LAST);
              });
          }
        });
    }
  };

  const sum = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  };
  return (
    <div>
      <Nav link={"profile"} />

      <div className={classes.wrapper}>
        <div className={classes.main}>
          <div className={classes.infoBox}>
            <div className={classes.pp}>
              <img
                src="../../../public/profilepictureifnotexist.jpg"
                style={{ height: "90px", width: "90px", borderRadius: "13px" }}
                alt=""
                href="../../../public/profilepictureifnotexist.jpg"
              />
            </div>
            <div className={classes.info}>
              <p className={classes.id}>
                ID: {user == undefined ? <p>Loading</p> : user[0].id}
              </p>
              <p className={classes.name}>
                {user == undefined ? <p>Loading</p> : user[0].login}
              </p>
            </div>
          </div>
          <div className={classes.incomeStats}>
            <div className={classes.cost}>
              <p className={classes.statName}>Стоимость</p>
              <p className={classes.statInfo}>{cost.toFixed(2)}</p>
            </div>
            <div className={classes.income}>
              <p className={classes.statName}>Прибыль</p>
              <p className={classes.statInfo}>
                {Math.floor(cost - sum(liked))}
              </p>
            </div>
            <div className={classes.incomePercent}>
              <p className={classes.statName}>Доходность</p>
              <p className={classes.statInfo}>
                {((Math.floor(cost - sum(liked)) / sum(liked)) * 100).toFixed(
                  2
                ) + "%"}
              </p>
            </div>
          </div>
          <div className={classes.sharesOrBonds}>
            <div style={{ padding: "10px" }}>
              <a
                className={sharesOrBonds == "shares" ? classes.curr : ""}
                onClick={() => {
                  setSharesOrBonds("shares");
                  refreshPage("shares");
                }}
              >
                Акции
              </a>
            </div>
            <div style={{ padding: "10px" }}>
              <a
                className={sharesOrBonds == "bonds" ? classes.curr : ""}
                onClick={() => {
                  setSharesOrBonds("bonds");
                  refreshPage("bonds");
                }}
              >
                Облигации
              </a>
            </div>
          </div>
          <div className={classes.alldata}>
            <ul>
              <li key="1">
                <p>Название</p>
                <p>Посл.</p>
                <p>Макс.</p>
                <p>Мин.</p>
                <p>Изм.</p>
                <p>Изм. %</p>
              </li>
              {data.slice(0, lengthArr).map((obj) => (
                <li key={obj.id}>
                  <p>
                    <a
                      onClick={() =>
                        nav(
                          `${sharesOrBonds == "shares" ? "/share" : "/bond"}/${
                            obj.id
                          }`
                        )
                      }
                    >
                      {obj.SHORTNAME}
                    </a>
                  </p>
                  <p>{obj.LAST}</p>
                  <p>{obj.HIGH}</p>
                  <p>{obj.LOW}</p>
                  {obj.diffRubles < 0 ? (
                    <p style={{ color: "#D8261A" }}>{obj.diffRubles}</p>
                  ) : (
                    <p style={{ color: "#05B954" }}>+{obj.diffRubles}</p>
                  )}
                  {obj.diffPercent < 0 ? (
                    <p style={{ color: "#D8261A" }}>{obj.diffPercent}%</p>
                  ) : (
                    <p style={{ color: "#05B954" }}>+{obj.diffPercent}%</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
