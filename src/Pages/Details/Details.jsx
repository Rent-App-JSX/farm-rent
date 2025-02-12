// import React from "react";

// const FarmBookingPage = () => {
//   return (
//     <div className="container mx-auto p-4">
//       {/* Image Gallery */}
//       <div className="mb-6">
//         <img src="https://opensooq-images.os-cdn.com/previews/0x720/c8/b2/c8b23982f432926729a94dc29248335e069bca8a0b3e24f1e8813afe15a9570d.jpg.webp" alt="Farm" className="w-full rounded-lg" />
//         <div className="flex mt-2 space-x-2">
//           <img src="https://opensooq-images.os-cdn.com/previews/0x720/31/2e/312ef2a2995635792b20dad63b64a7dfef8656c7796c5b232891fc64e6f90d4f.jpg.webp" alt="Thumb 1" className="w-20 h-20 rounded-lg" />
//           <img src="https://opensooq-images.os-cdn.com/previews/0x720/10/cd/10cd0b9b5d272ff66b67b8d1902c6dd6bf4796b79c3db4b2b8c43c68750b83f4.jpg.webp" alt="Thumb 2" className="w-20 h-20 rounded-lg" />
//           <img src="https://opensooq-images.os-cdn.com/previews/0x720/83/62/836229f51d3fcb3297f4ce916a81c79bb33715ee353e1920db9b19b4e2d52b8b.jpg.webp" alt="Thumb 3" className="w-20 h-20 rounded-lg" />
//         </div>
//       </div>

//       {/* Overview */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Overview</h2>
//         <ul className="list-disc ml-6">
//           <li>Spacious farm with modern amenities</li>
//           <li>Swimming pool and BBQ area</li>
//           <li>Children’s play zone</li>
//         </ul>
//       </div>

//       {/* Features */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Features</h2>
//         <ul className="list-disc ml-6">
//           <li>24/7 security</li>
//           <li>Outdoor seating</li>
//           <li>Indoor fireplace</li>
//         </ul>
//       </div>

//       {/* Pricing */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Pricing</h2>
//         <p><strong>Weekday:</strong> $120 per night</p>
//         <p><strong>Weekend:</strong> $150 per night</p>
//       </div>

//       {/* Location Map */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Location</h2>
//         <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center">
//           <span>Map Placeholder</span>
//         </div>
//       </div>

//       {/* Booking Form */}
//       <div className="mb-6 bg-gray-100 p-4 rounded-lg">
//         <h2 className="text-xl font-semibold mb-2">Book Now</h2>
//         <input type="text" placeholder="Your Name" className="w-full p-2 mb-2 border rounded" />
//         <input type="email" placeholder="Your Email" className="w-full p-2 mb-2 border rounded" />
//         <input type="date" className="w-full p-2 mb-2 border rounded" />
//         <button className="mt-6 bg-green-500 text-white py-2 rounded">Book Now</button>
//       </div>

//       {/* Reviews Section */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Share Your Experience</h2>
//         <textarea className="w-full h-32 p-2 border rounded" placeholder="Write your review here..."></textarea>
//         <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded">Submit</button>
//       </div>
//     </div>
//   );
// };

// export default FarmBookingPage;

import React, { useState } from "react";

const FarmBookingPage = () => {
  const media = [
    "https://opensooq-images.os-cdn.com/previews/0x720/c8/b2/c8b23982f432926729a94dc29248335e069bca8a0b3e24f1e8813afe15a9570d.jpg.webp",
    "https://opensooq-images.os-cdn.com/previews/0x720/83/62/836229f51d3fcb3297f4ce916a81c79bb33715ee353e1920db9b19b4e2d52b8b.jpg.webp",
    "https://opensooq-images.os-cdn.com/previews/0x720/10/cd/10cd0b9b5d272ff66b67b8d1902c6dd6bf4796b79c3db4b2b8c43c68750b83f4.jpg.webp",
    "https://opensooq-images.os-cdn.com/previews/0x720/31/2e/312ef2a2995635792b20dad63b64a7dfef8656c7796c5b232891fc64e6f90d4f.jpg.webp",
  ];

  const video = {
    type: "video",
    url: "https://www.youtube.com/embed/Jl8Fn2U_s80?si=qsc6WHcAJLNoWm15",
  };

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [mainImage, setMainImage] = useState(media[0]);
  const [endDate, setEndDate] = useState(today);
  const [time, setTime] = useState("12:00");
  const [people, setPeople] = useState(1);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [username, setUsername] = useState(""); // لإدخال اسم المستخدم
  const [reviews, setReviews] = useState([]); // للحفاظ على التقييمات والمراجعات

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim() === "" || username.trim() === "") return; // تأكد من أن المراجعة واسم المستخدم ليسا فارغين
    const newReview = {
      username,
      rating,
      text: reviewText,
    };
    setReviews([newReview, ...reviews]); // إضافة المراجعة الجديدة إلى قائمة المراجعات
    setReviewText(""); // إعادة تعيين النص بعد الإرسال
    setRating(0); // إعادة تعيين التقييم
    setUsername(""); // إعادة تعيين اسم المستخدم
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-6 px-30">
      {/* Image & Video Gallery */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <div className="mb-6">
            <img
              src={mainImage}
              alt="Farm"
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="flex mt-2 space-x-2">
              {media.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumb ${index}`}
                  className="w-20 h-20 rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500"
                  onClick={() => setMainImage(img)}
                />
              ))}
              {/* Video Thumbnail */}
              <div
                className="w-20 h-20 bg-black flex items-center justify-center rounded-lg cursor-pointer border-2 border-transparent hover:border-red-500"
                onClick={() => setIsVideoOpen(true)}
              >
                <span className="text-white text-sm"> 360🎥 </span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-semibold">Farm VIP</h1>
          <h3 className="text-xl font-semibold">📍Amman</h3>
        </div>

        {/* Booking Form */}
        <div className="lg:w-1/3 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">📅 Book now</h2>
          <label className="block mb-1">Start Date:</label>
          <input
            type="date"
            className="w-full p-2 mb-2 border rounded"
            min={today}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label className="block mb-1">End Date:</label>
          <input
            type="date"
            className="w-full p-2 mb-2 border rounded"
            min={startDate}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <label className="block mb-1">Time:</label>
          <input
            type="time"
            className="w-full p-2 mb-2 border rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <label className="block mb-1">Number of people:</label>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={() => setPeople((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span>{people}</span>
            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={() => setPeople((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          <p className="mb-2 mt-2">
            Total price: <strong>180 JOD</strong>
          </p>
          <button className="w-full bg-green-500 text-white py-2 rounded">
            Booking Request
          </button>
          <button className="w-full mt-2 border rounded py-2">
            💚 Save this place
          </button>
        </div>
      </div>

      {/* Overview & Reviews Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Overview</h2>
            <ul className="list-disc ml-6">
              <li>Spacious farm with modern amenities</li>
              <li>Swimming pool and BBQ area</li>
              <li>Children’s play zone</li>
            </ul>
          </div>

          {/* Location Map */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Location</h2>
            <div className="w-full h-64 rounded-lg overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3390.578276383022!2d35.65183307508126!3d31.80924153281434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151cb3003e436567%3A0x66680b345781020f!2z2YHZitix2YjYstinINmB2KfYsdmFINmB2YrZhNinIFZJUA!5e0!3m2!1sen!2sjo!4v1739304975139!5m2!1sen!2sjo"
                className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="lg:w-1/3 mt-24">
          <h2 className="text-xl font-semibold">Rate Your Experience</h2>
          <div className="flex space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer text-2xl ${
                  rating >= star ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <input
            type="text"
            className="w-full p-2 mb-2 border rounded mt-2"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <textarea
            className="w-full h-32 p-2 border rounded mt-2"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <button
            className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleReviewSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Display Reviews */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold">User Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to share your experience!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 bg-white border rounded-lg shadow-md"
              >
                <h3 className="font-semibold">{review.username}</h3>
                <div className="flex space-x-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-2xl ${
                        review.rating >= star ? "text-yellow-400" : "text-gray-400"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="mt-2">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-3/4 lg:w-1/2 bg-white rounded-lg p-4">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => setIsVideoOpen(false)}
            >
              ✖
            </button>
            <iframe
              width="100%"
              height="315"
              src={video.url}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmBookingPage;
