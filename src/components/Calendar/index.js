/**
 * @author FFET
 * @since 2021-01-22
 * @description  日历
 */

import { useState, useEffect } from "react";
import { genereateCalendar } from "./utils";
import "./style";

export default function Calendar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const days = genereateCalendar("2021-01-1", 1);
    console.log(days);
    setData(days);
  }, []);

  return (
    <div className="list">
      {"一|二|三|四|五|六|日".split("|").map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
      {data.map((item, idx) => (
        <div key={idx}>{item.day}</div>
      ))}
    </div>
  );
}
