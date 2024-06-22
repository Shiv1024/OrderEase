import React from 'react';
import Slider from 'react-slick';

const Offers = ({ offers }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="offers bg-yellow-100 p-4 rounded-lg mb-4">
      <h3 className="text-2xl font-bold mb-2">Special Offers</h3>
      <Slider {...settings}>
        {offers.map((offer, index) => (
          <div key={index} className="text-lg text-gray-900">
            {offer}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Offers;
