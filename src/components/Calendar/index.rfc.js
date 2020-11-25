import React from "react";
import { useState, useEffect } from "react";
import Style from "./style";
import { genereateCalendar } from "./utils";

export default function Calendar() {
  const [data, setData] = useState([]);
  const [day, setDay] = useState(1);
  console.log(day, setDay);

  useEffect(() => {
    const data = genereateCalendar();
    console.log(data);
    setData(data);
  }, []);

  return (
    <div className={Style["c-calendar"]}>
      {data.map((item, index) => (
        <div key={index}>{item.day}</div>
      ))}
    </div>
  );
}
