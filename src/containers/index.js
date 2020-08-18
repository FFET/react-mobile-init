/**
 * root container
 */
import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { HashRouter, BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Loading from "@components/Loading";

// use which mode router
const Router = process.env.router === "hash" ? HashRouter : BrowserRouter;

// lazy load
const Login = lazy(() => import(/* webpackChunkName: "login" */ "./Login"));
const Main = lazy(() => import(/* webpackChunkName: "main" */ "./Main"));

// function App(props) {
//   return (
//     <Router basename={`${process.env.publicPath}`}>
//       <Suspense fallback={<Loading />}>
//         <Switch>
//           <Route exact path={`/login`} component={Login} />
//           <PrivateRoute path={`/`} component={Main} {...props} />
//         </Switch>
//       </Suspense>
//     </Router>
//   );
// }

function App(props) {
  return (
    <Router basename={`${process.env.publicPath}`}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route
            path={"/:first"}
            render={({ match }) => {
              // console.log("====================================");
              // // console.log(props.match.params.first);
              // const { first } = match.params;
              // console.log("%c first", "color:green", first);
              // sessionStorage.setItem("first", first);
              // console.log("====================================");
              return (
                <Switch>
                  <Route
                    path={`${match.url}/:second`}
                    render={({ match }) => {
                      // console.log("====================================");
                      // // console.log(props.match.params.first);
                      // // console.log(match);
                      // const { second } = match.params;
                      // console.log("%c second", "color:yellow", second);
                      // sessionStorage.setItem("second", second);
                      // console.log("====================================");
                      return (
                        <Switch>
                          <Route exact path={`${match.url}/login`} component={Login} />
                          {/* <Route path={`${match.url}/about`} component={() => <div>about</div>} /> */}
                          <PrivateRoute path={`${match.url}/`} component={Main} {...props} />
                          {/* <Route exact path={`/login`} component={Login} /> */}
                          {/* <PrivateRoute path={`/`} component={Main} {...props} /> */}
                        </Switch>
                      );
                    }}
                  />
                  <Route render={() => <ParamError text={"一级"} />} />
                </Switch>
              );
            }}
          />
          <Route render={() => <ParamError text={"二级"} />} />
        </Switch>
      </Suspense>
    </Router>
  );
}

const ParamError = ({ text }) => (
  <div className="paramError">
    <div>URL错误! 缺少{text}</div>
  </div>
);

/**
 * private route
 */
class PrivateRoute extends React.Component {
  render() {
    let { component: Component, token, ...rest } = this.props;

    const url = this.props.location.pathname.split("/");
    const pre = `/${url[1]}/${url[2]}`;
    return (
      <Route
        {...rest}
        render={(props) =>
          token ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: pre + "/login",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
});

export default connect(mapStateToProps)(App);
