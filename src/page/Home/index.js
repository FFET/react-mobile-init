/**
 * @author FFET
 * @since 2021-03-22
 * @description
 */

/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button } from "antd-mobile";
import Style from "./style";

export default function App() {
  const [state, setstate] = useState();

  return (
    <div className={Style.home} data-spm="spm-a-home">
      首页
      <Button type={"primary"}>ant mobile</Button>
    </div>
  );
}
