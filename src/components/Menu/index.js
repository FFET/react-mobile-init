import { NavLink } from "react-router-dom";
import Style from "./style";

function Menu() {
  return (
    <div className={Style.menu}>
      <NavLink to="/" exact>
        首页
      </NavLink>
      <NavLink to="/my">我的</NavLink>
    </div>
  );
}

export default Menu;
