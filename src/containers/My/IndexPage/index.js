/**
 * @author FFET
 * @since 2021-01-14
 * @description 我的
 */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logoutAction } from "@containers/Login/action";
import { Button } from "@components";
function Customer(props) {
  // 退出
  function fnLogout() {
    const { logoutAction } = props;
    logoutAction();
  }

  /**
   * 跳转
   * @param {string} link
   */
  // eslint-disable-next-line no-unused-vars
  const fnLink = (link) => {
    const { path } = props.match;
    props.history.push({
      pathname: `${path}${link}`,
    });
  };

  return (
    <div>
      <Button
        onClick={() => {
          props.history.push({
            pathname: `/about`,
          });
        }}
      >
        关于
      </Button>
      <Button type="primary" onClick={fnLogout}>
        退出
      </Button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  logoutAction: bindActionCreators(logoutAction, dispatch),
});

export default connect(null, mapDispatchToProps)(Customer);
