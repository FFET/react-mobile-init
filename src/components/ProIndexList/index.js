/* eslint-disable */
/**
 * @author FFET
 * @since 2021-01-27
 * @description 带索引的常列表
 */

import { Component } from "react";

// import { province } from "antd-mobile-demo-data";
import { StickyContainer, Sticky } from "react-sticky";
import { ListView, List } from "antd-mobile";
import "./style";

const { Item } = List;

const province = {
  A: [{ value: "3400", label: "安徽" }],
  B: [{ value: "10", label: "北京" }],
  J: [
    { value: "32", label: "江苏" },
    { value: "33", label: "浙江" },
    { value: "34", label: "浙江" },
    { value: "35", label: "浙江" },
    { value: "36", label: "浙江" },
    { value: "37", label: "浙江" },
    { value: "38", label: "浙江" },
    { value: "39", label: "浙江" },
  ],
  "#": [{ value: "1120", label: "🐷" }],
};

function genData(ds, provinceData) {
  const dataBlob = {};
  const sectionIDs = [];
  const rowIDs = [];

  if (!provinceData) return;
  Object.keys(provinceData).forEach((item, index) => {
    sectionIDs.push(item);
    dataBlob[item] = item;
    rowIDs[index] = [];

    provinceData[item].forEach((jj) => {
      rowIDs[index].push(jj.value);
      dataBlob[jj.value] = jj.label;
    });
  });

  console.log(dataBlob, sectionIDs, rowIDs);

  return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}

export default class ProIndexList extends Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      inputValue: "",
      dataSource,
      isLoading: true,
    };
  }

  // componentDidMount() {
  //   // simulate initial Ajax
  //   setTimeout(() => {
  //     this.setState({
  //       dataSource: genData(this.state.dataSource, province),
  //       isLoading: false,
  //     });

  //     setTimeout(() => {
  //       const { titleHMap, titleHeight } = this.getTitleHMap(province);
  //       // console.log(data, "加载完成", titleHMap);
  //       this.setState({
  //         titleHMap,
  //         titleHeight,
  //       });
  //     }, 1000);
  //   }, 600);
  // }

  UNSAFE_componentWillReceiveProps(props) {
    let data = props.data;
    this.setState(
      {
        dataSource: genData(this.state.dataSource, data), // 重置加载数据
        isLoading: false, // 解除loading加载
      },
      () => {
        const { titleHMap, titleHeight } = this.getTitleHMap(data);
        // console.log(data, "加载完成", titleHMap);
        this.setState({
          titleHMap,
          titleHeight,
        });
      }
    );
  }

  // 2. 业务代码
  getTitleHMap = (data) => {
    const titleHeight = this.titleRef ? this.titleRef.clientHeight : 31; // 标题高度
    const itemHeight = this.itemRowRef.clientHeight || 67; // 每项高度

    console.log(titleHeight, itemHeight);

    console.log(titleHeight, itemHeight, this.titleRef, 111111);
    const titleHMap = {};
    let minH = 0; // 上一个title对应的总高度
    // 遍历将每个title对应的高度保存起来
    Reflect.ownKeys(data).forEach((title) => {
      // maxH = title高度 + title对应的内容高度 + 上一个title的总高度
      const maxH = titleHeight + data[title].length * itemHeight + minH; // 最高高度
      titleHMap[title] = {
        minH,
        maxH,
        title,
      };
      minH = maxH; // 重置上一个title对应的总高度
    });
    return {
      titleHMap,
      titleHeight,
    };
  };

  // 4. 公共代码
  // 4.1 通过滚动高度获取当前所在title
  fnCurrentTitle = (e) => {
    e.stopPropagation();
    const { titleHMap, oldCurrentTitle } = this.state;
    // 获取滚动高度
    let scrollTop = e.target.scrollTop;
    // 点击右边的不需要再算title了
    if (oldCurrentTitle) {
      const lastHeight = titleHMap[Reflect.ownKeys(titleHMap).pop()].maxH; // 获取最后一个title的高度
      // 有滚动高度
      if (lastHeight - titleHMap[oldCurrentTitle].minH > this.props.continerHeight) {
        scrollTop = titleHMap[oldCurrentTitle].minH;
      }
      this.setState({
        oldCurrentTitle: false,
      });
    }
    // console.log(scrollTop, titleHMap, 888888);
    if (titleHMap) {
      const findObj =
        Object.values(titleHMap).filter(
          // 定位的值有1左右的相差
          (item) => scrollTop >= item.minH - 1 && scrollTop < item.maxH
        ) || [];
      const currentTitle = findObj.length
        ? findObj[findObj.length - 1].title
        : this.state.currentTitle;
      // console.log(oldCurrentTitle, 11111, currentTitle);
      // console.log(scrollTop, 11111, titleHMap[oldCurrentTitle]);
      // 获取选中的title
      this.setState({
        currentTitle,
        oldCurrentTitle: false,
      });
    }
  };

  render() {
    const { dataSource, currentTitle, titleHeight } = this.state;
    return (
      <div style={{ paddingTop: "44px", position: "relative" }} className="indexList">
        {/* <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
          <SearchBar
            value={this.state.inputValue}
            placeholder="Search"
            onChange={this.fnSearch}
            onClear={() => {
              console.log("onClear");
            }}
            onCancel={() => {
              console.log("onCancel");
            }}
          />
        </div> */}
        {/* 2. 显示吸顶标题的地方 */}
        {/* <div
          style={{
            position: "absolute",
            zIndex: 1000,
            backgroundColor: "#333",
            color: "white",
            right: "-30px",
            left: 0,
            // top: "44px",
            marginRight: "1rem",
            height: "19px",
            lineHeight: "19px",
          }}
        >
          {this.state.currentTitle}
        </div> */}

        {/* 2. 显示吸顶标题的地方 */}
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            backgroundColor: "#333",
            color: "white",
            right: "-30px",
            left: 0,
            // top: "44px",
            marginRight: "1rem",
            // height: "19px",
            // lineHeight: "19px",
            zIndex: "10000",
            display: currentTitle && dataSource.getRowCount() !== 0 ? "block" : "none",
          }}
        >
          {currentTitle}
        </div>
        <ListView.IndexedList
          // 样式
          className="am-list sticky-list"
          style={{
            height: "300px",
          }}
          // 数据源
          dataSource={this.state.dataSource}
          // useBodyScroll
          // 包裹
          renderSectionWrapper={(sectionID) => (
            <StickyContainer
              key={`s_${sectionID}_c`}
              className="sticky-container"
              style={{ zIndex: 4 }}
            />
          )}
          // 行
          renderRow={(rowData) => <Item ref={(ref) => (this.itemRowRef = ref)}>{rowData}</Item>}
          // 标题
          renderSectionHeader={(sectionData) => (
            <Sticky>
              {({ style }) => {
                console.log("style", style);
                return (
                  <div
                    className="sticky"
                    ref={(ref) => (this.titleRef = ref)}
                    style={{
                      ...style,
                      zIndex: 3,
                      backgroundColor: "#333",
                      // backgroundColor: sectionData.charCodeAt(0) % 2 ? "#5890ff" : "#F8591A",
                      color: "white",
                    }}
                  >
                    {sectionData}
                  </div>
                );
              }}
            </Sticky>
          )}
          // onScroll={this.fnCurrentTitle}
          // 快捷导航样式
          quickSearchBarStyle={{
            top: "3.4rem",
            color: "#000",
            fontSize: "0.3rem",
            fontWeight: 500,
            margin: 0,
          }}
          // 快捷导航栏最顶部按钮、常用于回到顶部 禁掉
          quickSearchBarTop={{ value: "", label: "" }}
          // 快捷导航切换时调用
          onQuickSearch={(selectId) => {
            console.log(selectId);
            this.setState({ currentTitle: selectId });
          }}
          // 延迟渲染时间设置100ms
          delayTime={10}
          // 延迟渲染的 loading 指示器
          delayActivityIndicator={
            <div style={{ padding: 25, textAlign: "center" }}>rendering...</div>
          }
        />
      </div>
    );
  }
}
