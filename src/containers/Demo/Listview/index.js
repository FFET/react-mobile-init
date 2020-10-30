import { Component } from "react";
import { Listview } from "@components";

export default class ListviewDemo extends Component {
  state = {};

  componentDidMount() {
    this.getData();
  }

  fnRefresh = async () => {
    this.getData({});
  };

  fnEndReached = async () => {
    this.setState({
      records: [
        ...this.state.records,
        {
          title: "Meet hotel",
        },
        {
          title: "Meet hotel",
        },
        {
          title: "Meet hotel",
        },
        {
          title: "Meet hotel",
        },
        {
          title: "Meet hotel",
        },
        {
          title: "Meet hotel",
        },
        {
          title: "Meet hotel",
        },
        {
          title: "Meet hotel",
        },
        {
          title: "Meet hotel",
        },
      ],
    });
  };

  getData = () => {
    setTimeout(() => {
      console.log("test");
      this.setState({
        page: 1,
        pages: 2,
        records: [
          {
            title: "Meet hotel",
          },
          {
            title: "Meet hotel",
          },
          {
            title: "Meet hotel",
          },
          {
            title: "Meet hotel",
          },
          {
            title: "Meet hotel",
          },
          {
            title: "Meet hotel",
          },
          {
            title: "Meet hotel",
          },
          {
            title: "Meet hotel",
          },
          {
            title: "Meet hotel",
          },
        ],
      });
    }, 1000);
  };

  render() {
    const { records = [], page = 1, pages = 2 } = this.state;
    return (
      <div>
        <div>
          <div style={{ height: 80, background: "red" }}>nav</div>
          <Listview
            dataSource={records}
            Item={Item}
            onRefresh={this.fnRefresh}
            onEndReached={this.fnEndReached}
            hasMore={page !== 0 && page !== pages}
          />
        </div>
      </div>
    );
  }
}

function Item(props) {
  const { content, title } = props;
  return (
    <div style={{ height: "2rem" }}>
      <div>{title}</div>
      <div>{content}</div>
    </div>
  );
}
