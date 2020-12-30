/**
 * @author FFET
 * @since 2020-12-15
 * @description Listview(pull down refresh、pull up load more)
 * 1. dataSource
 * 2. Item
 * 3. onRefresh
 * 4. onEndReached
 * 5. fnLink
 * 6. useBodyScroll
 */
import React from "react";
import List from "./List";
import "./style";

export default class ProListView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
    this.ref = React.createRef();
  }

  componentDidMount() {
    // parent container offsetTop
    this.setState({ height: this.ref.current.offsetTop });
  }

  render() {
    return (
      <div ref={this.ref}>
        <List {...this.props} height={this.state.height} />
      </div>
    );
  }
}
