import React from "react";
import { FaQuoteRight } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const {
    review: message,
    userName: name,
    user_email: designation,
    user_photoURL: image,
  } = review;

  return (
    <div className="card bg-white shadow-md rounded-3xl p-8 max-w-md">
      {/* Quote Icon */}
      <FaQuoteRight className="text-5xl text-[#D9F2EF]" />

      {/* Review Text */}
      <p className="text-gray-500 text-lg leading-relaxed mt-6">{message}</p>

      {/* Divider */}
      <div className="border-t border-dashed border-[#0F4C5C] my-6"></div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className="w-14 rounded-full bg-[#0F4C5C]">
            {image && <img src={image} alt={name} />}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-[#0F4C5C]">{name}</h3>

          <p className="text-gray-500">{designation}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
