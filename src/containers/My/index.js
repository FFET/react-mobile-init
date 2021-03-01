/**
 * @author FFET
 * @since 2021-01-04
 * @description 我的路由
 */

import { Suspense, lazy } from "react";
import { Loading } from "@components";
import { Route, Redirect, Switch } from "react-router-dom";
const IndexPage = lazy(() => import(/* webpackChunkName: "myIndexPage" */ "./IndexPage"));
function MyRouter(props) {
  const { path } = props.match;

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={`${path}/`} component={IndexPage} />
        <Redirect to={`${path}/`} />
      </Switch>
    </Suspense>
  );
}

export default MyRouter;
