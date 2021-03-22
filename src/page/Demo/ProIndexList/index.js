/* eslint-disable no-unused-vars */
import ProIndexList from "@components/ProIndexList";

import React from "react";

const province = {
  A: [{ value: "344", label: "安徽" }],
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

export default class ProIndexListDemo extends React.Component {
  state = {
    dataSource: {},
  };

  componentDidMount() {
    // simulate initial Ajax
    setTimeout(() => {
      this.setState({
        dataSource: province,
        isLoading: false,
      });
    }, 600);
  }
  render() {
    return (
      <div>
        <div style={{ height: "2rem" }}>top</div>
        <ProIndexList data={this.state.dataSource} />
      </div>
    );
  }
}
