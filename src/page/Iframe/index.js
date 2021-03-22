/**
 * @author FFET
 * @since 2021-01-26
 * @description iframe open other page
 */
import Nav from "@components/Nav";
import Style from "./style";

export default function Iframe(props) {
  const {
    match: {
      params: { url = "https://www.baidu.com", title, id },
    },
  } = props;
  console.log(id);
  return (
    <div className={Style.iframe}>
      <Nav title={title} back={true} />
      <iframe src={decodeURIComponent(url)} frameBorder="0" width="100%" height="100%" />
    </div>
  );
}
