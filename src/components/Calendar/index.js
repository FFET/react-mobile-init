/**
 * @author FFET
 * @since 0.0.1
 * @description calendar 自动滚动
 */

import React, { Component } from "react";
import Style from "./style";
import { genereateCalendar } from "./utils";

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      day: 1,
      first: true,
    };

    this.refCalendar = React.createRef();
  }

  componentDidMount() {
    const data = genereateCalendar();
    console.log(data);
    this.setState({ data });
    // console.log(this.refCalendar.current.scrollWidth);
    console.log(this.refCalendar);
    this.setState({ day: new Date().getDate() });
    // this.setState({ day: 30 });
    // this.refCalendar.current.scrollX(100);
  }

  componentDidUpdate() {
    const { day, data, first } = this.state;
    if (!first) {
      return;
    } else {
      console.log(this.refCalendar.current.clientWidth);

      const containerWith = this.refCalendar.current.clientWidth;

      const one = this.refCalendar.current.scrollWidth / data.length;
      let length = one * day - one / 2 - containerWith / 2;
      this.refCalendar.current.scrollTo(length, 0);
    }
    this.setState({ first: false });
  }

  render() {
    const { data, day } = this.state;
    return (
      <>
        <div className={Style["c-calendar"]} ref={this.refCalendar}>
          {data.map((item, index) => (
            <div
              key={index}
              className={item.day == day ? "active" : ""}
              onClick={() => this.setState({ day: item.day })}
            >
              {item.day}
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default index;
