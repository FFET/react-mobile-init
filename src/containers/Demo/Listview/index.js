/* eslint-disable no-unused-vars */
/**
 * @author FFET
 * @since 2020-12-17
 * @description ProListView demo
 */

import { Component } from "react";
import { ProListView } from "@components";
import Item from "./Item";
import {
  clearCache,
  dropByCacheKey,
  refreshByCacheKey,
  getCachingKeys,
} from "react-router-cache-route";
export class ListviewDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 数据列表
      records: [],
      // 当前页
      page: 1,
      // 每页条数
      pageSize: 10,
      // 总条数
      total: 0,
      // 总页码
      pages: 0,
    };

    props.cacheLifecycles.didCache(this.componentDidCache);
    props.cacheLifecycles.didRecover(this.componentDidRecover);
  }

  componentDidMount() {
    this.fnLoadData();
  }

  /**
   * 加载数据
   * @param {bollean} refresh
   */
  fnLoadData = async (refresh) => {
    // 根据refresh 构建请求数据
    let { records, page, pageSize } = this.state;
    const params = {
      page: refresh ? 1 : page + 1,
      pageSize,
    };

    const data = await this.fnMockData(params);

    if (refresh) {
      records = data.records;
    } else {
      records = [...records, ...data.records];
    }

    this.setState({ ...data, records });
  };

  /**
   * mock 数据
   */
  fnMockData = (params) => {
    console.log(1111);
    return new Promise((resolve) => {
      setTimeout(resolve, 1000, {
        page: 1,
        pageSize: 10,
        records: [
          { id: 1, name: "C罗" },
          { id: 2, name: "梅西" },
          { id: 3, name: "本泽马" },
          { id: 4, name: "拉莫斯" },
          { id: 5, name: "克罗斯" },
          { id: 6, name: "莫德里奇" },
          { id: 7, name: "纳瓦斯" },
          { id: 8, name: "齐达内" },
        ],
      });
    });
  };

  componentDidCache = (e) => {
    console.log("List cached", e);
  };

  componentDidRecover = (e) => {
    console.log("List recovered", e);
    // console.log(getCachingKeys());
    // refreshByCacheKey("MyComponent"); // to refresh
    // dropByCacheKey("MyComponent"); // to refresh

    // console.log(this.state.records);
    const { records } = this.state;
    records.map((item) => (item.name = "jay"));
    // clearCache();

    this.setState({ records: JSON.parse(JSON.stringify(records)), flag: "123" }, () =>
      console.log(this.state)
    );
  };

  render() {
    const { records, page, pages, flag } = this.state;
    console.log("render21222", records);
    return (
      <div>
        <ProListView
          Item={Item} // 组件
          dataSource={records} // 数据
          onLoadData={this.fnLoadData} // 加载数据
          hasMore={page !== 0 && page !== pages} // 有没有更多数据
        />
      </div>
    );
  }
}

export default ListviewDemo;
