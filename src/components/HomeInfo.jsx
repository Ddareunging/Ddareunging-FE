import React from 'react';
import Slider from 'react-slick';
import './HomeInfo.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function HomeInfo() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1,
    centerMode: true, // Enables centered view where the active slide is in the center
    centerPadding: '60px', // Adjust this value to control the visible amount of previous and next slides
    adaptiveHeight: true,
    autoplay: true,
    // responsive: [
    //   {
    //     breakpoint: 768, // Adjusting for mobile devices
    //     settings: {
    //       centerMode: true,
    //       centerPadding: '0', // Ensuring no padding on smaller screens
    //       slidesToShow: 1
    //     }
    //   }
    // ]
  };

  return (
    <div className="home-info-container">
      <Slider {...settings}>
        <div className="banner-slide">
          <img src="/home_banner_1.png" alt="Banner 1" />
        </div>
        <div className="banner-slide">
          <img src="/home_banner_2.png" alt="Banner 2" />
        </div>
        <div className="banner-slide">
          <img src="/home_banner_3.png" alt="Banner 3" />
        </div>
      </Slider>
    </div>
  );
}

export default HomeInfo;
