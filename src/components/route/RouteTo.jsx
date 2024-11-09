import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RouteTo() {
  const nav = useNavigate();
  useEffect(() => {
    nav("/main/shares/1");
  }, []);
  return <div></div>;
}
