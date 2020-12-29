/**
 * @author FFET
 * @since 2020-12-19
 * @description demo router
 */

import { Route, Redirect, Switch, NavLink } from "react-router-dom";
import Listview from "./Listview";
import Calendar from "./Calendar";

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
    </div>
  );
}

export default function DemoRouter(props) {
  const { path } = props.match;
  return (
    <div>
      <Switch>
        <Route exact path={`${path}/`} component={Menu} />
        <Route path={`${path}/listview`} component={Listview} />
        <Route path={`${path}/calendar`} component={Calendar} />
        <Redirect to={{ pathname: `${path}/` }} />
      </Switch>
    </div>
  );
}
