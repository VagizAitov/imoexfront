import axios from "axios";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import Nav from "../Navbar/Nav";
import classes from "./page.module.scss";

export default function ShareBondPage() {
  const params = useParams();
  const [chartData, setChartData] = useState();
  const [chartLayout, setChartLayout] = useState();
  const [name, setName] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:8082/chartShare?id=${params.idshare}`)
      .then((res) => {
        setName(res.data[0].SHORTNAME);
        setChartData(JSON.parse(res.data[0].chart).data);
        setChartLayout(JSON.parse(res.data[0].chart).layout);
      });
  }, []);
  return (
    <div>
      <Nav />
      <div
        style={{
          display: "grid",
          justifyContent: "center",
        }}
      >
        <div style={{ marginTop: "100px" }}>
          <h1 className={classes.name}>{name}</h1>
        </div>
        <Plot
          data={chartData == undefined ? [{}] : chartData}
          layout={chartLayout == undefined ? {} : chartLayout}
        />
      </div>
    </div>
  );
}
