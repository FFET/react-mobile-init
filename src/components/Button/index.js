/**
 * @author FFET
 * @since 2021-01-05
 * @description 按钮
 */

import { Button as AButton } from "antd-mobile";

function Button(props) {
  const { children, ...rest } = props;
  return (
    <AButton {...rest}>
      <div> {children} </div>
    </AButton>
  );
}

export default Button;
