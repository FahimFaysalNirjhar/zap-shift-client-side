import React from "react";
import { ImArrowUpRight2 } from "react-icons/im";
import { Link } from "react-router";

const FAQ = () => {
  const faqs = [
    {
      question: "How does this posture corrector work?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
      question: "Is it suitable for all ages and body types?",
      answer:
        "Yes, the posture corrector is designed to fit comfortably for different ages and body types with adjustable straps.",
    },
    {
      question: "Does it really help with back pain and posture improvement?",
      answer:
        "Yes, regular use can help improve posture and reduce discomfort caused by poor sitting or standing habits.",
    },
    {
      question: "Does it have smart features like vibration alerts?",
      answer:
        "Some advanced posture correctors include vibration reminders to notify you when your posture shifts incorrectly.",
    },
    {
      question: "How will I be notified when the product is back in stock?",
      answer:
        "You can subscribe with your email address and we will notify you as soon as the product becomes available.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-base-200">
          Frequently Asked Question (FAQ)
        </h1>

        <p className="text-[#606060] font-semibold mt-5 leading-relaxed">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      {/* FAQ Items */}
      <div className="mt-12 space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="collapse collapse-plus bg-base-100 border border-[#0F4C5C]/20 rounded-2xl"
          >
            <input
              type="radio"
              name="faq-accordion"
              defaultChecked={idx === 0}
            />

            <div className="collapse-title font-bold text-base-200">
              {faq.question}
            </div>

            <div className="collapse-content text-gray-500 leading-relaxed">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
