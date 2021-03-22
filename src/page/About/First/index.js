export default function First(props) {
  function fnLink() {
    const { path } = props.match;
    props.history.push({
      pathname: `${path}second`,
      search: "?name=jay",
    });
  }

  return (
    <div>
      关于
      <div onClick={fnLink}>二级页面</div>
    </div>
  );
}
