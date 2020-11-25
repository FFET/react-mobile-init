/**
 * @author FFET
 * @since 0.0.1
 * @description demo
 */

import React, { Suspense, lazy } from "react";
import { Loading } from "@components";
import { Route, Redirect, Switch, NavLink } from "react-router-dom";
const Calendar = lazy(() => import(/* webpackChunkName: "Calendar" */ "./Calendar"));
const ScrollSelect = lazy(() => import(/* webpackChunkName: "ScrollSelect" */ "./ScrollSelect"));
function Demo(props) {
  const { path } = props.match;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 0",
        }}
      >
        <NavLink to={`${path}/calendar`}>日历</NavLink>
        <NavLink to={`${path}/ScrollSelect`}>滚动选择</NavLink>
      </div>

      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={`${path}/calendar`} component={Calendar} />
          <Route path={`${path}/ScrollSelect`} component={ScrollSelect} />
          <Redirect to={`${path}/calendar`} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default Demo;
