export default function Item(props) {
  console.log(props);
  const { name } = props;
  return <div style={{ padding: "40px 20px" }}>{name}</div>;
}
