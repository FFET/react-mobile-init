import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Style from "./style";

function Menu(props) {
  console.log("props", props);
  return (
    <div className={Style.menu}>
      <NavLink to={`${props.match.path}home`} exact>
        首页
      </NavLink>
      <NavLink to={`${props.match.path}about`}>关于</NavLink>
    </div>
  );
}

export default withRouter(Menu);
