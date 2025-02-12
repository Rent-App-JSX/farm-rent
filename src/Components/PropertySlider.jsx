import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";

const PropertyCarousel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://rent-app-d50fb-default-rtdb.firebaseio.com/properties.json"
        );
        const properties = response.data
          ? Object.keys(response.data).map((key) => ({
              id: key,
              ...response.data[key],
            }))
          : [];

        setData(properties);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center mt-5">Error: {error}</div>;

  const properties = data.filter(
    (property) => !property.soft_delete && property.seasonal_offers
  );
  if (properties.length === 0) {
    return <p>Loading...</p>;
  }

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} left-0 z-10 text-black text-3xl cursor-pointer`}
        style={{
          ...style,
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
        onClick={onClick}
      >
        ◀
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} right-0 z-10 text-black text-3xl cursor-pointer`}
        style={{
          ...style,
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
        onClick={onClick}
      >
        ▶
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="flex justify-center">
      <div className="my-20 w-[80%] mx-5">
      <p className=" text-4xl text-emerald-600 flex justify-center items-center">seasonal offers</p>
        <Slider {...settings}>
          {properties.map((property) => (
            <div key={property.name} className="p-4">
              <div className="rounded overflow-hidden shadow-lg p-4">
                <img
                  className="w-full h-48 object-cover"
                  src={property.images[0]}
                  alt={property.name}
                />
                <div className="py-4">
                  <h2 className="font-bold text-xl">{property.name}</h2>
                  <p className="text-gray-700 text-base">
                    {property.short_description}
                  </p>
                  <p className="text-green-500 text-lg">
                    ${property.price_12_hours} / 12 hours
                  </p>
                  <p className="text-yellow-500">{property.rating} ★</p>
                  <p className="text-gray-600">
                    🔥{property.seasonal_offers[1].offer}
                  </p>
                  <button
                    className="hover:cursor-pointer bg-white shadow-lg border mt-2 border-gray-50 text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
                    type="button"
                  >
                    <div className="bg-[#508D4E] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        height="25px"
                        width="25px"
                      >
                        <path
                          d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                          fill="#fff"
                        />
                        <path
                          d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                          fill="#fff"
                        />
                      </svg>
                    </div>
                    <p className="translate-x-2">Details</p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PropertyCarousel;
