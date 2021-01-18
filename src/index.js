/**
 * entry
 */
import ReactDOM from "react-dom";
import App from "./app";
import "@utils/rem";
import eruda from "eruda";

// analytics
// import { analytics, timing } from "@utils/analytics";

import FastClick from "fastclick";
FastClick.attach(document.body);

if (process.env.NODE_ENV !== "production" && !location.hostname.includes("192")) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  eruda.init({
    container: el,
    useShadowDom: false,
    autoScale: true,
  });
}

//绑定resize事件监听窗口变化
const height = document.documentElement.clientHeight;
window.addEventListener("resize", () => {
  const resizeHight = document.documentElement.clientHeight;
  let upDown = document.getElementById("up-down");
  if (height > resizeHight) {
    //键盘弹起
    if (upDown) {
      upDown.style.position = "static";
      upDown.style.marginTop = "50px";
    }
  } else {
    //键盘收下
    if (upDown) upDown.style.position = "absolute";
  }
});

// 禁用右键
// window.document.oncontextmenu = function () {
//   return false;
// };

// 禁用微信浏览器分享功能
document.addEventListener("WeixinJSBridgeReady", function onBridgeReady() {
  WeixinJSBridge.call("hideOptionMenu");
});

ReactDOM.render(<App />, document.getElementById("root"));
