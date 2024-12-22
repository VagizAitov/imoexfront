import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Nav from "../Navbar/Nav";
import classes from "./main.module.scss";
import Pagination from "./pagination/Pagination";

export default function Main() {
  const nav = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [indexFirst, setIndexFirst] = useState(3);
  const [indexSecond, setIndexSecond] = useState(2);
  const [upOrDown, setUpOrDown] = useState(1);

  const [count, setCount] = useState(0);
  const [countPages, setCountPages] = useState(0);
  const [page, setPage] = useState();
  const [currentPage, setCurrentPage] = useState(Number(params.page));

  const [sharesOrBonds, setSharesOrBonds] = useState(
    location.pathname.indexOf("shares") != -1 ? 1 : 0
  );

  const paintedPages = [];

  const [dayUpgrades, setDayUpgrades] = useState();
  const [dayDowngrades, setDayDowngrades] = useState();

  const [likedShares, setLikedShares] = useState();

  const like = (idshare, price) => {
    if (sharesOrBonds) {
      axios
        .post("http://localhost:8082/likedSharesById", {
          iduser:
            localStorage.getItem("token") == ""
              ? ""
              : JSON.parse(localStorage.getItem("token")).id,
          idshare: idshare,
          price: price,
        })
        .then((res) => {
          if (res.data.Message) {
            axios
              .delete(
                `http://localhost:8082/likedSharesByIdShare?idshare=${idshare}`
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Тут");
      axios
        .post("http://localhost:8082/likedBondsById", {
          iduser:
            localStorage.getItem("token") == ""
              ? ""
              : JSON.parse(localStorage.getItem("token")).id,
          idbond: idshare,
          price: price,
        })
        .then((res) => {
          console.log(res);
          if (res.data.Message) {
            axios
              .delete(
                `http://localhost:8082/likedBondsByIdBond?idbond=${idshare}`
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8082/jwtCheck?token=${localStorage.getItem("jwt")}`
      )
      .then((res) => {
        if (!res.data) {
          console.log(res.data);
          nav("/login");
        }
      });
    if (sharesOrBonds) {
      axios
        .get(
          `http://localhost:8082/likedSharesById?iduser=${
            localStorage.getItem("token") == ""
              ? ""
              : JSON.parse(localStorage.getItem("token")).id
          }`
        )
        .then((res) => {
          let tempArr = [];
          for (let i = 0; i < res.data.length; i++) {
            tempArr.push(res.data[i].idshare);
          }
          setLikedShares(tempArr);
        });
    } else {
      axios
        .get(
          `http://localhost:8082/likedBondsById?iduser=${
            localStorage.getItem("token") == ""
              ? ""
              : JSON.parse(localStorage.getItem("token")).id
          }`
        )
        .then((res) => {
          console.log(res.data);
          let tempArr = [];
          for (let i = 0; i < res.data.length; i++) {
            tempArr.push(res.data[i].idbond);
          }
          console.log(tempArr);
          setLikedShares(tempArr);
        });
    }

    if (sharesOrBonds) {
      axios.get(`http://localhost:8082/shares-count`).then((res) => {
        setCount(res.data[0].count);
        setCountPages(Math.ceil(res.data[0].count / 13));
      });
      axios
        .get(
          `http://localhost:8082/shares?limit=13&page=${
            currentPage - 1
          }&d=1&by=LAST`
        )
        .then((res) => setPage(res.data));

      axios
        .get(`http://localhost:8082/shares?limit=7&page=0&d=1&by=diff`)
        .then((res) => setDayUpgrades(res.data));
      axios
        .get(`http://localhost:8082/shares?limit=7&page=0&d=0&by=diff`)
        .then((res) => setDayDowngrades(res.data));
    } else {
      axios.get(`http://localhost:8082/bonds-count`).then((res) => {
        setCount(res.data[0].count);
        setCountPages(Math.ceil(res.data[0].count / 13));
      });
      axios
        .get(
          `http://localhost:8082/bonds?limit=13&page=${
            currentPage - 1
          }&d=1&by=LAST`
        )
        .then((res) => setPage(res.data));
      axios
        .get(`http://localhost:8082/bonds?limit=7&page=0&d=1&by=diff`)
        .then((res) => setDayUpgrades(res.data));
      axios
        .get(`http://localhost:8082/bonds?limit=7&page=0&d=0&by=diff`)
        .then((res) => setDayDowngrades(res.data));
    }
  }, []);

  const changePageShares = (page) => {
    axios
      .get(`http://localhost:8082/shares?limit=13&page=${page - 1}&d=1&by=LAST`)
      .then((res) => setPage(res.data));
    axios
      .get(
        `http://localhost:8082/likedSharesById?iduser=${
          localStorage.getItem("token") == ""
            ? ""
            : JSON.parse(localStorage.getItem("token")).id
        }`
      )
      .then((res) => {
        let tempArr = [];
        for (let i = 0; i < res.data.length; i++) {
          tempArr.push(res.data[i].idshare);
        }
        setLikedShares(tempArr);
      });
  };

  const changePageBonds = (page) => {
    axios
      .get(`http://localhost:8082/bonds?limit=13&page=${page - 1}&d=1&by=LAST`)
      .then((res) => setPage(res.data));
    axios
      .get(
        `http://localhost:8082/likedBondsById?iduser=${
          localStorage.getItem("token") == ""
            ? ""
            : JSON.parse(localStorage.getItem("token")).id
        }`
      )
      .then((res) => {
        let tempArr = [];
        for (let i = 0; i < res.data.length; i++) {
          tempArr.push(res.data[i].idbond);
        }
        setLikedShares(tempArr);
      });
  };
  const changeToShares = () => {
    setCurrentPage(1);
    axios.get(`http://localhost:8082/shares-count`).then((res) => {
      setCount(res.data[0].count);
      setCountPages(Math.ceil(res.data[0].count / 13));
    });
    axios
      .get(
        `http://localhost:8082/shares?limit=13&page=${
          currentPage - 1
        }&d=1&by=LAST`
      )
      .then((res) => setPage(res.data));
    axios
      .get(`http://localhost:8082/shares?limit=7&page=0&d=1&by=diff`)
      .then((res) => setDayUpgrades(res.data));
    axios
      .get(`http://localhost:8082/shares?limit=7&page=0&d=0&by=diff`)
      .then((res) => setDayDowngrades(res.data));
    changePageShares(1);
  };
  const changeToBonds = () => {
    axios
      .get(
        `http://localhost:8082/likedBondsById?iduser=${
          localStorage.getItem("token") == ""
            ? ""
            : JSON.parse(localStorage.getItem("token")).id
        }`
      )
      .then((res) => {
        console.log(res.data);
        let tempArr = [];
        for (let i = 0; i < res.data.length; i++) {
          tempArr.push(res.data[i].idbond);
        }
        console.log(tempArr);
        setLikedShares(tempArr);
      });
    setCurrentPage(1);
    axios.get(`http://localhost:8082/bonds-count`).then((res) => {
      setCount(res.data[0].count);
      setCountPages(Math.ceil(res.data[0].count / 13));
    });
    axios
      .get(
        `http://localhost:8082/bonds?limit=13&page=${
          currentPage - 1
        }&d=1&by=LAST`
      )
      .then((res) => setPage(res.data));
    axios
      .get(`http://localhost:8082/bonds?limit=7&page=0&d=1&by=diff`)
      .then((res) => setDayUpgrades(res.data));
    axios
      .get(`http://localhost:8082/bonds?limit=7&page=0&d=0&by=diff`)
      .then((res) => setDayDowngrades(res.data));
    changePageBonds(1);
  };

  for (let i = 1; i < countPages; i++) {
    paintedPages.push(i);
  }
  if (currentPage > 6) {
    paintedPages.splice(1, currentPage - 6, "...");
  }
  if (currentPage < countPages - 5)
    paintedPages.splice(
      paintedPages.indexOf(currentPage) + 5,
      paintedPages.length - paintedPages.indexOf(currentPage) + 1,
      "..."
    );

  const upgrades = () => {
    setIndexFirst(3);
    setIndexSecond(2);
    setUpOrDown(1);
  };

  const downgrades = () => {
    setIndexFirst(2);
    setIndexSecond(3);
    setUpOrDown(0);
  };

  return (
    <div>
      <Nav link={"main"} />
      <div className={classes.wrapper}>
        <div className={classes.main}>
          <div className={classes.news}>
            <div className={classes.wrapperNews}>
              <div className={classes.buttons}>
                <div>
                  <button
                    className={classes.first}
                    style={{
                      zIndex: indexFirst,
                      background: indexFirst == 3 ? "#D9D9D9" : "white",
                    }}
                    onClick={upgrades}
                  >
                    Взлеты дня
                  </button>
                  <button
                    className={classes.second}
                    style={{
                      zIndex: indexSecond,
                      background: indexSecond == 3 ? "#D9D9D9" : "white",
                    }}
                    onClick={downgrades}
                  >
                    Падения дня
                  </button>
                </div>
              </div>
              <div className={classes.wrapperDiff}>
                {upOrDown == 0 ? (
                  <div className={classes.diff}>
                    <ul>
                      {dayDowngrades == undefined ? (
                        <p>Loading...</p>
                      ) : (
                        dayDowngrades.map((share) => (
                          <li>
                            <p>{share.SECID}</p>
                            <p style={{ color: "black" }}>
                              {share.LAST}{" "}
                              <span style={{ color: "#D8261A" }}>
                                {share.diffPercent == null
                                  ? "null"
                                  : share.diffPercent.toFixed(2)}
                                %
                              </span>
                            </p>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                ) : (
                  <div className={classes.diff}>
                    <ul>
                      {dayUpgrades == undefined ? (
                        <p>Loading...</p>
                      ) : (
                        dayUpgrades.map((share) => (
                          <li>
                            <p>{share.SECID}</p>
                            <p style={{ color: "black" }}>
                              {share.LAST}{" "}
                              <span style={{ color: "#05B954" }}>
                                +{share.diffPercent.toFixed(2)}%
                              </span>
                            </p>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                )}
              </div>
              <div></div>
            </div>
          </div>
          <div className={classes.sharesOrBonds}>
            <div>
              <a
                className={sharesOrBonds == 1 ? classes.curr : ""}
                onClick={() => {
                  changeToShares();
                  setSharesOrBonds(1);
                  nav("/main/shares/1");
                }}
              >
                Акции
              </a>
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <a
                className={sharesOrBonds == 0 ? classes.curr : ""}
                onClick={() => {
                  changeToBonds();
                  setSharesOrBonds(0);
                  nav("/main/bonds/1");
                }}
              >
                Облигации
              </a>
            </div>
          </div>
          <div>
            <ul>
              <li
                className={classes.share}
                style={{ listStyleType: "none", height: "35px" }}
              >
                <p>Название</p>
                <p>Посл. цена</p>
                <p>Макс. цена</p>
                <p>Мин. цена</p>
                <p>Цена открытия</p>
                <a title="Изменение цены относительно цены открытия в рублях (Посл. цена - Цена открытия = Изм.)">
                  Изм.
                </a>
                <a title="Изменение цены относительно цены открытия в процентах ((Посл. цена / Цена открытия - 1)*100 = Изм. %)">
                  Изм. %
                </a>
              </li>
              {page == undefined ? (
                <p>Loading...</p>
              ) : (
                page.map((share) => (
                  <li
                    style={{ listStyleType: "none", height: "35px" }}
                    className={classes.share}
                    id={share.id}
                    key={share.id}
                  >
                    <div style={{ display: "flex" }}>
                      <button
                        className={
                          likedShares == undefined
                            ? classes.notLiked
                            : likedShares.indexOf(share.id) != -1
                            ? classes.liked
                            : classes.notLiked
                        }
                        onClick={(event) => {
                          like(share.id, share.LAST);
                          if (event.target.className == classes.liked) {
                            event.target.className = classes.notLiked;
                          } else {
                            event.target.className = classes.liked;
                          }
                        }}
                      ></button>
                      <p style={{ paddingLeft: "5px" }}>
                        <a
                          onClick={() =>
                            nav(
                              `${sharesOrBonds ? "/share" : "/bond"}/${
                                share.id
                              }`
                            )
                          }
                        >
                          {share.SHORTNAME}
                        </a>
                      </p>
                    </div>
                    <p>{share.LAST} р.</p>
                    <p>{share.HIGH} р.</p>
                    <p>{share.LOW} р.</p>
                    <p>{share.OPEN} р.</p>
                    {share.diffRubles < 0 ? (
                      <p style={{ color: "#D8261A" }}>{share.diffRubles} р.</p>
                    ) : (
                      <p style={{ color: "#05B954" }}>+{share.diffRubles} р.</p>
                    )}
                    {share.diffPercent < 0 ? (
                      <p style={{ color: "#D8261A" }}>{share.diffPercent}%</p>
                    ) : (
                      <p style={{ color: "#05B954" }}>+{share.diffPercent}%</p>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
          <Pagination
            currentPage={currentPage}
            paintedPages={paintedPages}
            setCurrentPage={setCurrentPage}
            changePageShares={changePageShares}
            countPages={countPages}
            sharesOrBonds={sharesOrBonds}
            changePageBonds={changePageBonds}
          />
        </div>
      </div>
    </div>
  );
}
