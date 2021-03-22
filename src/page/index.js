/**
 * root container
 */
import { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { HashRouter, BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Loading from "@components/Loading";

// use which mode router
const Router = process.env.router === "hash" ? HashRouter : BrowserRouter;

// lazy load
const Login = lazy(() => import(/* webpackChunkName: "login" */ "./Login"));
const Main = lazy(() => import(/* webpackChunkName: "main" */ "./Main"));
const Demo = lazy(() => import(/* webpackChunkName: "demo" */ "./Demo"));

function App(props) {
  return (
    <Router basename={`${process.env.publicPath}`}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={`/login`} component={Login} />
          <Route path={`/demo`} component={Demo} />
          <PrivateRoute path={`/`} component={Main} {...props} />
        </Switch>
      </Suspense>
    </Router>
  );
}

/**
 * private route
 */
function PrivateRoute(props) {
  let { component: Component, token, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
});

export default connect(mapStateToProps)(App);
