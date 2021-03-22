// import { Component } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
// export class Third extends Component {
//   render() {
//     console.log(this.props);
//     return <div>Third</div>;
//   }
// }

export default function Third() {
  let history = useHistory();
  const location = useLocation();
  const params = useParams();

  console.log(history, location, params);
  return <div>Third</div>;
}
