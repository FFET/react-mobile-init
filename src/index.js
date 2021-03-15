/**
 * entry
 */
import ReactDOM from "react-dom";
import App from "./app";
import "@utils/rem";

import FastClick from "fastclick";
FastClick.attach(document.body);

if (process.env.NODE_ENV !== "production") {
  const eruda = require("eruda");
  const el = document.createElement("div");
  document.body.appendChild(el);
  eruda.init({
    container: el,
    useShadowDom: false,
    autoScale: true,
  });
}

ReactDOM.render(<App />, document.getElementById("root"));
