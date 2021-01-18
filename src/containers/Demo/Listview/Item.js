/**
 * @author FFET
 * @since 2021-01-18
 * @description list item
 */
/* eslint-disable  */
import { withRouter } from "react-router-dom";

function Item(props) {
  console.log(props);
  const {
    id,
    name,
    match: { path },
    history,
  } = props;

  return (
    <div style={{ padding: "40px 20px" }} onClick={() => history.push(`${path}/detail/${id}`)}>
      {id}
      {name}
    </div>
  );
}

export default withRouter(Item);
