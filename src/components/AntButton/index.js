/* eslint-disable react/react-in-jsx-scope */
/**
 * button
 * children
 * style
 * onClick
 * disabled
 */

import React from "react";
import { Button } from "antd-mobile";

const AntButton = (props) => {
  // let { onClick, children, style, disabled } = props;
  console.log(props);
  return <Button {...props}>{props.children}</Button>;
};
export default AntButton;
