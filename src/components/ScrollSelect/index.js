import React, { Component } from "react";
import Swiper from "Swiper";

import "./style";

export class ScrollSelect extends Component {
  componentDidMount() {
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 5,
      spaceBetween: 30,
      initialSlide: 6,
      centeredSlides: true,
      autoplay: true, //可选选项，自动滑动
      on: {
        touchEnd: function (swiper, event) {
          //你的事件
          console.log(swiper.activeIndex, event);
        },
        transitionEnd: function (swiper) {
          console.log(swiper.activeIndex);
        },
      },
    });
    console.log(swiper);
  }
  render() {
    return (
      <div>
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <div className="swiper-slide" key={index}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="circle">2020</div>
      </div>
    );
  }
}

export default ScrollSelect;
