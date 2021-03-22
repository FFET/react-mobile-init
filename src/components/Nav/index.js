import { useHistory } from "react-router-dom";
import Style from "./style";

function Nav(props) {
  const history = useHistory();

  function fnBack() {
    const { back = -1 } = props;
    console.log("back", back);
    history.goBack();
  }
  return (
    <div className={Style.nav}>
      {props.back !== undefined && (
        <div className={Style.left} onClick={fnBack}>
          <i className="arrow-left"></i>
        </div>
      )}
      <div className={Style.title}>{props.title}</div>
    </div>
  );
}

export default Nav;
