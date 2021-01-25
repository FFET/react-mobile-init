import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";

export default function TooltipDemo() {
  return (
    <div>
      <Tooltip
        trigger={["click"]}
        placement="bottom"
        overlay={
          <span>
            这个是啊啊啊啊啊啊啊啊啊啊这个是啊啊啊啊啊啊啊啊啊啊这个是啊啊啊啊啊啊啊啊啊啊这个是啊啊啊啊啊啊啊啊啊啊tooltip
          </span>
        }
      >
        <a href="#">tooltip</a>
      </Tooltip>
    </div>
  );
}
