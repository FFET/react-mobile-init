/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-handler-names */
/**
 * Listview(pull down refresh、pull up load more)
 * 1. dataSource
 * 2. Item
 * 3. onRefresh
 * 4. onEndReached
 * 5. fnLink
 * 6. useBodyScroll
 */
import { Component } from "react";
// import ListView from "rmc-list-view";
// import PullToRefresh from "rmc-pull-to-refresh";
import { ListView, PullToRefresh } from "antd-mobile";
import "./style";

export default class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      hasMore: true,
    };
  }

  componentDidMount() {
    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows(this.props.dataSource),
    //   refreshing: false,
    //   isLoading: false,
    //   height: document.documentElement.clientHeight - this.props.height,
    //   hasMore: this.props.hasMore,
    // });
  }

  //If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
        refreshing: false,
        isLoading: false,
        height: document.documentElement.clientHeight - nextProps.height,
        hasMore: nextProps.hasMore,
      });
    }
  }

  // componentDidUpdate() {
  //     if (this.state.useBodyScroll) {
  //         document.body.style.overflow = "auto";
  //     } else {
  //         document.body.style.overflow = "hidden";
  //     }
  // }

  /**
   * refresh
   */
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    this.props.onLoadData(true);
  };

  /**
   * load more
   */
  onEndReached = () => {
    const { hasMore } = this.state;
    console.log("hasMore", hasMore);
    hasMore && this.props.onLoadData();
  };

  render() {
    const { dataSource, height, Item, ...rest } = this.props;
    const row = (rowData) => {
      // console.log("rowData", rowData);
      // rowID = +rowID + 1;
      return <Item {...rowData} />;
    };
    // no data
    if (!this.state.hasMore && this.props.dataSource.length === 0) {
      return <div style={{ textAlign: "center", padding: ".4rem 0" }}>暂无数据</div>;
    }

    return (
      <div className="pull-list">
        <ListView
          key={1}
          ref={(el) => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderRow={row}
          renderFooter={() => (
            <div style={{ padding: 10, textAlign: "center" }}>
              {this.state.isLoading
                ? "加载中..."
                : this.state.hasMore
                ? "下拉获取更多数据"
                : "没有更多数据"}
            </div>
          )}
          style={this.props.useBodyScroll ? {} : { height: this.state.height }}
          pullToRefresh={
            <PullToRefresh refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
          useBodyScroll={this.props.useBodyScroll}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={1000}
          initialListSize={15}
          pageSize={15}
        />
      </div>
    );
  }
}
