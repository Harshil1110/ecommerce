import React, { useState, useEffect } from "react";
import axios from "axios";

const Fetch_products = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);
  return [data];
};

export default Fetch_products;
