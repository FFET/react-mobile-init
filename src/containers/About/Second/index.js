import React from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Second(props) {
  let query = useQuery();
  return (
    <div>
      <h1>Second</h1>
      <div onClick={() => props.history.push("/about/third")}>
        第三级页面
        {query.get("name")}
      </div>
    </div>
  );
}
// export class Second extends Component {

//   render() {
//     console.log(this.props);
//     return (
//       <div>
//         <h1>Second</h1>
//         <div onClick={() => this.props.history.push("/about/third")}>
//           第三级页面
//           {query.get("name")}
//         </div>
//       </div>
//     );
//   }
// }

export default Second;
