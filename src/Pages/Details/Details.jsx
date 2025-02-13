import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../Redux/wishlistSlice";
import { FaStar } from "react-icons/fa";
const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [people, setPeople] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [username, setUsername] = useState("");

  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  const isInWishlist = wishlist.some((item) => item.id === id);

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(
        addToWishlist({
          id,
          name: property.name,
          image: property.images ? property.images[0] : "",
          ...property,
        })
      );
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `https://rent-app-d50fb-default-rtdb.firebaseio.com/properties/${id}.json`
        );
        if (response.data) {
          setProperty(response.data);
          setMainImage(response.data.images ? response.data.images[0] : "");
        } else {
          setProperty(null);
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://rent-app-d50fb-default-rtdb.firebaseio.com/reviews/${id}.json`
        );
        setReviews(response.data ? Object.values(response.data) : []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchProperty();
    fetchReviews();
  }, [id]);

  if (!property) {
    return (
      <p className="text-center text-red-500 font-bold text-lg">
        ❌ Property not found
      </p>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  const handleAddReview = async () => {
    const newReview = {
      username,
      text: reviewText,
      rating,
    };
    try {
      await axios.post(
        `https://rent-app-d50fb-default-rtdb.firebaseio.com/reviews/${id}.json`,
        newReview
      );
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setUsername("");
      setReviewText("");
      setRating(0);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="container mx-auto px-20 p-4 flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <h2 className="text-4xl font-semibold">{property.name}</h2>
          <h3 className="text-xl font-semibold">📍 {property.location}</h3>
          {mainImage && (
            <img
              src={mainImage}
              alt="Main property"
              className="w-full h-72 object-cover rounded-lg shadow-lg"
            />
          )}
          {property.images && property.images.length > 1 && (
            <div className="flex mt-2 space-x-2">
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`property-${index}`}
                  className="w-24 h-24 rounded-lg object-cover shadow cursor-pointer"
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          )}
          <p className="text-gray-700 mt-8">{property.long_description}</p>
          <p className="mt-4">
            <strong>Price:</strong> {property.price_12_hours} per 12 hours
          </p>
        </div>
        <div className="lg:w-1/3 bg-gray-100 p-4 h-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">📅 Book now</h2>
          <input
            type="date"
            className="w-full p-2 mb-2 border rounded"
            value={startDate}
            min={today}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="w-full p-2 mb-2 border rounded"
            value={endDate}
            min={startDate || today}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <input
            type="time"
            className="w-full p-2 mb-2 border rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <div className="flex items-center justify-between mb-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => setPeople((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span>{people}</span>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => setPeople((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Book Now
          </button>
          <button
            className={`w-full ${
              isInWishlist ? "bg-red-500" : "bg-green-500"
            } text-white py-2 mt-2 rounded hover:${
              isInWishlist ? "bg-red-600" : "bg-green-600"
            }`}
            onClick={handleToggleWishlist}
          >
            {isInWishlist ? "Remove from Favorites ❌" : "Add to Favorites ❤️"}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">User Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 bg-white border rounded-lg shadow-md"
              >
                <h3 className="font-semibold">{review.username}</h3>
                <p>{review.text}</p>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Add Your Review</h2>
        <input
          type="text"
          className="w-full p-2 mb-2 border rounded"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
       <textarea
          className="w-full p-2 mb-2 border rounded"
          placeholder="Write your review here"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div className="flex mb-2">
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <FaStar
                key={index}
                className={currentRating <= (hover || rating) ? "text-yellow-500" : "text-gray-300"}
                onClick={() => setRating(currentRating)}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
                size={30}
              />
            );
          })}
        </div>
        <button className="w-full bg-green-500 text-white py-2 rounded" onClick={handleAddReview}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;