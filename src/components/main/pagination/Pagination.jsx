import React, { useEffect, useState } from "react";
import classes from "./pagination.module.scss";
import { useNavigate } from "react-router-dom";

export default function Pagination({
  paintedPages,
  currentPage,
  setCurrentPage,
  changePageShares,
  countPages,
  sharesOrBonds,
  changePageBonds,
}) {
  const nav = useNavigate();
  return (
    <div>
      <ul style={{ display: "flex" }}>
        <li>
          <button
            className={classes.others}
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage((currentPage) => currentPage - 1);
                if (sharesOrBonds) {
                  changePageShares(currentPage - 1);
                  nav(`/main/shares/${currentPage - 1}`);
                } else {
                  changePageBonds(currentPage - 1);
                  nav(`/main/bonds/${currentPage - 1}`);
                }
              }
            }}
          >
            {"< Назад"}
          </button>
        </li>
        {paintedPages == undefined ? (
          <p>Loading...</p>
        ) : (
          paintedPages.map((page) => (
            <li>
              {page == currentPage || page == "..." ? (
                <button className={classes.current} disabled>
                  {page}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setCurrentPage(page);
                    if (sharesOrBonds) {
                      changePageShares(page);
                      nav(`/main/shares/${page}`);
                    } else {
                      changePageBonds(page);
                      nav(`/main/bonds/${page}`);
                    }
                  }}
                  className={classes.others}
                >
                  {page}
                </button>
              )}
            </li>
          ))
        )}
        <li>
          {countPages == currentPage || countPages == "..." ? (
            <button className={classes.current} disabled>
              {countPages}
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentPage(countPages);
                if (sharesOrBonds) {
                  changePageShares(countPages);
                } else {
                  changePageBonds(countPages);
                }
              }}
              className={classes.others}
            >
              {countPages}
            </button>
          )}
        </li>
        <li>
          <button
            className={classes.others}
            onClick={() => {
              if (currentPage < countPages) {
                setCurrentPage((currentPage) => currentPage + 1);
                if (sharesOrBonds) {
                  changePageShares(currentPage + 1);
                  nav(`/main/shares/${currentPage + 1}`);
                } else {
                  changePageBonds(currentPage + 1);
                  nav(`/main/bonds/${currentPage + 1}`);
                }
              }
            }}
          >
            {"Вперёд >"}
          </button>
        </li>
      </ul>
    </div>
  );
}
