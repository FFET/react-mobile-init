/**
 * @author FFET
 * @since 2021-01-18
 * @description
 */

/* eslint-disable  */

import { clearCache, refreshByCacheKey, dropByCacheKey } from "react-router-cache-route";
import { useEffect } from "react";

export default function ListItem() {
  // useEffect(() => {
  //   console.log(1);
  //   return () => {
  //     console.log(2, "clearCache");
  //     clearCache();
  //     dropByCacheKey("MyComponent"); // to refresh
  //     refreshByCacheKey("MyComponent"); // to refresh
  //   };
  // }, []);

  return <div>list item</div>;
}
