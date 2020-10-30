import { Suspense, lazy } from "react";
import { Loading } from "@components";
import { Route, Redirect, Switch } from "react-router-dom";
const Listview = lazy(() => import(/* webpackChunkName: "Listview" */ "./Listview"));
function Demo(props) {
  const { path } = props.match;

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={`${path}/`} component={Listview} />
          <Route path={`${path}/listview`} component={Listview} />
          <Redirect to={`${path}/`} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default Demo;
