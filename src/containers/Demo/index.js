/**
 * @author FFET
 * @since 2020-12-19
 * @description demo router
 */
/* eslint-disable */
import { Route, Redirect, Switch, NavLink } from "react-router-dom";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import Listview from "./Listview";
import ListItem from "./ListItem";
import Calendar from "./Calendar";
import Tooltip from "./Tooltip";

function Menu(props) {
  const { path } = props.match;
  return (
    <div>
      <div>
        <NavLink to={`${path}listview`}>listview</NavLink>
      </div>
      <div>
        <NavLink to={`${path}calendar`}>calendar</NavLink>
      </div>
      <div>
        <NavLink to={`${path}tooltip`}>tooltip</NavLink>
      </div>
      <div>
        <NavLink to={`/iframe/${encodeURIComponent("https://www.baidu.com")}/百度/123`}>
          iframe
        </NavLink>
      </div>
    </div>
  );
}

export default function DemoRouter(props) {
  const { path } = props.match;
  return (
    <div>
      <CacheSwitch>
        <Route exact path={`${path}/`} component={Menu} />
        <CacheRoute path={`${path}/listview/:id`} component={ListItem} />
        <CacheRoute path={`${path}/listview`} cacheKey="MyComponent" component={Listview} />
        <Route path={`${path}/calendar`} component={Calendar} />
        <Route path={`${path}/tooltip`} component={Tooltip} />
        <Redirect to={{ pathname: `${path}/` }} />
      </CacheSwitch>
    </div>
  );
}
