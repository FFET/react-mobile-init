/**
 * main
 */
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Menu, Loading, Nav } from "@components";
import { fnPrefix } from "@utils/router";
import Style from "./style";
const Home = lazy(() => import(/* webpackChunkName: "Home" */ "../Home"));
const About = lazy(() => import(/* webpackChunkName: "About" */ "../About"));

// 路由配置
const map = {
  "/": {
    title: "首页",
  },
  "/about": {
    title: "关于",
  },
  "/about/first": {
    title: "关于1",
    back: -1,
  },
  "/about/second": {
    title: "关于二级页面",
    back: -1,
  },
  "/about/third": {
    title: "三级页面",
    back: -2,
  },
};

function Main({
  match,
  history: {
    location: { pathname },
  },
}) {
  const [title, setTitle] = useState("");
  const [back, setBack] = useState(false);

  console.log("pathname", pathname);

  useEffect(() => {
    const route = map[pathname] || { route: "", title: "默认标题" };
    // console.log(location);
    setTitle(route.title);
    setBack(route.back);
    document.title = route.title;
    console.log("pathname", pathname);
  }, [pathname]);

  return (
    <div className={Style.main}>
      {/* 顶部nav */}
      <Nav title={title} back={back} />
      <div className={Style.container}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={`${fnPrefix(match.url)}/home`} component={Home} />
            <Route path={`${fnPrefix(match.url)}/about`} component={About} />
            <Redirect to={{ pathname: `${fnPrefix(match.url)}/home` }} />
          </Switch>
        </Suspense>
      </div>
      {/* 菜单 */}
      {["home", "/", "about", "/about/"].includes(pathname.split("/").slice(3).join("/")) && (
        <Menu />
      )}
    </div>
  );
}

export default Main;
