/* eslint-disable no-unused-vars */
/**
 * main
 */
import { Suspense, lazy, useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { Route, Redirect, Switch } from "react-router-dom";
import { Menu, Loading, Nav } from "@components";
import Style from "./style";
const Home = lazy(() => import(/* webpackChunkName: "Home" */ "../Home"));
const About = lazy(() => import(/* webpackChunkName: "About" */ "../About"));
const Iframe = lazy(() => import(/* webpackChunkName: "Iframe" */ "../Iframe"));

import DictContext from "@contexts/DictContext";

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
  history: {
    location: { pathname },
  },
}) {
  // 字典
  const [dict, setDict] = useState({});

  useEffect(() => {
    (async () => {
      // const response = await http({
      //   url: API.common.dict,
      // });
      // response.status && setDict(response.data);

      http({
        url: API.common.dict,
      }).then((data) => setDict(data));
    })();
  }, []);

  const [title, setTitle] = useState("");
  const [back, setBack] = useState(false);
  useEffect(() => {
    const route = map[pathname];
    // console.log(location);
    setTitle(route?.title);
    setBack(route?.back);
    document.title = route?.title;
  }, [pathname]);

  return (
    <DictContext.Provider value={dict}>
      <div className={Style.main}>
        {/* 顶部nav */}
        <Nav title={title} back={back} />
        <div className={Style.container}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route
                path={["/iframe/:url/:title/:id", "/iframe/:url/:title", "/iframe/:url"]}
                component={Iframe}
              />
              <Redirect to={{ pathname: `/` }} />
            </Switch>
          </Suspense>
        </div>
        {/* 菜单 */}
        {["/", "/about", "/about/"].includes(pathname) && <Menu />}
      </div>
    </DictContext.Provider>
  );
}

export default Main;
