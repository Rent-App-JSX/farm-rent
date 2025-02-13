import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  const [reviewText, setReviewText] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `https://rent-app-d50fb-default-rtdb.firebaseio.com/properties${id}.json`
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
          `https://test-2810a-default-rtdb.firebaseio.com/reviews/${id}.json`
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
    return <p className="text-center text-red-500 font-bold text-lg">❌ Property not found</p>;
  }

  const today = new Date().toISOString().split("T")[0];

  const handleReviewSubmit = async () => {
    if (reviewText.trim() === "" || username.trim() === "" || rating === 0) return;

    const newReview = {
      username,
      rating,
      text: reviewText,
    };

    try {
      await axios.post(
        `https://test-2810a-default-rtdb.firebaseio.com/reviews/${id}.json`,
        newReview
      );
      setReviews([newReview, ...reviews]);
      setReviewText("");
      setRating(0);
      setUsername("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="container mx-auto px-20 p-4 flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* قسم الصور */}
        <div className="lg:w-2/3">
          <h2 className="text-4xl font-semibold">{property.name}</h2>
          <h3 className="text-xl font-semibold">📍 {property.location}</h3>

          {/* صورة رئيسية */}
          {mainImage && (
            <img
              src={mainImage}
              alt="Main property"
              className="w-full h-72 object-cover rounded-lg shadow-lg"
            />
          )}

          {/* الصور المصغرة للتبديل */}
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

          {/* السعر والوصف */}
          <p className="text-gray-700 mt-8">{property.long_description}</p>
          <p className="mt-4"><strong>Price:</strong> {property.price_12_hours} per 12 hours</p>
        </div>

        {/* قسم الحجز */}
        <div className="lg:w-1/3 bg-gray-100 p-4 h-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">📅 Book now</h2>
          <input type="date" className="w-full p-2 mb-2 border rounded" value={startDate} min={today} onChange={(e) => setStartDate(e.target.value)} />
          <input type="date" className="w-full p-2 mb-2 border rounded" value={endDate} min={startDate || today} onChange={(e) => setEndDate(e.target.value)} />
          <input type="time" className="w-full p-2 mb-2 border rounded" value={time} onChange={(e) => setTime(e.target.value)} />

          {/* التحكم في عدد الأشخاص */}
          <div className="flex items-center justify-between mb-2">
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => setPeople((prev) => Math.max(1, prev - 1))}>-</button>
            <span>{people}</span>
            <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => setPeople((prev) => prev + 1)}>+</button>
          </div>

          <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Book Now</button>
          <button className="w-full bg-green-500 text-white py-2 mt-2 rounded hover:bg-green-600">Add to Favorites ❤️</button>
        </div>
      </div>

      {/* قسم التقييمات */}
      <div className="mt-6 bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold">📝 Leave a Review</h2>
        <input type="text" className="w-full p-2 mb-2 border rounded" placeholder="Your name" value={username} onChange={(e) => setUsername(e.target.value)} />
        <textarea className="w-full p-2 border rounded" placeholder="Write your review here..." value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>

        <div className="flex items-center gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`} onClick={() => setRating(star)}>★</span>
          ))}
        </div>

        <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={handleReviewSubmit}>Submit</button>
      </div>

      {/* عرض التقييمات */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">User Reviews</h2>
        {reviews.length === 0 ? <p>No reviews yet.</p> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="p-4 bg-white border rounded-lg shadow-md">
                <h3 className="font-semibold">{review.username}</h3>
                <p>{review.text}</p>
                <p className="text-yellow-500">{"★".repeat(review.rating)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;